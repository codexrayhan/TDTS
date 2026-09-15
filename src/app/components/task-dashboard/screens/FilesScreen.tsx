import { useRef, useState, type ChangeEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { FileImage, FileSpreadsheet, FileText, Folder, MoreHorizontal, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { EmptyState } from "../EmptyState";
import type { ScreenId } from "../AppShell";

type RecentFile = { icon: LucideIcon; name: string; meta: string };

const initialFolders = [
  { name: "Design", count: "24 files" },
  { name: "Research", count: "11 files" },
  { name: "Deliverables", count: "18 files" },
];

const initialRecent: RecentFile[] = [
  { icon: FileImage, name: "homepage-v7.png", meta: "8.4 MB · 14 min ago" },
  { icon: FileSpreadsheet, name: "analytics-map.csv", meta: "184 KB · 2 hrs ago" },
  { icon: FileText, name: "checkout-spec.pdf", meta: "2.1 MB · Yesterday" },
];

export function FilesScreen({ onNavigate: _onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const [folders] = useState(initialFolders);
  const [recent, setRecent] = useState(initialRecent);
  const pickerRef = useRef<HTMLInputElement>(null);
  const isEmpty = folders.length === 0 && recent.length === 0;

  const chooseFile = () => pickerRef.current?.click();
  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const size = file.size < 1024 * 1024 ? `${Math.max(1, Math.round(file.size / 1024))} KB` : `${(file.size / 1024 / 1024).toFixed(1)} MB`;
    setRecent((current) => [{ icon: FileText, name: file.name, meta: `${size} · Just now` }, ...current]);
    toast.success("File uploaded", { id: "file-uploaded", description: `${file.name} is now available in Files.` });
    event.target.value = "";
  };

  return (
    <div>
      <input ref={pickerRef} type="file" className="hidden" onChange={upload} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="tdts-page-title">Files</h1>
          <p className="mt-1 text-sm text-muted-foreground">Task resources, project folders and recent uploads.</p>
        </div>
        <Button className="bg-brand-primary text-white" onClick={chooseFile}><UploadCloud />Upload file</Button>
      </div>
      {isEmpty ? (
        <div className="mt-5">
          <EmptyState icon={Folder} title="No files yet" description="Keep task resources together by uploading the first project file." actionLabel="Upload your first file" onAction={chooseFile} />
        </div>
      ) : (
        <>
          {folders.length > 0 && (
            <>
              <h2 className="mt-6 text-sm font-semibold">Folders</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {folders.map(({ name, count }) => (
                  <div key={name} className="tdts-card p-4">
                    <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tertiary text-brand-primary"><Folder /></span><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></div>
                    <div className="mt-5 font-medium">{name}</div><div className="text-xs text-muted-foreground">{count}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {recent.length > 0 && (
            <>
              <h2 className="mt-7 text-sm font-semibold">Recent uploads</h2>
              <section className="tdts-card mt-3 overflow-hidden">
                {recent.map(({ icon: Icon, name, meta }) => (
                  <div key={`${name}-${meta}`} className="flex items-center gap-3 border-b border-border-secondary p-4 last:border-0">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-bg-faint"><Icon className="h-4 w-4" /></span>
                    <div className="flex-1"><div className="text-sm font-medium">{name}</div><div className="text-xs text-muted-foreground">{meta}</div></div>
                    <Button variant="ghost" size="sm">Open</Button>
                  </div>
                ))}
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}
