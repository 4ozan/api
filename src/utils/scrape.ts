import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js';
import { MistralClient } from './mistral';

const BLOG_URL = 'https://blog.samaltman.com/';

// Scrape the blog and return its text content
export async function scrapeSamAltmanBlog(): Promise<string> {
  const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
  const scrapeResult = await firecrawl.scrapeUrl(BLOG_URL, { formats: ['markdown', 'html'] }) as ScrapeResponse;

  if (!scrapeResult.success) {
    throw new Error(`Failed to scrape: ${scrapeResult.error}`);
  }

  // Prefer markdown if available, otherwise fall back to html
  return scrapeResult.markdown || scrapeResult.html || '';
}

// Simple chunking: split by paragraphs, limit chunk size
function chunkText(text: string, maxChunkLength = 1000): string[] {
  const paragraphs = text.split(/\n+/).map(p => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = '';
  for (const para of paragraphs) {
    if ((current + para).length > maxChunkLength) {
      if (current) chunks.push(current);
      current = para;
    } else {
      current += (current ? '\n' : '') + para;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

// Chat with the blog: scrape, chunk, send each chunk + prompt to Mistral, return best answer
export async function chatWithSamBlog(userPrompt: string): Promise<string> {
  const blogText = await scrapeSamAltmanBlog();
  const chunks = chunkText(blogText);

  // Ask Mistral for each chunk, collect answers
  const responses: { chunk: string; answer: string }[] = [];
  for (const chunk of chunks) {
    const prompt = `Context from Sam Altman's blog:\n${chunk}\n\nUser question: ${userPrompt}\nAnswer:`;
    const result = await MistralClient.summarizeToSlides(prompt);
    responses.push({ chunk, answer: result.join(' ') });
  }

  // Simple: return the longest answer (or you can enhance with scoring)
  const best = responses.reduce((a, b) => (a.answer.length > b.answer.length ? a : b));
  return best.answer;
}
