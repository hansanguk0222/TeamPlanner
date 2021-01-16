interface Config {
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
}

const config: Config = {
  JWT_SECRET: process.env.REACT_APP_JWT_SECRET as string,
  JWT_REFRESH_SECRET: process.env.REACT_APP_JWT_REFRESH_SECRET as string,
};

export default config;
