import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import AdminItemForm from '@/components/admin/AdminItemForm';
import AdminWalletForm from '@/components/admin/AdminWalletForm';
import AdminPersonForm from '@/components/admin/AdminPersonForm';
import AdminMaintenanceForm from '@/components/admin/AdminMaintenanceForm';
import AdminSampleForm from '@/components/admin/AdminSampleForm';
import AdminClippingForm from '@/components/admin/AdminClippingForm';

import ItemsSection from '@/components/sections/ItemsSection';
import WalletSection from '@/components/sections/WalletSection';
import PersonSection from '@/components/sections/PersonSection';
import MaintenanceSection from '@/components/sections/MaintenanceSection';
import SamplesSection from '@/components/sections/SamplesSection';
import ClippingSection from '@/components/sections/ClippingSection';

import Footer from '@/components/shared/Footer';
import { ShieldIcon, BoxIcon, WalletIcon, UsersIcon, WrenchIcon, SampleIcon, ScissorsIcon } from '@/components/icons/SvgIcons';

const ADMIN_PASS = 'zaidbwp2024';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [editWallet, setEditWallet] = useState(null);
  const [editMaintenance, setEditMaintenance] = useState(null);
  const [editSample, setEditSample] = useState(null);
  const [editClipping, setEditClipping] = useState(null);

  const qc = useQueryClient();

  const { data: items = [] } = useQuery({ queryKey: ['items'], queryFn: () => base44.entities.Item.list('-created_date') });
  const { data: wallet = [] } = useQuery({ queryKey: ['wallet'], queryFn: () => base44.entities.Wallet.list('-created_date') });
  const { data: attendance = [] } = useQuery({ queryKey: ['attendance'], queryFn: () => base44.entities.PersonAttendance.list('-created_date') });
  const { data: maintenance = [] } = useQuery({ queryKey: ['maintenance'], queryFn: () => base44.entities.Maintenance.list('-created_date') });
  const { data: samples = [] } = useQuery({ queryKey: ['samples'], queryFn: () => base44.entities.Sample.list('-created_date') });
  const { data: clipping = [] } = useQuery({ queryKey: ['clipping'], queryFn: () => base44.entities.Clipping.list('-created_date') });

  const itemCreate = useMutation({ mutationFn: (data) => base44.entities.Item.create(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['items'] }); toast.success('Entry added!'); } });
  const itemUpdate = useMutation({ mutationFn: ({ id, data }) => base44.entities.Item.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['items'] }); toast.success('Updated!'); } });
  const itemDelete = useMutation({ mutationFn: (id) => base44.entities.Item.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['items'] }); toast.success('Deleted!'); } });

  const walletCreate = useMutation({ mutationFn: (data) => base44.entities.Wallet.create(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['wallet'] }); toast.success('Entry added!'); } });
  const walletUpdate = useMutation({ mutationFn: ({ id, data }) => base44.entities.Wallet.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['wallet'] }); toast.success('Updated!'); } });
  const walletDelete = useMutation({ mutationFn: (id) => base44.entities.Wallet.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['wallet'] }); toast.success('Deleted!'); } });

  const attendCreate = useMutation({ mutationFn: (data) => base44.entities.PersonAttendance.create(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['attendance'] }); toast.success('Entry added!'); } });
  const attendDelete = useMutation({ mutationFn: (id) => base44.entities.PersonAttendance.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['attendance'] }); toast.success('Deleted!'); } });

  const maintCreate = useMutation({ mutationFn: (data) => base44.entities.Maintenance.create(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['maintenance'] }); toast.success('Entry added!'); } });
  const maintUpdate = useMutation({ mutationFn: ({ id, data }) => base44.entities.Maintenance.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['maintenance'] }); toast.success('Updated!'); } });
  const maintDelete = useMutation({ mutationFn: (id) => base44.entities.Maintenance.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['maintenance'] }); toast.success('Deleted!'); } });

  const sampleCreate = useMutation({ mutationFn: (data) => base44.entities.Sample.create(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['samples'] }); toast.success('Entry added!'); } });
  const sampleUpdate = useMutation({ mutationFn: ({ id, data }) => base44.entities.Sample.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['samples'] }); toast.success('Updated!'); } });
  const sampleDelete = useMutation({ mutationFn: (id) => base44.entities.Sample.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['samples'] }); toast.success('Deleted!'); } });

  const clipCreate = useMutation({ mutationFn: (data) => base44.entities.Clipping.create(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['clipping'] }); toast.success('Entry added!'); } });
  const clipUpdate = useMutation({ mutationFn: ({ id, data }) => base44.entities.Clipping.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['clipping'] }); toast.success('Updated!'); } });
  const clipDelete = useMutation({ mutationFn: (id) => base44.entities.Clipping.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['clipping'] }); toast.success('Deleted!'); } });

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-sm sci-fi-glow sci-fi-border">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
                <ShieldIcon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="font-heading text-lg font-bold tracking-wider">ADMIN ACCESS</h1>
              <p className="text-xs text-muted-foreground mt-1 font-mono">Enter admin password</p>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (password === ADMIN_PASS) {
                setAuthenticated(true);
              } else {
                toast.error('Invalid password');
              }
            }}>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="mb-3"
              />
              <Button type="submit" className="w-full font-heading tracking-wider">Authenticate</Button>
            </form>
            <Link to="/" className="block text-center mt-4 text-xs text-muted-foreground hover:text-primary transition-colors">
              ← Back to Dashboard
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sections = [
    {
      key: 'items',
      icon: BoxIcon,
      title: 'Items Management',
      form: (
        <AdminItemForm
          editData={editItem}
          onCancelEdit={() => setEditItem(null)}
          onSubmit={(data) => {
            if (editItem) { itemUpdate.mutate({ id: editItem.id, data }); setEditItem(null); }
            else itemCreate.mutate(data);
          }}
        />
      ),
      list: <ItemsSection items={items} isAdmin onEdit={setEditItem} onDelete={(id) => itemDelete.mutate(id)} />
    },
    {
      key: 'wallet',
      icon: WalletIcon,
      title: 'Wallet',
      form: (
        <AdminWalletForm
          editData={editWallet}
          onCancelEdit={() => setEditWallet(null)}
          onSubmit={(data) => {
            if (editWallet) { walletUpdate.mutate({ id: editWallet.id, data }); setEditWallet(null); }
            else walletCreate.mutate(data);
          }}
        />
      ),
      list: <WalletSection entries={wallet} isAdmin onEdit={setEditWallet} onDelete={(id) => walletDelete.mutate(id)} />
    },
    {
      key: 'person',
      icon: UsersIcon,
      title: 'Person Details',
      form: (
        <AdminPersonForm
          entries={attendance}
          onSubmit={(data) => attendCreate.mutate(data)}
        />
      ),
      list: <PersonSection entries={attendance} isAdmin onEdit={() => {}} onDelete={(id) => attendDelete.mutate(id)} />
    },
    {
      key: 'maintenance',
      icon: WrenchIcon,
      title: 'Maintenance',
      form: (
        <AdminMaintenanceForm
          editData={editMaintenance}
          onCancelEdit={() => setEditMaintenance(null)}
          onSubmit={(data) => {
            if (editMaintenance) { maintUpdate.mutate({ id: editMaintenance.id, data }); setEditMaintenance(null); }
            else maintCreate.mutate(data);
          }}
        />
      ),
      list: <MaintenanceSection entries={maintenance} isAdmin onEdit={setEditMaintenance} onDelete={(id) => maintDelete.mutate(id)} onMarkSolved={(entry) => maintUpdate.mutate({ id: entry.id, data: { ...entry, is_solved: true } })} />
    },
    {
      key: 'samples',
      icon: SampleIcon,
      title: 'Sample Management',
      form: (
        <AdminSampleForm
          editData={editSample}
          onCancelEdit={() => setEditSample(null)}
          onSubmit={(data) => {
            if (editSample) { sampleUpdate.mutate({ id: editSample.id, data }); setEditSample(null); }
            else sampleCreate.mutate(data);
          }}
        />
      ),
      list: <SamplesSection entries={samples} isAdmin onEdit={setEditSample} onDelete={(id) => sampleDelete.mutate(id)} />
    },
    {
      key: 'clipping',
      icon: ScissorsIcon,
      title: 'Clipping Details',
      form: (
        <AdminClippingForm
          editData={editClipping}
          onCancelEdit={() => setEditClipping(null)}
          onSubmit={(data) => {
            if (editClipping) { clipUpdate.mutate({ id: editClipping.id, data }); setEditClipping(null); }
            else clipCreate.mutate(data);
          }}
        />
      ),
      list: <ClippingSection entries={clipping} isAdmin onEdit={setEditClipping} onDelete={(id) => clipDelete.mutate(id)} />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <ShieldIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-sm font-bold tracking-wider uppercase glow-text">Admin Panel</h1>
              <p className="text-[10px] text-muted-foreground font-mono">ZAID BWP Stock Manager</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="font-heading text-xs tracking-wider">Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map(section => (
            <div key={section.key} className="space-y-3">
              <Card className="sci-fi-glow sci-fi-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-md bg-primary/10">
                      <section.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-heading text-xs font-semibold tracking-wider uppercase">{section.title}</h3>
                  </div>
                  {section.form}
                </CardContent>
              </Card>
              {section.list}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
