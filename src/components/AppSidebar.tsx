import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, ClipboardList, CheckSquare, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';

const AppSidebar = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const menuItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/assessments', icon: ClipboardList, label: 'Assessments' },
    { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <span className="font-semibold text-lg">CyberGuard</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton asChild>
                <NavLink to={item.to} className={({ isActive }) => (isActive ? 'bg-primary/10 text-primary' : '')}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 p-2 border-t">
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="justify-start gap-2">
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
            </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
