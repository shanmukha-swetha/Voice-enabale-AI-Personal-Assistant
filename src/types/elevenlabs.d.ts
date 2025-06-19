
declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': {
      'agent-id': string;
      'data-no-popup'?: string;
      'data-inline'?: string;
      style?: React.CSSProperties;
      onClick?: (event: any) => void;
    };
  }
}
