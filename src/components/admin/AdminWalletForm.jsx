import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusIcon } from '@/components/icons/SvgIcons';

export default function AdminWalletForm({ onSubmit, editData, onCancelEdit }) {
  const [type, setType] = useState('transfer_in');
  const [form, setForm] = useState({ person_name: '', purpose: '', amount: '' });

  useEffect(() => {
    if (editData) {
      setType(editData.type);
      setForm({
        person_name: editData.person_name || '',
        purpose: editData.purpose || '',
        amount: editData.amount || ''
      });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount) return;
    onSubmit({ type, ...form, amount: Number(form.amount) });
    setForm({ person_name: '', purpose: '', amount: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!editData && (
        <Tabs value={type} onValueChange={setType}>
          <TabsList className="h-8">
            <TabsTrigger value="transfer_in" className="text-xs">Transfer In</TabsTrigger>
            <TabsTrigger value="used" className="text-xs">Money Used</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      <div className="grid grid-cols-2 gap-2">
        {type === 'transfer_in' ? (
          <div>
            <Label className="text-[10px] font-mono uppercase">Person Name</Label>
            <Input value={form.person_name} onChange={e => setForm({ ...form, person_name: e.target.value })} placeholder="Who transferred" className="h-8 text-sm" />
          </div>
        ) : (
          <div>
            <Label className="text-[10px] font-mono uppercase">Used For</Label>
            <Input value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} placeholder="Purpose" className="h-8 text-sm" />
          </div>
        )}
        <div>
          <Label className="text-[10px] font-mono uppercase">Amount (Rs.)</Label>
          <Input type="number" min="0" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0" className="h-8 text-sm" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" size="sm" className="gap-1 font-heading text-xs tracking-wider">
          <PlusIcon className="w-3.5 h-3.5" />{editData ? 'Update' : 'Add Entry'}
        </Button>
        {editData && <Button type="button" variant="ghost" size="sm" onClick={onCancelEdit}>Cancel</Button>}
      </div>
    </form>
  );
}
