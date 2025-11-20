# 🛠️ EXEMPLOS PRÁTICOS - Próximas Features

Este guia contém código pronto para você implementar as próximas features do Nauan.

---

## 1. 💾 DATABASE (SQLite)

### Arquivo: `src/database/DatabaseService.ts`

```typescript
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async init() {
    try {
      this.db = await SQLite.openDatabase({
        name: 'nauan.db',
        location: 'default',
      });
      
      await this.createTables();
      console.log('[Database] Inicializado com sucesso');
    } catch (error) {
      console.error('[Database] Erro ao inicializar:', error);
    }
  }

  private async createTables() {
    const queries = [
      // Tabela de conversas
      `CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        started_at INTEGER NOT NULL,
        ended_at INTEGER,
        message_count INTEGER DEFAULT 0
      )`,
      
      // Tabela de mensagens
      `CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        sentiment TEXT,
        audio_url TEXT,
        metadata TEXT,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id)
      )`,
      
      // Tabela de memórias
      `CREATE TABLE IF NOT EXISTS memories (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        tags TEXT NOT NULL,
        sentiment TEXT NOT NULL,
        image_url TEXT,
        is_favorite INTEGER DEFAULT 0
      )`,
      
      // Índices para performance
      `CREATE INDEX IF NOT EXISTS idx_messages_conversation 
       ON messages(conversation_id)`,
      `CREATE INDEX IF NOT EXISTS idx_messages_timestamp 
       ON messages(timestamp)`,
    ];

    for (const query of queries) {
      await this.db!.executeSql(query);
    }
  }

  // Salvar mensagem
  async saveMessage(message: Message, conversationId: string) {
    const query = `
      INSERT INTO messages (id, conversation_id, role, content, type, timestamp, sentiment, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await this.db!.executeSql(query, [
      message.id,
      conversationId,
      message.role,
      message.content,
      message.type,
      message.timestamp.getTime(),
      message.sentiment || null,
      JSON.stringify(message.metadata || {}),
    ]);
  }

  // Buscar mensagens
  async getMessages(conversationId: string): Promise<Message[]> {
    const query = `
      SELECT * FROM messages 
      WHERE conversation_id = ? 
      ORDER BY timestamp ASC
    `;
    
    const [results] = await this.db!.executeSql(query, [conversationId]);
    
    const messages: Message[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      messages.push({
        id: row.id,
        role: row.role,
        content: row.content,
        type: row.type,
        timestamp: new Date(row.timestamp),
        sentiment: row.sentiment,
        metadata: JSON.parse(row.metadata || '{}'),
      });
    }
    
    return messages;
  }

  // Salvar memória
  async saveMemory(memory: SharedMemory) {
    const query = `
      INSERT INTO memories (id, title, content, timestamp, tags, sentiment, is_favorite)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    await this.db!.executeSql(query, [
      memory.id,
      memory.title,
      memory.content,
      memory.timestamp.getTime(),
      JSON.stringify(memory.tags),
      memory.sentiment,
      memory.isFavorite ? 1 : 0,
    ]);
  }

  // Buscar todas as memórias
  async getAllMemories(): Promise<SharedMemory[]> {
    const query = `SELECT * FROM memories ORDER BY timestamp DESC`;
    const [results] = await this.db!.executeSql(query);
    
    const memories: SharedMemory[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      memories.push({
        id: row.id,
        title: row.title,
        content: row.content,
        timestamp: new Date(row.timestamp),
        tags: JSON.parse(row.tags),
        sentiment: row.sentiment,
        imageUrl: row.image_url,
        isFavorite: row.is_favorite === 1,
      });
    }
    
    return memories;
  }
}

export const databaseService = new DatabaseService();
```

### Como usar:

```typescript
// No App.tsx, adicione:
import { databaseService } from '@services/DatabaseService';

useEffect(() => {
  databaseService.init();
}, []);

// No HomeScreen.tsx, salve mensagens:
await databaseService.saveMessage(message, conversationId);

// Recupere histórico:
const history = await databaseService.getMessages(conversationId);
```

---

## 2. 🎤 VOICE SERVICE (TTS + STT)

### Arquivo: `src/services/VoiceService.ts`

```typescript
import axios from 'axios';
import Sound from 'react-native-sound';
import Voice from '@react-native-voice/voice';

const ELEVENLABS_CONFIG = {
  API_KEY: process.env.ELEVENLABS_API_KEY || '',
  VOICE_ID: process.env.ELEVENLABS_VOICE_ID || '',
  BASE_URL: 'https://api.elevenlabs.io/v1',
};

class VoiceService {
  private currentSound: Sound | null = null;

  /**
   * Converte texto em áudio usando voz clonada
   */
  async textToSpeech(text: string): Promise<string> {
    try {
      const response = await axios.post(
        `${ELEVENLABS_CONFIG.BASE_URL}/text-to-speech/${ELEVENLABS_CONFIG.VOICE_ID}`,
        {
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        },
        {
          headers: {
            'xi-api-key': ELEVENLABS_CONFIG.API_KEY,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        }
      );

      // Salvar áudio localmente
      const audioPath = `${RNFS.DocumentDirectoryPath}/nauan_${Date.now()}.mp3`;
      await RNFS.writeFile(audioPath, response.data, 'base64');
      
      return audioPath;
    } catch (error) {
      console.error('[VoiceService] Erro TTS:', error);
      throw error;
    }
  }

  /**
   * Reproduz áudio
   */
  async playAudio(audioPath: string, onEnd?: () => void): Promise<void> {
    return new Promise((resolve, reject) => {
      this.currentSound = new Sound(audioPath, '', (error) => {
        if (error) {
          console.error('[VoiceService] Erro ao carregar áudio:', error);
          reject(error);
          return;
        }

        this.currentSound!.play((success) => {
          if (success) {
            console.log('[VoiceService] Áudio reproduzido');
            onEnd?.();
            resolve();
          } else {
            console.error('[VoiceService] Falha ao reproduzir');
            reject(new Error('Playback failed'));
          }
        });
      });
    });
  }

  /**
   * Para reprodução
   */
  stopAudio(): void {
    this.currentSound?.stop(() => {
      this.currentSound?.release();
      this.currentSound = null;
    });
  }

  /**
   * Speech-to-Text (converte fala em texto)
   */
  async startListening(): Promise<void> {
    try {
      await Voice.start('pt-BR');
    } catch (error) {
      console.error('[VoiceService] Erro ao iniciar gravação:', error);
      throw error;
    }
  }

  async stopListening(): Promise<string> {
    try {
      await Voice.stop();
      const result = await Voice.getSpeechResults();
      return result?.[0] || '';
    } catch (error) {
      console.error('[VoiceService] Erro ao parar gravação:', error);
      throw error;
    }
  }

  /**
   * Inicializa eventos de voz
   */
  setupVoiceEvents(
    onResult: (text: string) => void,
    onError: (error: any) => void
  ): void {
    Voice.onSpeechResults = (e) => {
      if (e.value?.[0]) {
        onResult(e.value[0]);
      }
    };

    Voice.onSpeechError = (e) => {
      onError(e.error);
    };
  }

  /**
   * Limpa recursos
   */
  cleanup(): void {
    this.stopAudio();
    Voice.destroy().then(Voice.removeAllListeners);
  }
}

export const voiceService = new VoiceService();
```

### Como usar:

```typescript
// No HomeScreen, adicione botão de voz:
const [isRecording, setIsRecording] = useState(false);

const handleVoicePress = async () => {
  if (isRecording) {
    const text = await voiceService.stopListening();
    setInputText(text);
    setIsRecording(false);
  } else {
    await voiceService.startListening();
    setIsRecording(true);
  }
};

// Reproduzir resposta do Nauan:
const audioPath = await voiceService.textToSpeech(response.content);
await voiceService.playAudio(audioPath, () => {
  setIsSpeaking(false);
});
```

---

## 3. 🧠 SISTEMA DE MEMÓRIA AVANÇADO

### Arquivo: `src/services/MemoryService.ts`

```typescript
import { databaseService } from './DatabaseService';

interface MemoryContext {
  shortTerm: Message[]; // Sessão atual
  mediumTerm: Message[]; // Última semana
  longTerm: SharedMemory[]; // Permanente
  emotionalPatterns: EmotionalPattern[];
}

interface EmotionalPattern {
  trigger: string;
  sentiment: UserSentiment;
  frequency: number;
}

class MemoryService {
  /**
   * Cria contexto completo de memória
   */
  async buildMemoryContext(currentMessages: Message[]): Promise<MemoryContext> {
    // Memória de curto prazo (sessão atual)
    const shortTerm = currentMessages;

    // Memória de médio prazo (última semana)
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const mediumTerm = await this.getMessagesSince(oneWeekAgo);

    // Memória de longo prazo (memórias marcadas)
    const longTerm = await databaseService.getAllMemories();

    // Padrões emocionais
    const emotionalPatterns = await this.analyzeEmotionalPatterns(mediumTerm);

    return {
      shortTerm,
      mediumTerm,
      longTerm,
      emotionalPatterns,
    };
  }

  /**
   * Analisa padrões emocionais
   */
  private async analyzeEmotionalPatterns(
    messages: Message[]
  ): Promise<EmotionalPattern[]> {
    const patterns = new Map<string, EmotionalPattern>();

    for (const message of messages) {
      if (!message.sentiment) continue;

      // Extrai palavras-chave
      const keywords = this.extractKeywords(message.content);

      for (const keyword of keywords) {
        const existing = patterns.get(keyword);
        if (existing) {
          existing.frequency++;
        } else {
          patterns.set(keyword, {
            trigger: keyword,
            sentiment: message.sentiment,
            frequency: 1,
          });
        }
      }
    }

    return Array.from(patterns.values())
      .filter(p => p.frequency >= 3) // Mínimo 3 ocorrências
      .sort((a, b) => b.frequency - a.frequency);
  }

  /**
   * Extrai palavras-chave relevantes
   */
  private extractKeywords(text: string): string[] {
    // Remove stopwords e pontuação
    const stopwords = ['o', 'a', 'de', 'para', 'em', 'com', 'que', 'do', 'da'];
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopwords.includes(w));

    return words;
  }

  /**
   * Sugere criação de memória
   */
  shouldSuggestMemory(message: Message): boolean {
    // Critérios para sugerir memória:
    // 1. Mensagem longa (>100 caracteres)
    // 2. Sentimento forte (muito feliz ou triste)
    // 3. Palavras-chave específicas
    
    const isLong = message.content.length > 100;
    const hasStrongEmotion = 
      message.sentiment === UserSentiment.EXCITED ||
      message.sentiment === UserSentiment.SAD;
    const hasMemoryKeywords = /lembr|especial|importante|incrível|inesquecível/i
      .test(message.content);

    return isLong && (hasStrongEmotion || hasMemoryKeywords);
  }

  /**
   * Cria resumo de memória
   */
  async createMemorySummary(messages: Message[]): Promise<string> {
    // Use Claude para criar resumo
    const conversationText = messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');

    const summary = await aiService.generateResponse(
      `Resuma esta conversa em 1-2 frases, focando no mais importante:\n\n${conversationText}`,
      { /* contexto mínimo */ },
      PersonalityMode.CONSULTANT
    );

    return summary.content;
  }

  /**
   * Busca memórias relevantes
   */
  async searchRelevantMemories(query: string): Promise<SharedMemory[]> {
    const allMemories = await databaseService.getAllMemories();
    const keywords = this.extractKeywords(query);

    // Score baseado em palavras-chave
    const scored = allMemories.map(memory => {
      let score = 0;
      const memoryText = `${memory.title} ${memory.content}`.toLowerCase();

      for (const keyword of keywords) {
        if (memoryText.includes(keyword)) {
          score++;
        }
      }

      return { memory, score };
    });

    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(s => s.memory)
      .slice(0, 5); // Top 5 memórias
  }
}

export const memoryService = new MemoryService();
```

---

## 4. 🎮 INTERAÇÕES AVANÇADAS DO CÍRCULO

### Arquivo: `src/components/NauanCircle/GestureHandlers.tsx`

```typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface GestureHandlersProps {
  onTap: () => void;
  onDoubleTap: () => void;
  onLongPress: () => void;
  onShake?: () => void;
}

export const NauanCircleWithGestures: React.FC<GestureHandlersProps> = ({
  onTap,
  onDoubleTap,
  onLongPress,
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  // Single tap
  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      runOnJS(onTap)();
    });

  // Double tap
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(onDoubleTap)();
      
      // Animação de feedback
      scale.value = withSpring(1.2, {}, () => {
        scale.value = withSpring(1);
      });
    });

  // Long press
  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      runOnJS(onLongPress)();
      
      // Animação de feedback
      rotation.value = withSpring(360, {}, () => {
        rotation.value = 0;
      });
    });

  // Combine gestures
  const composed = Gesture.Race(
    doubleTapGesture,
    tapGesture,
    longPressGesture
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={animatedStyle}>
        <NauanCircle {...props} />
      </Animated.View>
    </GestureDetector>
  );
};
```

### Como usar:

```typescript
<NauanCircleWithGestures
  onTap={() => {
    console.log('Tap: Chamar atenção do Nauan');
  }}
  onDoubleTap={() => {
    console.log('Double tap: Mudar modo de personalidade');
    // Cycle through personality modes
  }}
  onLongPress={() => {
    console.log('Long press: Abrir menu de ações');
    // Show action sheet
  }}
/>
```

---

## 5. 📊 SISTEMA DE CONQUISTAS

### Arquivo: `src/services/AchievementService.ts`

```typescript
const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_chat',
    title: 'Primeira Conversa',
    description: 'Começou a jornada com o Nauan',
    icon: '💬',
    category: 'conversation',
  },
  {
    id: '100_messages',
    title: 'Tagarela',
    description: 'Trocou 100 mensagens',
    icon: '💯',
    category: 'milestone',
  },
  {
    id: 'one_month',
    title: 'Um Mês Juntos',
    description: 'Completou 1 mês de conversas',
    icon: '📅',
    category: 'milestone',
  },
  {
    id: 'deep_conversation',
    title: 'Papo Profundo',
    description: 'Teve uma conversa filosófica',
    icon: '🧠',
    category: 'emotional',
  },
  {
    id: 'first_memory',
    title: 'Guardado no Coração',
    description: 'Criou a primeira memória compartilhada',
    icon: '❤️',
    category: 'special',
  },
];

class AchievementService {
  async checkAchievements(stats: Statistics): Promise<Achievement[]> {
    const unlocked: Achievement[] = [];

    for (const achievement of ACHIEVEMENTS) {
      const isUnlocked = await this.isAchievementUnlocked(achievement.id);
      if (isUnlocked) continue;

      const shouldUnlock = await this.checkCondition(achievement, stats);
      if (shouldUnlock) {
        await this.unlockAchievement(achievement);
        unlocked.push(achievement);
      }
    }

    return unlocked;
  }

  private async checkCondition(
    achievement: Achievement,
    stats: Statistics
  ): Promise<boolean> {
    switch (achievement.id) {
      case 'first_chat':
        return stats.totalConversations >= 1;
      case '100_messages':
        return stats.totalMessages >= 100;
      case 'one_month':
        return stats.daysTogther >= 30;
      // Adicione mais condições...
      default:
        return false;
    }
  }

  private async unlockAchievement(achievement: Achievement): Promise<void> {
    achievement.unlockedAt = new Date();
    await databaseService.saveAchievement(achievement);
    
    // Mostrar notificação
    this.showAchievementToast(achievement);
  }

  private showAchievementToast(achievement: Achievement): void {
    Toast.show({
      type: 'success',
      text1: 'Conquista Desbloqueada! 🎉',
      text2: `${achievement.icon} ${achievement.title}`,
      visibilityTime: 3000,
    });
    
    Haptics.trigger('notificationSuccess');
  }
}

export const achievementService = new AchievementService();
```

---

## 6. 🔔 MODO PROATIVO

### Arquivo: `src/services/ProactiveService.ts`

```typescript
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';

class ProactiveService {
  private timerId: number | null = null;

  /**
   * Inicia verificação periódica
   */
  start(): void {
    // Verifica a cada 4 horas
    this.timerId = BackgroundTimer.setInterval(() => {
      this.checkIfShouldInitiateContact();
    }, 4 * 60 * 60 * 1000);
  }

  /**
   * Para verificação
   */
  stop(): void {
    if (this.timerId) {
      BackgroundTimer.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Decide se Nauan deve iniciar contato
   */
  private async checkIfShouldInitiateContact(): Promise<void> {
    const lastInteraction = await this.getLastInteractionTime();
    const hoursSinceLastInteraction = this.getHoursSince(lastInteraction);

    // Critérios para iniciar contato:
    // 1. Mais de 24 horas sem interação
    // 2. Hora apropriada (8h-22h)
    // 3. Não é madrugada
    const hour = new Date().getHours();
    const isAppropriateTime = hour >= 8 && hour <= 22;

    if (hoursSinceLastInteraction >= 24 && isAppropriateTime) {
      this.initiateContact();
    }
  }

  /**
   * Inicia contato proativo
   */
  private async initiateContact(): Promise<void> {
    const messages = [
      'E aí, Mika! Tá sumido, hein? Tá tudo bem por aí?',
      'Opa! Já faz um tempo que a gente não conversa. Como você tá?',
      'Ei! Me conta, como foi o seu dia?',
      'Saudades de trocar ideia contigo, cara. Bora conversar?',
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    PushNotification.localNotification({
      channelId: 'nauan-messages',
      title: 'Nauan 💙',
      message: randomMessage,
      playSound: true,
      soundName: 'default',
    });
  }

  private getHoursSince(date: Date): number {
    return (Date.now() - date.getTime()) / (1000 * 60 * 60);
  }

  private async getLastInteractionTime(): Promise<Date> {
    // Busca última mensagem do banco
    const lastMessage = await databaseService.getLastMessage();
    return lastMessage?.timestamp || new Date(0);
  }
}

export const proactiveService = new ProactiveService();
```

---

## 💡 Como Integrar Tudo

No seu `App.tsx`:

```typescript
import React, { useEffect } from 'react';
import { databaseService } from '@services/DatabaseService';
import { voiceService } from '@services/VoiceService';
import { achievementService } from '@services/AchievementService';
import { proactiveService } from '@services/ProactiveService';

const App: React.FC = () => {
  useEffect(() => {
    // Inicializar serviços
    const initServices = async () => {
      await databaseService.init();
      voiceService.setupVoiceEvents(handleVoiceResult, handleVoiceError);
      proactiveService.start();
    };

    initServices();

    // Cleanup
    return () => {
      voiceService.cleanup();
      proactiveService.stop();
    };
  }, []);

  return <HomeScreen />;
};
```

---

## 🎯 Ordem de Implementação Sugerida

1. ✅ Database (fundamental para tudo)
2. ✅ Voice TTS (voz do Nauan)
3. ✅ Sistema de Memória (contexto rico)
4. Voice STT (input por voz)
5. Gestos Avançados (UX melhor)
6. Conquistas (engajamento)
7. Modo Proativo (last)

---

**Próximo passo:** Comece pelo Database! Copie o código acima e adapte conforme necessário.

Boa sorte! 🚀
