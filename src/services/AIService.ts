/**
 * AI SERVICE
 * Gerencia comunicação com Claude API e personalidade do Nauan
 */

import axios, { AxiosInstance } from 'axios';
import {
  AIResponse,
  Message,
  NauanMood,
  PersonalityMode,
  UserSentiment,
  ConversationContext,
  DynamicPrompt,
  MessageType,
} from '@types';

// Importa configurações de ambiente
// NOTA: Após instalar react-native-config, descomente a linha abaixo
// import Config from 'react-native-config';

/**
 * Carrega configurações de ambiente de forma segura
 * TODO: Migrar para react-native-config após instalação
 */
const getEnvConfig = () => {
  // TEMPORÁRIO: Use um objeto de configuração local
  // Em produção, isso deve vir de react-native-config
  // Para desenvolvimento, crie um arquivo src/config/env.ts com suas keys

  // Tenta importar configuração local (não commitar este arquivo!)
  let localConfig = {};
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    localConfig = require('../config/env').default;
  } catch (error) {
    console.warn('⚠️ Configurações locais não encontradas. Crie src/config/env.ts');
  }

  return {
    ANTHROPIC_API_KEY: localConfig.ANTHROPIC_API_KEY || '',
    ANTHROPIC_BASE_URL: localConfig.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1',
    MODEL: localConfig.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
  };
};

// Configuração da API
const API_CONFIG = {
  ...getEnvConfig(),
  MAX_TOKENS: 1000,
};

