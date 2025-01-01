declare module 'react-native-svg' {
    import React from 'react';
    import { ViewProps } from 'react-native';
  
    export interface SvgProps extends ViewProps {
      width?: number | string;
      height?: number | string;
      fill?: string;
      viewBox?: string;
    }
  
    export class Svg extends React.Component<SvgProps> {}
    export class Circle extends React.Component<SvgProps> {}
    export class Ellipse extends React.Component<SvgProps> {}
    export class G extends React.Component<SvgProps> {}
    export class Text extends React.Component<SvgProps> {}
    export class TSpan extends React.Component<SvgProps> {}
    export class TextPath extends React.Component<SvgProps> {}
    export class Path extends React.Component<SvgProps> {}
    export class Polygon extends React.Component<SvgProps> {}
    export class Polyline extends React.Component<SvgProps> {}
    export class Line extends React.Component<SvgProps> {}
    export class Rect extends React.Component<SvgProps> {}
    export class Use extends React.Component<SvgProps> {}
    export class Image extends React.Component<SvgProps> {}
    export class Symbol extends React.Component<SvgProps> {}
    export class Defs extends React.Component<SvgProps> {}
    export class LinearGradient extends React.Component<SvgProps> {}
    export class RadialGradient extends React.Component<SvgProps> {}
    export class Stop extends React.Component<SvgProps> {}
    export class ClipPath extends React.Component<SvgProps> {}
    export class Pattern extends React.Component<SvgProps> {}
    export class Mask extends React.Component<SvgProps> {}
  }
  