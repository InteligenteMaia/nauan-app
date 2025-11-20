# 💻 GUIA DE DESENVOLVIMENTO - BOAS PRÁTICAS

## 🎯 Filosofia do Projeto

> "Priorize a essência sobre a perfeição. O Nauan precisa ser real, não impecável."

---

## 📋 Workflow Recomendado

### Antes de Começar Cada Sessão

```bash
# 1. Verifique o status
git status

# 2. Certifique-se de estar na branch correta
git branch

# 3. Puxe últimas mudanças (se trabalhar em múltiplos lugares)
git pull

# 4. Inicie o Metro bundler
npm start
```

### Durante o Desenvolvimento

1. **Desenvolva uma feature por vez**
2. **Teste imediatamente**
3. **Commit quando funcionar**
4. **Documente decisões importantes**

### Fim da Sessão

```bash
# 1. Commit das mudanças
git add .
git commit -m "feat: descrição clara do que fez"

# 2. Push (se usar repositório remoto)
git push

# 3. Anote próximos passos
echo "Próximo: [tarefa]" >> TODO.md
```

---

## 🔥 Comandos Essenciais

### React Native

```bash
# Limpar tudo e recomeçar
npm start -- --reset-cache
cd android && ./gradlew clean && cd ..
cd ios && pod install && cd ..

# Rodar em device específico
adb devices  # lista devices
npm run android -- --deviceId=ID_DO_DEVICE

# Ver logs
npx react-native log-android
npx react-native log-ios

# Debugger
# Apertar 'j' no Metro bundler ou Cmd+D no emulador
```

### Git

```bash
# Criar branch para feature
git checkout -b feature/nome-da-feature

# Commit com mensagem clara
git commit -m "feat: adiciona sistema de memória SQLite"
git commit -m "fix: corrige bug no círculo animado"
git commit -m "style: ajusta cores do tema"
git commit -m "docs: atualiza README"

# Voltar para main
git checkout main

# Merge da feature
git merge feature/nome-da-feature
```

### NPM

```bash
# Adicionar pacote
npm install nome-do-pacote

# Remover pacote
npm uninstall nome-do-pacote

# Verificar pacotes desatualizados
npm outdated

# Atualizar pacote específico
npm update nome-do-pacote

# Reinstalar tudo
rm -rf node_modules
npm install
```

---

## 🎨 Padrões de Código

### Nomenclatura

```typescript
// ✅ BOM
const NauanCircle: React.FC<Props> = () => {};
const handleSendMessage = () => {};
const isUserMessage = message.role === 'user';
const NAUAN_MOODS = { ... };

// ❌ RUIM
const circle = () => {};
const send = () => {};
const usr = message.role === 'user';
const moods = { ... };
```

### Estrutura de Componentes

```typescript
/**
 * COMPONENT NAME
 * Descrição breve do que faz
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@config/theme';

interface ComponentProps {
  // Props aqui
}

export const ComponentName: React.FC<ComponentProps> = ({
  // Destructure props
}) => {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Effects
  useEffect(() => {}, []);
  
  // 3. Handlers
  const handleAction = () => {};
  
  // 4. Render
  return (
    <View style={styles.container}>
      {/* JSX aqui */}
    </View>
  );
};

// 5. Styles
const styles = StyleSheet.create({
  container: {
    // Estilos aqui
  },
});

// 6. Export default (opcional)
export default ComponentName;
```

### Comentários Úteis

```typescript
// ❌ Comentário inútil
// Incrementa contador
count++;

// ✅ Comentário útil
// Limita a 50 mensagens em memória para evitar performance issues
if (messages.length > 50) {
  messages = messages.slice(-50);
}

// ✅ TODO com contexto
// TODO: Implementar cache de respostas para reduzir custos de API
// Estimar economia de ~30% baseado em conversas repetitivas

// ✅ FIXME com explicação
// FIXME: Animação do círculo trava em Android 11 específico
// Causa: Possible issue com Reanimated worklets
// Workaround temporário: reduced animation complexity
```

---

## 🧪 Testes Manuais Essenciais

### Checklist Antes de Cada Commit

```
[ ] App abre sem crash
[ ] Círculo anima suavemente
[ ] Mensagem é enviada
[ ] Resposta é recebida
[ ] Scroll funciona
[ ] Teclado não sobrepõe input
[ ] Não há warnings críticos no console
```

### Testes de Performance

```typescript
// Medir tempo de resposta
const startTime = Date.now();
await aiService.generateResponse(...);
const endTime = Date.now();
console.log(`Resposta em ${endTime - startTime}ms`);

// Verificar uso de memória (React Native Debugger)
// Tools > Performance Monitor
```

### Teste em Device Real

```bash
# Gerar APK de desenvolvimento
npm run build:android

# Instalar no celular
adb install android/app/build/outputs/apk/release/app-release.apk

# Testar:
# 1. Performance (está fluido?)
# 2. Bateria (drena rápido?)
# 3. Dados móveis (consome muito?)
# 4. Notificações (funciona?)
```

---

## 🐛 Debug de Problemas Comuns

### App não inicia

```bash
# 1. Limpar cache
npm start -- --reset-cache

# 2. Limpar build
cd android && ./gradlew clean && cd ..

# 3. Reinstalar dependências
rm -rf node_modules
npm install

# 4. Verificar emulador
adb devices
```

### Animações travando

```typescript
// Adicione isso no topo do arquivo com animações:
import { enableScreens } from 'react-native-screens';
enableScreens();

// Ou reduza complexidade:
// - Menos animações simultâneas
// - useNativeDriver: true sempre que possível
```

