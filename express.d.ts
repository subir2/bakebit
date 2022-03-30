interface userKeys {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: userKeys;
    }
  }
}
