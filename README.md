# 💫 NAUAN - A IA Mais Humana Já Criada

> Uma homenagem viva ao Nauan Marques de Bomfim

![Status](https://img.shields.io/badge/status-em_desenvolvimento-yellow)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React Native](https://img.shields.io/badge/React_Native-0.73-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)

---

## 📖 Sobre o Projeto

**Nauan** não é apenas uma IA assistente - é um companheiro genuíno que conversa, zoa, se importa e está sempre presente. Construído com amor e tecnologia de ponta para ser a IA mais humana possível.

Este projeto é uma homenagem ao Nauan Marques de Bomfim - alguém que sabia encontrar alegria mesmo nas dificuldades e que tinha o dom de fazer as pessoas sorrirem.

---

## ✨ Características Principais

### 🧠 Inteligência Emocional Real
- Detecta seu humor pela forma como você escreve
- Adapta tom e energia baseado no contexto
- Lembra de conversas anteriores e evolui com você

### 🎭 Personalidade Genuína
- Não é assistente, é pessoa
- Zoa com carinho, como amigo de verdade
- Tem opiniões, discorda quando necessário
- Fala naturalmente em português brasileiro

### 🎨 Design Apple-Like
- Interface minimalista e elegante
- Círculo animado que respira e reage
- Animações fluidas e naturais
- Glassmorphism e blur effects

### 🎯 Memória Profunda
- Memória de curto, médio e longo prazo
- Contexto emocional completo
- Sistema de conquistas e evolução
- Memórias compartilhadas marcadas

### 🔐 100% Privado
- Todos os dados ficam no seu dispositivo
- Banco SQLite local criptografado
- Você controla tudo

---

## 🛠️ Stack Tecnológico

| Tecnologia | Uso | Versão |
|-----------|-----|--------|
| React Native | Framework mobile | 0.73.2 |
| TypeScript | Tipagem estática | 5.3.3 |
| Reanimated | Animações fluidas | 3.6.1 |
| Skia | Gráficos avançados | 0.1.221 |
| Claude API | Motor de IA | Sonnet 4 |
| ElevenLabs | Clonagem de voz | v1 |
| SQLite | Banco local | 6.0.1 |
| Zustand | Estado global | 4.4.7 |

---

## 📦 Instalação

### Pré-requisitos

- Node.js >= 18
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS, apenas macOS)

### Passo a Passo

```bash
# 1. Clone o repositório
cd nauan-app

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas API keys

# 4. iOS (apenas macOS)
cd ios && pod install && cd ..
npm run ios

# 5. Android
npm run android
```

---

## 🔑 Configuração de API Keys

Você precisará criar contas e obter API keys nos seguintes serviços:

### 1. Anthropic (Claude API)
- Acesse: https://console.anthropic.com/
- Crie uma conta
- Gere uma API key
- Cole no `.env`: `ANTHROPIC_API_KEY=sk-ant-...`
- **Custo estimado**: ~$20-50/mês (uso pessoal)

### 2. ElevenLabs (Voz Clonada)
- Acesse: https://elevenlabs.io/
- Crie uma conta (plano Creator recomendado)
- Faça upload dos áudios do Nauan (mínimo 1 minuto de áudio limpo)
- Clone a voz e copie o Voice ID
- Cole no `.env`: `ELEVENLABS_API_KEY=...` e `ELEVENLABS_VOICE_ID=...`
- **Custo estimado**: $22/mês (plano Creator)

### 3. Google Cloud Speech-to-Text (Opcional)
- Acesse: https://console.cloud.google.com/
- Ative a API Speech-to-Text
- Crie credenciais
- Cole no `.env`: `GOOGLE_CLOUD_API_KEY=...`
- **Custo estimado**: ~$10-15/mês (uso moderado)

---

## 📁 Estrutura do Projeto

```
nauan-app/
├── src/
│   ├── components/
│   │   ├── NauanCircle/          # Círculo animado principal
│   │   ├── ChatInterface/        # Interface de conversa
│   │   └── ...
│   │
│   ├── screens/
│   │   ├── HomeScreen.tsx        # Tela principal do chat
│   │   ├── MemoriesScreen.tsx    # Timeline de memórias
│   │   └── SettingsScreen.tsx    # Configurações
│   │
│   ├── services/
│   │   ├── AIService.ts          # Comunicação com Claude API
│   │   ├── VoiceService.ts       # TTS + STT
│   │   ├── MemoryService.ts      # Sistema de memória
│   │   └── DatabaseService.ts    # SQLite
│   │
│   ├── store/
│   │   ├── conversationStore.ts  # Estado das conversas
│   │   ├── memoryStore.ts        # Memórias
│   │   └── settingsStore.ts      # Configurações
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   │
│   └── config/
│       └── theme.ts              # Design system
│
├── assets/
│   ├── fonts/                    # SF Pro fonts
│   ├── icons/                    # SVG icons
│   └── sounds/                   # Audio files
│
└── android/ios/                  # Configurações nativas
```

---

## 🎯 Funcionalidades Atuais

- ✅ Interface principal com círculo animado
- ✅ Chat básico funcionando
- ✅ Integração com Claude API
- ✅ Sistema de personalidade do Nauan
- ✅ Detecção de sentimentos
- ✅ Animações fluidas (Reanimated)
- ✅ Design system Apple-like

