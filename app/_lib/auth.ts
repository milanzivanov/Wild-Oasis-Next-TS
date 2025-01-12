
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
    // ...add more providers here
  ],
  callbacks: {
    authorized({auth}) {
      // convert any value to boolean
      return !!auth?.user;
    }
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
