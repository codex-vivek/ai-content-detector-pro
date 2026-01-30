# AI Detect - Advanced AI Content Analyzer

A high-performance, production-ready AI detection platform that allows users to upload documents (PDF, DOCX, TXT) and analyze them for AI-generated content.

## Features

- **Multi-format Support**: Upload PDF, DOCX, TXT, PPTX, and HTML files.
- **Accurate AI Detection**: Uses NLP patterns and semantic analysis to identify AI-generated text.
- **Visual Highlighting**: Sentences are colored based on their origin (Red for AI, Green for Human).
- **In-depth Statistics**: Percentage breakdown of AI vs Human content.
- **Source Analysis**: Detects possible origins of the content.
- **Premium UI**: Modern design with Glassmorphism, animations, and dark/light modes.
- **Privacy First**: Files are processed securely and never stored permanently.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Next.js API Routes, Node.js.
- **Libraries**: `pdf-parse`, `mammoth`, `recharts`, `react-dropzone`.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the application**:
   Navigate to [http://localhost:3000](http://localhost:3000).

## Deployment

The platform is ready to be deployed on **Vercel**. Simply connect your GitHub repository and deploy. Ensure all dependencies are properly handled in `package.json`.

## Security & Privacy

- All file processing happens in-memory or in secure temporary storage.
- No permanent database storage for uploaded files.
- Automatic session cleanup.

---

Built with ❤️ by Antigravity AI
