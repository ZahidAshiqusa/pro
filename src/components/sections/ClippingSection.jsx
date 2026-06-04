import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';
import { ScissorsIcon, ClockIcon, ArrowInIcon, ArrowOutIcon } from '@/components/icons/SvgIcons';
import SectionHeader from '@/components/shared/SectionHeader';
import EntryActions from '@/components/shared/EntryActions';
import EntryDetail from '@/components/shared/EntryDetail';

export default function ClippingSection({ entries = [], onEdit, onDelete, isAdmin = false }) {
  const [selected, setSelected] = useState(null);

  const clippedIn = entries.filter(e => e.type === 'in');
  const clippedOut = entries.filter(e => e.type === 'out');

  const renderEntry = (entry) => (
    <div
      key={entry.id}
      onClick={() => setSelected(entry)}
      className={`p-2.5 rounded-lg cursor-pointer transition-all border border-transparent hover:border-primary/20 ${
        entry.type === 'in' ? 'entry-green' : 'entry-red'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {entry.type === 'in' ? (
              <ArrowInIcon className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <ArrowOutIcon className="w-3.5 h-3.5 text-red-500" />
            )}
            <span className="text-xs font-medium truncate">{entry.clipper_name}</span>
          </div>
          {entry.size && <span className="text-xs text-muted-foreground ml-5">Size: {entry.size}</span>}
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1 ml-5">
            <ClockIcon className="w-3 h-3" />
            {format(new Date(entry.created_date), 'dd MMM, hh:mm a')}
          </span>
        </div>
        {isAdmin && <EntryActions onEdit={() => onEdit(entry)} onDelete={() => onDelete(entry.id)} />}
      </div>
    </div>
  );

  return (
    <Card className="sci-fi-glow sci-fi-border bg-card h-full">
      <CardContent className="p-4">
        <SectionHeader icon={ScissorsIcon} title="Clipping Details" count={entries.length} />

        <div className="grid grid-cols-2 gap-3 max-h-[380px] overflow-y-auto">
          <div>
            <p className="text-[10px] font-heading tracking-wider text-red-500 mb-2 uppercase">Out for Clipping</p>
            <div className="space-y-1.5">
              {clippedOut.length === 0 && <p className="text-xs text-muted-foreground text-center py-4 font-mono">No out entries</p>}
              {clippedOut.map(renderEntry)}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-heading tracking-wider text-emerald-600 mb-2 uppercase">Clipped In</p>
            <div className="space-y-1.5">
              {clippedIn.length === 0 && <p className="text-xs text-muted-foreground text-center py-4 font-mono">No in entries</p>}
              {clippedIn.map(renderEntry)}
            </div>
          </div>
        </div>
      </CardContent>
      <EntryDetail open={!!selected} onClose={() => setSelected(null)} title="Clipping Detail" data={selected} />
    </Card>
  );
}
