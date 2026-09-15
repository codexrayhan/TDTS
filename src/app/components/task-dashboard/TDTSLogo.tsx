export function TDTSIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <rect width="36" height="36" rx="10" fill="var(--brand-primary)" />
      <path d="M10 10h16v5H21v11h-6V15h-5z" fill="white" />
      <circle cx="27" cy="26" r="3" fill="white" opacity=".75" />
    </svg>
  );
}

export function TDTSWordmark({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-2.5"><TDTSIcon />{!compact && <div><div className="font-semibold tracking-[-0.02em]">TDTS</div><div className="text-[10px] text-muted-foreground">TaskFlow</div></div>}</div>;
}
