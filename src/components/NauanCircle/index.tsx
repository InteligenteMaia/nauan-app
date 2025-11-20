/**
 * NAUAN CIRCLE
 * Círculo central animado que representa o estado emocional do Nauan
 * Design inspirado no Siri/Apple Intelligence com animações fluidas
 */

import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '@config/theme';
import { NauanMood } from '@types';
import * as Haptics from 'react-native-haptic-feedback';

interface NauanCircleProps {
  mood: NauanMood;
  size?: 'small' | 'medium' | 'large';
  intensity?: number; // 0-1, intensidade da animação
  onPress?: () => void;
  onLongPress?: () => void;
  isSpeaking?: boolean;
}

const MOOD_COLORS: Record<NauanMood, string[]> = {
  [NauanMood.IDLE]: theme.colors.nauan.idle,
  [NauanMood.THINKING]: theme.colors.nauan.thinking,
  [NauanMood.SPEAKING]: theme.colors.nauan.speaking,
  [NauanMood.EXCITED]: theme.colors.nauan.excited,
  [NauanMood.ATTENTIVE]: theme.colors.nauan.attentive,
  [NauanMood.NOSTALGIC]: theme.colors.nauan.nostalgic,
};

const SIZE_MAP = {
  small: theme.dimensions.circleSize.small,
  medium: theme.dimensions.circleSize.medium,
  large: theme.dimensions.circleSize.large,
};

