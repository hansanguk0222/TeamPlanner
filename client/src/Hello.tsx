import React from 'react';

interface User {
  id: string;
  pw: string;
}

const Hello = (user: User) => (
  <div>
    {user.id}, {user.pw}
  </div>
);

export default Hello;
