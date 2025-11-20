/**
 * TIPOS PRINCIPAIS DO NAUAN
 * Definições TypeScript completas
 */

// ========================================
// ENUMS
// ========================================

// Estado emocional do Nauan
export enum NauanMood {
  IDLE = 'idle',
  THINKING = 'thinking',
  SPEAKING = 'speaking',
  EXCITED = 'excited',
  ATTENTIVE = 'attentive',
  NOSTALGIC = 'nostalgic',
}

// Modo de personalidade
export enum PersonalityMode {
  DEFAULT = 'default',      // Nauan clássico
  DEEP = 'deep',           // Filósofo
  MOTIVATOR = 'motivator', // Coach
  NOSTALGIC = 'nostalgic', // Sentimental
  CONSULTANT = 'consultant', // Prático
}

// Tipo de mensagem
export enum MessageType {
  TEXT = 'text',
  VOICE = 'voice',
  SYSTEM = 'system',
  MEMORY = 'memory',
}

// Sentimento detectado
export enum UserSentiment {
  HAPPY = 'happy',
  SAD = 'sad',
  STRESSED = 'stressed',
  REFLECTIVE = 'reflective',
  EXCITED = 'excited',
  NEUTRAL = 'neutral',
}

// ========================================
// INTERFACES PRINCIPAIS
// ========================================

// Estrutura de mensagem
export interface Message {
  id: string;
  role: 'user' | 'nauan';
  content: string;
  type: MessageType;
  timestamp: Date;
  sentiment?: UserSentiment;
  audioUrl?: string;
  metadata?: {
    wordCount?: number;
    responseTime?: number;
    mood?: NauanMood;
  };
}

// Memória compartilhada
export interface SharedMemory {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  tags: string[];
  sentiment: UserSentiment;
  imageUrl?: string;
  isFavorite: boolean;
}

// Conquista
export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: Date;
  icon: string;
  category: 'conversation' | 'milestone' | 'emotional' | 'special';
}

// Configuração de personalidade
export interface PersonalityConfig {
  mode: PersonalityMode;
  humorLevel: number; // 0-10
  proactivityLevel: number; // 0-10
  formalityLevel: number; // 0-10 (sempre baixo para Nauan)
  emotionalDepth: number; // 0-10
}

// Contexto de conversa
export interface ConversationContext {
  recentMessages: Message[];
  currentSentiment: UserSentiment;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek: string;
  relationshipLevel: number; // 1-5
  lastInteraction?: Date;
  conversationCount: number;
  totalMessages: number;
}

// Prompt dinâmico
export interface DynamicPrompt {
  systemPrompt: string;
  personalityInstructions: string;
  contextualInfo: string;
  recentHistory: string;
  currentMood: NauanMood;
}

// Estado do círculo (animação)
export interface CircleState {
  mood: NauanMood;
  colors: string[];
  isAnimating: boolean;
  intensity: number; // 0-1
}

// Estatísticas
export interface Statistics {
  daysTogther: number;
  totalMessages: number;
  totalConversations: number;
  averageResponseTime: number;
  longestConversation: number;
  favoriteTopics: string[];
  emotionalJourney: {
    date: Date;
    sentiment: UserSentiment;
  }[];
}

// Configurações do usuário
export interface UserSettings {
  voiceEnabled: boolean;
  autoPlay: boolean;
  hapticFeedback: boolean;
  proactiveMessages: boolean;
  notificationsEnabled: boolean;
  theme: 'dark' | 'darker'; // Sempre escuro, mas com variações
  circleSize: 'small' | 'medium' | 'large';
  textSize: 'small' | 'medium' | 'large';
}

// Resposta da API
export interface AIResponse {
  content: string;
  mood: NauanMood;
  suggestedFollowUp?: string;
  detectedSentiment?: UserSentiment;
  metadata: {
    tokensUsed: number;
    responseTime: number;
    model: string;
  };
}

// Sessão de voz
export interface VoiceSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  transcript: string;
  audioUrl: string;
  duration: number;
}

// ========================================
// DATABASE TYPES
// ========================================

export interface DBMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'nauan';
  content: string;
  type: MessageType;
  timestamp: number;
  sentiment: UserSentiment | null;
  audio_url: string | null;
  metadata: string | null; // JSON stringified
}

export interface DBConversation {
  id: string;
  started_at: number;
  ended_at: number | null;
  message_count: number;
  avg_sentiment: string | null;
}

export interface DBMemory {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  tags: string; // JSON stringified array
  sentiment: UserSentiment;
  image_url: string | null;
  is_favorite: number; // SQLite boolean (0 or 1)
}

export interface DBAchievement {
  id: string;
  title: string;
  description: string;
  unlocked_at: number | null;
  icon: string;
  category: string;
}

export interface DBSettings {
  key: string;
  value: string;
}

// ========================================
// API CONFIGURATION
// ========================================

export interface APIConfig {
  anthropicApiKey: string;
  elevenLabsApiKey: string;
  googleCloudApiKey: string;
  baseUrls: {
    anthropic: string;
    elevenLabs: string;
    googleCloud: string;
  };
  voiceId: string; // ID da voz clonada do Nauan
}

// ========================================
// ERROR TYPES
// ========================================

export class NauanError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'NauanError';
  }
}

export type AppError = 
  | { type: 'NETWORK_ERROR'; message: string }
  | { type: 'API_ERROR'; message: string; statusCode: number }
  | { type: 'DATABASE_ERROR'; message: string }
  | { type: 'AUDIO_ERROR'; message: string }
  | { type: 'PERMISSION_ERROR'; message: string };

// ========================================
// NAVIGATION TYPES
// ========================================

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Chat: {
    conversationId?: string;
  };
  Memories: undefined;
  MemoryDetail: {
    memoryId: string;
  };
  Profile: undefined;
  Settings: undefined;
  Statistics: undefined;
};

// ========================================
// STORE TYPES
// ========================================

export interface ConversationStore {
  messages: Message[];
  currentConversationId: string | null;
  isLoading: boolean;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  loadConversation: (id: string) => Promise<void>;
}

export interface MemoryStore {
  memories: SharedMemory[];
  isLoading: boolean;
  addMemory: (memory: SharedMemory) => Promise<void>;
  updateMemory: (id: string, data: Partial<SharedMemory>) => Promise<void>;
  deleteMemory: (id: string) => Promise<void>;
  loadMemories: () => Promise<void>;
}

export interface SettingsStore {
  settings: UserSettings;
  personalityConfig: PersonalityConfig;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  updatePersonality: (config: Partial<PersonalityConfig>) => Promise<void>;
}

// ========================================
// UTILITY TYPES
// ========================================

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface AudioFile {
  uri: string;
  duration: number;
  size: number;
}

export interface VoiceCloneConfig {
  audioFiles: AudioFile[];
  voiceName: string;
  voiceDescription: string;
}
