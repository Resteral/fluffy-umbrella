import Link from "next/link";
import { LayoutDashboard, Globe, MessageSquare, Megaphone, Settings } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border/50 bg-secondary/10 flex flex-col">
        <div className="p-6 border-b border-border/50">
          <Link href="/" className="font-bold text-xl tracking-tight text-primary">
            AI SiteBuilder
          </Link>
        </div>
        <nav className="flex-grow p-4 flex flex-col gap-2">
          <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" />
          <NavLink href="/dashboard/generate" icon={<Globe size={18} />} label="Generate Site" />
          <NavLink href="/dashboard/sites" icon={<Globe size={18} />} label="My Sites" />
          <NavLink href="/dashboard/chatbot" icon={<MessageSquare size={18} />} label="AI Chatbot" />
          <NavLink href="/devspace" icon={<Megaphone size={18} />} label="Marketing & Ads" />
          
          <div className="mt-auto">
            <NavLink href="/dashboard/settings" icon={<Settings size={18} />} label="Settings" />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
      {icon}
      {label}
    </Link>
  );
}
