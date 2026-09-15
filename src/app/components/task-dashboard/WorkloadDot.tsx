import type { Workload } from "./data";
export function WorkloadDot({ workload }: { workload: Workload }) {
  const color = workload === "available" ? "var(--success)" : workload === "moderate" ? "var(--warning)" : "var(--danger)";
  return <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} aria-label={`${workload} workload`} />;
}
