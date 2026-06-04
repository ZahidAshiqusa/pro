import React from 'react';
import { Button } from "@/components/ui/button";
import { TrashIcon, EditIcon } from '@/components/icons/SvgIcons';

export default function EntryActions({ onEdit, onDelete }) {
  return (
    <div className="flex gap-1 shrink-0">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-primary"
        onClick={(e) => { e.stopPropagation(); onEdit(); }}
      >
        <EditIcon className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-destructive"
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
      >
        <TrashIcon className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
