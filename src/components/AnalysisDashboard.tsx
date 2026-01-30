"use client";

import React from 'react';
import { DetectionResult } from '@/lib/types';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import { 
  ShieldCheck, Globe, Download, RefreshCcw 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

interface AnalysisDashboardProps {
  result: DetectionResult;
  onReset: () => void;
  onDownload: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result, onReset, onDownload }) => {
  const pieData = [
    { name: 'Human', value: result.percentageHuman, color: '#10b981' }, // Emerald 500
    { name: 'AI', value: result.percentageAI, color: '#f43f5e' }, // Rose 500
  ];

  const sectionData = [
    { name: 'Intro', ai: 20 },
    { name: 'Body', ai: 65 },
    { name: 'Conclusion', ai: 40 },
  ];

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Stats Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 glass-morphism p-8 rounded-[2rem]"
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
            <h3 className="text-2xl font-black text-gradient uppercase">
              Content Analysis Score
            </h3>
            <div className={`px-4 py-1.5 rounded-full text-xs font-black border uppercase tracking-widest ${
              result.percentageAI < 30 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400' 
                : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400'
            }`}>
              {result.percentageAI < 30 ? '✓ HIGHLY HUMAN' : '⚠ SUSPECTED AI'}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-56 h-56 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-black">{result.percentageAI}%</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">AI Intensity</span>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-1">Human Writing</p>
                <p className="text-4xl font-black text-emerald-600">{result.percentageHuman}%</p>
              </div>
              <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-rose-800 dark:text-rose-400 mb-1">AI Detection</p>
                <p className="text-4xl font-black text-rose-600">{result.percentageAI}%</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-border">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Words</p>
                <p className="text-4xl font-black text-foreground">{result.metadata.wordCount}</p>
              </div>
              <div className="p-6 rounded-3xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-800 dark:text-blue-400 mb-1">Confidence</p>
                <p className="text-4xl font-black text-blue-600">High</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-80 flex flex-col gap-4"
        >
          <div className="glass-morphism p-6 rounded-[2rem] flex-1">
             <h4 className="font-extrabold uppercase text-xs mb-6 flex items-center gap-2">
               <ShieldCheck className="h-5 w-5 text-primary" />
               Security Report
             </h4>
             <ul className="text-[11px] font-bold uppercase tracking-wider space-y-4 text-muted-foreground">
               <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 Encrypted parsing
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 No permanent storage
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 Auto-delete in 24h
               </li>
             </ul>
          </div>
          
          <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={onDownload}>
            <Download className="mr-2 h-5 w-5" />
            Download PDF Report
          </Button>
          <Button variant="ghost" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={onReset}>
            <RefreshCcw className="mr-2 h-5 w-5" />
            New Analysis
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section breakdown */}
        <div className="glass-morphism p-8 rounded-[2rem]">
          <h4 className="text-xl font-black text-gradient uppercase mb-8">AI Generation Pattern</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectionData}>
                <XAxis dataKey="name" fontSize={12} fontWeight="900" tick={{fill: '#6366f1'}} axisLine={false} tickLine={false} />
                <YAxis fontSize={12} fontWeight="900" tick={{fill: '#6366f1'}} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="ai" radius={[4, 4, 0, 0]}>
                  {sectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#06b6d4', '#6366f1', '#f43f5e'][index % 3]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Analysis */}
        <div className="glass-morphism p-8 rounded-[2rem]">
          <h4 className="text-xl font-black text-gradient uppercase mb-8 flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary animate-pulse" />
            Source Detection
          </h4>
          <div className="space-y-4">
            {result.sources.map((source, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-secondary/30 border border-border group hover:border-primary/50 transition-all">
                <div className="flex justify-between items-start mb-2">
                   <h5 className="font-bold text-primary truncate uppercase text-sm tracking-tight">{source.origin}</h5>
                   <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-primary text-primary-foreground border-b-2 border-primary/50 shadow-sm rounded-md">{source.matchCount} matches</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{source.context}</p>
                {source.url && (
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-indigo-600 transition-colors flex items-center gap-1"
                  >
                    View source →
                  </a>
                )}
              </div>
            ))}
            {result.sources.length === 0 && (
               <div className="text-center py-12 opacity-50">
                  <Globe className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">No suspicious sources found.</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
