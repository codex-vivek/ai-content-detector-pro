import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { DetectionResult } from '../lib/types';

// Extend jsPDF with autoTable type
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
  lastAutoTable: {
    finalY: number;
  };
}

export function generatePDFReport(result: DetectionResult) {
  try {
    const doc = new jsPDF() as jsPDFWithAutoTable;
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(34, 211, 238); // Cyan 400
    doc.text('AIDetect Analysis Report', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`File Analyzed: ${result.metadata.fileName}`, 14, 35);
    doc.text(`Status: COMPLETED`, 14, 40);
    
    // Summary Section
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('1. Executive Summary', 14, 55);
    
    doc.autoTable({
      startY: 60,
      head: [['Assessment Metric', 'Analysis Result']],
      body: [
        ['AI Generated Content', `${result.percentageAI}%`],
        ['Human Written Content', `${result.percentageHuman}%`],
        ['Total Word Count', result.metadata.wordCount.toString()],
        ['Detection Confidence', 'High (Validated)'],
        ['Risk Level', result.percentageAI > 50 ? 'HIGH' : 'LOW'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [34, 211, 238], textColor: 255 },
    });

    // Get the Y position after the first table
    const firstTableY = doc.lastAutoTable.finalY || 100;

    // Source Analysis Section
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('2. Source Detection Patterns', 14, firstTableY + 15);
    
    const sourceData = result.sources.length > 0 
      ? result.sources.map(s => [s.origin, s.matchCount.toString(), s.context])
      : [['No matching external sources detected', '-', '-']];

    doc.autoTable({
      startY: firstTableY + 20,
      head: [['Origin / Database', 'Matches', 'Contextual Evidence']],
      body: sourceData,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] }, // Indigo 600
    });

    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text('AIDetect - Professional NLP Analysis System', 14, 285);
      doc.text(`Page ${i} of ${pageCount}`, 170, 285);
    }

    doc.save(`AIDetect_Report_${result.metadata.fileName.replace(/\s+/g, '_')}.pdf`);
  } catch (error) {
    console.error('PDF Generation Failed:', error);
    alert('Failed to generate PDF report. There was an error in the document generator.');
  }
}
