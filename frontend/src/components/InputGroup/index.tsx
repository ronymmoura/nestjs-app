import React from 'react';
import { NumberFormatProps } from 'react-number-format';

import { Container, Label } from './styles';

interface ExtendedProps extends Partial<NumberFormatProps> {
  title: string;
}

export const InputGroup: React.FC<ExtendedProps> = ({ title, children }) => {
  return (
    <Container>
      <Label>{title}</Label>
      {children}
    </Container>
  );
};
