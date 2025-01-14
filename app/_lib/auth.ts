
import NextAuth, { Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";



const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
    // ...add more providers here
  ],
callbacks: {
  authorized: async ({ auth }: {  auth: Session | null }) => {
    // convert any value to boolean
    // console.log(auth);
    return !!auth?.user;
  },
  async signIn({ user } : { user: User }) {
    // console.log(user);
    try {
      const existingGuest = await getGuest(user.email || "");

      if (!existingGuest)
        await createGuest({email: user.email ?? "", fullName: user.name ?? ""});

      return true;
    } catch {
      return false;
    }
    
  },
  async session({ session }: { session: Session }) {
      const guest = await getGuest(session.user?.email || "");
      if (session.user) {
        session.user.id = guest?.id?.toString();
      }
      return session;
      // console.log("/////////////", typeof session.user?.id);
    },
  },
  pages: {
    signIn: "/login"
  }
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST }
} = NextAuth(authConfig);
