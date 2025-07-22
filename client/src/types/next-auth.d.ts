import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  export interface Session extends DefaultSession {
    user: User;
  }

  export interface User {
    id: string;
    authToken: string;
    name: string;
    email: string;
    photoUrl: string?;
    dtype: string;
  }
}

declare module 'next-auth/jwt' {
  export interface JWT extends DefaultJWT {
    id: string;
    authToken: string;
    photoUrl: string?;
    dtype: string;
    email: string;
    name: string;
  }
}
