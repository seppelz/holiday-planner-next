'use client';

interface StatePageStylesProps {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
}

function adjustColorForContrast(color: string): string {
  // If color is white or very light, darken it slightly for better contrast
  if (color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fff') {
    return '#f0f0f0';
  }
  // If color is black or very dark, lighten it slightly
  if (color.toLowerCase() === '#000000' || color.toLowerCase() === '#000') {
    return '#1a1a1a';
  }
  return color;
}

function getContrastColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor).split(',').map(Number);
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff';
}

function createColorVariables(color: string, prefix: string): string {
  const adjustedColor = adjustColorForContrast(color);
  return `
    --state-${prefix}-color: ${adjustedColor};
    --state-${prefix}-rgb: ${hexToRgb(adjustedColor)};
    --state-${prefix}-light: color-mix(in srgb, ${adjustedColor} 85%, white);
    --state-${prefix}-lighter: color-mix(in srgb, ${adjustedColor} 92%, white);
    --state-${prefix}-dark: color-mix(in srgb, ${adjustedColor} 80%, black);
    --state-${prefix}-darker: color-mix(in srgb, ${adjustedColor} 60%, black);
    --state-${prefix}-alpha-5: rgba(${hexToRgb(adjustedColor)}, 0.05);
    --state-${prefix}-alpha-10: rgba(${hexToRgb(adjustedColor)}, 0.1);
    --state-${prefix}-alpha-20: rgba(${hexToRgb(adjustedColor)}, 0.2);
    --state-${prefix}-contrast: ${getContrastColor(adjustedColor)};
    --state-${prefix}-contrast-rgb: ${hexToRgb(getContrastColor(adjustedColor))};
  `;
}

function hexToRgb(hex: string): string {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

export default function StatePageStyles({ primaryColor, secondaryColor, tertiaryColor }: StatePageStylesProps) {
  // Adjust colors for better contrast
  const adjustedPrimary = adjustColorForContrast(primaryColor);
  const adjustedSecondary = adjustColorForContrast(secondaryColor);
  const adjustedTertiary = tertiaryColor ? adjustColorForContrast(tertiaryColor) : undefined;

  const gradients = `
    --state-gradient-hero: ${
      tertiaryColor 
        ? `linear-gradient(135deg, 
            ${adjustedPrimary} 0%, 
            ${adjustedSecondary} 50%, 
            ${adjustedTertiary} 100%
          )`
        : `linear-gradient(135deg,
            ${adjustedPrimary} 0%,
            color-mix(in srgb, ${adjustedPrimary} 50%, ${adjustedSecondary}) 35%,
            ${adjustedSecondary} 100%
          )`
    };
    
    --state-gradient-card: linear-gradient(
      135deg,
      color-mix(in srgb, ${adjustedPrimary} 5%, white) 0%,
      color-mix(in srgb, ${adjustedSecondary} 5%, white) 100%
    );
    
    --state-gradient-button: linear-gradient(
      135deg,
      ${adjustedPrimary} 0%,
      color-mix(in srgb, ${adjustedPrimary} 70%, ${adjustedSecondary}) 100%
    );

    --state-gradient-primary: linear-gradient(135deg, 
      ${adjustedPrimary} 0%, 
      ${adjustedSecondary} 100%
    );
    
    --state-gradient-subtle: linear-gradient(135deg, 
      color-mix(in srgb, ${adjustedPrimary} 15%, white) 0%, 
      color-mix(in srgb, ${adjustedSecondary} 15%, white) 100%
    );

    --state-gradient-intense: linear-gradient(135deg, 
      color-mix(in srgb, ${adjustedPrimary} 20%, black) 0%, 
      color-mix(in srgb, ${adjustedSecondary} 20%, black) 100%
    );

    /* Three color gradient if tertiary color exists */
    ${adjustedTertiary ? `
      --state-gradient-full: linear-gradient(135deg, 
        ${adjustedPrimary} 0%, 
        ${adjustedSecondary} 50%,
        ${adjustedTertiary} 100%
      );
      
      --state-gradient-subtle-full: linear-gradient(135deg, 
        color-mix(in srgb, ${adjustedPrimary} 8%, white) 0%, 
        color-mix(in srgb, ${adjustedSecondary} 8%, white) 50%,
        color-mix(in srgb, ${adjustedTertiary} 8%, white) 100%
      );
    ` : ''}
  `;

  return (
    <style jsx global>{`
      :root {
        ${createColorVariables(adjustedPrimary, 'primary')}
        ${createColorVariables(adjustedSecondary, 'secondary')}
        ${adjustedTertiary ? createColorVariables(adjustedTertiary, 'tertiary') : ''}

        /* Gradients */
        ${gradients}

        /* Background variations */
        --state-background-subtle: color-mix(in srgb, ${adjustedPrimary} 3%, white);
        --state-background-light: color-mix(in srgb, ${adjustedSecondary} 5%, white);
        --state-background-accent: color-mix(in srgb, ${adjustedPrimary} 8%, white);

        /* Text colors ensuring contrast */
        --state-text-on-primary: ${getContrastColor(adjustedPrimary)};
        --state-text-on-secondary: ${getContrastColor(adjustedSecondary)};
        ${adjustedTertiary ? `--state-text-on-tertiary: ${getContrastColor(adjustedTertiary)};` : ''}
        --state-text-on-hero: #ffffff;

        /* Border colors */
        --state-border-light: color-mix(in srgb, ${adjustedPrimary} 10%, transparent);
        --state-border-medium: color-mix(in srgb, ${adjustedPrimary} 20%, transparent);
        --state-border-strong: color-mix(in srgb, ${adjustedPrimary} 30%, transparent);

        /* Interactive states */
        --state-hover-overlay: rgba(255, 255, 255, 0.1);
        --state-active-overlay: rgba(0, 0, 0, 0.1);
        --state-focus-ring: rgba(${hexToRgb(adjustedPrimary)}, 0.5);
      }
    `}</style>
  );
}

function isColorLight(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if color is light
  return luminance > 0.5;
} 