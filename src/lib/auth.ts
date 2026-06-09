import NextAuth, { type Session, type Account } from "next-auth"
import Google from "next-auth/providers/google"
import type { JWT } from "next-auth/jwt"

interface ExtendedSession extends Session {
  user: Session["user"] & {
    id?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }: { session: ExtendedSession; token: JWT }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        token.accessToken = account?.access_token;
      }
      return token;
    },
  },
});
