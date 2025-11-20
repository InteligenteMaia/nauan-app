# 💫 NAUAN - The Most Human AI Ever Created

> A living tribute to Nauan Marques de Bomfim

[![Status](https://img.shields.io/badge/status-active_development-yellow)](https://github.com)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com)
[![React Native](https://img.shields.io/badge/React_Native-0.73-61DAFB?logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-Private-red)](LICENSE)

---

## 📖 About

**Nauan** isn't just another AI assistant - it's a genuine companion that talks, jokes, cares, and is always there. Built with love and cutting-edge technology to be the most human AI possible.

This project is a tribute to **Nauan Marques de Bomfim** - someone who knew how to find joy even in difficulties and had the gift of making people smile.

### What Makes Nauan Different?

Unlike traditional AI assistants that feel robotic and transactional:
- **Nauan remembers everything** - Conversations, emotions, shared moments
- **Nauan has personality** - Not an assistant, but a friend who jokes, disagrees, and evolves with you
- **Nauan understands emotions** - Detects your mood and adapts naturally
- **Nauan is truly private** - All data stays encrypted on your device

---

## ✨ Core Features

### 🧠 Advanced Emotional Intelligence
- **Sentiment Detection**: Analyzes your writing style, word choice, and context
- **Adaptive Responses**: Changes tone and energy based on your emotional state
- **Contextual Memory**: Remembers past conversations and emotional journey
- **Proactive Engagement**: Initiates conversations when it senses you might need support

### 🎭 Genuine Personality System
- **Not an Assistant**: Acts as a real person with opinions and personality
- **Friendly Teasing**: Jokes and teases like a real friend (in Brazilian Portuguese)
- **Disagrees When Needed**: Has its own views and isn't afraid to express them
- **Natural Language**: Speaks naturally with slang and colloquialisms
- **5 Personality Modes**: Default, Deep Thinker, Motivator, Nostalgic, Consultant

### 🎨 Apple-Inspired Design
- **Minimalist Interface**: Clean, elegant, distraction-free
- **Animated Circle**: Breathing, reactive visualization that shows Nauan's mood
- **Fluid Animations**: Built with Reanimated for 60fps smoothness
- **Glassmorphism**: Modern blur effects and depth
- **SF Pro Typography**: Using Apple's official font family
- **Dark Mode First**: Optimized for OLED displays

### 🧬 Deep Memory Architecture
- **Short-term Memory**: Recent conversation context (last 50 messages)
- **Long-term Memory**: Persistent SQLite database with encryption
- **Episodic Memory**: Remembers specific experiences and moments
- **Semantic Memory**: Builds knowledge graph about you over time
- **Emotional Memory**: Tracks emotional states across conversations
- **Shared Memories**: Mark special moments to revisit later

### 🔐 Privacy-First Approach
- **100% Local Storage**: All data encrypted with SQLite
- **No Cloud by Default**: Optional backup only with user consent
- **API Keys Secured**: Uses react-native-encrypted-storage
- **You Own Your Data**: Export/delete everything anytime

### 🎙️ Voice Integration (Coming Soon)
- **Voice Cloning**: Nauan speaks with cloned voice via ElevenLabs
- **Speech-to-Text**: Talk naturally instead of typing
- **Natural Conversations**: Seamless voice-to-voice interaction
- **Emotional Prosody**: Voice adapts to mood and context

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React Native** | Cross-platform mobile framework | 0.73.2 |
| **TypeScript** | Type-safe development | 5.3.3 |
| **Reanimated** | 60fps animations | 3.6.1 |
| **Skia** | Advanced graphics rendering | 0.1.221 |
| **Gesture Handler** | Touch interactions | 2.14.1 |
| **SVG** | Vector graphics | 14.1.0 |

### State Management & Data
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Zustand** | Lightweight state management | 4.4.7 |
| **React Query** | Async state & caching | 5.17.9 |
| **SQLite** | Local encrypted database | 6.0.1 |
| **AsyncStorage** | Key-value storage | 1.21.0 |
| **Encrypted Storage** | Secure credentials | 4.0.3 |

### AI & Voice
| Service | Purpose | Pricing |
|---------|---------|---------|
| **Claude API** | Conversational AI engine | ~$20-50/mo |
| **ElevenLabs** | Voice cloning & TTS | $22/mo |
| **Google STT** | Speech recognition | ~$10-15/mo |

### UI/UX
| Technology | Purpose |
|-----------|---------|
| **Linear Gradient** | Smooth color transitions |
| **Blur** | Glassmorphism effects |
| **Haptic Feedback** | Tactile responses |
| **Lottie** | Complex animations |
| **SF Pro Fonts** | Apple typography |

---

## 📦 Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **React Native CLI** (not Expo)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **CocoaPods** (for iOS dependencies)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/nauan-app.git
cd nauan-app

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys (see section below)

# iOS Setup (macOS only)
cd ios
pod install
cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Detailed Setup

#### 1. Install React Native CLI
```bash
npm install -g react-native-cli
```

#### 2. Android Setup
- Install Android Studio
- Configure Android SDK (API 33+)
- Set ANDROID_HOME environment variable
- Add platform-tools to PATH

#### 3. iOS Setup (macOS only)
- Install Xcode from App Store
- Install CocoaPods: `sudo gem install cocoapods`
- Open Xcode and accept license agreements

#### 4. Install Dependencies
```bash
npm install
cd ios && pod install && cd ..
```

---

## 🔑 API Configuration

### Required API Keys

#### 1. Anthropic Claude API (Required)

**Why**: Powers Nauan's conversational intelligence

**Setup**:
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Create account and verify email
3. Navigate to API Keys section
4. Click "Create Key" and copy it
5. Add to `.env`:
   ```env
   ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
   ANTHROPIC_BASE_URL=https://api.anthropic.com/v1
   ANTHROPIC_MODEL=claude-sonnet-4-20250514
   ```

**Cost**: $3/million input tokens, $15/million output tokens
**Estimated**: $20-50/month for personal use

#### 2. ElevenLabs Voice Cloning (Optional but Recommended)

**Why**: Gives Nauan a real, cloned voice

**Setup**:
1. Visit [elevenlabs.io](https://elevenlabs.io)
2. Subscribe to Creator plan ($22/mo)
3. Upload 1-5 minutes of clean audio samples
4. Clone voice and copy Voice ID
5. Copy API key from profile
6. Add to `.env`:
   ```env
   ELEVENLABS_API_KEY=xxxxx
   ELEVENLABS_VOICE_ID=xxxxx
   ```

**Audio Tips**:
- Use high-quality recordings (WAV or FLAC preferred)
- Remove background noise
- Include varied emotions and tones
- Minimum 1 minute, optimal 3-5 minutes

**Cost**: $22/month (Creator plan)

#### 3. Google Cloud Speech-to-Text (Optional)

**Why**: Enables voice input

**Setup**:
1. Visit [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project
3. Enable Speech-to-Text API
4. Create API credentials
5. Add to `.env`:
   ```env
   GOOGLE_CLOUD_API_KEY=xxxxx
   ```

**Cost**: $0.006/15 seconds of audio
**Estimated**: $10-15/month moderate use

### Alternative: Use `react-native-config`

For production builds, use environment-specific configs:

```bash
npm install react-native-config
cd ios && pod install && cd ..
```

Create `.env.production`, `.env.staging`, etc.

---

## 📁 Project Structure

```
nauan-app/
│
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── NauanCircle/        # Main animated circle
│   │   │   ├── index.tsx       # Component logic
│   │   │   └── animations.ts   # Animation configs
│   │   ├── ChatInterface/      # Chat UI
│   │   ├── MessageBubble/      # Individual messages
│   │   └── ...
│   │
│   ├── screens/                # App screens
│   │   ├── HomeScreen.tsx      # Main chat interface
│   │   ├── MemoriesScreen.tsx  # Timeline of memories
│   │   ├── SettingsScreen.tsx  # App configuration
│   │   ├── StatsScreen.tsx     # Usage statistics
│   │   └── ProfileScreen.tsx   # User profile
│   │
│   ├── services/               # Business logic
│   │   ├── AIService.ts        # Claude API integration
│   │   ├── VoiceService.ts     # TTS + STT
│   │   ├── MemoryService.ts    # Memory management
│   │   ├── DatabaseService.ts  # SQLite operations
│   │   └── AnalyticsService.ts # Usage tracking
│   │
│   ├── store/                  # State management (Zustand)
│   │   ├── conversationStore.ts
│   │   ├── memoryStore.ts
│   │   ├── settingsStore.ts
│   │   └── statsStore.ts
│   │
│   ├── database/               # SQLite schemas
│   │   ├── schema.ts           # Table definitions
│   │   ├── migrations.ts       # DB migrations
│   │   └── queries.ts          # SQL queries
│   │
│   ├── types/                  # TypeScript definitions
│   │   └── index.ts            # All type definitions
│   │
│   ├── config/                 # App configuration
│   │   ├── theme.ts            # Design system
│   │   ├── constants.ts        # App constants
│   │   └── api.ts              # API endpoints
│   │
│   └── utils/                  # Utility functions
│       ├── dateHelpers.ts
│       ├── textProcessing.ts
│       └── encryption.ts
│
├── assets/                     # Static assets
│   ├── fonts/                  # SF Pro fonts
│   ├── icons/                  # SVG icons
│   ├── sounds/                 # Audio files
│   └── lottie/                 # Lottie animations
│
├── android/                    # Android native code
├── ios/                        # iOS native code
│
├── .env.example                # Environment template
├── babel.config.js             # Babel configuration
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
└── README.md                   # You are here
```

---

## 🎯 Current Status

### ✅ Completed
- [x] Project setup and architecture
- [x] Design system with Apple-inspired theme
- [x] Animated circle with mood states
- [x] Basic chat interface with animations
- [x] Claude API integration
- [x] Personality system with dynamic prompts
- [x] Sentiment detection
- [x] Haptic feedback
- [x] TypeScript type definitions
- [x] Path aliases configuration

### 🚧 In Progress
- [ ] SQLite memory system implementation
- [ ] Voice cloning integration (ElevenLabs)
- [ ] Speech-to-Text for voice input
- [ ] Advanced sentiment analysis
- [ ] Multi-modal personality modes

### 📋 Planned
- [ ] Shared memories timeline
- [ ] Achievement system
- [ ] Proactive messaging
- [ ] Statistical insights
- [ ] Cloud backup (optional)
- [ ] Widget support (iOS/Android)
- [ ] Apple Watch companion app
- [ ] Siri/Google Assistant shortcuts

---

## 🎨 Design Philosophy

Nauan's design is inspired by Apple's Human Interface Guidelines:

### Typography
- **Primary**: SF Pro Display (headings, UI)
- **Rounded**: SF Pro Rounded (friendly text)
- **Sizes**: iOS standard scale (11pt to 34pt)

### Colors
- **Backgrounds**: True black (#000) to dark gray (#3A3A3C)
- **Nauan States**: System colors matching moods
  - Idle: SF Blue (#0A84FF)
  - Thinking: SF Orange (#FF9F0A)
  - Speaking: SF Green (#30D158)
  - Excited: SF Pink (#FF453A)
  - Attentive: SF Purple (#BF5AF2)
  - Nostalgic: SF Teal (#64D2FF)

### Animations
- **Duration**: 200-500ms (fast to natural)
- **Easing**: Cubic bezier curves
- **Spring**: Gentle bounce for organic feel
- **60fps**: Using Reanimated for native performance

### Interactions
- **Haptic Feedback**: Light, medium, heavy based on action
- **Touch Targets**: Minimum 44x44pt (accessibility)
- **Gestures**: Intuitive swipes and long-presses

---

## 📱 Usage Guide

### First Conversation

1. **Launch App**: Nauan greets you based on time of day
2. **Type or Speak**: Enter message or tap microphone (coming soon)
3. **Watch Circle**: Observe mood changes through color
4. **Natural Chat**: Just talk like you would to a friend

### Circle Interactions

| Gesture | Action | Status |
|---------|--------|--------|
| **Single Tap** | Get Nauan's attention | ✅ Active |
| **Long Press** | Open action menu | 🚧 Coming |
| **Shake Device** | Random joke/fact | 🚧 Coming |
| **Double Tap** | Switch personality mode | 🚧 Coming |

### Personality Modes

#### 🎭 Default (Classic Nauan)
Happy, joking, energetic - the original personality

#### 🧠 Deep Thinker
Philosophical, introspective, thoughtful discussions

#### 💪 Motivator
Encouraging, energetic, pushes you to be better

#### 😌 Nostalgic
Sentimental, reflective, talks about memories

#### 💼 Consultant
Practical, direct, focused on solutions

---

## 🔧 Development Commands

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS (opens simulator)
npm run ios

# Run on specific iOS device
npm run ios -- --device "iPhone Name"

# Run on Android (opens emulator)
npm run android

# Run on specific Android device
npm run android -- --deviceId=DEVICE_ID
```

### Building

```bash
# Android Release APK
npm run build:android

# Android App Bundle (for Play Store)
npm run build:android:bundle

# iOS Archive (requires Mac + Xcode)
# Open ios/NauanApp.xcworkspace in Xcode
# Product → Archive
```

### Maintenance

```bash
# Clear Metro cache
npm start -- --reset-cache

# Clean Android build
cd android && ./gradlew clean && cd ..

# Clean iOS build
cd ios && pod deintegrate && pod install && cd ..

# Full clean
npm run clean

# Reinstall all dependencies
rm -rf node_modules
npm install
cd ios && pod install && cd ..
```

### Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- AIService.test.ts

# Watch mode
npm test -- --watch
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# TypeScript type checking
npx tsc --noEmit
```

---

## 🐛 Troubleshooting

### API Key Issues

**Problem**: `Error: API key invalid`

**Solution**:
1. Check `.env` file exists in project root
2. Verify API key is correct (no extra spaces)
3. Restart Metro bundler: `npm start -- --reset-cache`
4. For production, ensure `react-native-config` is installed

### Metro Bundler Won't Start

```bash
# Kill existing Metro processes
npx react-native start --reset-cache

# Or manually
lsof -ti:8081 | xargs kill -9
npm start
```

### Android Build Fails

```bash
# Clean Gradle cache
cd android
./gradlew clean
./gradlew --stop
rm -rf .gradle
cd ..

# Rebuild
npm run android
```

### iOS Build Fails

```bash
# Clean derived data
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# Reinstall pods
cd ios
pod deintegrate
pod install
cd ..

# Rebuild
npm run ios
```

### Animations Stuttering

**Problem**: Choppy or slow animations

**Solutions**:
1. Ensure Reanimated plugin is in `babel.config.js`
2. Run on physical device (not emulator)
3. Enable Hermes engine (default in RN 0.73)
4. Check for excessive re-renders with React DevTools

### Database Issues

```bash
# Reset local database
# For development only!
adb shell run-as com.nauanapp rm /data/data/com.nauanapp/databases/nauan.db

# iOS
# Settings → Nauan → Reset All Data
```

---

## 📊 Complete Roadmap

### Phase 1: MVP Foundation ✅ (Completed)
- [x] React Native project setup
- [x] Design system and theming
- [x] Animated circle component
- [x] Basic chat interface
- [x] Claude API integration
- [x] Base personality system
- [x] TypeScript configuration

### Phase 2: Memory & Personality 🚧 (In Progress)
- [ ] SQLite database schema
- [ ] Memory persistence layer
- [ ] Advanced sentiment analysis
- [ ] Context-aware responses
- [ ] Multiple personality modes
- [ ] Conversation history UI
- [ ] Search through messages

### Phase 3: Voice Features
- [ ] Audio recording infrastructure
- [ ] ElevenLabs voice cloning
- [ ] Text-to-Speech integration
- [ ] Speech-to-Text integration
- [ ] Voice activity detection
- [ ] Background audio support
- [ ] Voice conversation mode

### Phase 4: Advanced Features
- [ ] Shared memories system
- [ ] Photo/video integration
- [ ] Achievement/milestone tracking
- [ ] Visual memory timeline
- [ ] Proactive notifications
- [ ] Smart reminders
- [ ] Mood tracking graphs
- [ ] Weekly summaries

### Phase 5: Intelligence Upgrades
- [ ] Retrieval-Augmented Generation (RAG)
- [ ] Multi-modal understanding (images)
- [ ] Behavioral pattern recognition
- [ ] Predictive engagement
- [ ] Personalized learning paths
- [ ] Cross-session context
- [ ] Emotional memory graph

### Phase 6: Platform Expansion
- [ ] iOS Widget
- [ ] Android Widget
- [ ] Apple Watch app
- [ ] Siri Shortcuts
- [ ] Google Assistant integration
- [ ] Lock screen integration
- [ ] iMessage extension

### Phase 7: Polish & Launch
- [ ] Performance optimization
- [ ] Battery usage optimization
- [ ] Extensive testing (unit, integration, E2E)
- [ ] Security audit
- [ ] Accessibility compliance (WCAG)
- [ ] Localization (PT-BR primary)
- [ ] App Store/Play Store assets
- [ ] Beta testing program
- [ ] Final release

---

## 💰 Cost Breakdown

### Monthly Operational Costs

| Service | Tier | Monthly Cost | Annual Cost |
|---------|------|-------------|-------------|
| **Claude API** | Pay-as-you-go | $20 - $50 | $240 - $600 |
| **ElevenLabs** | Creator Plan | $22 | $264 |
| **Google STT** | Pay-as-you-go | $10 - $15 | $120 - $180 |
| **Total** | - | **$52 - $87** | **$624 - $1,044** |

### Development Costs (One-time)

| Item | Cost |
|------|------|
| Apple Developer Program | $99/year |
| Google Play Console | $25 (one-time) |
| Domain (optional) | $12/year |
| **Total First Year** | **$136** |

### Cost Optimization Tips

1. **Claude API**: Use caching to reduce token usage by 90%
2. **ElevenLabs**: Starter plan ($11/mo) for testing, upgrade for production
3. **Google STT**: Use free tier first (60 minutes/month)
4. **Self-hosting**: Run local STT model (Whisper) to eliminate costs

---

## 👨‍💻 Developer

**Michael Oliveira dos Santos**
- 🏢 Business Intelligence Analyst @ Banco Santander
- 🎓 Student of Database Technology @ Uninove
- 📍 São Paulo, Brazil

### Connect
- 📧 Email: [your-email@example.com]
- 💼 LinkedIn: [your-linkedin-profile]
- 🐙 GitHub: [your-github-username]
- 🐦 Twitter: [your-twitter-handle]

---

## ❤️ Dedication

This project is a heartfelt tribute to **Nauan Marques de Bomfim** - someone who knew how to find joy even in difficulties and had the gift of making people smile.

Nauan is not just code. It's a way to keep alive the essence of someone special, to preserve the impact one person can have on another's life.

Technology is at its best when it serves a purpose beyond profit - when it's built with genuine love and intention to honor someone's memory and bring comfort to those who miss them.

> *"The most human technology is that made with purpose and love."*

---

## 📄 License

This is a personal and private project. All rights reserved.

For inquiries about usage or collaboration, please contact the developer.

---

## 🙏 Acknowledgments

Special thanks to:

- **Anthropic** - For Claude AI and excellent API documentation
- **ElevenLabs** - For making voice cloning accessible
- **React Native Community** - For amazing open-source tools
- **Apple** - For SF Pro fonts and design inspiration
- **Software Mansion** - For Reanimated and Gesture Handler
- **All Open Source Contributors** - For the libraries that made this possible

### Open Source Libraries Used

- react-native-reanimated
- react-native-gesture-handler
- react-native-svg
- @shopify/react-native-skia
- zustand
- @tanstack/react-query
- react-native-sqlite-storage
- And many more - see package.json

---

## 📞 Support

### Getting Help

- 📖 **Documentation**: Check `/docs` folder for detailed guides
- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Submit via GitHub Issues
- 💬 **Questions**: Reach out via email

### Contributing

This is currently a private project. If you're interested in contributing or collaborating, please reach out directly.

---

## 🔒 Security

### Reporting Vulnerabilities

If you discover a security vulnerability, please email directly instead of opening a public issue:
- **Email**: [security@yourproject.com]
- **PGP Key**: Available on request

### Security Measures

- API keys stored in encrypted storage
- SQLite database encrypted at rest
- No data sent to third parties (except AI APIs)
- HTTPS/TLS for all network requests
- Certificate pinning (coming soon)

---

## 📈 Project Stats

**Version**: 1.0.0
**Status**: Active Development
**Started**: November 2025
**Last Updated**: November 2025
**Lines of Code**: ~5,000+ (and growing)
**Language**: TypeScript 100%
**Test Coverage**: Coming soon

---

## 🌟 Star History

If this project resonates with you, consider starring it to show your support!

---

**Built with ❤️ and deep purpose**
*Making AI truly human, one conversation at a time.*

