import React from 'react';
import { PhoneIcon, WhatsAppIcon, ShieldIcon } from '@/components/icons/SvgIcons';

export default function Footer() {
  return (
    <footer className="mt-8 pb-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-primary" />
            <span className="text-xs font-heading tracking-wider text-muted-foreground">
              DEVELOPED & OWNED BY <span className="text-foreground font-semibold">ZAID ASHIQ BWP</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+9232999931199"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              +92 329 9993 1199
            </a>
            <a
              href="https://wa.me/9232999931199"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
