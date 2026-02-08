import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAI — AI Red Team Engineer",
  description:
    "Breaking things to fix them. AI Red Team Engineer specializing in LLM exploitation, adversarial testing, and offensive AI security.",
  keywords: [
    "AI Red Team",
    "LLM Security",
    "Prompt Injection",
    "Adversarial AI",
    "Cybersecurity",
    "Portfolio",
  ],
  openGraph: {
    title: "SAI — AI Red Team Engineer",
    description: "Breaking things to fix them.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.variable} font-mono antialiased scanline-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
