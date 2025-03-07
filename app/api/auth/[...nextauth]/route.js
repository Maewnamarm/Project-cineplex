// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions);

// สำหรับ Next.js 13+ การส่งออกจะใช้วิธีนี้
export { handler as GET, handler as POST };
