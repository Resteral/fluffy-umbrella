"use client";

import { useState } from "react";
import { MessageSquare, Save, Palette, BookOpen } from "lucide-react";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function ChatbotConfiguration() {
  const [themeColor, setThemeColor] = useState("#3b82f6");
  const [welcomeMessage, setWelcomeMessage] = useState("Hi there! How can I help you today?");
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful customer support agent for this website. Answer questions based on the provided context.");
  
  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen relative">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Configure AI Chatbot</h1>
        <p className="text-muted-foreground text-sm">Customize how your AI assistant looks and behaves on your website.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="space-y-8">
          <section className="bg-secondary/10 border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 font-bold mb-6">
              <Palette className="w-5 h-5 text-primary" />
              Appearance
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Theme Color</label>
              <div className="flex gap-3">
                {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map(color => (
                  <button
                    key={color}
                    onClick={() => setThemeColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-transform ${themeColor === color ? 'scale-110 border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Welcome Message</label>
              <input 
                type="text" 
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
          </section>

          <section className="bg-secondary/10 border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 font-bold mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              Behavior & Knowledge
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-muted-foreground">System Prompt (Instructions)</label>
              <textarea 
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 min-h-[120px] resize-none"
              />
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-sm text-primary">
              <p className="font-semibold mb-1">Knowledge Base Sync</p>
              <p className="opacity-80">Your AI automatically learns from the content on your generated website. Any updates you publish are synced instantly.</p>
            </div>
          </section>

          <button className="w-full bg-primary text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>

        {/* Preview Panel */}
        <div className="bg-secondary/20 rounded-3xl border border-border/50 overflow-hidden relative flex flex-col">
          <div className="bg-secondary/50 px-4 py-3 border-b border-border/50 text-xs font-medium text-muted-foreground text-center">
            Live Preview (Interact with the widget!)
          </div>
          <div className="flex-grow p-8 flex items-center justify-center text-center">
            <div className="opacity-30">
              <MessageSquare className="w-16 h-16 mx-auto mb-4" />
              <p>Your website content will appear here.</p>
              <p className="text-sm mt-2">Click the chat bubble in the bottom right to preview the widget.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Render the actual widget for preview */}
      <ChatbotWidget themeColor={themeColor} />
    </div>
  );
}
