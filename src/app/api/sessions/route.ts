import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/neon';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspaceId');
    
    if (!workspaceId) {
      return NextResponse.json({ error: 'Workspace ID is required' }, { status: 400 });
    }
    
    const result = await sql`
      SELECT * FROM research_sessions
      WHERE workspace_id = ${workspaceId}
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching research sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch research sessions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { workspaceId, query, options, results } = await request.json();
    
    const sessionResult = await sql`
      INSERT INTO research_sessions (workspace_id, query, options, results)
      VALUES (${workspaceId}, ${query}, ${JSON.stringify(options)}, ${JSON.stringify(results)})
      RETURNING *
    `;
    
    return NextResponse.json(sessionResult[0]);
  } catch (error) {
    console.error('Error creating research session:', error);
    return NextResponse.json({ error: 'Failed to create research session' }, { status: 500 });
  }
}