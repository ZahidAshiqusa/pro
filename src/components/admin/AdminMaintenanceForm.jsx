import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusIcon } from '@/components/icons/SvgIcons';

const categories = ['complaint', 'issue', 'service', 'urgent'];

export default function AdminMaintenanceForm({ onSubmit, editData, onCancelEdit }) {
  const [category, setCategory] = useState('complaint');
  const [form, setForm] = useState({ subject: '', object_detail: '' });

  useEffect(() => {
    if (editData) {
      setCategory(editData.category);
      setForm({ subject: editData.subject || '', object_detail: editData.object_detail || '' });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject.trim()) return;
    onSubmit({ category, ...form, is_solved: editData?.is_solved || false });
    setForm({ subject: '', object_detail: '' });
    setCategory('complaint');
  };

  const catColors = {
    complaint: 'bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200',
    issue: 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200',
    service: 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200',
    urgent: 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!editData && (
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize ${
                category === c ? catColors[c] + ' ring-2 ring-offset-1 ring-primary/30' : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-[10px] font-mono uppercase">Subject *</Label>
          <Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="h-8 text-sm" />
        </div>
        <div>
          <Label className="text-[10px] font-mono uppercase">Object/Detail</Label>
          <Input value={form.object_detail} onChange={e => setForm({ ...form, object_detail: e.target.value })} placeholder="Detail" className="h-8 text-sm" />
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
