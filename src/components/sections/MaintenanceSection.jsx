import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { WrenchIcon, ClockIcon, CheckIcon } from '@/components/icons/SvgIcons';
import SectionHeader from '@/components/shared/SectionHeader';
import EntryActions from '@/components/shared/EntryActions';
import EntryDetail from '@/components/shared/EntryDetail';
import { Button } from "@/components/ui/button";

export default function MaintenanceSection({ entries = [], onEdit, onDelete, onMarkSolved, isAdmin = false }) {
  const [selected, setSelected] = useState(null);

  const total = entries.length;
  const solved = entries.filter(e => e.is_solved).length;

  const categoryColors = {
    complaint: 'bg-amber-100 text-amber-700 border-amber-200',
    issue: 'bg-red-100 text-red-700 border-red-200',
    service: 'bg-blue-100 text-blue-700 border-blue-200',
    urgent: 'bg-purple-100 text-purple-700 border-purple-200'
  };

  return (
    <Card className="sci-fi-glow sci-fi-border bg-card h-full">
      <CardContent className="p-4">
        <SectionHeader icon={WrenchIcon} title="Maintenance" count={total}>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-[10px] font-mono">{total} total</Badge>
            <Badge variant="outline" className="text-[10px] font-mono text-emerald-600 border-emerald-200">{solved} solved</Badge>
          </div>
        </SectionHeader>

        <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
          {entries.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-8 font-mono">No maintenance records</p>
          )}
          {entries.map(entry => (
            <div
              key={entry.id}
              onClick={() => setSelected(entry)}
              className={`p-3 rounded-lg cursor-pointer transition-all border border-transparent hover:border-primary/20 ${
                entry.is_solved ? 'bg-emerald-50/50' : 'bg-muted/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-[10px] px-1.5 py-0 border ${categoryColors[entry.category]}`}>
                      {entry.category}
                    </Badge>
                    {entry.is_solved && (
                      <Badge className="text-[10px] px-1.5 py-0 bg-emerald-100 text-emerald-700">Solved</Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium mt-1 truncate">{entry.subject}</p>
                  {entry.object_detail && (
                    <p className="text-xs text-muted-foreground truncate">{entry.object_detail}</p>
                  )}
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                    <ClockIcon className="w-3 h-3" />
                    {format(new Date(entry.created_date), 'dd MMM, hh:mm a')}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {isAdmin && !entry.is_solved && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                      onClick={(e) => { e.stopPropagation(); onMarkSolved(entry); }}
                    >
                      <CheckIcon className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  {isAdmin && <EntryActions onEdit={() => onEdit(entry)} onDelete={() => onDelete(entry.id)} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <EntryDetail open={!!selected} onClose={() => setSelected(null)} title="Maintenance Detail" data={selected} />
    </Card>
  );
}
