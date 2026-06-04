import React from 'react';
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

export default function AdminPersonForm({ onSubmit, entries = [] }) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const now = format(new Date(), 'HH:mm');

  const getLastAction = (name) => {
    const todayEntries = entries.filter(e => e.worker_name === name && e.date === today);
    if (todayEntries.length === 0) return null;
    return todayEntries[0].action;
  };

  const handleAction = (name, action) => {
    onSubmit({ worker_name: name, action, date: today, time: now });
  };

  return (
    <div className="space-y-3">
      {['Nadeem', 'Zeeshan'].map(name => {
        const lastAction = getLastAction(name);
        return (
          <div key={name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="font-semibold text-sm">{name}</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={lastAction === 'entry' ? 'secondary' : 'default'}
                className="text-xs h-7 gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => handleAction(name, 'entry')}
                disabled={lastAction === 'entry'}
              >
                Enter
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="text-xs h-7 gap-1"
                onClick={() => handleAction(name, 'exit')}
                disabled={!lastAction || lastAction === 'exit'}
              >
                Exit
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
