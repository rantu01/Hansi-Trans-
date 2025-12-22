import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex gap-6 p-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
