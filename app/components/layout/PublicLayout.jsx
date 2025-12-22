import Header from "./Header";
import Footer from "./Footer";
import Navbar from "../common/Navbar";
import Hero from "../common/Hero";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <main className="min-h-screen container mx-auto p-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
