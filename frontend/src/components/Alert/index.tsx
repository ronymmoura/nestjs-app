import React from 'react';

import { Container } from './styles';

export const Alert: React.FC = ({ children, ...rest }) => {
  return <Container {...rest} dangerouslySetInnerHTML={{ __html: children.toString() }} />;
};
