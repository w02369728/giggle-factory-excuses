
import { Excuse } from "@/types";

// Templates for excuse generation
const excuseTemplates = [
  "I couldn't {action} because my {subject} {verb} {object}.",
  "Sorry, but my {subject} suddenly {verb} with {object}, so I had to {action}.",
  "You won't believe this, but {object} {verb} my {subject} right when I was about to {action}.",
  "I was just about to {action}, then my {subject} unexpectedly {verb} {object}.",
  "I tried to {action}, but {object} {verb} my {subject} at the worst possible moment.",
  "This is embarrassing, but my {subject} {verb} {object} right before I could {action}.",
  "I know this sounds ridiculous, but {object} {verb} my {subject} while I was trying to {action}.",
  "Just as I was about to {action}, would you believe my {subject} {verb} {object}?",
  "I was ready to {action}, but then my {subject} mysteriously {verb} {object}.",
  "I had every intention to {action}, until my {subject} unexpectedly {verb} {object}.",
];

// Components for generating excuses
const subjects = [
  "cat", "dog", "neighbor", "boss", "roommate", "smart home device", "phone", 
  "computer", "car", "bicycle", "plant", "coffee maker", "alarm clock", 
  "toaster", "virtual assistant", "refrigerator", "air conditioner", "GPS",
  "doorbell", "washing machine", "microwave", "umbrella", "watch", "headphones"
];

const verbs = [
  "crashed into", "deleted", "hid", "consumed", "rearranged", "mistook", 
  "fell onto", "argued with", "rebelled against", "conspired with", 
  "developed feelings for", "became jealous of", "formed an alliance with", 
  "declared war on", "confused", "reorganized", "reprogrammed", "redecorated", 
  "befriended", "sabotaged", "redesigned", "philosophized about", "critiqued", 
  "reviewed", "analyzed", "investigated"
];

const objects = [
  "my calendar", "the internet", "my keys", "all my presentations", 
  "my alarm settings", "my project files", "my notes", "my lunch", 
  "my transportation", "my outfit", "my backup plans", "my schedule", 
  "my contacts", "my wallet", "my phone charger", "my glasses", 
  "my motivation", "my work shoes", "my umbrella", "the directions",
  "my meeting link", "the password", "the email thread", "the document"
];

const actions = [
  "attend the meeting", "submit the report", "arrive on time", "respond to emails", 
  "finish the project", "join the call", "complete the assignment", "make the deadline",
  "prepare for the presentation", "show up", "remember the appointment", "send the file",
  "follow up as promised", "stay organized", "maintain my schedule", "keep on track",
  "focus on priorities", "keep my commitment", "be productive", "deliver as expected",
  "be fully prepared", "coordinate with the team", "set up the meeting", "update everyone"
];

// Generate a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate a random excuse based on the situation and reason
export const generateExcuse = (situation: string, reason: string): string => {
  const template = getRandomItem(excuseTemplates);
  
  return template
    .replace("{subject}", getRandomItem(subjects))
    .replace("{verb}", getRandomItem(verbs))
    .replace("{object}", getRandomItem(objects))
    .replace("{action}", getRandomItem(actions));
};

// Create an excuse object with a unique ID
export const createExcuse = (situation: string, reason: string): Excuse => {
  return {
    id: Math.random().toString(36).substring(2, 11),
    situation,
    reason,
    excuse: generateExcuse(situation, reason),
    createdAt: new Date(),
  };
};

// Save favorites to local storage
export const saveFavorite = (excuse: Excuse): void => {
  const favorites = getFavorites();
  favorites.push(excuse);
  localStorage.setItem("favoriteExcuses", JSON.stringify(favorites));
};

// Remove a favorite excuse from local storage
export const removeFavorite = (id: string): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((excuse) => excuse.id !== id);
  localStorage.setItem("favoriteExcuses", JSON.stringify(updatedFavorites));
};

// Get all favorite excuses from local storage
export const getFavorites = (): Excuse[] => {
  const favorites = localStorage.getItem("favoriteExcuses");
  if (!favorites) return [];
  return JSON.parse(favorites).map((excuse: any) => ({
    ...excuse,
    createdAt: new Date(excuse.createdAt),
  }));
};

// Check if an excuse is a favorite
export const isFavorite = (id: string): boolean => {
  const favorites = getFavorites();
  return favorites.some((excuse) => excuse.id === id);
};
