import { NextResponse } from "next/server";

/**
 * MIDDLEWARE - এটি সকল requests এর আগে চেক করে
 * ক্যারে: Admin protection - যদি adminToken না থাকে তাহলে login page এ রিডাইরেক্ট করে
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("adminToken")?.value;

  // যদি /admin এ access করতে চায এবং token নেই তাহলে login এ পাঠাও
  if (pathname.startsWith("/admin") && !adminToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // সাধারণ requests এগিয়ে যেতে দাও
  return NextResponse.next();
}

// শুধুমাত্র /admin path এর জন্য middleware চলবে
export const config = {
  matcher: ["/admin/:path*"],
};