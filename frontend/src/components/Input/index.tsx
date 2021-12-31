import React from 'react';

import { Container } from './styles';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
  return <Container {...rest} />;
};
