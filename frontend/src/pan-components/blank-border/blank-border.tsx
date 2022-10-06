import React from 'react';

interface IBlankBorderProps {

}

export const BlankBorder: React.FC<IBlankBorderProps> = function () {
  return (
    <div className="border-white w-40 h-40" />
  );
};
