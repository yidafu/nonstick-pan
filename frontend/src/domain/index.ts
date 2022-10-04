import { Remesh } from 'remesh';
import { RemeshLogger } from 'remesh-logger';
import { RemeshReduxDevtools } from 'remesh-redux-devtools';

const store = Remesh.store({ inspectors: [
  RemeshLogger(),
  RemeshReduxDevtools(),
] });

export { store };
