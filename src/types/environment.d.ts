declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      APPLICATION_ID: string;

      DEBUG: string;
      AUTO_REGISTER: string;
    }
  }
}

export {};
