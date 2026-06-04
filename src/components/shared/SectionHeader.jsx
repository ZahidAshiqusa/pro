import React from 'react';

export default function SectionHeader({ icon: Icon, title, count, children }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-heading font-semibold tracking-wide uppercase">{title}</h2>
          {count !== undefined && (
            <span className="text-xs text-muted-foreground font-mono">{count} records</span>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
