import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import { queryClient } from './lib/queryClient';
import { Landing } from './features/landing';
import { Patients } from './features/patients';
import { Layout } from './features/shared';

/**
 * Enable MSW Mocking
 * Initializes Mock Service Worker in development mode
 * This function loads and starts the MSW worker before the app renders
 */
async function enableMocking() {
  // Only enable mocking in development mode
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  // Dynamically import the worker to avoid bundling it in production
  const { worker } = await import('./mocks/browser');

  // Start the worker and wait for it to be ready
  return worker.start({
    onUnhandledRequest: 'bypass', // Allow non-mocked requests to pass through
  });
}

// Wait for MSW to be enabled before rendering the app
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/patients" element={<Patients />} />
            </Routes>
          </Layout>
        </BrowserRouter>

        {/* React Query DevTools - only included in development builds */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
});
