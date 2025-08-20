// Simple analytics tracking (you can replace with a real analytics service)

interface AnalyticsData {
  [key: string]: string | number | boolean | null | undefined | AnalyticsData | AnalyticsData[];
}

interface ResearchOptions {
  profile: string;
  sources: string[];
  dateRange: { from: string; to: string };
  location: string;
}

export function trackEvent(event: string, data?: AnalyticsData) {
  if (typeof window !== 'undefined') {
    console.log('Analytics Event:', event, data);
    // In a real implementation, you would send this to your analytics service
    // Example: 
    // if (process.env.NODE_ENV === 'production') {
    //   // Send to analytics service
    // }
  }
}

export function trackPageView(page: string) {
  trackEvent('page_view', { page });
}

export function trackResearch(query: string, options: ResearchOptions) {
  // Convert ResearchOptions to AnalyticsData format
  const analyticsData: AnalyticsData = {
    query,
    profile: options.profile,
    sources: options.sources.join(', '),
    dateRange: `${options.dateRange.from} to ${options.dateRange.to}`,
    location: options.location
  };
  trackEvent('research_started', analyticsData);
}

export function trackResearchCompleted(query: string, options: ResearchOptions, resultCount: number) {
  // Convert ResearchOptions to AnalyticsData format
  const analyticsData: AnalyticsData = {
    query,
    profile: options.profile,
    sources: options.sources.join(', '),
    dateRange: `${options.dateRange.from} to ${options.dateRange.to}`,
    location: options.location,
    resultCount
  };
  trackEvent('research_completed', analyticsData);
}