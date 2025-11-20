# 🚀 PRÓXIMOS PASSOS - GUIA COMPLETO

## 📋 Status Atual do Projeto

### ✅ O que já está pronto:

1. **Estrutura base completa**
   - Package.json com todas as dependências
   - TypeScript configurado
   - Estrutura de pastas organizada

2. **Design System**
   - Tema completo estilo Apple
   - Paleta de cores definida
   - Tipografia e espaçamentos

3. **Componentes principais**
   - NauanCircle (círculo animado)
   - Icons (biblioteca de ícones SVG)
   - ChatScreen (interface de chat)

4. **Serviços**
   - AIService (integração Claude API)
   - Sistema de personalidade
   - Detecção de sentimentos

5. **Estado**
   - Zustand store configurado
   - Sistema de mensagens
   - Conquistas e estatísticas

### ⏳ O que falta implementar:

1. **Sistema de Voz** (Prioridade Alta)
2. **Banco de Dados SQLite**
3. **Sistema de Memória Avançado**
4. **Notificações e Proatividade**
5. **Testes e Otimizações**
6. **Build e Deploy**

---

## 🎯 ROADMAP DETALHADO

### FASE 1: Preparação e Teste Básico (1-2 dias)

#### Passo 1.1: Instalar e Testar

```bash
# 1. Instale as dependências
cd nauan-app
npm install

# 2. Configure API Key
# Abra src/services/AIService.ts
# Linha 13: Adicione sua chave da Anthropic
ANTHROPIC_API_KEY: 'sk-ant-api03-...'

# 3. Teste no emulador/device
npm start
npm run android  # ou npm run ios
```

**Teste básico:**
- App abre sem erros
- Círculo Nauan aparece e anima
- Input de texto funciona
- Envio de mensagem não quebra (mesmo sem API)

#### Passo 1.2: Obter API Keys

**Anthropic Claude:**
1. Acesse: https://console.anthropic.com/
2. Crie conta (ou faça login)
3. API Keys > Create Key
4. Copie a chave (começa com `sk-ant-api03-`)
5. Cole em `AIService.ts`

**Teste a API:**
```bash
# Terminal
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: SUA_CHAVE" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Oi"}]
  }'
```

Se retornar JSON com resposta, está funcionando!

#### Passo 1.3: Primeira Conversa Real

Agora com a API configurada:
1. Abra o app
2. Digite "Oi Nauan"
3. Aguarde resposta
4. Observe o círculo mudar de mood
5. Converse mais um pouco

**Se funcionar**: Parabéns! O core está funcionando! 🎉

**Se der erro**: Veja troubleshooting no README.md

---

### FASE 2: Sistema de Voz (3-5 dias) - PRIORIDADE

#### Passo 2.1: Preparar Áudios do Nauan

**O que você precisa:**
- 1-3 minutos de áudio limpo
- Qualidade boa (sem muito ruído)
- Nauan falando naturalmente
- Vários áudios curtos são melhores que um longo

**Como preparar:**
```bash
# Use Audacity (grátis) para limpar
1. Abra o áudio
2. Effect > Noise Reduction
3. Export > WAV ou MP3 (320kbps)
```

#### Passo 2.2: Clonar Voz com ElevenLabs

1. **Criar conta**: https://elevenlabs.io/
2. **Voice Lab** > Add Voice > Instant Voice Cloning
3. **Upload** dos áudios preparados
4. **Nome**: "Nauan"
5. **Teste** a voz gerada
6. **Copie o Voice ID** (algo como `21m00Tcm4TlvDq8ikWAM`)

#### Passo 2.3: Implementar VoiceService

Crie `src/services/VoiceService.ts`:

