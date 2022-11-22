import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { RemeshRoot } from 'remesh-react';

import { store } from './domain';
import { router } from './router';

export function App() {
  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>

  );
}
