/**
 * HOME SCREEN
 * Tela principal com círculo Nauan e interface de chat
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { NauanCircle } from '@components/NauanCircle';
import { theme } from '@config/theme';
import { aiService } from '@services/AIService';
import {
  Message,
  NauanMood,
  PersonalityMode,
  UserSentiment,
  ConversationContext,
  MessageType,
} from '@types';
import * as Haptics from 'react-native-haptic-feedback';

export const HomeScreen: React.FC = () => {
  // Estados
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState<NauanMood>(NauanMood.IDLE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Refs
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);
  
  // Scroll para última mensagem
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [messages]);
  
  // Contexto da conversa
  const getConversationContext = (): ConversationContext => {
    const hour = new Date().getHours();
    let timeOfDay: ConversationContext['timeOfDay'];
    
    if (hour >= 6 && hour < 10) timeOfDay = 'morning';
    else if (hour >= 10 && hour < 18) timeOfDay = 'afternoon';
    else if (hour >= 18 && hour < 23) timeOfDay = 'evening';
    else timeOfDay = 'night';
    
    const dayOfWeek = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
    
    return {
      recentMessages: messages.slice(-5),
      currentSentiment: UserSentiment.NEUTRAL,
      timeOfDay,
      dayOfWeek,
      relationshipLevel: 3, // Começa como amigo
      conversationCount: 1,
      totalMessages: messages.length,
    };
  };
  
  // Envia mensagem
  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    
    const userMessage = inputText.trim();
    setInputText('');
    Haptics.trigger('impactLight');
    
    // Adiciona mensagem do usuário
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      type: MessageType.TEXT,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    setCurrentMood(NauanMood.THINKING);
    
    try {
      // Gera resposta do Nauan
      const context = getConversationContext();
      const response = await aiService.generateResponse(
        userMessage,
        context,
        PersonalityMode.DEFAULT
      );
      
      // Adiciona resposta do Nauan
      const nauanMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'nauan',
        content: response.content,
        type: MessageType.TEXT,
        timestamp: new Date(),
        sentiment: response.detectedSentiment,
        metadata: {
          mood: response.mood,
          responseTime: response.metadata.responseTime,
          wordCount: response.content.split(' ').length,
        },
      };
      
      setMessages(prev => [...prev, nauanMessage]);
      setCurrentMood(response.mood);
      
      // Simula fala (depois integrar TTS)
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), response.content.length * 50); // ~50ms por caractere
      
      Haptics.trigger('notificationSuccess');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      Haptics.trigger('notificationError');
      
      // Mensagem de erro
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'nauan',
        content: 'Opa, deu um bug aqui. Tenta de novo?',
        type: MessageType.SYSTEM,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setCurrentMood(NauanMood.IDLE);
    }
  };
  
  // Renderiza mensagem
  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    
    return (
      <Animated.View
        entering={FadeInDown.duration(300)}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.nauanMessageContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.nauanBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUser ? styles.userText : styles.nauanText,
            ]}
          >
            {item.content}
          </Text>
          
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </Animated.View>
    );
  };
  
  // Mensagem de boas-vindas
  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = 'E aí, Mika!';
    
    if (hour >= 6 && hour < 12) greeting = 'Bom dia, Mika!';
    else if (hour >= 12 && hour < 18) greeting = 'Boa tarde, Mika!';
    else if (hour >= 18 && hour < 24) greeting = 'Boa noite, Mika!';
    
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'nauan',
      content: `${greeting} Como você tá?`,
      type: MessageType.SYSTEM,
      timestamp: new Date(),
    };
    
    setMessages([welcomeMessage]);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Círculo Nauan */}
        <View style={styles.circleContainer}>
          <NauanCircle
            mood={currentMood}
            size="large"
            intensity={0.8}
            isSpeaking={isSpeaking}
            onPress={() => {
              Haptics.trigger('impactMedium');
              // Implementar ação ao clicar
            }}
            onLongPress={() => {
              Haptics.trigger('impactHeavy');
              // Implementar ação ao segurar
            }}
          />
          
          <Text style={styles.nauanName}>Nauan</Text>
        </View>
        
        {/* Lista de mensagens */}
        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          />
        </View>
        
        {/* Input de texto */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Mensagem..."
              placeholderTextColor={theme.colors.text.placeholder}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              returnKeyType="send"
              multiline
              maxLength={500}
              editable={!isLoading}
            />
            
            <Pressable
              style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!inputText.trim() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={theme.colors.text.primary} />
              ) : (
                <Text style={styles.sendButtonText}>↑</Text>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  keyboardView: {
    flex: 1,
  },
  circleContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  nauanName: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.sizes.title2.fontSize,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  messagesList: {
    paddingVertical: theme.spacing.sm,
  },
  messageContainer: {
    marginVertical: theme.spacing.xs,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  nauanMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.lg,
  },
  userBubble: {
    backgroundColor: theme.colors.accent.blue,
  },
  nauanBubble: {
    backgroundColor: theme.colors.background.elevated,
  },
  messageText: {
    fontSize: theme.typography.sizes.body.fontSize,
    lineHeight: theme.typography.sizes.body.lineHeight,
    marginBottom: theme.spacing.xs,
  },
  userText: {
    color: theme.colors.text.primary,
  },
  nauanText: {
    color: theme.colors.text.primary,
  },
  timestamp: {
    fontSize: theme.typography.sizes.caption2.fontSize,
    color: theme.colors.text.tertiary,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.separator,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.background.elevated,
    borderRadius: theme.radius.xl,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.sizes.body.fontSize,
    color: theme.colors.text.primary,
    maxHeight: 100,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.accent.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
});

export default HomeScreen;
