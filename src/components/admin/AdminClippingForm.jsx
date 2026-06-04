import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from '@/components/icons/SvgIcons';

export default function AdminClippingForm({ onSubmit, editData, onCancelEdit }) {
  const [type, setType] = useState('out');
  const [form, setForm] = useState({ clipper_name: '', size: '' });

  useEffect(() => {
    if (editData) {
      setType(editData.type);
      setForm({ clipper_name: editData.clipper_name || '', size: editData.size || '' });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.clipper_name.trim()) return;
    onSubmit({ type, ...form });
    setForm({ clipper_name: '', size: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!editData && (
        <Tabs value={type} onValueChange={setType}>
          <TabsList className="h-8">
            <TabsTrigger value="out" className="text-xs">Out for Clipping</TabsTrigger>
            <TabsTrigger value="in" className="text-xs">Clipped In</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-[10px] font-mono uppercase">Clipper Name *</Label>
          <Input value={form.clipper_name} onChange={e => setForm({ ...form, clipper_name: e.target.value })} placeholder="Clipper name" className="h-8 text-sm" />
        </div>
        <div>
          <Label className="text-[10px] font-mono uppercase">Size</Label>
          <Input value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} placeholder="Size" className="h-8 text-sm" />
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
