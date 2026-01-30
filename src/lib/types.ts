export type DetectionResult = {
  percentageAI: number;
  percentageHuman: number;
  sentences: {
    text: string;
    isAI: boolean;
    confidence: number;
  }[];
  metadata: {
    fileName: string;
    fileSize: number;
    wordCount: number;
    characterCount: number;
    uploadDate: string;
  };
  sources: {
    origin: string;
    matchCount: number;
    context: string;
    url?: string;
  }[];
};
