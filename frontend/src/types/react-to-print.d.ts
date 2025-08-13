declare module 'react-to-print' {
  import { ReactInstance } from 'react';

  interface UseReactToPrintOptions {
    content: () => ReactInstance | null;
    documentTitle?: string;
    onBeforeGetContent?: () => void | Promise<void>;
    onBeforePrint?: () => void | Promise<void>;
    onAfterPrint?: () => void;
    removeAfterPrint?: boolean;
    suppressErrors?: boolean;
  }

  export function useReactToPrint(options: UseReactToPrintOptions): () => void;
}
