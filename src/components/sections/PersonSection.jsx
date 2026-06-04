import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { UsersIcon, ClockIcon } from '@/components/icons/SvgIcons';
import SectionHeader from '@/components/shared/SectionHeader';
import EntryActions from '@/components/shared/EntryActions';
import EntryDetail from '@/components/shared/EntryDetail';

export default function PersonSection({ entries = [], onEdit, onDelete, isAdmin = false }) {
  const [selected, setSelected] = useState(null);

  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const workerStats = useMemo(() => {
    return ['Nadeem', 'Zeeshan'].map(name => {
      const workerEntries = entries.filter(e => e.worker_name === name);
      const daysWorked = new Set();
      let totalHours = 0;

      const dailyPairs = {};
      workerEntries.forEach(e => {
        const d = e.date;
        if (!dailyPairs[d]) dailyPairs[d] = {};
        if (e.action === 'entry') dailyPairs[d].entry = e.time;
        if (e.action === 'exit') dailyPairs[d].exit = e.time;
      });

      Object.entries(dailyPairs).forEach(([date, pair]) => {
        if (pair.entry) daysWorked.add(date);
        if (pair.entry && pair.exit) {
          const [eh, em] = pair.entry.split(':').map(Number);
          const [xh, xm] = pair.exit.split(':').map(Number);
          totalHours += ((xh * 60 + xm) - (eh * 60 + em)) / 60;
        }
      });

      const totalDays = daysInMonth.filter(d => d <= now).length;
      const absent = totalDays - daysWorked.size;

      return { name, totalHours: Math.round(totalHours * 10) / 10, absent: Math.max(0, absent), entries: workerEntries };
    });
  }, [entries, daysInMonth, now]);

  return (
    <Card className="sci-fi-glow sci-fi-border bg-card h-full">
      <CardContent className="p-4">
        <SectionHeader icon={UsersIcon} title="Person Details" count={entries.length} />
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          {workerStats.map(w => (
            <div key={w.name} className="p-3 rounded-lg bg-muted/50 border border-border/50">
              <p className="font-semibold text-sm">{w.name}</p>
              <div className="flex gap-2 mt-1.5">
                <Badge variant="outline" className="text-[10px]">{w.totalHours}h this month</Badge>
                <Badge variant="outline" className="text-[10px] border-red-200 text-red-600">{w.absent} absent</Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
          {entries.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6 font-mono">No attendance records</p>
          )}
          {entries.map(entry => (
            <div
              key={entry.id}
              onClick={() => setSelected(entry)}
              className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all border border-transparent hover:border-primary/20 ${
                entry.action === 'entry' ? 'entry-green' : 'entry-red'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">{entry.worker_name}</span>
                  <Badge className={`text-[10px] px-1.5 py-0 ${
                    entry.action === 'entry' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {entry.action}
                  </Badge>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                  <ClockIcon className="w-3 h-3" />
                  {entry.date} at {entry.time}
                </span>
              </div>
              {isAdmin && <EntryActions onEdit={() => onEdit(entry)} onDelete={() => onDelete(entry.id)} />}
            </div>
          ))}
        </div>
      </CardContent>
      <EntryDetail open={!!selected} onClose={() => setSelected(null)} title="Attendance Detail" data={selected} />
    </Card>
  );
}