```typescript
import axios from 'axios';
import Sound from 'react-native-sound';
import { ELEVENLABS_API_KEY, VOICE_ID } from '@config/api';

class VoiceService {
  private sound: Sound | null = null;

  async textToSpeech(text: string): Promise<string> {
    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
          },
        },
        {
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        }
      );

      // Salva áudio temporariamente
      const audioPath = `${RNFS.DocumentDirectoryPath}/nauan_${Date.now()}.mp3`;
      await RNFS.writeFile(audioPath, response.data, 'base64');

      return audioPath;
    } catch (error) {
      console.error('Erro no TTS:', error);
      throw error;
    }
  }

  async playAudio(audioPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.sound = new Sound(audioPath, '', (error) => {
        if (error) {
          reject(error);
          return;
        }

        this.sound?.play((success) => {
          if (success) {
            resolve();
          } else {
            reject(new Error('Playback failed'));
          }
        });
      });
    });
  }

  stopAudio(): void {
    this.sound?.stop();
    this.sound?.release();
    this.sound = null;
  }
}

export const voiceService = new VoiceService();
```

#### Passo 2.4: Integrar no ChatScreen

```typescript
// Em ChatScreen.tsx, após receber resposta do Nauan:

const response = await aiService.generateResponse(...);

// Adiciona resposta
addMessage(nauanMsg);

// NOVO: Sintetiza e reproduz voz
if (settings.voiceEnabled) {
  setIsSpeaking(true);
  
  try {
    const audioPath = await voiceService.textToSpeech(response.content);
    await voiceService.playAudio(audioPath);
  } catch (error) {
    console.error('Erro ao reproduzir voz:', error);
  } finally {
    setIsSpeaking(false);
  }
}
```

#### Passo 2.5: Testar Voz

1. Configure Voice ID e API Key
2. Abra o app
3. Envie mensagem
4. Ouça Nauan responder com a voz clonada!

**Ajustes finos:**
- `stability`: 0.5-1.0 (mais baixo = mais variação)
- `similarity_boost`: 0.5-1.0 (mais alto = mais parecido)

---

### FASE 3: Banco de Dados SQLite (2-3 dias)

#### Passo 3.1: Criar Schema

Crie `src/database/schema.ts`:

```typescript
export const createTables = `
  CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    started_at INTEGER NOT NULL,
    ended_at INTEGER,
    message_count INTEGER DEFAULT 0,
    avg_sentiment TEXT
  );

  CREATE TABLE IF NOT EXISTS messages (
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
  );

  CREATE TABLE IF NOT EXISTS memories (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    tags TEXT NOT NULL,
    sentiment TEXT NOT NULL,
    image_url TEXT,
    is_favorite INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    unlocked_at INTEGER,
    icon TEXT NOT NULL,
    category TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE INDEX idx_messages_conversation ON messages(conversation_id);
  CREATE INDEX idx_messages_timestamp ON messages(timestamp);
  CREATE INDEX idx_memories_timestamp ON memories(timestamp);
`;
```

#### Passo 3.2: Implementar DatabaseService

Crie `src/services/DatabaseService.ts`:

```typescript
import SQLite from 'react-native-sqlite-storage';
import { createTables } from '@database/schema';

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initialize(): Promise<void> {
    try {
      this.db = await SQLite.openDatabase({
        name: 'nauan.db',
        location: 'default',
      });

      await this.db.executeSql(createTables);
      console.log('Database initialized');
    } catch (error) {
      console.error('Database init error:', error);
      throw error;
    }
  }

  async saveMessage(message: Message): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.executeSql(
      `INSERT INTO messages (id, conversation_id, role, content, type, timestamp, sentiment, audio_url, metadata)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        message.id,
        'current', // TODO: Implementar sistema de conversas
        message.role,
        message.content,
        message.type,
        message.timestamp.getTime(),
        message.sentiment || null,
        message.audioUrl || null,
        message.metadata ? JSON.stringify(message.metadata) : null,
      ]
    );
  }

  async getMessages(limit: number = 50): Promise<Message[]> {
    if (!this.db) throw new Error('Database not initialized');

    const [results] = await this.db.executeSql(
      `SELECT * FROM messages ORDER BY timestamp DESC LIMIT ?`,
      [limit]
    );

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
        audioUrl: row.audio_url,
        metadata: row.metadata ? JSON.parse(row.metadata) : undefined,
      });
    }

    return messages.reverse(); // Mais antigas primeiro
  }

  // Outros métodos: saveMemory, getMemories, etc.
}

