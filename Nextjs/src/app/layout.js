import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css"
import BootstrapClient from "@/components/BootstrapClient";
import { Links } from "@/components/nav-links";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prototipado en Next.js",
  description: "Actividad 3.5",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Links />
          <div className="container mt-3">
            {children}
          </div>
        </div>

        <BootstrapClient />
      </body>
    </html>
  );
}
