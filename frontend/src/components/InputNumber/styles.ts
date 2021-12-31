import NumberFormat from 'react-number-format';
import styled from 'styled-components';

export const Container = styled(NumberFormat)`
  display: flex;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
