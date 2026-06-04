import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';
import { WalletIcon, ClockIcon, ArrowInIcon, ArrowOutIcon } from '@/components/icons/SvgIcons';
import SectionHeader from '@/components/shared/SectionHeader';
import EntryActions from '@/components/shared/EntryActions';
import EntryDetail from '@/components/shared/EntryDetail';

export default function WalletSection({ entries = [], onEdit, onDelete, isAdmin = false }) {
  const [selected, setSelected] = useState(null);

  const transfers = entries.filter(e => e.type === 'transfer_in');
  const used = entries.filter(e => e.type === 'used');
  const totalIn = transfers.reduce((s, e) => s + (e.amount || 0), 0);
  const totalOut = used.reduce((s, e) => s + (e.amount || 0), 0);
  const balance = totalIn - totalOut;

  const renderEntry = (entry) => (
    <div
      key={entry.id}
      onClick={() => setSelected(entry)}
      className={`p-2.5 rounded-lg cursor-pointer transition-all border border-transparent hover:border-primary/20 ${
        entry.type === 'transfer_in' ? 'entry-green' : 'entry-red'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {entry.type === 'transfer_in' ? (
              <ArrowInIcon className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <ArrowOutIcon className="w-3.5 h-3.5 text-red-500" />
            )}
            <span className="text-xs font-medium truncate">
              {entry.type === 'transfer_in' ? entry.person_name : entry.purpose}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 ml-5">
            <span className={`text-sm font-semibold font-mono ${entry.type === 'transfer_in' ? 'text-emerald-600' : 'text-red-500'}`}>
              {entry.type === 'transfer_in' ? '+' : '-'}Rs.{entry.amount?.toLocaleString()}
            </span>
          </div>
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
        <SectionHeader icon={WalletIcon} title="Wallet" count={entries.length}>
          <div className={`px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${
            balance >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}>
            {balance >= 0 ? '+' : ''}Rs.{balance.toLocaleString()}
          </div>
        </SectionHeader>

        <div className="grid grid-cols-2 gap-3 max-h-[380px] overflow-y-auto">
          <div>
            <p className="text-[10px] font-heading tracking-wider text-emerald-600 mb-2 uppercase">Transfers In</p>
            <div className="space-y-1.5">
              {transfers.length === 0 && <p className="text-xs text-muted-foreground text-center py-4 font-mono">No transfers</p>}
              {transfers.map(renderEntry)}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-heading tracking-wider text-red-500 mb-2 uppercase">Money Used</p>
            <div className="space-y-1.5">
              {used.length === 0 && <p className="text-xs text-muted-foreground text-center py-4 font-mono">No expenses</p>}
              {used.map(renderEntry)}
            </div>
          </div>
        </div>
      </CardContent>
      <EntryDetail open={!!selected} onClose={() => setSelected(null)} title="Wallet Entry" data={selected} />
    </Card>
  );
}
