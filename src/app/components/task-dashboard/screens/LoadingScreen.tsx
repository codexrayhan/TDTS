import { useEffect } from "react";
import { motion } from "motion/react";
import { TDTSWordmark } from "../TDTSLogo";

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(() => onComplete?.(), 1200);
    return () => window.clearTimeout(id);
  }, [onComplete]);

  return (
    <div className="grid min-h-screen place-items-center bg-background">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <TDTSWordmark />
        </motion.div>
        <p className="mt-5 text-sm font-medium">Loading your workspace…</p>
        <div className="mx-auto mt-3 h-1.5 w-40 overflow-hidden rounded-full bg-bg-subtle">
          <motion.div
            className="h-full w-1/2 rounded-full bg-brand-primary"
            initial={{ x: "-120%", opacity: 0.45 }}
            animate={{ x: "220%", opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
