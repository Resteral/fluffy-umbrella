"use client";

import { Activity, Globe, MessageSquare, TrendingUp, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardOverview() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground text-sm">Here's what's happening with your websites today.</p>
        </div>
        <Link href="/dashboard/generate" className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create New Site
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Sites" value="2" icon={<Globe className="w-5 h-5 text-blue-500" />} />
        <StatCard title="Total Visitors (30d)" value="12,450" icon={<Activity className="w-5 h-5 text-green-500" />} />
        <StatCard title="AI Chatbot Interactions" value="843" icon={<MessageSquare className="w-5 h-5 text-purple-500" />} />
        <StatCard title="Ad Performance" value="+24%" icon={<TrendingUp className="w-5 h-5 text-orange-500" />} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Active Sites */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Active Sites</h2>
            <Link href="/dashboard/sites" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="grid gap-4">
            <SiteOverviewCard name="My Startup" url="startup.aisite.pro" status="Active" visitors="4.2k" />
            <SiteOverviewCard name="Personal Blog" url="blog.aisite.pro" status="Active" visitors="8.2k" />
          </div>
        </div>

        {/* Marketing / Ad Space Quick Action */}
        <div>
          <h2 className="text-xl font-bold mb-6">Marketing Tools</h2>
          <div className="bg-secondary/20 border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <h3 className="font-bold mb-2 text-lg">Boost Your Traffic</h3>
            <p className="text-sm text-muted-foreground mb-6">Purchase ad space on the DevSpace marketplace to get thousands of new visitors.</p>
            <Link href="/checkout?plan=ad-space" className="w-full block text-center bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              Buy Ad Space
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-secondary/10 border border-border/50 rounded-2xl p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-secondary/50 rounded-lg">{icon}</div>
      </div>
      <div className="text-2xl font-bold mt-auto">{value}</div>
    </motion.div>
  );
}

function SiteOverviewCard({ name, url, status, visitors }: { name: string, url: string, status: string, visitors: string }) {
  return (
    <div className="flex items-center justify-between p-5 border border-border/50 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center text-primary font-bold">
          {name.substring(0, 1)}
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <a href={`https://${url}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{url}</a>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="text-sm font-bold">{visitors}</div>
          <div className="text-xs text-muted-foreground">Visitors</div>
        </div>
        <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold border border-green-500/20">
          {status}
        </div>
      </div>
    </div>
  );
}
