import React from 'react';
import { NumberFormatProps } from 'react-number-format';

import { Container } from './styles';

export interface InputNumberProps extends Partial<NumberFormatProps> {
  maskType?: 'text' | 'tel' | 'password' | 'money' | 'percent' | 'date';
}

export const InputNumber: React.FC<InputNumberProps> = ({ maskType, ...rest }) => {
  switch (maskType) {
    case 'money':
      return <Container {...rest} decimalScale={2} fixedDecimalScale={true} thousandSeparator={'.'} decimalSeparator={','} />;
    case 'percent':
      return <Container {...rest} decimalSeparator="," decimalScale={2} suffix="%" fixedDecimalScale={true} />;
    case 'date':
      return <Container {...rest} format="##/##/####" mask="_" />;
    default:
      return <Container {...rest} />;
  }
};