export const NauanCircle: React.FC<NauanCircleProps> = ({
  mood,
  size = 'medium',
  intensity = 0.7,
  onPress,
  onLongPress,
  isSpeaking = false,
}) => {
  const circleSize = SIZE_MAP[size];
  const colors = MOOD_COLORS[mood];
  
  // Animações
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const breatheScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);
  
  // Animação de respiração (sempre ativa)
  useEffect(() => {
    breatheScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    return () => {
      // Cancela animação ao desmontar
      breatheScale.value = withTiming(1, { duration: 200 });
    };
  }, []);
  
  // Animação baseada no mood
  useEffect(() => {
    switch (mood) {
      case NauanMood.THINKING:
        // Rotação contínua
        rotation.value = withRepeat(
          withTiming(360, { duration: 3000, easing: Easing.linear }),
          -1,
          false
        );
        glowOpacity.value = withTiming(0.6, { duration: 300 });
        break;

      case NauanMood.SPEAKING:
        // Pulsação rápida
        pulseScale.value = withRepeat(
          withSequence(
            withTiming(1.1, { duration: 150 }),
            withTiming(1, { duration: 150 })
          ),
          -1,
          false
        );
        glowOpacity.value = withTiming(0.8, { duration: 300 });
        break;

      case NauanMood.EXCITED:
        // Pulsação muito rápida + rotação
        pulseScale.value = withRepeat(
          withSequence(
            withTiming(1.15, { duration: 100 }),
            withTiming(1, { duration: 100 })
          ),
          -1,
          false
        );
        rotation.value = withRepeat(
          withTiming(360, { duration: 1500, easing: Easing.linear }),
          -1,
          false
        );
        glowOpacity.value = withTiming(1, { duration: 300 });
        break;

      case NauanMood.ATTENTIVE:
        // Foco suave
        pulseScale.value = withRepeat(
          withSequence(
            withTiming(1.05, { duration: 800 }),
            withTiming(1, { duration: 800 })
          ),
          -1,
          false
        );
        glowOpacity.value = withTiming(0.7, { duration: 300 });
        break;

      case NauanMood.NOSTALGIC:
        // Movimento lento e melancólico
        rotation.value = withRepeat(
          withTiming(360, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
          -1,
          false
        );
        glowOpacity.value = withTiming(0.4, { duration: 500 });
        break;

      case NauanMood.IDLE:
      default:
        // Reset para estado idle
        rotation.value = withTiming(0, { duration: 500 });
        pulseScale.value = withTiming(1, { duration: 300 });
        glowOpacity.value = withTiming(0.3, { duration: 300 });
        break;
    }

    // Cleanup ao mudar de mood
    return () => {
      rotation.value = withTiming(0, { duration: 300 });
      pulseScale.value = withTiming(1, { duration: 300 });
    };
  }, [mood]);
  
  // Animação de ondas ao falar
  const waveScale1 = useSharedValue(0);
  const waveScale2 = useSharedValue(0);
  const waveScale3 = useSharedValue(0);
  
  useEffect(() => {
    if (isSpeaking) {
      waveScale1.value = withRepeat(
        withSequence(
          withTiming(2, { duration: 1000 }),
          withTiming(0, { duration: 0 })
        ),
        -1,
        false
      );

      waveScale2.value = withRepeat(
        withSequence(
          withDelay(333, withTiming(2, { duration: 1000 })),
          withTiming(0, { duration: 0 })
        ),
        -1,
        false
      );

      waveScale3.value = withRepeat(
        withSequence(
          withDelay(666, withTiming(2, { duration: 1000 })),
          withTiming(0, { duration: 0 })
        ),
        -1,
        false
      );
    } else {
      waveScale1.value = withTiming(0, { duration: 300 });
      waveScale2.value = withTiming(0, { duration: 300 });
      waveScale3.value = withTiming(0, { duration: 300 });
    }

    // Cleanup ao desmontar ou parar de falar
    return () => {
      waveScale1.value = withTiming(0, { duration: 300 });
      waveScale2.value = withTiming(0, { duration: 300 });
      waveScale3.value = withTiming(0, { duration: 300 });
    };
  }, [isSpeaking]);
  
  // Estilos animados
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value * breatheScale.value * pulseScale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });
  
  const glowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value * intensity,
    };
  });
  
  const waveStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: waveScale1.value }],
      opacity: interpolate(waveScale1.value, [0, 1, 2], [0, 0.6, 0]),
    };
  });
  
  const waveStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: waveScale2.value }],
      opacity: interpolate(waveScale2.value, [0, 1, 2], [0, 0.4, 0]),
    };
  });
  
  const waveStyle3 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: waveScale3.value }],
      opacity: interpolate(waveScale3.value, [0, 1, 2], [0, 0.2, 0]),
    };
  });
  
  // Handlers de interação
  const handlePressIn = () => {
    scale.value = withSpring(0.95, theme.animation.spring.gentle);
    Haptics.trigger('impactLight');
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1, theme.animation.spring.bouncy);
  };
  
  const handlePress = () => {
    Haptics.trigger('impactMedium');
    onPress?.();
  };
  
  const handleLongPress = () => {
    Haptics.trigger('impactHeavy');
    onLongPress?.();
  };
  
  return (
    <View style={styles.container}>
      {/* Ondas ao falar */}
      {isSpeaking && (
        <>
          <Animated.View style={[styles.wave, waveStyle1, { width: circleSize * 2, height: circleSize * 2 }]}>
            <LinearGradient
              colors={[...colors, 'transparent']}
              style={[styles.waveGradient, { borderRadius: circleSize }]}
            />
          </Animated.View>
          
          <Animated.View style={[styles.wave, waveStyle2, { width: circleSize * 2, height: circleSize * 2 }]}>
            <LinearGradient
              colors={[...colors, 'transparent']}
              style={[styles.waveGradient, { borderRadius: circleSize }]}
            />
          </Animated.View>
          
          <Animated.View style={[styles.wave, waveStyle3, { width: circleSize * 2, height: circleSize * 2 }]}>
            <LinearGradient
              colors={[...colors, 'transparent']}
              style={[styles.waveGradient, { borderRadius: circleSize }]}
            />
          </Animated.View>
        </>
      )}
      
      {/* Glow effect */}
      <Animated.View style={[styles.glow, glowStyle]}>
        <LinearGradient
          colors={colors}
          style={[styles.glowGradient, { width: circleSize * 1.5, height: circleSize * 1.5, borderRadius: (circleSize * 1.5) / 2 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      
      {/* Círculo principal */}
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        onLongPress={handleLongPress}
      >
        <Animated.View style={[styles.circle, animatedStyle]}>
          <LinearGradient
            colors={colors}
            style={[styles.circleGradient, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          
          {/* Overlay com blur effect (simulado) */}
          <View style={[styles.overlay, { borderRadius: circleSize / 2 }]} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleGradient: {
    ...theme.shadows.xl,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  glow: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowGradient: {
    opacity: 0.6,
  },
  wave: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveGradient: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'transparent',
  },
});

export default NauanCircle;
