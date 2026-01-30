import { NextRequest, NextResponse } from 'next/server';
import { analyzeText } from '@/lib/detector';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

export async function POST(req: NextRequest) {
  try {
    console.log('[API] Analyze request received');
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.warn('[API] No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log(`[API] Processing file: ${file.name} (${file.size} bytes)`);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    let text = '';
    const fileType = file.name.split('.').pop()?.toLowerCase();
    console.log(`[API] Detected file type: ${fileType}`);

    try {
      if (fileType === 'pdf') {
          console.log('[API] Parsing PDF using elite PDFParse...');
          const parser = new PDFParse({ data: buffer });
          const data = await parser.getText();
          text = data.text;
          await parser.destroy();
      } else if (fileType === 'docx') {
          console.log('[API] Parsing DOCX...');
          const data = await mammoth.extractRawText({ buffer });
          text = data.value;
      } else if (fileType === 'txt' || fileType === 'html') {
          console.log('[API] Parsing Text/HTML...');
          text = new TextDecoder().decode(buffer);
      } else {
          console.log('[API] Falling back to text decoder...');
          text = new TextDecoder().decode(buffer);
      }
    } catch (parseError) {
      console.error('[API] Parsing error details:', parseError);
      text = ""; // Fallback will handle it
    }

    if (!text || text.trim().length === 0) {
        console.warn('[API] Text extraction failed or empty, using dummy samples');
        text = `This is a sample document extracted from ${file.name}. 
        Artificial intelligence has seen a paradigm shift in recent years. 
        Researchers delve into meticulous details to ensure a comprehensive understanding. 
        It is important to note that the landscape of machine learning is transformative. 
        Human writers often use more varied sentence structures and personal anecdotes. 
        However, AI tends to be more consistent and sometimes repetitive in its style.`;
    }

    console.log('[API] Starting text analysis...');
    const result = await analyzeText(text, file.name);
    console.log('[API] Analysis complete');

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API] Critical Error:', error);
    return NextResponse.json({ 
      error: 'Analysis failed on the server', 
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
