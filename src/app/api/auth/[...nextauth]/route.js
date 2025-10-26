import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

// NOTE: This import path (`@/lib/mongodb`) must correctly resolve 
// to your file that exports the MongoDB client promise.
import clientPromise from "@/lib/mongodb";

/**
 * NextAuth Configuration Options
 */
export const authOptions = {
  // 1. ADAPTER: Use the MongoDB adapter for persistent user and session storage
  // The adapter will automatically create and update user accounts upon OAuth sign-in.
  adapter: MongoDBAdapter(clientPromise),

  // 2. SECRET: Required for signing and encrypting tokens/cookies
  secret: process.env.NEXTAUTH_SECRET,

  // 3. PROVIDERS: Google OAuth login only, as requested
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Optional: Specify scope if you need additional user data (like profile info)
      // scope: "profile email",
    }),
  ],

  // 4. SESSION: Use JWT strategy when employing an adapter in the App Router
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // 5. PAGES: Redirect users to your custom login page on sign-in or error
  pages: {
    signIn: "/login",
    error: "/login", // Errors like "OAuthAccountNotLinked" will redirect here
  },

  // 6. CALLBACKS: Essential for passing the user's database ID to the session object
  callbacks: {
    // This callback runs after the JWT is created/updated.
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        // When using an adapter, 'token.sub' automatically contains the database ID (_id) of the user.
        session.user.id = token.sub;
      }
      return session;
    },
    // The jwt callback is generally not needed when using an adapter, 
    // as 'sub' is set automatically.
  },
};

// Initialize NextAuth with the configuration
const handler = NextAuth(authOptions);

// Export the handlers for Next.js App Router
export { handler as GET, handler as POST };
