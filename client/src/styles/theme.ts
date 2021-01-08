import { DefaultTheme } from 'styled-components';

const calcRem = (size: number) => `${size / 16}rem`;

const theme: DefaultTheme = {
  color: {
    black1: '#000',
    black2: '#111',
    black3: '#222',
    black4: '#333',
    black5: '#444',
    black6: '#555',
    black7: '#666',
    black8: '#777',
    black9: '#888',
    black10: '#999',
    black11: '#aaa',
    black12: '#bbb',
    black13: '#ccc',
    black14: '#ddd',
    black15: '#eee',
    black16: '#fff',

    green: '#2ecc71',

    purple: '#9b59b6',

    red: '#e74c3c',
  },
  size: {
    xxxs: calcRem(8),
    xxs: calcRem(10),
    xs: calcRem(12),
    s: calcRem(14),
    m: calcRem(16),
    l: calcRem(18),
    xl: calcRem(20),
    xxl: calcRem(22),
    xxxl: calcRem(24),
    header: calcRem(50),
  },
};

export default theme;
