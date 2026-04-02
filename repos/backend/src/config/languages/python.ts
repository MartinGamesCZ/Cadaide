import { ILanguageConfig } from '../languages';

export const PythonLanguageConfig: ILanguageConfig = {
  lsp: {
    command: ['npx', '--yes', '-p', 'pyright', 'pyright-langserver', '--stdio'],
  },
};
