import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { router } from './router';

export function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
