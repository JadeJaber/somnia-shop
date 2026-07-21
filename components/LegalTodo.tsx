import type { ReactNode } from "react";

export default function LegalTodo({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-moon/20 px-1.5 py-0.5 font-mono text-sm text-moon">
      [À COMPLÉTER: {children}]
    </span>
  );
}
