import ThemeApplier from "./components/theme/ThemeApplier";
import { Inter, Poppins } from "next/font/google";
import "./globals.css"; // globals.css e tumi Satoshi manually load korecho

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} bg-[#f7f7f7] text-gray-900`}
      >
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}