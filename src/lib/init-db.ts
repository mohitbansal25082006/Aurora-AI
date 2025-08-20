import sql from './neon';
export async function initializeDatabase() {
  try {
    // Create workspaces table
    await sql`
      CREATE TABLE IF NOT EXISTS workspaces (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    // Create research_sessions table
    await sql`
      CREATE TABLE IF NOT EXISTS research_sessions (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
        query TEXT NOT NULL,
        options JSONB,
        results JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    console.log('Database initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}