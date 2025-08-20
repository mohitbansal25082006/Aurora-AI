import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/neon';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const result = await sql`
      SELECT * FROM research_sessions
      WHERE id = ${id}
    `;
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Research session not found' }, { status: 404 });
    }
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching research session:', error);
    return NextResponse.json({ error: 'Failed to fetch research session' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await sql`
      DELETE FROM research_sessions
      WHERE id = ${id}
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting research session:', error);
    return NextResponse.json({ error: 'Failed to delete research session' }, { status: 500 });
  }
}