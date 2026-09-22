import { ArrowRight, BarChart3, BrainCircuit, Columns3, Trophy } from "lucide-react";
import { Footer } from "../Footer";
import { Button } from "../../ui/button";
import { TDTSWordmark } from "../TDTSLogo";
import { landingStats } from "../data";
import heroImage from "../../../../imports/image.png";

export function LandingScreen({ onGetStarted, onLogin, onPricing }: { onGetStarted?: () => void; onLogin?: () => void; onPricing?: () => void }) {
  const features = [
    [BrainCircuit, "AI Smart Delegation", "Recommend the strongest assignee using skills, workload, availability and delivery history."],
    [Columns3, "Live Kanban", "Keep every task stage visible and move work with simple drag-and-drop."],
    [BarChart3, "Bird's-Eye Analytics", "Project health, timelines and workload signals stay together on one screen."],
    [Trophy, "Rewards & Recognition", "Turn reliable delivery into points, badges and transparent leaderboards."],
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex h-16 max-w-7xl items-center px-5">
        <TDTSWordmark />
        <nav className="ml-auto flex items-center gap-2">
          <Button variant="ghost" onClick={onPricing}>Pricing</Button>
          <Button variant="ghost" onClick={onLogin}>Log in</Button>
          <Button className="bg-brand-primary text-white" onClick={onGetStarted}>Get started</Button>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[.9fr_1.1fr] lg:py-24">
          <div>
            <span className="inline-flex rounded-full bg-brand-tertiary px-3 py-1 text-xs font-semibold text-brand-primary">Task delegation without the clutter</span>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-.045em] md:text-6xl">A zero-clutter view of every task, owner and deadline.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">TDTS helps teams delegate intelligently, track execution in real time, and reward the people who consistently move work forward.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" className="bg-brand-primary text-white" onClick={onGetStarted}>Start for free<ArrowRight /></Button>
              <Button size="lg" variant="outline" onClick={onPricing}>View pricing</Button>
            </div>
          </div>
          <div className="tdts-hero-shadow overflow-hidden rounded-2xl border border-border-primary bg-bg-page p-2">
            <img src={heroImage} alt="TDTS dashboard preview" className="w-full rounded-xl object-cover" />
          </div>
        </section>

        <section className="border-y border-border-secondary bg-bg-page">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
            {landingStats.map(([value, label]) => (
              <div key={label} className="p-7 text-center">
                <div className="tdts-tabular text-3xl font-semibold">{value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">Everything required to delegate with confidence.</h2>
            <p className="mt-3 text-muted-foreground">Designed for admins, company operators and individual contributors without mixing their responsibilities.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map(([Icon, title, text]) => (
              <article key={title} className="tdts-card p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tertiary text-brand-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20">
          <div className="rounded-2xl bg-primary px-7 py-12 text-center text-background dark:bg-white dark:text-black">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">See the whole project before the next meeting.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm opacity-70">Create a workspace, invite your team and let TDTS make ownership obvious.</p>
            <Button size="lg" className="mt-6 bg-brand-primary text-white" onClick={onGetStarted}>Create workspace<ArrowRight /></Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}