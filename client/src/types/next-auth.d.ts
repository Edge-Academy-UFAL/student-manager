import { DefaultSession } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string;
      authToken: string;
      name: string;
      email: string;
      photoUrl: string;
      dtype: string;
    };
  }

  interface User {
    id: string;
    authToken: string;
    name: string;
    email: string;
    photoUrl?: string;
    dtype: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    id: string;
    authToken: string;
    photoUrl: string;
    dtype: string;
    email: string;
    name: string;
  }
}
