import Footer from "./Footer";

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