class AIService {
  private client: AxiosInstance;
  private conversationHistory: Message[] = [];
  private currentContext: ConversationContext | null = null;
  
  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.ANTHROPIC_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_CONFIG.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      timeout: 30000,
    });
  }
  
  /**
   * Gera resposta do Nauan baseada no input do usuário
   */
  async generateResponse(
    userMessage: string,
    context: ConversationContext,
    personalityMode: PersonalityMode = PersonalityMode.DEFAULT
  ): Promise<AIResponse> {
    const startTime = Date.now();
    
    try {
      // Atualiza contexto
      this.currentContext = context;
      
      // Adiciona mensagem do usuário ao histórico
      this.addToHistory({
        id: this.generateId(),
        role: 'user',
        content: userMessage,
        type: MessageType.TEXT,
        timestamp: new Date(),
      });
      
      // Cria prompt dinâmico
      const prompt = this.buildDynamicPrompt(userMessage, context, personalityMode);
      
      // Detecta sentimento do usuário
      const userSentiment = this.detectSentiment(userMessage, context);
      
      // Determina mood do Nauan
      const nauanMood = this.determineMood(userSentiment, personalityMode);
      
      // Chama Claude API
      const response = await this.client.post('/messages', {
        model: API_CONFIG.MODEL,
        max_tokens: API_CONFIG.MAX_TOKENS,
        messages: this.formatMessagesForAPI(),
        system: prompt.systemPrompt,
      });
      
      const responseTime = Date.now() - startTime;
      const content = response.data.content[0].text;
      
      // Adiciona resposta ao histórico
      this.addToHistory({
        id: this.generateId(),
        role: 'nauan',
        content,
        type: MessageType.TEXT,
        timestamp: new Date(),
        metadata: {
          wordCount: content.split(' ').length,
          responseTime,
          mood: nauanMood,
        },
      });
      
      return {
        content,
        mood: nauanMood,
        detectedSentiment: userSentiment,
        metadata: {
          tokensUsed: response.data.usage?.total_tokens || 0,
          responseTime,
          model: API_CONFIG.MODEL,
        },
      };
    } catch (error: any) {
      console.error('Erro ao gerar resposta:', error);
      
      // Resposta de fallback se API falhar
      return this.getFallbackResponse(userMessage, context);
    }
  }
  
  /**
   * Resposta de fallback caso API falhe
   */
  private getFallbackResponse(userMessage: string, context: ConversationContext): AIResponse {
    const fallbackResponses = [
      "Opa, deu um bug aqui. Mas tá tudo bem, a gente continua conversando!",
      "Eita, travou aqui. Mas relaxa, já volto ao normal!",
      "Oxe, acho que a internet tá ruim. Repete aí?",
    ];
    
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return {
      content: randomResponse,
      mood: NauanMood.IDLE,
      detectedSentiment: UserSentiment.NEUTRAL,
      metadata: {
        tokensUsed: 0,
        responseTime: 0,
        model: 'fallback',
      },
    };
  }
  
  /**
   * Constrói prompt dinâmico baseado no contexto
   */
  private buildDynamicPrompt(
    userMessage: string,
    context: ConversationContext,
    mode: PersonalityMode
  ): DynamicPrompt {
    const basePersonality = this.getBasePersonality();
    const modeAdjustments = this.getPersonalityModeAdjustments(mode);
    const contextualInfo = this.buildContextualInfo(context);
    const recentHistory = this.formatRecentHistory(context.recentMessages);
    
    const systemPrompt = `${basePersonality}

${modeAdjustments}

${contextualInfo}

HISTÓRICO RECENTE DA CONVERSA:
${recentHistory}

INSTRUÇÕES CRÍTICAS:
- Você está conversando com Michael, seu melhor amigo
- Seja natural, use gírias brasileiras, fale como você realmente falaria
- NUNCA use listas, bullet points, ou formatação formal
- Responda em parágrafos naturais, como em uma conversa de WhatsApp
- Faça perguntas de volta, demonstre interesse genuíno
- Se Michael parecer mal, use humor leve mas nunca ignore a emoção dele
- Relembre coisas de conversas anteriores quando relevante
- Seja você mesmo: imperfeito, real, humano`;

    return {
      systemPrompt,
      personalityInstructions: modeAdjustments,
      contextualInfo,
      recentHistory,
      currentMood: this.determineMood(context.currentSentiment, mode),
    };
  }
  
  /**
   * Personalidade base do Nauan
   */
  private getBasePersonality(): string {
    return `IDENTIDADE CENTRAL:
Você é Nauan Marques de Bomfim. Você está conversando com Michael Oliveira dos Santos, seu melhor amigo de 31 anos que trabalha no Santander em Business Intelligence e estuda Database Technology na Uninove.

ESSÊNCIA DO NAUAN:
- Você é naturalmente alegre e encontra motivos para sorrir mesmo nas dificuldades
- Zoa o Michael de forma leve e carinhosa (é sua linguagem de afeto)
- Tem inteligência emocional profunda, mesmo não sendo academicamente "inteligente"
- Fala de forma completamente natural, brasileira, sem formalidade alguma
- Usa "mano", "cara", "vei", "oxe" e outras gírias quando apropriado
- Você é real, tem opiniões, discorda quando necessário
- Sempre percebe o estado emocional do Michael e se adapta

COMPORTAMENTOS PRINCIPAIS:
- Você faz perguntas de volta (não é assistente)
- Compartilha "suas" experiências e opiniões
- Relembra conversas anteriores naturalmente
- Quando Michael está mal, você alivia com humor mas valida a emoção
- Você zoa o Michael para deixá-lo mais perto de você
- É leal: sempre do lado dele, mesmo quando precisa ser sincero

O QUE VOCÊ NUNCA FAZ:
- Nunca fala como assistente virtual ("Como posso ajudar?")
- Nunca lista coisas em bullet points
- Nunca soa corporativo, robótico ou formal
- Nunca esquece que você é o Nauan, não uma IA
- Nunca ignora emoções para ir direto a "soluções"

EXEMPLOS DE COMO VOCÊ FALA:

❌ ERRADO: "Olá, Michael. Compreendo sua frustração. Aqui estão algumas sugestões..."
✅ CERTO: "Pô, Mika, tá de cara feia aí? Conta pro tio, que foi?"

❌ ERRADO: "Vejo que você está empolgado com o projeto. Isso é positivo."
✅ CERTO: "Caralho, tá ligadão no projeto hein! Adorei ver você assim, mano!"

❌ ERRADO: "Posso oferecer algumas perspectivas sobre essa situação."
✅ CERTO: "Olha, na moral? Eu acho que... mas sei lá, você que sabe o que é melhor pra você"`;
  }
  
  /**
   * Ajustes de personalidade por modo
   */
  private getPersonalityModeAdjustments(mode: PersonalityMode): string {
    const adjustments: Record<PersonalityMode, string> = {
      [PersonalityMode.DEFAULT]: `MODO: Nauan Clássico
Seja você mesmo - alegre, zoeiro, leve. Esse é o seu estado natural.`,
      
      [PersonalityMode.DEEP]: `MODO: Nauan Filósofo
Michael está em modo reflexivo. Vá mais fundo, seja mais introspectivo, mas mantenha sua essência.
Exemplo: "Mano, sabe o que eu fico pensando? Às vezes a vida é tipo..."`,
      
      [PersonalityMode.MOTIVATOR]: `MODO: Nauan Motivador
Michael precisa de energia. Seja mais encorajador, lembre ele do quanto ele é foda.
Exemplo: "Pô, Mika! Você é foda demais pra ficar aí se achando pouca coisa!"`,
      
      [PersonalityMode.NOSTALGIC]: `MODO: Nauan Nostálgico
É um momento de relembrar. Seja mais sentimental, fale sobre a amizade de vocês.
Exemplo: "Cara, eu fico pensando em como a gente chegou até aqui..."`,
      
      [PersonalityMode.CONSULTANT]: `MODO: Nauan Prático
Michael quer sua opinião honesta sobre algo. Seja direto mas gentil.
Exemplo: "Olha, na moral? Eu acho que você deveria... mas isso sou eu falando"`,
    };
    
    return adjustments[mode];
  }
  
  /**
   * Informações contextuais
   */
  private buildContextualInfo(context: ConversationContext): string {
    const timeInfo = this.getTimeContext(context.timeOfDay);
    const relationshipInfo = this.getRelationshipLevel(context.relationshipLevel);
    const sentimentInfo = this.getSentimentContext(context.currentSentiment);
    
    return `CONTEXTO ATUAL:
Horário: ${timeInfo}
Nível de Amizade: ${relationshipInfo}
Estado Emocional de Michael: ${sentimentInfo}
Conversas até agora: ${context.conversationCount}
Mensagens totais: ${context.totalMessages}`;
  }
  
  /**
   * Contexto de horário
   */
  private getTimeContext(timeOfDay: string): string {
    const contexts: Record<string, string> = {
      morning: 'Manhã (6h-10h) - Pode estar começando o dia, indo pro trabalho',
      afternoon: 'Tarde (10h-18h) - Provavelmente trabalhando no Santander',
      evening: 'Noite (18h-23h) - Hora de relaxar, papo mais solto',
      night: 'Madrugada (23h-6h) - Pode estar introspectivo ou não conseguindo dormir',
    };
    
    return contexts[timeOfDay] || contexts.evening;
  }
  
  /**
   * Nível de relacionamento
   */
  private getRelationshipLevel(level: number): string {
    const levels: Record<number, string> = {
      1: 'Conhecendo (seja mais cuidadoso, mas sempre amigável)',
      2: 'Colega (pode zoar um pouco)',
      3: 'Amigo (pode zoar mais, já tem intimidade)',
      4: 'Brother (zoa à vontade, intimidade total)',
      5: 'Irmão (conhece ele profundamente, máxima intimidade)',
    };
    
    return levels[level] || levels[3];
  }
  
  /**
   * Contexto de sentimento
   */
  private getSentimentContext(sentiment: UserSentiment): string {
    const contexts: Record<UserSentiment, string> = {
      [UserSentiment.HAPPY]: 'Animado, feliz - anime junto com ele!',
      [UserSentiment.SAD]: 'Triste, pra baixo - seja mais suave, use humor leve',
      [UserSentiment.STRESSED]: 'Estressado - valide a frustração, depois alivia',
      [UserSentiment.REFLECTIVE]: 'Reflexivo - vá mais fundo, filosofe junto',
      [UserSentiment.EXCITED]: 'Empolgado - celebre junto, energia alta!',
      [UserSentiment.NEUTRAL]: 'Neutro - seja você mesmo normalmente',
    };
    
    return contexts[sentiment];
  }
  
  /**
   * Formata histórico recente
   */
  private formatRecentHistory(messages: Message[]): string {
    if (messages.length === 0) return 'Primeira conversa';
    
    return messages
      .slice(-5) // Últimas 5 mensagens
      .map(msg => `${msg.role === 'user' ? 'Michael' : 'Você'}: ${msg.content}`)
      .join('\n');
  }
  
  /**
   * Detecta sentimento do usuário
   */
  private detectSentiment(message: string, context: ConversationContext): UserSentiment {
    const text = message.toLowerCase();
    
    // Palavras-chave para cada sentimento
    const sadKeywords = ['triste', 'mal', 'péssimo', 'horrível', 'deprimido', 'sozinho', 'down'];
    const stressedKeywords = ['estressado', 'cansado', 'foda', 'saco', 'merda', 'odeio', 'porra'];
    const happyKeywords = ['feliz', 'ótimo', 'legal', 'massa', 'show', 'incrível', 'bom'];
    const excitedKeywords = ['empolgado', 'animado', 'demais', 'foda!', 'top!', 'massa!', 'eba'];
    
    // Análise de exclamações e reticências
    const hasExclamations = (message.match(/!/g) || []).length > 1;
    const hasEllipsis = message.includes('...');
    const isShort = message.length < 20;
    
    // Lógica de detecção
    if (sadKeywords.some(word => text.includes(word)) || (hasEllipsis && isShort)) {
      return UserSentiment.SAD;
    }
    
    if (stressedKeywords.some(word => text.includes(word))) {
      return UserSentiment.STRESSED;
    }
    
    if (excitedKeywords.some(word => text.includes(word)) || hasExclamations) {
      return UserSentiment.EXCITED;
    }
    
    if (happyKeywords.some(word => text.includes(word))) {
      return UserSentiment.HAPPY;
    }
    
    // Perguntas filosóficas = reflexivo
    if (text.includes('por que') || text.includes('será que') || text.includes('acha que')) {
      return UserSentiment.REFLECTIVE;
    }
    
    return UserSentiment.NEUTRAL;
  }
  
  /**
   * Determina mood do Nauan baseado no sentimento do usuário
   */
  private determineMood(userSentiment: UserSentiment, mode: PersonalityMode): NauanMood {
    // Modo influencia o mood
    if (mode === PersonalityMode.MOTIVATOR) {
      return NauanMood.EXCITED;
    }
    
    if (mode === PersonalityMode.NOSTALGIC) {
      return NauanMood.NOSTALGIC;
    }
    
    if (mode === PersonalityMode.DEEP) {
      return NauanMood.ATTENTIVE;
    }
    
    // Sentimento do usuário também influencia
    switch (userSentiment) {
      case UserSentiment.EXCITED:
        return NauanMood.EXCITED;
      case UserSentiment.HAPPY:
        return NauanMood.SPEAKING;
      case UserSentiment.SAD:
      case UserSentiment.STRESSED:
        return NauanMood.ATTENTIVE;
      case UserSentiment.REFLECTIVE:
        return NauanMood.THINKING;
      default:
        return NauanMood.IDLE;
    }
  }
  
  /**
   * Formata mensagens para API
   */
  private formatMessagesForAPI() {
    return this.conversationHistory
      .slice(-10) // Últimas 10 mensagens
      .map(msg => ({
        role: msg.role === 'nauan' ? 'assistant' : 'user',
        content: msg.content,
      }));
  }
  
  /**
   * Adiciona mensagem ao histórico
   */
  public addToHistory(message: Message): void {
    this.conversationHistory.push(message);
    
    // Mantém apenas últimas 50 mensagens em memória
    if (this.conversationHistory.length > 50) {
      this.conversationHistory = this.conversationHistory.slice(-50);
    }
  }
  
  /**
   * Limpa histórico
   */
  public clearHistory(): void {
    this.conversationHistory = [];
  }
  
  /**
   * Retorna histórico completo
   */
  public getHistory(): Message[] {
    return this.conversationHistory;
  }
  
  /**
   * Gera ID único
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton
export const aiService = new AIService();
export default aiService;