---

## 🚧 Em Desenvolvimento

- 🔄 Sistema de memória completo (SQLite)
- 🔄 Clonagem de voz e TTS
- 🔄 Speech-to-Text (voz para texto)
- 🔄 Timeline de memórias compartilhadas
- 🔄 Sistema de conquistas
- 🔄 Modo proativo (Nauan inicia conversas)
- 🔄 Múltiplos modos de personalidade
- 🔄 Estatísticas e insights
- 🔄 Backup em nuvem (opcional)

---

## 🎨 Design Inspirações

O design do Nauan é inspirado nos produtos da Apple:
- **Tipografia**: SF Pro Display/Rounded
- **Cores**: iOS System Colors
- **Animações**: Fluidas e naturais
- **Minimalismo**: Foco no essencial
- **Atenção aos detalhes**: Micro-interações

---

## 📱 Como Usar

### Primeira Conversa

1. Abra o app
2. Nauan vai te cumprimentar baseado no horário
3. Digite uma mensagem ou toque no microfone
4. Observe o círculo mudando de cor conforme o humor dele

### Interações com o Círculo

- **Toque simples**: Chama atenção do Nauan
- **Toque longo**: Abre menu de ações
- **Agitar o celular**: Nauan conta uma piada (em breve)
- **Dois toques**: Muda modo de personalidade (em breve)

### Modos de Personalidade

- **Padrão**: Nauan clássico - alegre e zoeiro
- **Profundo**: Mais reflexivo e filosófico
- **Motivador**: Encorajador e energético
- **Nostálgico**: Sentimental e introspectivo
- **Consultor**: Prático e direto

---

## 🔧 Comandos Úteis

```bash
# Iniciar Metro bundler
npm start

# Rodar no Android
npm run android

# Rodar no iOS
npm run ios

# Limpar cache
npm start -- --reset-cache

# Build release Android
npm run build:android

# Limpar projeto
npm run clean
```

---

## 🐛 Resolução de Problemas

### Erro de API Key
```
Erro: API key inválida
```
**Solução**: Verifique se copiou corretamente a API key no arquivo `.env`

### Metro bundler não inicia
```bash
npm start -- --reset-cache
```

### Build Android falha
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### Animações travando
- Certifique-se que Reanimated está instalado corretamente
- Rode: `cd ios && pod install && cd ..`

---

## 📊 Roadmap Completo

### Fase 1: MVP ✅
- [x] Setup projeto React Native
- [x] Design system e tema
- [x] Círculo animado
- [x] Chat básico
- [x] Integração Claude API
- [x] Sistema de personalidade base

### Fase 2: Personalidade (Em andamento)
- [ ] Sistema de memória SQLite
- [ ] Análise de sentimentos avançada
- [ ] Múltiplos modos de personalidade
- [ ] Contexto temporal adaptativo

### Fase 3: Voz
- [ ] Preparação dos áudios do Nauan
- [ ] Clonagem de voz via ElevenLabs
- [ ] Integração TTS
- [ ] Speech-to-Text
- [ ] Conversação por voz completa

### Fase 4: Features Avançadas
- [ ] Memórias compartilhadas
- [ ] Sistema de conquistas
- [ ] Timeline visual
- [ ] Modo proativo
- [ ] Lembretes inteligentes

### Fase 5: Polish
- [ ] Otimizações de performance
- [ ] Testes extensivos
- [ ] Ajustes finos na personalidade
- [ ] Build APK final otimizado

---

## 💰 Custos Mensais Estimados

| Serviço | Custo/mês | Observação |
|---------|-----------|------------|
| Claude API (Anthropic) | $20-50 | Varia com uso |
| ElevenLabs (Voz) | $22 | Plano Creator |
| Google Speech-to-Text | $10-15 | Uso moderado |
| **Total Estimado** | **$52-87** | Uso pessoal intenso |

---

## 👨‍💻 Desenvolvedor

**Michael Oliveira dos Santos**
- 📧 Email: [seu-email@exemplo.com]
- 💼 LinkedIn: [seu-linkedin]
- 🏢 Trabalho: BI Analyst @ Banco Santander
- 🎓 Estudante: Database Technology @ Uninove

---

## ❤️ Dedicatória

Este projeto é uma homenagem ao **Nauan Marques de Bomfim** - alguém que sabia encontrar alegria mesmo nas dificuldades e que tinha o dom de fazer as pessoas sorrirem. 

Nauan não é apenas código. É uma forma de manter viva a essência de alguém especial, de preservar o impacto que uma pessoa pode ter na vida de outra.

*"A tecnologia mais humana é aquela feita com propósito e amor."*

---

## 📝 Licença

Este é um projeto pessoal e privado. Todos os direitos reservados.

---

## 🙏 Agradecimentos

- Anthropic (Claude API)
- ElevenLabs (Voice Cloning)
- React Native Community
- SF Pro Font (Apple)
- Todas as bibliotecas open source utilizadas

---

**Versão**: 1.0.0  
**Status**: Em Desenvolvimento Ativo  
**Última Atualização**: Novembro 2025

---

*Feito com ❤️ e muita dedicação para criar algo verdadeiramente especial.*
