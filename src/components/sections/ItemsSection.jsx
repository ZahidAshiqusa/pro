import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { BoxIcon, ClockIcon } from '@/components/icons/SvgIcons';
import SectionHeader from '@/components/shared/SectionHeader';
import EntryActions from '@/components/shared/EntryActions';
import EntryDetail from '@/components/shared/EntryDetail';

export default function ItemsSection({ items = [], onEdit, onDelete, isAdmin = false }) {
  const [selected, setSelected] = useState(null);

  const statusColors = {
    available: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    in_use: 'bg-amber-100 text-amber-700 border-amber-200',
    out_of_stock: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <Card className="sci-fi-glow sci-fi-border bg-card h-full">
      <CardContent className="p-4">
        <SectionHeader icon={BoxIcon} title="Items Management" count={items.length} />
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {items.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-8 font-mono">No items yet</p>
          )}
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/70 cursor-pointer transition-all group border border-transparent hover:border-primary/20"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm truncate">{item.name}</span>
                  {item.number && <span className="text-xs font-mono text-muted-foreground">#{item.number}</span>}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  {item.model && <span className="text-xs text-muted-foreground">Model: {item.model}</span>}
                  {item.person_name && <span className="text-xs text-muted-foreground">• {item.person_name}</span>}
                  <span className="text-xs font-mono text-muted-foreground">Qty: {item.quantity || 1}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Badge className={`text-[10px] px-1.5 py-0 border ${statusColors[item.status] || statusColors.available}`}>
                    {(item.status || 'available').replace('_', ' ')}
                  </Badge>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <ClockIcon className="w-3 h-3" />
                    {format(new Date(item.created_date), 'dd MMM, hh:mm a')}
                  </span>
                </div>
              </div>
              {isAdmin && <EntryActions onEdit={() => onEdit(item)} onDelete={() => onDelete(item.id)} />}
            </div>
          ))}
        </div>
      </CardContent>
      <EntryDetail open={!!selected} onClose={() => setSelected(null)} title="Item Details" data={selected} />
    </Card>
  );
}
