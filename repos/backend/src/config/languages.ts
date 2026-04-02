import { Language } from 'src/types/Language';
import { PythonLanguageConfig } from './languages/python';

export interface ILanguageConfig {
  lsp: {
    command: string[];
  };
}

export const LanguageConfig: {
  [key in Language]: ILanguageConfig;
} = {
  python: PythonLanguageConfig,
};
