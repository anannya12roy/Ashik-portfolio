import fs from 'fs';
import path from 'path';
import { initialPortfolioData } from './portfolioData';

const dataDir = path.join(process.cwd(), 'data');
const storeFilePath = path.join(dataDir, 'store.json');
const messagesFilePath = path.join(dataDir, 'messages.json');

function ensureDataDirectory() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export function getPortfolioData() {
  ensureDataDirectory();
  try {
    if (fs.existsSync(storeFilePath)) {
      const fileContent = fs.readFileSync(storeFilePath, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error reading store.json, falling back to initial data:', error);
  }

  // Write default data if not exists
  savePortfolioData(initialPortfolioData);
  return initialPortfolioData;
}

export function savePortfolioData(newData) {
  ensureDataDirectory();
  try {
    fs.writeFileSync(storeFilePath, JSON.stringify(newData, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing store.json:', error);
    return false;
  }
}

export function getContactMessages() {
  ensureDataDirectory();
  try {
    if (fs.existsSync(messagesFilePath)) {
      const fileContent = fs.readFileSync(messagesFilePath, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error reading messages.json:', error);
  }
  return [];
}

export function addContactMessage(message) {
  ensureDataDirectory();
  const currentMessages = getContactMessages();
  const newMessage = {
    id: 'msg-' + Date.now(),
    createdAt: new Date().toISOString(),
    ...message,
  };
  const updatedMessages = [newMessage, ...currentMessages];

  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(updatedMessages, null, 2), 'utf8');
    return newMessage;
  } catch (error) {
    console.error('Error saving contact message:', error);
    return null;
  }
}
