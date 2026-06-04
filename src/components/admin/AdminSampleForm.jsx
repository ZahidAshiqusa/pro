import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from '@/components/icons/SvgIcons';

export default function AdminSampleForm({ onSubmit, editData, onCancelEdit }) {
  const [type, setType] = useState('in');
  const [form, setForm] = useState({ person_name: '', pieces: '', program: '' });

  useEffect(() => {
    if (editData) {
      setType(editData.type);
      setForm({ person_name: editData.person_name || '', pieces: editData.pieces || '', program: editData.program || '' });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.person_name.trim()) return;
    onSubmit({
      type,
      person_name: form.person_name,
      ...(form.pieces ? { pieces: Number(form.pieces) } : {}),
      ...(form.program.trim() ? { program: form.program.trim() } : {})
    });
    setForm({ person_name: '', pieces: '', program: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!editData && (
        <Tabs value={type} onValueChange={setType}>
          <TabsList className="h-8">
            <TabsTrigger value="in" className="text-xs">Sample In</TabsTrigger>
            <TabsTrigger value="out" className="text-xs">Sample Out</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-[10px] font-mono uppercase">Person Name *</Label>
          <Input value={form.person_name} onChange={e => setForm({ ...form, person_name: e.target.value })} placeholder="Person name" className="h-8 text-sm" />
        </div>
        <div>
          <Label className="text-[10px] font-mono uppercase">Pieces</Label>
          <Input type="number" min="0" value={form.pieces} onChange={e => setForm({ ...form, pieces: e.target.value })} placeholder="Optional" className="h-8 text-sm" />
        </div>
      </div>
      <div>
        <Label className="text-[10px] font-mono uppercase">Program (Optional)</Label>
        <Input value={form.program} onChange={e => setForm({ ...form, program: e.target.value })} placeholder="Program name" className="h-8 text-sm" />
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
