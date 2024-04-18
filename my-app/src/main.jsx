import React from 'react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Provider} from 'react-redux';
import App from './App';

import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  );
} else {
  throw new Error(
    'Root element with ID \'root\' was not found in the document. Ensure there is a corresponding HTML element with the ID \'root\' in your HTML file.',
  );
}
