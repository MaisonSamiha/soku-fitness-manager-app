import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soku Fitness | AI Workout Planner",
  description: "Generate highly personalized weekly exercise programs powered by AI. Pick your muscle group, equipment, and goals — get a custom routine with anatomical exercise demos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <main className="layout-container">
          <header className="app-header">
            <div className="app-header-left">
              <div className="logo-mark" style={{ background: 'none', borderRadius: 0, boxShadow: 'none', padding: 0, width: 44, height: 44 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/soku-logo.png" 
                  alt="Soku Fitness Logo" 
                  style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: '10px' }} 
                />
              </div>
              <div>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Soku <span className="text-gradient">Fitness</span>
                </h1>
                <p className="app-tagline">AI-Powered Workout Planner</p>
              </div>
            </div>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
