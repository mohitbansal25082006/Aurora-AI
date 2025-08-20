import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { marked } from 'marked';

interface ResearchData {
  query: string;
  summary: string;
  sources: Source[];
  timeline: TimelineItem[];
  entities: Entity[];
}

interface Source {
  title: string;
  url: string;
  reliability: number;
}

interface TimelineItem {
  date: string;
  event: string;
  description: string;
}

interface Entity {
  name: string;
  type: string;
  relevance: number;
}

export async function exportToPDF(elementId: string, filename: string = 'research-results.pdf') {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#1a202c'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add new page if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return false;
  }
}

export function exportToMarkdown(data: ResearchData, filename: string = 'research-results.md') {
  try {
    let markdown = `# Research Results: ${data.query}\n\n`;
    
    // Add summary
    markdown += `## Summary\n\n${data.summary}\n\n`;
    
    // Add sources
    markdown += `## Sources\n\n`;
    data.sources.forEach((source: Source) => {
      markdown += `- [${source.title}](${source.url}) (${Math.round(source.reliability * 100)}% reliable)\n`;
    });
    markdown += '\n';
    
    // Add timeline
    markdown += `## Timeline\n\n`;
    data.timeline.forEach((item: TimelineItem) => {
      markdown += `### ${item.date}\n\n**${item.event}**\n\n${item.description}\n\n`;
    });
    
    // Add entities
    markdown += `## Key Entities\n\n`;
    data.entities.forEach((entity: Entity) => {
      markdown += `- **${entity.name}** (${entity.type}) - Relevance: ${(entity.relevance * 100).toFixed(0)}%\n`;
    });
    
    // Create and download file
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Markdown:', error);
    return false;
  }
}

export async function previewMarkdown(markdown: string): Promise<string> {
  return marked(markdown);
}