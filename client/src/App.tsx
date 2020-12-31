import React from 'react';
import Hello from './Hello';

const App = () => {
  const user = { id: 'abc123', pw: '1234' };
  return <Hello {...user} />;
};

export default App;
