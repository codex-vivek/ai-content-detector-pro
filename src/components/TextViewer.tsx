"use client";

import React from 'react';
import { DetectionResult } from '@/lib/types';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface TextViewerProps {
  result: DetectionResult;
}

export const TextViewer: React.FC<TextViewerProps> = ({ result }) => {
  return (
    <div className="mt-12 glass-morphism p-10 rounded-[3rem] border border-border/50 font-sans">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-gradient mb-2">Document Content Viewer</h3>
          <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
            Analysis of:  
            <span className="text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              {result.metadata.fileName}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-10 text-[11px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-rose-500 rounded-md border-b-2 border-rose-700 shadow-lg shadow-rose-500/20" />
            <span className="text-rose-600 dark:text-rose-400">AI Generated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-500 rounded-md border-b-2 border-emerald-700 shadow-lg shadow-emerald-500/20" />
            <span className="text-emerald-600 dark:text-emerald-400">Human Written</span>
          </div>
        </div>
      </div>

      <div className="relative glass-morphism p-2 rounded-[2rem] overflow-hidden border-2 border-primary/10">
        <div className="max-h-[600px] overflow-y-auto p-10 bg-white/50 dark:bg-black/40 text-lg leading-[1.8] font-serif tracking-tight custom-scrollbar">
          {result.sentences.map((s, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.01 }}
              className={`
                inline-block mr-1.5 mb-1.5 transition-all
                ${s.isAI ? 'ai-highlight' : 'human-highlight'}
              `}
              title={s.isAI ? `AI DETECTED • CONFIDENCE: ${(s.confidence * 100).toFixed(1)}%` : 'HUMAN WRITTEN'}
            >
              {s.text}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="mt-10 p-8 rounded-3xl bg-cyan-50/50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-900/30">
        <div className="flex items-start gap-5">
          <div className="bg-cyan-500 p-2 rounded-xl text-white shadow-lg shadow-cyan-500/20">
            <Info className="h-5 w-5" />
          </div>
          <p className="text-[12px] font-bold text-cyan-900 dark:text-cyan-200 uppercase tracking-wide leading-relaxed">
            The highlighted sections indicate sentences with a high probability of being AI-generated based on structural patterns, 
            repetitive vocabulary, and semantic indicators consistent with large language models.
          </p>
        </div>
      </div>
    </div>
  );
};
