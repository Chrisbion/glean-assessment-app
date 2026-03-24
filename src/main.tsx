import './design-system/tokens.css';
import './design-system/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppProviders from './app/providers/AppProviders';
import App from './App';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
