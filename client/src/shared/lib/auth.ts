import NextAuth, { type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserInfo } from './api/get-user-info-req';
import { loginAsUser } from './api/login-as-user-req';

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // One day
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await loginAsUser({
          email: credentials.email as string,
          password: credentials.password as string,
        });
        if (!res) {
          return null;
        }

        const user = await getUserInfo(res.token);
        return user ? { ...user, authToken: res.token } : null;
      },
    }),
  ],
  callbacks: {
    // https://github.com/nextauthjs/next-auth/blob/next-auth@5.0.0-beta.29/packages/core/src/lib/init.ts#L29
    jwt: async ({ token, trigger, user }) => {
      if (trigger === 'update') {
        // Refetch user information from the backend
        const info = await getUserInfo(token.authToken);
        if (info) {
          user = info as User;
        }
      }

      return user ? { ...token, ...user } : token;
    },
    session: async ({ session, token }) => {
      return {
        user: {
          id: token.id,
          authToken: token.authToken,
          name: token.name,
          email: token.email,
          photoUrl: token.photoUrl,
          dtype: token.dtype,
        },
        expires: session.expires?.toISOString?.() ?? session.expires,
      };
    },
  },
});
