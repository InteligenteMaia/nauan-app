/**
 * NAUAN DESIGN SYSTEM
 * Inspirado no design elegante e minimalista da Apple
 * Foco em tipografia, espaçamento e animações suaves
 */

export const theme = {
  // Paleta de cores principal
  colors: {
    // Backgrounds
    background: {
      primary: '#000000',      // Preto profundo
      secondary: '#1C1C1E',    // Cinza escuro
      tertiary: '#2C2C2E',     // Cinza médio
      elevated: '#3A3A3C',     // Cinza elevado
      glass: 'rgba(28, 28, 30, 0.7)', // Efeito glassmorphism
    },
    
    // Cores do círculo Nauan (estados)
    nauan: {
      idle: ['#0A84FF', '#5E5CE6'],        // Azul SF
      thinking: ['#FF9F0A', '#FFD60A'],    // Dourado
      speaking: ['#30D158', '#32D74B'],    // Verde vibrante
      excited: ['#FF453A', '#FF6961'],     // Vermelho/Rosa
      attentive: ['#BF5AF2', '#DA70D6'],   // Roxo
      nostalgic: ['#64D2FF', '#5AC8FA'],   // Azul claro
    },
    
    // Textos
    text: {
      primary: '#FFFFFF',      // Branco puro
      secondary: '#EBEBF599',  // Branco secundário (60% opacity)
      tertiary: '#EBEBF54D',   // Terciário (30% opacity)
      disabled: '#8E8E93',     // Cinza desabilitado
      placeholder: '#636366',  // Placeholder
    },
    
    // Accent colors
    accent: {
      blue: '#0A84FF',         // SF Blue
      green: '#30D158',        // SF Green
      orange: '#FF9F0A',       // SF Orange
      red: '#FF453A',          // SF Red
      purple: '#BF5AF2',       // SF Purple
      teal: '#64D2FF',         // SF Teal
    },
    
    // Sistema
    system: {
      error: '#FF453A',
      success: '#30D158',
      warning: '#FF9F0A',
      info: '#0A84FF',
    },
    
    // Overlays e divisores
    separator: 'rgba(84, 84, 88, 0.65)',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  
  // Tipografia SF Pro (Sistema da Apple)
  typography: {
    fonts: {
      regular: 'SF-Pro-Display-Regular',
      medium: 'SF-Pro-Display-Medium',
      semibold: 'SF-Pro-Display-Semibold',
      bold: 'SF-Pro-Display-Bold',
      rounded: 'SF-Pro-Rounded-Regular',
      roundedBold: 'SF-Pro-Rounded-Bold',
    },
    
    sizes: {
      // Large Titles
      largeTitle: {
        fontSize: 34,
        lineHeight: 41,
        letterSpacing: 0.37,
      },
      
      // Titles
      title1: {
        fontSize: 28,
        lineHeight: 34,
        letterSpacing: 0.36,
      },
      title2: {
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: 0.35,
      },
      title3: {
        fontSize: 20,
        lineHeight: 25,
        letterSpacing: 0.38,
      },
      
      // Headlines
      headline: {
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.43,
      },
      
      // Body
      body: {
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.43,
      },
      
      // Callout
      callout: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: -0.32,
      },
      
      // Subheadline
      subheadline: {
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: -0.24,
      },
      
      // Footnote
      footnote: {
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: -0.08,
      },
      
      // Caption
      caption1: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0,
      },
      caption2: {
        fontSize: 11,
        lineHeight: 13,
        letterSpacing: 0.06,
      },
    },
  },
  
  // Espaçamentos
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Border radius
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
    round: 9999,
  },
  
  // Shadows (estilo iOS)
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.20,
      shadowRadius: 3.84,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 6.27,
      elevation: 6,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 12,
    },
  },
  
  // Animações (durações em ms)
  animation: {
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 800,
    
    // Spring configs (para React Native Reanimated)
    spring: {
      default: {
        damping: 20,
        stiffness: 300,
        mass: 1,
      },
      gentle: {
        damping: 25,
        stiffness: 200,
        mass: 1,
      },
      bouncy: {
        damping: 15,
        stiffness: 400,
        mass: 1,
      },
    },
    
    // Timing configs
    timing: {
      easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.58, 1)',
      easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
      linear: 'linear',
    },
  },
  
  // Dimensões
  dimensions: {
    // Círculo Nauan
    circleSize: {
      small: 120,
      medium: 180,
      large: 240,
    },
    
    // Input heights
    inputHeight: {
      sm: 36,
      md: 44,
      lg: 52,
    },
    
    // Ícones
    iconSize: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
    },
  },
  
  // Blur effects
  blur: {
    light: 20,
    medium: 40,
    heavy: 80,
  },
} as const;

export type Theme = typeof theme;

// Helper para criar variantes de cor com opacidade
export const withOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`);
  }
  
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Helper para gradientes
export const createGradient = (colors: string[]): string[] => colors;

export default theme;
