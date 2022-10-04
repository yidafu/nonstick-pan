import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { RemeshRoot } from 'remesh-react';

import { store } from './domain';
import { router } from './router';

export function App() {
  return (
    <BrowserRouter>
      <RemeshRoot
        store={store}
      >
        <Routes>
          {router.map((route) => (
            <Route
              index={Boolean(route.index)}
              path={route.path}
              key={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </RemeshRoot>
    </BrowserRouter>
  );
}
