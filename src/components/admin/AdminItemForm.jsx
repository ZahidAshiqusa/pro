import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PlusIcon } from '@/components/icons/SvgIcons';

export default function AdminItemForm({ onSubmit, editData, onCancelEdit }) {
  const [form, setForm] = useState({ name: '', number: '', quantity: 1, model: '', person_name: '', status: 'available' });

  useEffect(() => {
    if (editData) setForm({
      name: editData.name || '',
      number: editData.number || '',
      quantity: editData.quantity || 1,
      model: editData.model || '',
      person_name: editData.person_name || '',
      status: editData.status || 'available'
    });
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit(form);
    setForm({ name: '', number: '', quantity: 1, model: '', person_name: '', status: 'available' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-[10px] font-mono uppercase">Item Name *</Label>
          <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Item name" className="h-8 text-sm" />
        </div>
        <div>
          <Label className="text-[10px] font-mono uppercase">Serial #</Label>
          <Input value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} placeholder="Optional" className="h-8 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label className="text-[10px] font-mono uppercase">Quantity</Label>
          <Input type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} className="h-8 text-sm" />
        </div>
        <div>
          <Label className="text-[10px] font-mono uppercase">Model</Label>
          <Input value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} placeholder="Optional" className="h-8 text-sm" />
        </div>
        <div>
          <Label className="text-[10px] font-mono uppercase">Person</Label>
          <Input value={form.person_name} onChange={e => setForm({ ...form, person_name: e.target.value })} placeholder="Optional" className="h-8 text-sm" />
        </div>
      </div>
      <div className="flex gap-2">
        <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
          <SelectTrigger className="h-8 text-sm w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="in_use">In Use</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" size="sm" className="gap-1 font-heading text-xs tracking-wider">
          <PlusIcon className="w-3.5 h-3.5" />{editData ? 'Update' : 'Add Item'}
        </Button>
        {editData && <Button type="button" variant="ghost" size="sm" onClick={onCancelEdit}>Cancel</Button>}
      </div>
    </form>
  );
}
