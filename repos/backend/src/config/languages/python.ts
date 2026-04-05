import { ILanguageConfig } from '../languages';

export const PythonLanguageConfig: ILanguageConfig = {
  lsp: {
    command: [
      process.env.BUN_BINARY_PATH ?? 'bun',
      'x',
      '--yes',
      '-p',
      'pyright',
      'pyright-langserver',
      '--stdio',
    ],
  },
};
