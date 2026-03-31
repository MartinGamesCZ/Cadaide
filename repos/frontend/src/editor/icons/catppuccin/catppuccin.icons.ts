import { TIconpack } from "../../icons";

export const CatppuccinIcons: TIconpack = [
  // Nest.JS
  {
    pattern: "nest-cli.json",
    icon: "catppuccin:nest",
  },
  {
    pattern: "*.module.ts",
    icon: "catppuccin:nest",
  },
  {
    pattern: "*.service.ts",
    icon: "catppuccin:nest-service",
  },
  {
    pattern: "*.controller.ts",
    icon: "catppuccin:nest-controller",
  },
  // Node.JS
  {
    pattern: "package.json",
    icon: "catppuccin:package-json",
  },
  // TypeScript
  {
    pattern: ["tsconfig.json", "tsconfig.*.json"],
    icon: "catppuccin:typescript-config",
  },
  {
    pattern: "*.ts",
    icon: "catppuccin:typescript",
  },
  // Eslint
  {
    pattern: "eslint.config.mjs",
    icon: "catppuccin:eslint",
  },
  // Bun
  {
    pattern: ["bun.lock", "bun.lockb"],
    icon: "catppuccin:bun-lock",
  },
  // Prettier
  {
    pattern: ".prettierrc",
    icon: "catppuccin:prettier",
  },
  // Git
  {
    pattern: ".gitignore",
    icon: "catppuccin:git",
  },
  // Json
  {
    pattern: "*.json",
    icon: "catppuccin:json",
  },
  // Python
  {
    pattern: "*.py",
    icon: "catppuccin:python",
  },
  {
    pattern: "pyproject.toml",
    icon: "catppuccin:python-config",
  },
  {
    pattern: "requirements.txt",
    icon: "catppuccin:python-config",
  },
  {
    pattern: "uv.lock",
    icon: "catppuccin:uv",
  },
  // Caddy
  {
    pattern: "Caddyfile",
    icon: "catppuccin:caddy",
  },
  // Env
  {
    pattern: [".env.*", "*.env", ".env"],
    icon: "catppuccin:env",
  },
  // Markdown
  {
    pattern: ["README.md", "readme.md", "Readme.md", "ReadMe.md"],
    icon: "catppuccin:readme",
  },
  {
    pattern: "*.md",
    icon: "catppuccin:markdown",
  },
  // Docker
  {
    pattern: [
      "Dockerfile",
      "Dockerfile.*",
      "*.Dockerfile",
      "dockerfile",
      "dockerfile.*",
      "*.dockerfile",
    ],
    icon: "catppuccin:docker",
  },
  {
    pattern: [
      "docker-compose.yml",
      "docker-compose.yaml",
      "docker-compose.*.yml",
      "docker-compose.*.yaml",
      "compose.yml",
      "compose.yaml",
      "compose.*.yml",
      "compose.*.yaml",
    ],
    icon: "catppuccin:docker-compose",
  },
  {
    pattern: ".dockerignore",
    icon: "catppuccin:docker-ignore",
  },
  // Txt
  {
    pattern: "*.txt",
    icon: "catppuccin:text",
  },
];

export const CatppuccinFolderIcons: TIconpack = [
  {
    pattern: "src",
    icon: "catppuccin:folder-src",
  },
  {
    pattern: "api",
    icon: "catppuccin:folder-api",
  },
  {
    pattern: "assets",
    icon: "catppuccin:folder-assets",
  },
  {
    pattern: "utils",
    icon: "catppuccin:folder-utils",
  },
  {
    pattern: "types",
    icon: "catppuccin:folder-types",
  },
  {
    pattern: "node_modules",
    icon: "catppuccin:folder-node",
  },
  {
    pattern: "dist",
    icon: "catppuccin:folder-dist",
  },
  {
    pattern: ["test", "tests"],
    icon: "catppuccin:folder-tests",
  },
  {
    pattern: "routes",
    icon: "catppuccin:folder-routes",
  },
  {
    pattern: ".vscode",
    icon: "catppuccin:folder-vscode",
  },
  {
    pattern: "packages",
    icon: "catppuccin:folder-packages",
  },
  {
    pattern: ["server", "backend", "srv"],
    icon: "catppuccin:folder-server",
  },
  {
    pattern: ["client", "frontend", "web"],
    icon: "catppuccin:folder-client",
  },
  {
    pattern: ["plugin", "plugins", "ext", "extension", "extensions"],
    icon: "catppuccin:folder-plugins",
  },
  {
    pattern: "scripts",
    icon: "catppuccin:folder-scripts",
  },
];
