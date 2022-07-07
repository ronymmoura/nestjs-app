import { useApi } from '@contexts';
import React, { useState } from 'react';

export const Login: React.FC<any> = ({ onLogin }) => {
  const api = useApi();

  const [Email, setEmail] = useState('ronymmoura@gmail.com');
  const [Password, setPassword] = useState('123');

  async function handleLogin(e) {
    try {
      e.preventDefault();

      const loginData = await api.request<{ access_token: string }>('POST', '/auth/login', { email: Email, password: Password });
      localStorage.setItem('token', loginData.access_token);

      await onLogin(true);
    } catch (e) {
      await onLogin(false, e);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};
