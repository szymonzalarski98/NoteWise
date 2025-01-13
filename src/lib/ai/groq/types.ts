export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  id: string;
  model: string;
  created: number;
  choices: {
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }[];
}

export interface AudioTranscriptionResponse {
  id: string;
  text: string;
  model: string;
  created: number;
}

export interface GroqError {
  message: string;
  type: string;
  code: string;
}
