# 🔑 Guia de Configuração de API Keys

## Método Atual (Desenvolvimento Local)

### 1. Criar arquivo de configuração

```bash
# Copie o arquivo de exemplo
cp src/config/env.example.ts src/config/env.ts
```

### 2. Editar com suas API keys

Abra `src/config/env.ts` e adicione suas keys:

```typescript
export default {
  ANTHROPIC_API_KEY: 'sk-ant-api03-XXXXXXX', // Sua key real aqui
  ANTHROPIC_BASE_URL: 'https://api.anthropic.com/v1',
  ANTHROPIC_MODEL: 'claude-sonnet-4-20250514',

  // Opcional: ElevenLabs
  ELEVENLABS_API_KEY: 'sua-key-aqui',
  ELEVENLABS_VOICE_ID: 'seu-voice-id',

  // Opcional: Google Cloud
  GOOGLE_CLOUD_API_KEY: 'sua-key-aqui',
};
```

### 3. Verificar .gitignore

**IMPORTANTE**: O arquivo `src/config/env.ts` está no `.gitignore` e **NUNCA** deve ser commitado!

```bash
# Verifique que o arquivo não será commitado
git status

# Você deve ver apenas env.example.ts, NÃO env.ts
```

---

## Método Recomendado (Produção)

### Instalar react-native-config

```bash
npm install react-native-config --save
```

### iOS Setup

```bash
cd ios
pod install
cd ..
```

### Android Setup

Edite `android/app/build.gradle`:

```gradle
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```

### Criar arquivo .env

```bash
cp .env.example .env
```

Edite `.env` com suas keys reais.

### Atualizar AIService.ts

Descomente a linha em `src/services/AIService.ts`:

```typescript
// De:
// import Config from 'react-native-config';

// Para:
import Config from 'react-native-config';

// E substitua getEnvConfig() por:
const API_CONFIG = {
  ANTHROPIC_API_KEY: Config.ANTHROPIC_API_KEY || '',
  ANTHROPIC_BASE_URL: Config.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1',
  MODEL: Config.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
  MAX_TOKENS: 1000,
};
```

---

## Obtendo API Keys

### 1. Anthropic Claude (Obrigatório)

**Custo**: ~$20-50/mês

1. Acesse [console.anthropic.com](https://console.anthropic.com)
2. Crie uma conta ou faça login
3. Vá em **API Keys**
4. Clique em **Create Key**
5. Copie a key (começa com `sk-ant-api03-`)
6. Cole em `ANTHROPIC_API_KEY`

### 2. ElevenLabs Voice (Opcional)

**Custo**: $22/mês (plano Creator)

1. Acesse [elevenlabs.io](https://elevenlabs.io)
2. Assine o plano Creator
3. Vá em **Profile** → **API Key**
4. Copie a API key
5. Cole em `ELEVENLABS_API_KEY`

**Para clonar a voz do Nauan**:

1. Prepare áudios limpos (1-5 minutos)
2. Vá em **Voice Lab** → **Add Voice**
3. Upload dos áudios
4. Copie o **Voice ID**
5. Cole em `ELEVENLABS_VOICE_ID`

### 3. Google Cloud Speech-to-Text (Opcional)

**Custo**: $0.006/15s de áudio (~$10-15/mês)

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um novo projeto
3. Ative **Speech-to-Text API**
4. Vá em **Credenciais** → **Criar Credenciais** → **API Key**
5. Copie a key
6. Cole em `GOOGLE_CLOUD_API_KEY`

---

## Segurança

### ⚠️ NUNCA faça isso:

- ❌ Commitar arquivos com API keys
- ❌ Compartilhar .env ou env.ts
- ❌ Fazer hardcode de keys no código
- ❌ Expor keys em logs ou screenshots

### ✅ Sempre faça isso:

- ✅ Mantenha .env e env.ts no .gitignore
- ✅ Use diferentes keys para dev/prod
- ✅ Revogue keys vazadas imediatamente
- ✅ Use react-native-config em produção

---

## Verificando se está funcionando

```typescript
// No AIService.ts, adicione console.log temporário
console.log('API Key configurada:', API_CONFIG.ANTHROPIC_API_KEY ? 'Sim ✅' : 'Não ❌');
```

Ao rodar o app, você deve ver:
```
API Key configurada: Sim ✅
```

Se ver "Não ❌", verifique:
1. Arquivo `src/config/env.ts` existe?
2. As keys estão preenchidas corretamente?
3. Você reiniciou o Metro bundler?

---

## Troubleshooting

### Erro: "⚠️ Configurações locais não encontradas"

**Solução**: Crie o arquivo `src/config/env.ts` copiando de `env.example.ts`

```bash
cp src/config/env.example.ts src/config/env.ts
```

### Erro: "API key invalid"

**Causas possíveis**:
1. Key incorreta ou expirada
2. Espaços extras na key
3. Key não carregada corretamente

**Solução**:
1. Verifique a key no console da Anthropic
2. Copie novamente, sem espaços
3. Reinicie o Metro bundler

### Erro: "Module not found: Can't resolve '../config/env'"

**Normal!** Isso significa que você ainda não criou o arquivo `env.ts`.

Crie o arquivo seguindo o passo 1 acima.

---

## Estrutura de Arquivos

```
nauan-app/
├── .env.example              # Template do .env (commitado)
├── .env                      # Keys reais (NÃO commitado)
├── src/
│   └── config/
│       ├── env.example.ts    # Template TypeScript (commitado)
│       └── env.ts            # Keys reais (NÃO commitado)
└── .gitignore                # Ignora .env e env.ts
```

---

## Próximos Passos

Após configurar as API keys:

1. ✅ Verificar que as keys estão funcionando
2. ✅ Testar uma conversa com o Nauan
3. ✅ (Opcional) Configurar ElevenLabs para voz
4. ✅ (Opcional) Configurar Google STT para voice input
5. ✅ Migrar para react-native-config antes de produção

---

**Dúvidas?** Consulte o [README.md](README.md) para mais informações.
