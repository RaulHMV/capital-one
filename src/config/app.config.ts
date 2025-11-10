export const appConfig = {
  appName: 'Capital One',
  appDescription: 'Capital One Banking Portal',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  
  // Demo IDs (hardcoded para el hackathon)
  demo: {
    customerId: process.env.DEMO_CUSTOMER_ID || 'demo_customer_123',
    accountId: process.env.DEMO_ACCOUNT_ID || 'demo_account_456',
  },
};
