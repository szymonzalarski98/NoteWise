import { Env } from '@env';
import axios from 'axios';

export const groqClient = axios.create({
  baseURL: Env.GROQ_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Env.GROQ_API_KEY}`,
  },
});
