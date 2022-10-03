import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  App,
} from './app';
import 'normalize.css';
import 'antd/dist/antd.css';
import 'antd/dist/antd.dark.css';

import './global.css';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
