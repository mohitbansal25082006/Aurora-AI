

# Aurora AI - Advanced Research Agent

Aurora AI is a next-generation AI research agent that delivers real-time, fact-checked, and visually interactive insights. Built with Next.js 15, TypeScript, and Tailwind CSS, it provides a comprehensive research platform with advanced visualization and collaboration features.

## 🌟 Features

- **Real-Time Research**: Get the latest information from the web, processed and summarized in seconds
- **AI-Powered Analysis**: Leverages OpenAI's GPT-4 for intelligent research summarization and fact-checking
- **Interactive Visualization**: Explore research through dynamic knowledge graphs and timelines
- **Workspace Management**: Organize research projects into workspaces for better organization
- **Research History**: Save and revisit previous research sessions
- **Export Functionality**: Export research results as PDF or Markdown files
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful, professional interface with 3D effects and smooth animations

## 🚀 Live Demo

Check out the live demo: [https://aurora-ai-eight.vercel.app/](https://aurora-ai-eight.vercel.app/)

## 🛠 Tech Stack

- **Frontend**:
  - Next.js 15 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS v4
  - Framer Motion
  - Three.js
  - D3.js

- **Backend**:
  - Vercel Edge Functions
  - Neon Database
  - OpenAI API

- **UI Components**:
  - shadcn/ui
  - Lucide React Icons

## 📋 Prerequisites

- Node.js 18.0 or later
- npm or yarn
- OpenAI API key
- Neon Database account

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/aurora-ai.git
   cd aurora-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   DATABASE_URL=your_neon_database_url_here
   ```

4. **Set up the database**:
   - Create a Neon Database account at [neon.tech](https://neon.tech)
   - Create a new project and copy the connection string
   - Add the connection string to your `.env.local` file as `DATABASE_URL`

## 🗄 Database Setup

The application uses Neon Database for persistent storage. The database tables are automatically created when you first run the application.

### Required Tables

1. **workspaces**: Stores user workspaces for organizing research
2. **research_sessions**: Stores research queries, options, and results

The tables will be created automatically when you first load the dashboard.

## 🏃 Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Explore the application**:
   - Start by creating a workspace in the dashboard
   - Begin a new research query
   - Explore the results with different visualization options
   - Save and revisit your research sessions

## 🚀 Deployment

### Vercel Deployment

1. **Push your code to GitHub**:
   Make sure your code is in a GitHub repository.

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `OPENAI_API_KEY`
     - `DATABASE_URL`
   - Deploy

The application is optimized for Vercel deployment with serverless functions and edge caching.

### Environment Variables for Production

Make sure to add the following environment variables in your Vercel dashboard:
- `OPENAI_API_KEY`: Your OpenAI API key
- `DATABASE_URL`: Your Neon Database connection string

## 📝 Usage

### Starting a Research Query

1. **Select or create a workspace** in the dashboard
2. **Enter your research query** in the input field
3. **Choose a research profile**:
   - Academic: Formal, citation-focused research
   - Journalist: Investigative, source-verified reporting
   - Analyst: Data-driven, trend-focused analysis
4. **Configure advanced options** (optional):
   - Data sources
   - Date range
   - Location filter
5. **Click "Research"** to start the process

### Viewing Results

The research results are displayed in multiple tabs:
- **Summary**: AI-generated research summary
- **Sources**: List of sources used in the research
- **Timeline**: Chronological events related to the research
- **Graph**: Interactive knowledge graph showing entity relationships
- **Export**: Options to export results as PDF or Markdown

### Managing Workspaces

- Create new workspaces to organize different research projects
- Each workspace maintains its own research history
- Workspaces can be shared (simulated in the current version)

### Research History

- All research sessions are saved automatically
- View previous research sessions in the History tab
- Click on any session to view detailed results
