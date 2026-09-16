import fs from 'fs';
import path from 'path';
import { initialPortfolioData } from './portfolioData';

const dataDir = path.join(process.cwd(), 'data');
const storeFilePath = path.join(dataDir, 'store.json');
const messagesFilePath = path.join(dataDir, 'messages.json');

// Global in-memory cache for serverless environments (Netlify / Vercel)
let inMemoryPortfolioData = null;
let inMemoryMessages = null;

function ensureDataDirectory() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  } catch (err) {
    // Read-only filesystem on Netlify/Vercel
  }
}

export function getPortfolioData() {
  if (inMemoryPortfolioData) {
    return inMemoryPortfolioData;
  }

  ensureDataDirectory();
  try {
    if (fs.existsSync(storeFilePath)) {
      const fileContent = fs.readFileSync(storeFilePath, 'utf8');
      inMemoryPortfolioData = JSON.parse(fileContent);
      return inMemoryPortfolioData;
    }
  } catch (error) {
    console.log('Using initial portfolio data fallback:', error?.message);
  }

  inMemoryPortfolioData = initialPortfolioData;
  return initialPortfolioData;
}

export function savePortfolioData(newData) {
  inMemoryPortfolioData = newData;

  ensureDataDirectory();
  try {
    fs.writeFileSync(storeFilePath, JSON.stringify(newData, null, 2), 'utf8');
  } catch (error) {
    // Serverless read-only file system (Netlify / Vercel), in-memory update succeeded
    console.log('Serverless mode: Portfolio data updated in memory.');
  }
  return true;
}

export function getContactMessages() {
  if (inMemoryMessages) {
    return inMemoryMessages;
  }

  ensureDataDirectory();
  try {
    if (fs.existsSync(messagesFilePath)) {
      const fileContent = fs.readFileSync(messagesFilePath, 'utf8');
      inMemoryMessages = JSON.parse(fileContent);
      return inMemoryMessages;
    }
  } catch (error) {
    console.log('Reading messages fallback:', error?.message);
  }

  inMemoryMessages = [];
  return [];
}

export function addContactMessage(message) {
  const currentMessages = getContactMessages();
  const newMessage = {
    id: 'msg-' + Date.now(),
    createdAt: new Date().toISOString(),
    ...message,
  };

  const updatedMessages = [newMessage, ...currentMessages];
  inMemoryMessages = updatedMessages;

  ensureDataDirectory();
  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(updatedMessages, null, 2), 'utf8');
  } catch (error) {
    console.log('Serverless mode: Contact message stored in memory.');
  }

  return newMessage;
}
