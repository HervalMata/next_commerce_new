import type { Metadata } from "next";
import { Sora, Instrument_Sans } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cris Laços App",
  description: "O app da sua loja de acessórios",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
              style: {
                fontFamily: "var(--font-instrument), system-ui, sans-serif",
                fontSize: "13.5px",
                borderRadius: "12px",
                color: "17151F",
                border: "1px solid #ECECF1",
                boxShadow: "0 16px 34px -14px rgba(20, 18, 21, 0.18)"
              }
          }}
        />
      </body>
    </html>
  );
}