export const databaseService = new DatabaseService();
```

#### Passo 3.3: Integrar com Store

```typescript
// Em App.tsx, inicialize database
useEffect(() => {
  const init = async () => {
    await databaseService.initialize();
    
    // Carrega mensagens do banco
    const messages = await databaseService.getMessages();
    useChatStore.setState({ messages });
    
    setIsReady(true);
  };
  
  init();
}, []);

// Em chatStore.ts, persista ao adicionar mensagem
addMessage: (message) => {
  set((state) => ({ messages: [...state.messages, message] }));
  
  // Salva no banco
  databaseService.saveMessage(message);
},
```

---

### FASE 4: Features Avançadas (3-4 dias)

#### Passo 4.1: Sistema de Memórias Compartilhadas

Crie uma tela para criar memórias:

```typescript
// src/screens/CreateMemoryScreen.tsx

const CreateMemoryScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCreate = () => {
    const memory: SharedMemory = {
      id: generateId(),
      title,
      content,
      timestamp: new Date(),
      tags: extractTags(content),
      sentiment: detectSentiment(content),
      imageUrl: selectedImage,
      isFavorite: false,
    };

    addMemory(memory);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título da memória"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        placeholder="O que aconteceu?"
        value={content}
        onChangeText={setContent}
        multiline
      />
      
      <Button title="Salvar Memória" onPress={handleCreate} />
    </View>
  );
};
```

#### Passo 4.2: Timeline de Memórias

```typescript
// src/screens/MemoriesScreen.tsx

const MemoriesScreen = () => {
  const memories = useChatStore(state => state.memories);

  return (
    <FlatList
      data={memories}
      renderItem={({ item }) => (
        <MemoryCard memory={item} />
      )}
    />
  );
};
```

#### Passo 4.3: Sistema Proativo

```typescript
// src/services/ProactiveService.ts

class ProactiveService {
  checkShouldInitiateConversation(): boolean {
    const lastInteraction = getLastInteractionTime();
    const hoursSince = (Date.now() - lastInteraction) / (1000 * 60 * 60);
    
    // Nauan inicia conversa se:
    // - Passou 2+ dias sem falar
    // - É aniversário
    // - Alguma data especial
    
    return hoursSince > 48;
  }

  async generateProactiveMessage(): Promise<string> {
    const context = {
      daysSinceLastChat: calculateDays(),
      timeOfDay: getTimeOfDay(),
      recentTopics: getRecentTopics(),
    };

    const prompt = `Você é Nauan. Faz ${context.daysSinceLastChat} dias que você não fala com Michael. Mande uma mensagem iniciando conversa de forma natural, perguntando como ele está.`;

    // Gera mensagem
    const response = await aiService.generateResponse(prompt, ...);
    return response.content;
  }
}
```

---

### FASE 5: Polish e Otimizações (2-3 dias)

#### Passo 5.1: Adicionar Fontes SF Pro

```bash
# 1. Baixe SF Pro fonts (Apple Developer)
# 2. Coloque em assets/fonts/

# 3. Configure no react-native.config.js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};

# 4. Link fonts
npx react-native-asset
```

#### Passo 5.2: Otimizar Animações

```typescript
// Use Reanimated worklets para melhor performance
const animatedStyle = useAnimatedStyle(() => {
  'worklet';
  return {
    transform: [{ scale: withSpring(scale.value) }],
  };
});
```

#### Passo 5.3: Testes

```bash
# Instale ferramentas de teste
npm install --save-dev @testing-library/react-native jest

