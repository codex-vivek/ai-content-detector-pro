"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit.");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/html': ['.html'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    multiple: false,
    disabled: isLoading
  });

  const handleAnalyze = () => {
    if (file) {
      onFileSelect(file);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!file ? (
        <div
          {...getRootProps()}
          className={`
            relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
            p-12 text-center glass-morphism
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">Upload your document</h3>
            <p className="text-xl font-black uppercase tracking-tighter text-gradient mb-4">
              Drag & drop or click to browse
            </p>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 flex gap-3">
              <span>PDF</span> <span className="text-muted-foreground/30">•</span> 
              <span>DOCX</span> <span className="text-muted-foreground/30">•</span> 
              <span>TXT</span> <span className="text-muted-foreground/30">•</span> 
              <span>PPTX</span> <span className="text-muted-foreground/30">•</span> 
              <span>HTML</span>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-morphism rounded-2xl p-6 border-primary/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-black text-xl truncate max-w-[400px] text-foreground group-hover:text-primary transition-colors">
                  {file.name}
                </p>
                <p className="text-xs font-bold text-primary/80 uppercase tracking-widest">
                  Ready for Analysis • {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            {!isLoading && (
              <button onClick={removeFile} className="text-muted-foreground hover:text-destructive transition-colors">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <Button 
            className="w-full h-12 text-lg" 
            onClick={handleAnalyze} 
            isLoading={isLoading}
          >
            {isLoading ? "Analyzing..." : "Analyze Content"}
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 rounded-lg bg-destructive/10 text-destructive flex items-center gap-3 border border-destructive/20"
          >
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
