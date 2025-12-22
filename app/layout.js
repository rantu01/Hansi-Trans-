import "./globals.css";

export const metadata = {
  title: "Hansi-Trans",
  description: "CMS powered website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
