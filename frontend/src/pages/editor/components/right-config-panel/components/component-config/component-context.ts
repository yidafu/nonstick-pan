import { IComponent } from '@pan/common';
import React from 'react';

export const ComponentContext = React.createContext<Nullable<IComponent>>(null);
