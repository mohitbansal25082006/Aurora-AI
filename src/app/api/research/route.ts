import { NextRequest, NextResponse } from 'next/server';
import { generateResearchSummary, extractEntities, generateTimeline } from '@/lib/openai';
import { scrapeWeb } from '@/lib/scraping';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, options } = body;
    
    if (!query || !options) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Step 1: Scrape the web for relevant information
    const scrapedData = await scrapeWeb(query, options.sources);
    
    // Combine scraped content for processing
    const context = scrapedData.map(item => item.content).join('\n\n');
    
    // Step 2: Generate research summary using OpenAI
    const summary = await generateResearchSummary(query, options.profile, context);
    
    // Step 3: Extract key entities
    const entities = await extractEntities(summary);
    
    // Step 4: Generate timeline
    const timeline = await generateTimeline(query, context);
    
    // Step 5: Format sources for the response
    const sources = scrapedData.map((item, index) => ({
      id: `source-${index}`,
      title: item.title,
      type: 'web',
      reliability: item.reliability,
      url: item.url
    }));
    
    // Step 6: Return the research results
    return NextResponse.json({
      query,
      options,
      data: scrapedData,
      summary,
      sources,
      timeline,
      entities
    });
  } catch (error) {
    console.error('Research API error:', error);
    return NextResponse.json(
      { error: 'Failed to process research request' },
      { status: 500 }
    );
  }
}