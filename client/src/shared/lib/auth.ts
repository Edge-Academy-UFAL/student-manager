import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // one Day
  },
  providers: [
    Credentials({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const res = await fetch(`${process.env.SERVER_URL}/api/v1/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (res.status === 200) {
          const data = await res.json();
          const user = await fetch(`${process.env.SERVER_URL}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }).then((res) => res.json());

          user.authToken = data.token;
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, trigger, user, session }) => {
      // This is necessary to update de session (and therefore, the header)
      // when the user uploads a new profile picture
      // More on https://next-auth.js.org/getting-started/client#updating-the-session
      if (trigger === 'update' && session?.photoUrl) {
        token.photoUrl = session.photoUrl;
      }

      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as unknown as any;

        return {
          ...token,
          id: u.id,
          authToken: u.authToken,
          name: u.name,
          email: u.email,
          photoUrl: u.photoUrl,
          dtype: u.dtype,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (typeof token.id !== 'string' || typeof token.authToken !== 'string') {
        throw new Error('Invalid token data');
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          authToken: token.authToken,
          name: token.name,
          email: token.email,
          photoUrl: token.photoUrl,
          dtype: token.dtype,
        },
      };
    },
  },
});
