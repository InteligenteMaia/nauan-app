/**
 * ARQUIVO DE CONFIGURAÇÃO LOCAL
 *
 * IMPORTANTE:
 * 1. Copie este arquivo para src/config/env.ts
 * 2. Preencha com suas API keys reais
 * 3. NUNCA commite o arquivo env.ts (já está no .gitignore)
 *
 * Este é um fallback temporário até que react-native-config seja configurado.
 */

export default {
  // Anthropic Claude API
  ANTHROPIC_API_KEY: 'sk-ant-api03-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  ANTHROPIC_BASE_URL: 'https://api.anthropic.com/v1',
  ANTHROPIC_MODEL: 'claude-sonnet-4-20250514',

  // ElevenLabs (Voice Cloning) - Opcional
  ELEVENLABS_API_KEY: 'your-elevenlabs-api-key-here',
  ELEVENLABS_VOICE_ID: 'your-voice-id-here',

  // Google Cloud Speech-to-Text - Opcional
  GOOGLE_CLOUD_API_KEY: 'your-google-cloud-api-key-here',
};
