import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../Footer";
import { Button } from "../../ui/button";
import { TDTSWordmark } from "../TDTSLogo";
import { DocumentationSection } from "../DocumentationSection";

const contents = [
  ["How it works", "#how-it-works"],
  ["By role", "#by-role"],
  ["Architecture", "#architecture"],
  ["TDTS vs Jira", "#vs-jira"],
] as const;

export function DocumentationScreen({ onBack, onLogin, onGetStarted }: { onBack?: () => void; onLogin?: () => void; onGetStarted?: () => void }) {
  // Always open the page at the top
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border-secondary bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-5">
          <button onClick={onBack} aria-label="Back to home"><TDTSWordmark /></button>
          <nav className="ml-auto flex items-center gap-2">
            <Button variant="ghost" onClick={onBack}><ArrowLeft />Back to home</Button>
            <Button variant="ghost" onClick={onLogin}>Log in</Button>
            <Button className="bg-brand-primary text-white" onClick={onGetStarted}>Get started</Button>
          </nav>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <h1 className="text-4xl font-semibold tracking-[-.04em] md:text-5xl">TDTS Documentation</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Everything a new user needs to understand the project: what it does, how to use it, and how it is built.</p>
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="On this page">
            {contents.map(([label, href]) => (
              <a key={href} href={href} className="rounded-full border border-border-primary px-3.5 py-1.5 text-sm font-medium hover:bg-bg-faint">{label}</a>
            ))}
          </nav>
        </div>

        <DocumentationSection />

        <div className="mx-auto max-w-7xl px-5 pb-16">
          <div className="rounded-2xl bg-bg-page p-8 text-center">
            <h2 className="text-2xl font-semibold tracking-[-.03em]">Ready to try it?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Create a workspace and follow the steps above.</p>
            <Button size="lg" className="mt-5 bg-brand-primary text-white" onClick={onGetStarted}>Get started</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
