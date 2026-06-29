import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentRole, selectPermissions } from '@/store/slices/authSlice';
import { navigationConfig } from '@/config/navigation';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const currentRole = useAppSelector(selectCurrentRole);
  const permissions = useAppSelector(selectPermissions);
  const location = useLocation();

  const hasAccess = (item: any) => {
    if (currentRole === 'SUPER_ADMIN') return true;
    if (item.roles && currentRole && !item.roles.includes(currentRole)) return false;
    if (item.permissions && !item.permissions.some((p: string) => permissions.includes(p))) return false;
    return true;
  };

  return (
    <div className="w-64 h-screen bg-card border-r flex flex-col sticky top-0 animate-in slide-in-from-left-4 duration-500">
      <div className="p-6 flex items-center gap-3 border-b">
        <div className="kavan-sidebar-logo rounded-md">
          <span className="kavan-sidebar-k">K</span>
        </div>
        <span className="kavan-sidebar-name">
          <span className="kavan-sidebar-white">KAV</span><span className="kavan-sidebar-orange">AN</span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        {navigationConfig.map((group, i) => {
          const visibleItems = group.items.filter(hasAccess);
          
          if (visibleItems.length === 0) return null;

          return (
            <div key={i}>
              <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {group.group}
              </h4>
              <div className="space-y-1">
                {visibleItems.map((item, j) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.href);
                  return (
                    <NavLink
                      key={j}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md transition-all text-sm font-medium",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.title}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
