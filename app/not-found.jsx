// app/not-found.jsx
"use client";
import Link from "next/link";
import Hero from "./components/common/Hero";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero
        title="404 - Page Not Found"
        breadcrumb="Home › 404"
        description="Commming Soon!"
      >
        <div className="flex gap-5">
          <img src="/photo/404.png" alt="" />
          <div className="items-center justify-center flex">
            <Link
              href="/"
              className="px-6 py-3 my-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </Hero>
    </div>
  );
}
