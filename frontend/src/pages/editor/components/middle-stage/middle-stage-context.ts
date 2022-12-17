import React, { RefObject } from 'react';

export const MiddleStageContext = React.createContext<RefObject<HTMLDivElement> | null>(null);
