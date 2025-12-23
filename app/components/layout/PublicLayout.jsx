import Header from "./Header";
import Footer from "./Footer";
import Navbar from "../common/Navbar";
import Hero from "../common/Hero";

export default function PublicLayout({ children }) {
  return (
    <>
      {/* <Hero></Hero> */}
      <main className="">
        {children}
      </main>
      <Footer />
    </>
  );
}
