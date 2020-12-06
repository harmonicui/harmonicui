import { Properties as CSSProperties } from 'csstype'

export type TailwindComponent = { [k: string]: CSSProperties | { [K: string]: string | CSSProperties } }

type ThemeValue = string | string[] | number | { [key: string]: ThemeValue } | undefined;

interface Theme {
  [key: string]: {
    [value: string]: NonNullable<ThemeValue>;
  };
}

type CorePluginsArray = string[];

interface CorePluginsObject {
  [k: string]: boolean;
}

type CorePlugins = boolean | CorePluginsArray | CorePluginsObject;

type Variants = string[];

interface AddComponentsOptionsObject {
  respectPrefix?: boolean;
  variants?: Variants;
}

type AddComponentsOptions = AddComponentsOptionsObject | Variants;

interface VariantsObject {
  [utility: string]: Variants;
}

type PurgeContent = string[];
type PurgeMode = 'layers' | 'conservative' | 'all';
type Layer = 'base' | 'components' | 'utilities';

interface PurgeOptions {
  content: PurgeContent;
  enabled?: boolean;
  layers: Layer[];
  mode?: PurgeMode;
  preserveHtmlElements?: boolean;
  options?: {
    defaultExtractor?: (content: string) => string[];
    whitelist?: string[];
    whitelistPatterns?: string[];
  }
}

type Purge = PurgeOptions | PurgeContent | boolean;

interface Future {
  removeDeprecatedGapUtilities?: boolean;
  purgeLayersByDefault?: boolean;
}

interface ExperimentalOptions {
  applyComplexClasses?: boolean;
  darkModeVariant?: boolean;
  defaultLineHeights?: boolean;
  extendedFontSizeScale?: boolean;
  extendedSpacingScale?: boolean;
  uniformColorPalette?: boolean;
}

type Experimental = ExperimentalOptions | 'all';

type TargetValue = 'ie11' | 'relaxed';

type TargetOverridesPerPlugin = {
  [plugin: string]: TargetValue;
}

type Target = TargetValue | [TargetValue, TargetOverridesPerPlugin];

export interface TailwindCSSConfig {
  purge?: Purge;
  important?: boolean | string;
  prefix?: string;
  separator?: string;
  theme?: Theme;
  corePlugins?: CorePlugins;
  plugins?: Plugin[];
  variants?: VariantsObject;
  future?: Future;
  experimental?: Experimental;
  target?: Target;
}

export interface TailwindUtils {
  addComponents: (components: TailwindComponent, options?: AddComponentsOptions) => void
  theme: <Default extends ThemeValue>(path: string, defaultValue?: Default) => ThemeValue | Default
  e: (className: string) => string
}
