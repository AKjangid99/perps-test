declare global {
  namespace Express {
    interface Request {
      Id?: string;
    }
  }
}

export {};
