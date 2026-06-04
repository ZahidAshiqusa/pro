import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClockIcon } from '@/components/icons/SvgIcons';
import { format } from 'date-fns';

export default function EntryDetail({ open, onClose, title, data }) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-sm tracking-wider uppercase">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-2">
          {Object.entries(data).filter(([k]) => !['id', 'created_by_id', 'updated_date'].includes(k)).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-xs font-mono text-muted-foreground uppercase">{key.replace(/_/g, ' ')}</span>
              <span className="text-sm font-medium">
                {key === 'created_date' ? format(new Date(value), 'dd MMM yyyy, hh:mm a') :
                  typeof value === 'boolean' ? (value ? 'Yes' : 'No') :
                  String(value || '—')}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
