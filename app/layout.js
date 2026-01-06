import ThemeApplier from "./components/theme/ThemeApplier";
import "./globals.css";

export const metadata = {
  title: "Hansi-Trans",
  description: "CMS powered website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900">
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}
