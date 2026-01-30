"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { FileUpload } from '@/components/FileUpload';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { TextViewer } from '@/components/TextViewer';
import { DetectionResult } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Lock, Search, Github, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { generatePDFReport } from '@/lib/report-generator';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error analyzing file:', error);
      alert('Failed to analyze file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  const handleDownload = () => {
    if (analysisResult) {
      generatePDFReport(analysisResult);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl font-sans text-foreground">
      {/* Header / Navbar */}
      <nav className="flex justify-between items-center mb-16 px-8 py-6 sticky top-0 z-50 glass-morphism rounded-3xl mt-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleReset}>
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-black tracking-tight text-gradient uppercase">AI-Powered File Content Analyzer</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-widest">
          <button 
            onClick={() => alert("Sign In feature coming soon to production!")}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-2xl hover:opacity-90 transition-all font-black shadow-lg shadow-primary/20"
          >
            Sign In
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {!analysisResult ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-16"
          >
            {/* Hero Section */}
            <div className="space-y-8 max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-gradient">
                Verify Content Authenticity.
              </h1>
              <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                Enterprise-grade NLP analysis. Detect AI segments, verify authenticity, and generate compliance reports.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                 <div className="flex items-center gap-2 px-6 py-2 border border-black dark:border-white">
                    <Shield className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">99% Accuracy</span>
                 </div>
                 <div className="flex items-center gap-2 px-6 py-2 border border-black dark:border-white">
                    <Lock className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Privacy Guaranteed</span>
                 </div>
                 <div className="flex items-center gap-2 px-6 py-2 border border-black dark:border-white">
                    <Search className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Global Search</span>
                 </div>
              </div>
            </div>

            {/* File Upload Component */}
            <div className="max-w-3xl mx-auto border-2 border-dashed border-black dark:border-white p-2">
              <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
            </div>
            





          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-16"
          >
            <div className="flex items-center justify-between border-b-4 border-black dark:border-white pb-4">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Analysis Complete</h2>
              <button 
                onClick={handleReset}
                className="font-black uppercase text-sm tracking-widest border-b-2 border-black dark:border-white"
              >
                ← New Analysis
              </button>
            </div>
            
            <AnalysisDashboard 
              result={analysisResult} 
              onReset={handleReset} 
              onDownload={handleDownload} 
            />
            
            <TextViewer result={analysisResult} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-32 p-16 bg-slate-900 dark:bg-zinc-950 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-12 font-bold uppercase tracking-widest text-[10px] mb-8 text-white/90">
        <p className="text-white/50 italic">
          Built with precision by AI-Powered File Content Analyzer Team © 2026. Processed with military-grade privacy.
        </p>
        <div className="flex items-center gap-10">
           <a href="#" className="hover:text-primary transition-all flex items-center gap-2">
             <Github className="h-4 w-4 text-white" /> GitHub
           </a>
           <a href="#" className="hover:text-primary transition-all">Privacy Policy</a>
           <a href="#" className="hover:text-primary transition-all">Terms of Service</a>
        </div>
      </footer>
    </main>
  );
}
