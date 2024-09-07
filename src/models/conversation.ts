export type Message = {
  ownerId: string; 
  message: string;
  read: string[]; // Array of MongoDB User ids as strings
  timestamp: number; 
};

// Type representing a Conversation
export type Conversation = {
  id: string;
  messages: Message[];
};