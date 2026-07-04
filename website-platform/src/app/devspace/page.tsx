"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Star, Search, PlusCircle, Megaphone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const showcaseSites = [
  { id: 1, name: "CryptoTracker AI", url: "cryptotracker.ai", category: "Finance", upvotes: 342, featured: true, image: "bg-gradient-to-br from-purple-500 to-indigo-600" },
  { id: 2, name: "Vegan Recipes", url: "vegan-eats.com", category: "Food", upvotes: 215, featured: false, image: "bg-gradient-to-br from-green-400 to-emerald-600" },
  { id: 3, name: "DevPortfolios", url: "devport.io", category: "Tech", upvotes: 189, featured: true, image: "bg-gradient-to-br from-blue-500 to-cyan-500" },
  { id: 4, name: "Fitness Journey", url: "fit-journey.app", category: "Health", upvotes: 120, featured: false, image: "bg-gradient-to-br from-rose-400 to-red-500" },
];

export default function DevSpace() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="border-b border-border/50 bg-secondary/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="text-primary">DevSpace</span> Marketplace
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              My Dashboard
            </Link>
            <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              Advertise
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Hero Section for DevSpace */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Discover & Market Your AI Sites
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Explore top websites built on AI SiteBuilder. Want more traffic? Purchase ad space to feature your site at the top of the marketplace.
            </p>
            <div className="flex gap-4">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search websites, categories..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Submit Site
              </button>
            </div>
          </div>
          
          {/* Ad Space CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full md:w-80 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 p-6 shadow-2xl shadow-primary/10"
          >
            <div className="flex items-center gap-2 mb-4 text-primary font-semibold">
              <TrendingUp className="w-5 h-5" />
              Boost Your Traffic
            </div>
            <h3 className="text-xl font-bold mb-2">Buy Ad Space</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Get featured on the homepage and at the top of DevSpace. Starting at just $49/week.
            </p>
            <Link href="/checkout?plan=ad-space" className="block text-center w-full py-2 bg-primary/20 hover:bg-primary text-primary hover:text-white rounded-lg font-medium transition-colors">
              View Ad Packages
            </Link>
          </motion.div>
        </div>

        {/* Featured Sites (Ads) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <h2 className="text-2xl font-bold">Featured / Sponsored</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseSites.filter(s => s.featured).map((site) => (
              <SiteCard key={site.id} site={site} sponsored />
            ))}
            
            {/* Empty Ad Slot */}
            <div className="rounded-2xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center p-8 text-center text-muted-foreground hover:bg-secondary/30 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer min-h-[300px]">
              <Megaphone className="w-8 h-8 mb-3 opacity-50" />
              <span className="font-medium">Advertise Here</span>
              <span className="text-xs mt-1">Reach 10,000+ daily visitors</span>
            </div>
          </div>
        </div>

        {/* Trending / All Sites */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Trending Sites</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseSites.filter(s => !s.featured).map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function SiteCard({ site, sponsored = false }: { site: any, sponsored?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`group rounded-2xl overflow-hidden border bg-secondary/20 flex flex-col ${sponsored ? 'border-primary/30' : 'border-border'}`}
    >
      <div className={`h-40 w-full ${site.image} relative`}>
        {sponsored && (
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md font-medium border border-white/10">
            Sponsored
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{site.name}</h3>
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
            <ArrowUpRight className="w-3 h-3" />
            {site.upvotes}
          </div>
        </div>
        <a href={`https://${site.url}`} className="text-sm text-primary hover:underline mb-4 block truncate">
          {site.url}
        </a>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
            {site.category}
          </span>
          <button className="text-xs font-medium bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
            Visit Site
          </button>
        </div>
      </div>
    </motion.div>
  );
}
