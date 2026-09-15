import type { LucideIcon } from "lucide-react";
import { Columns3, Inbox } from "lucide-react";
import { Button } from "../ui/button";

export function EmptyState({
  title = "Nothing here yet",
  description = "Create the first item to get started.",
  actionLabel = "Create item",
  onAction,
  icon: Icon = Inbox,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}) {
  return (
    <div className="tdts-card grid min-h-64 place-items-center p-8 text-center">
      <div>
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-tertiary text-brand-primary"><Icon /></span>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
        {onAction && <Button className="mt-4 bg-brand-primary text-white" onClick={onAction}>{actionLabel}</Button>}
      </div>
    </div>
  );
}

export function KanbanEmptyState({ onCreate }: { onCreate?: () => void }) {
  return <EmptyState icon={Columns3} title="No tasks in this lane" description="Drag a task here or create a new one." actionLabel="Create task" onAction={onCreate} />;
}
