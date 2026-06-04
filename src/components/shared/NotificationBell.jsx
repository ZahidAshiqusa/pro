import React, { useState, useEffect } from 'react';
import { BellIcon } from '@/components/icons/SvgIcons';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

export default function NotificationBell({ notifications, onClear }) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.length);
  }, [notifications]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" onClick={() => setUnreadCount(0)}>
          <BellIcon className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-80 overflow-y-auto p-0" align="end">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <span className="font-heading text-xs tracking-wider uppercase">Notifications</span>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-6" onClick={onClear}>Clear all</Button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
        ) : (
          <div className="divide-y divide-border/50">
            {notifications.slice(0, 20).map((n, i) => (
              <div key={i} className="p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  <p className="text-xs font-medium">{n.message}</p>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 ml-4">
                  {format(new Date(n.time), 'dd MMM, hh:mm a')}
                </p>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