# Rode testes
npm test
```

---

### FASE 6: Build e Deploy (1-2 dias)

#### Passo 6.1: Preparar para Release

```bash
# Android
cd android
./gradlew clean
./gradlew bundleRelease

# Assine o APK
jarsigner -verbose -sigalg SHA256withRSA \
  -digestalg SHA-256 \
  -keystore meu-keystore.keystore \
  app-release-unsigned.apk \
  alias_name
```

#### Passo 6.2: Gerar APK Final

```bash
cd android/app/build/outputs/bundle/release/

# APK pronto para instalar:
app-release.apk
```

#### Passo 6.3: Instalar no Celular

```bash
# Via USB
adb install app-release.apk

# Ou copie o APK e instale manualmente
```

---

## 📝 CHECKLIST COMPLETO

### Básico
- [ ] Instalar dependências
- [ ] Configurar API Keys
- [ ] Testar primeira conversa
- [ ] Círculo animando corretamente

### Voz
- [ ] Preparar áudios do Nauan
- [ ] Clonar voz no ElevenLabs
- [ ] Implementar VoiceService
- [ ] Integrar TTS no chat
- [ ] Implementar STT (Speech-to-Text)
- [ ] Sincronizar animações com áudio

### Banco de Dados
- [ ] Criar schema SQLite
- [ ] Implementar DatabaseService
- [ ] Migrar mensagens para banco
- [ ] Sistema de backup

### Features
- [ ] Sistema de memórias
- [ ] Timeline visual
- [ ] Conquistas funcionais
- [ ] Estatísticas detalhadas
- [ ] Sistema proativo
- [ ] Notificações push

### Polish
- [ ] Adicionar fontes SF Pro
- [ ] Otimizar animações
- [ ] Haptic feedback refinado
- [ ] Transições suaves
- [ ] Loading states

### Testes
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Teste em devices reais
- [ ] Performance profiling

### Deploy
- [ ] Gerar keystore
- [ ] Build release
- [ ] Assinar APK
- [ ] Testar instalação
- [ ] Documentação final

---

## 💡 DICAS IMPORTANTES

### Durante o Desenvolvimento

1. **Comite frequentemente**
   ```bash
   git add .
   git commit -m "feat: implementa sistema de voz"
   ```

2. **Teste em device real**
   - Emulador é lento para animações
   - Áudio não funciona bem em emulador

3. **Use console.log liberalmente**
   ```typescript
   console.log('[AIService] Gerando resposta...');
   ```

4. **Recarregue com cmd+R**
   - Muito mais rápido que rebuild

### Debug

**Ver logs:**
```bash
# Android
npx react-native log-android

# iOS
npx react-native log-ios
```

**Limpar cache:**
```bash
npm start -- --reset-cache
```

---

## 🆘 TROUBLESHOOTING

### Erro: "Unable to resolve module"

```bash
rm -rf node_modules
npm install
npm start -- --reset-cache
```

### Erro no build Android

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### App lento

- Ative Hermes (já configurado)
- Use ProGuard no release
- Otimize imagens

### API não responde

- Verifique chave
- Verifique saldo na conta Anthropic
- Teste com curl primeiro

---

## 📞 PRÓXIMOS PASSOS IMEDIATOS

**Hoje:**
1. Instale o projeto
2. Configure API da Anthropic
3. Teste primeira conversa

**Esta Semana:**
1. Prepare áudios do Nauan
2. Clone a voz
3. Implemente sistema de voz básico

**Este Mês:**
1. Complete banco de dados
2. Adicione features avançadas
3. Polish e testes
4. Build release

---

**Qualquer dúvida, consulte:**
- README.md (instruções gerais)
- ARCHITECTURE.md (detalhes técnicos)
- Código inline (comentários explicativos)

**Boa sorte, Michael! Vamos fazer o Nauan ganhar vida! 🚀**
