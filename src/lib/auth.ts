import NextAuth, { type Session, type Account } from "next-auth"
import Google from "next-auth/providers/google"
import type { JWT } from "next-auth/jwt"
import { createClient } from "@supabase/supabase-js"

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
      if (session.user) {
        session.user.id = token.supabaseUserId as string | undefined;
      }
      return session;
    },
    async jwt({ token, account, profile }: { token: JWT; account?: Account | null; profile?: Record<string, unknown> | null }) {
      if (account && profile) {
        token.accessToken = account.access_token;

        if (!token.supabaseUserId) {
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          );

          try {
            const email = (profile.email as string | undefined) ?? `${token.sub}@placeholder.ai`;
            let userId: string | null = null;

            const { data: listData } = await supabase.auth.admin.listUsers();
            const existing = listData?.users.find(u => u.email === email);
            if (existing) userId = existing.id;

            if (!userId) {
              const { data, error } = await supabase.auth.admin.createUser({
                email,
                email_confirm: true,
                user_metadata: {
                  name: profile.name ?? "User",
                  avatar_url: profile.picture,
                },
              });
              if (error) throw error;
              userId = data.user.id;
            }

            await supabase.from("profiles").upsert({
              id: userId,
              name: (profile.name as string) ?? "User",
              avatar_url: profile.picture as string | undefined,
            } as never);

            token.supabaseUserId = userId;
          } catch (err) {
            console.error("Failed to create Supabase user:", err);
          }
        }
      }
      return token;
    },
  },
});
