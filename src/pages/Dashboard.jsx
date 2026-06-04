import React, { useState, useEffect, useCallback, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ItemsSection from '@/components/sections/ItemsSection';
import WalletSection from '@/components/sections/WalletSection';
import PersonSection from '@/components/sections/PersonSection';
import MaintenanceSection from '@/components/sections/MaintenanceSection';
import SamplesSection from '@/components/sections/SamplesSection';
import ClippingSection from '@/components/sections/ClippingSection';
import NotificationBell from '@/components/shared/NotificationBell';
import Footer from '@/components/shared/Footer';
import { ShieldIcon } from '@/components/icons/SvgIcons';

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function RevealCard({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  );
}

export default function Dashboard() {
  const [notifications, setNotifications] = useState([]);

  const { data: items = [] } = useQuery({
    queryKey: ['items'],
    queryFn: () => base44.entities.Item.list('-created_date'),
  });
  const { data: wallet = [] } = useQuery({
    queryKey: ['wallet'],
    queryFn: () => base44.entities.Wallet.list('-created_date'),
  });
  const { data: attendance = [] } = useQuery({
    queryKey: ['attendance'],
    queryFn: () => base44.entities.PersonAttendance.list('-created_date'),
  });
  const { data: maintenance = [] } = useQuery({
    queryKey: ['maintenance'],
    queryFn: () => base44.entities.Maintenance.list('-created_date'),
  });
  const { data: samples = [] } = useQuery({
    queryKey: ['samples'],
    queryFn: () => base44.entities.Sample.list('-created_date'),
  });
  const { data: clipping = [] } = useQuery({
    queryKey: ['clipping'],
    queryFn: () => base44.entities.Clipping.list('-created_date'),
  });

  const addNotification = useCallback((message) => {
    setNotifications(prev => [{ message, time: new Date().toISOString() }, ...prev]);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('ZAID BWP Stock Manager', { body: message });
    }
  }, []);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const subs = [];
    const entityMap = { Item: 'Item', Wallet: 'Wallet', PersonAttendance: 'Attendance', Maintenance: 'Maintenance', Sample: 'Sample', Clipping: 'Clipping' };
    Object.entries(entityMap).forEach(([entity, label]) => {
      const unsub = base44.entities[entity].subscribe((event) => {
        if (event.type === 'create') {
          addNotification(`New ${label} entry added`);
        }
      });
      subs.push(unsub);
    });
    return () => subs.forEach(fn => fn());
  }, [addNotification]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">Z</span>
            </div>
            <div>
              <h1 className="font-heading text-sm font-bold tracking-wider uppercase glow-text">
                ZAID BWP Stock Manager
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono">Unit Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell
              notifications={notifications}
              onClear={() => setNotifications([])}
            />
            <Link to="/admin">
              <Button variant="outline" size="sm" className="gap-1.5 font-heading text-xs tracking-wider">
                <ShieldIcon className="w-4 h-4" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RevealCard delay={0}><ItemsSection items={items} /></RevealCard>
          <RevealCard delay={80}><WalletSection entries={wallet} /></RevealCard>
          <RevealCard delay={160}><PersonSection entries={attendance} /></RevealCard>
          <RevealCard delay={240}><MaintenanceSection entries={maintenance} /></RevealCard>
          <RevealCard delay={320}><SamplesSection entries={samples} /></RevealCard>
          <RevealCard delay={400}><ClippingSection entries={clipping} /></RevealCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
