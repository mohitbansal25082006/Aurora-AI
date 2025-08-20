import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/neon';

export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM workspaces
      ORDER BY created_at DESC
    `;
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    return NextResponse.json({ error: 'Failed to fetch workspaces' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();
    
    const result = await sql`
      INSERT INTO workspaces (name, description)
      VALUES (${name}, ${description || null})
      RETURNING *
    `;
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating workspace:', error);
    return NextResponse.json({ error: 'Failed to create workspace' }, { status: 500 });
  }
}