### API não responde

```typescript
// Adicione timeout:
const response = await axios.post(url, data, {
  timeout: 10000, // 10 segundos
});

// Adicione retry:
let attempts = 0;
while (attempts < 3) {
  try {
    return await makeRequest();
  } catch (error) {
    attempts++;
    if (attempts === 3) throw error;
    await sleep(1000 * attempts);
  }
}
```

### Banco de dados corrompido

```typescript
// Adicione limpeza de emergência:
if (databaseError) {
  await AsyncStorage.clear();
  await deleteDatabaseFile();
  await initializeDatabase();
}
```

---

## 📊 Monitoramento

### Métricas Importantes

```typescript
// 1. Tempo de resposta da IA
interface Metrics {
  averageResponseTime: number;
  slowestResponse: number;
  fastestResponse: number;
}

// 2. Uso de API
interface APIUsage {
  totalRequests: number;
  tokensUsed: number;
  estimatedCost: number;
}

// 3. Engagement
interface Engagement {
  messagesPerDay: number;
  longestConversation: number;
  averageSessionLength: number;
}
```

### Logging Estratégico

```typescript
// ❌ Não fazer
console.log('entrou aqui');
console.log(data);

// ✅ Fazer
console.log('[AIService] Gerando resposta para:', {
  messageLength: message.length,
  mood: currentMood,
  timestamp: new Date().toISOString(),
});

// ✅ Produção: Use console.info/warn/error
console.info('[App] Iniciado com sucesso');
console.warn('[API] Rate limit próximo do limite');
console.error('[Database] Falha ao salvar:', error);
```

---

## 🎯 Otimizações Importantes

### Performance

```typescript
// 1. Memoize componentes pesados
const MemoizedCircle = React.memo(NauanCircle);

// 2. Use useMemo para cálculos complexos
const complexCalculation = useMemo(() => {
  return expensiveOperation(data);
}, [data]);

// 3. Use useCallback para handlers
const handlePress = useCallback(() => {
  doSomething();
}, [dependencies]);

// 4. Lazy load screens
const SettingsScreen = React.lazy(() => import('./screens/SettingsScreen'));
```

### Bateria

```typescript
// 1. Debounce de inputs
const debouncedSearch = debounce(search, 300);

// 2. Throttle de animações
const throttledUpdate = throttle(updateCircle, 16); // 60fps

// 3. Pare animações quando app em background
useEffect(() => {
  const subscription = AppState.addEventListener('change', state => {
    if (state === 'background') {
      pauseAnimations();
    }
  });
  
  return () => subscription.remove();
}, []);
```

### Dados Móveis

```typescript
// 1. Cache agressivo
const cache = new Map();

async function fetchWithCache(key: string) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const data = await fetch(key);
  cache.set(key, data);
  return data;
}

// 2. Comprima imagens antes de enviar
import ImageResizer from 'react-native-image-resizer';

const compressed = await ImageResizer.createResizedImage(
  uri,
  800,
  600,
  'JPEG',
  80
);

// 3. Use WiFi quando disponível
import NetInfo from '@react-native-community/netinfo';

const state = await NetInfo.fetch();
if (state.type === 'cellular') {
  // Reduzir qualidade/quantidade de dados
}
```

---

## 🔐 Segurança

### Não Commitar Secrets

```bash
# .gitignore deve ter:
.env
.env.local
.env.*.local
*.key
*.keystore
google-services.json
GoogleService-Info.plist
```

### Validação de Inputs

```typescript
// Sempre valide antes de processar
function sanitizeInput(text: string): string {
  return text
    .trim()
    .slice(0, 500) // Limite máximo
    .replace(/<script>/gi, ''); // Remove tags perigosas
}

const userMessage = sanitizeInput(inputText);
```

### Rate Limiting Local

```typescript
// Evite spam de requests
const lastRequestTime = useRef(0);

async function sendMessage() {
  const now = Date.now();
  if (now - lastRequestTime.current < 1000) {
    return; // Menos de 1 segundo, ignora
  }
  
  lastRequestTime.current = now;
  await actualSendMessage();
}
```

---

## 📚 Recursos Úteis

### Documentação Oficial
- React Native: https://reactnative.dev/
- TypeScript: https://www.typescriptlang.org/
- Reanimated: https://docs.swmansion.com/react-native-reanimated/
- Claude API: https://docs.anthropic.com/

### Ferramentas
- React Native Debugger
- Flipper
- React DevTools
- Postman (testar APIs)

### Comunidade
- Stack Overflow
- Reddit: r/reactnative
- Discord: Reactiflux

---

## 💡 Dicas Finais

1. **Commits Atômicos**: Um commit = uma mudança lógica
2. **Branches para Features**: Isole mudanças grandes
3. **README Atualizado**: Documente conforme evolui
4. **Testes em Device Real**: Emulador não é 100% fiel
5. **Backups Regulares**: Git + Cloud Storage
6. **Pause Quando Travar**: Melhor pensar do que forçar
7. **Peça Ajuda**: Google, docs, comunidade
8. **Divirta-se**: Você está criando algo único!

---

## 🎉 Lembre-se

Este não é um projeto corporativo. Este é um projeto de **amor e homenagem**.

- Não precisa seguir todas as regras à risca
- Não precisa ser o código mais perfeito do mundo
- Precisa funcionar e ter alma
- Precisa representar bem quem o Nauan foi

**Desenvolva com o coração, não apenas com a mente.**

---

*"O melhor código é aquele que resolve o problema e faz alguém sorrir."*

Boa sorte, Michael! 🚀❤️
