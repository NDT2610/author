// src/custom.request.ts

import { Request as RequestType } from 'express';

declare module 'express-serve-static-core' {
  interface Request extends RequestType {
    user: {
      id?: number;
      username: string;
    };
  }
}
