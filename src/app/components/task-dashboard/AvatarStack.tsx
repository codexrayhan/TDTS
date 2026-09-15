import { AppAvatar } from "./AppAvatar";
export function AvatarStack({ people, max = 4 }: { people: { initials: string; name?: string }[]; max?: number }) {
  const shown = people.slice(0, max); const rest = people.length - shown.length;
  return <div className="flex items-center">{shown.map((person, index) => <span key={`${person.initials}-${index}`} className={index ? "-ml-2" : ""} title={person.name}><AppAvatar initials={person.initials} size="sm" className="ring-2 ring-[var(--surface-bg)]" /></span>)}{rest > 0 && <span className="-ml-2 flex h-7 w-7 items-center justify-center rounded-lg bg-bg-subtle text-[10px] font-semibold ring-2 ring-[var(--surface-bg)]">+{rest}</span>}</div>;
}
