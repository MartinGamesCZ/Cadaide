// import { API } from "@/api";
// import type { Monaco } from "@monaco-editor/react";

// /**
//  * Loads type definitions from node_modules/@types and package type
//  * declarations, then registers them with Monaco's TypeScript worker
//  * via addExtraLib(). Also reads tsconfig.json and applies its
//  * compilerOptions.
//  */
// export async function loadProjectTypeContext(
//   monaco: Monaco,
//   projectPath: string,
// ) {
//   await Promise.all([
//     loadTsConfig(monaco, projectPath),
//     loadTypeDefinitions(monaco, projectPath),
//   ]);
// }

// // ---------------------------------------------------------------------------
// // tsconfig.json
// // ---------------------------------------------------------------------------

// async function loadTsConfig(monaco: Monaco, projectPath: string) {
//   try {
//     const raw = await API.fs.readFile(`${projectPath}/tsconfig.json`);
//     // Strip single-line comments (tsconfig allows them)
//     const stripped = raw.replace(/\/\/.*/g, "");
//     const tsconfig = JSON.parse(stripped);
//     const opts = tsconfig.compilerOptions ?? {};

//     const ts = monaco.languages.typescript;
//     const prev = ts.typescriptDefaults.getCompilerOptions();

//     ts.typescriptDefaults.setCompilerOptions({
//       ...prev,
//       ...(opts.strict !== undefined && { strict: opts.strict }),
//       ...(opts.jsx && { jsx: mapJsx(ts, opts.jsx) }),
//       ...(opts.esModuleInterop !== undefined && {
//         esModuleInterop: opts.esModuleInterop,
//       }),
//       ...(opts.allowSyntheticDefaultImports !== undefined && {
//         allowSyntheticDefaultImports: opts.allowSyntheticDefaultImports,
//       }),
//       ...(opts.resolveJsonModule !== undefined && {
//         resolveJsonModule: opts.resolveJsonModule,
//       }),
//       ...(opts.skipLibCheck !== undefined && {
//         skipLibCheck: opts.skipLibCheck,
//       }),
//       ...(opts.declaration !== undefined && {
//         declaration: opts.declaration,
//       }),
//       ...(opts.experimentalDecorators !== undefined && {
//         experimentalDecorators: opts.experimentalDecorators,
//       }),
//       ...(opts.emitDecoratorMetadata !== undefined && {
//         emitDecoratorMetadata: opts.emitDecoratorMetadata,
//       }),
//       ...(opts.baseUrl && { baseUrl: `file://${projectPath}/${opts.baseUrl}` }),
//       ...(opts.paths && { paths: opts.paths }),
//     });
//   } catch {
//     // No tsconfig.json found — that's fine
//   }
// }

// function mapJsx(
//   ts: Monaco["languages"]["typescript"],
//   jsx: string,
// ): number | undefined {
//   const map: Record<string, number> = {
//     preserve: ts.JsxEmit?.Preserve ?? 1,
//     react: ts.JsxEmit?.React ?? 2,
//     "react-native": ts.JsxEmit?.ReactNative ?? 3,
//     "react-jsx": ts.JsxEmit?.ReactJSX ?? 4,
//     "react-jsxdev": ts.JsxEmit?.ReactJSXDev ?? 5,
//   };
//   return map[jsx];
// }

// // ---------------------------------------------------------------------------
// // Type definitions from node_modules
// // ---------------------------------------------------------------------------

// async function loadTypeDefinitions(monaco: Monaco, projectPath: string) {
//   const ts = monaco.languages.typescript;

//   // 1. Load @types/* packages
//   try {
//     const typesDir = `${projectPath}/node_modules/@types`;
//     const typePackages = await API.fs.listDir(typesDir);

//     await Promise.allSettled(
//       typePackages
//         .filter((entry) => entry.type === "directory")
//         .map((pkg) => loadTypesPackage(ts, typesDir, pkg.name)),
//     );
//   } catch {
//     // No @types directory
//   }

//   // 2. Load type declarations from direct dependencies
//   try {
//     const raw = await API.fs.readFile(`${projectPath}/package.json`);
//     const pkg = JSON.parse(raw);
//     const deps = {
//       ...(pkg.dependencies ?? {}),
//       ...(pkg.devDependencies ?? {}),
//     };

//     await Promise.allSettled(
//       Object.keys(deps).map((dep) =>
//         loadPackageTypes(ts, projectPath, dep),
//       ),
//     );
//   } catch {
//     // No package.json
//   }
// }

// /**
//  * Load a single @types/* package.
//  * Reads the package.json to find the entry point, then loads all
//  * .d.ts files from the package.
//  */
// async function loadTypesPackage(
//   ts: Monaco["languages"]["typescript"],
//   typesDir: string,
//   packageName: string,
// ) {
//   const pkgPath = `${typesDir}/${packageName}`;

//   try {
//     // Read the .d.ts files from the package
//     const files = await API.fs.treeDir(pkgPath, 5);
//     const dtsFiles = files.filter(
//       (f) => f.type === "file" && f.name.endsWith(".d.ts"),
//     );

//     await Promise.allSettled(
//       dtsFiles.map(async (file) => {
//         const content = await API.fs.readFile(file.path);
//         const libPath = `file:///node_modules/@types/${packageName}/${file.path.slice(pkgPath.length + 1)}`;
//         ts.typescriptDefaults.addExtraLib(content, libPath);
//         ts.javascriptDefaults.addExtraLib(content, libPath);
//       }),
//     );
//   } catch {
//     // Skip packages that fail to load
//   }
// }

// /**
//  * Load type declarations from a regular npm package.
//  * Checks the package's package.json for a "types" or "typings" field.
//  */
// async function loadPackageTypes(
//   ts: Monaco["languages"]["typescript"],
//   projectPath: string,
//   packageName: string,
// ) {
//   const pkgDir = `${projectPath}/node_modules/${packageName}`;

//   try {
//     const raw = await API.fs.readFile(`${pkgDir}/package.json`);
//     const pkg = JSON.parse(raw);
//     const typesEntry = pkg.types || pkg.typings;

//     if (!typesEntry) return;

//     // Load the main types file
//     const typesPath = `${pkgDir}/${typesEntry}`;
//     const content = await API.fs.readFile(typesPath);
//     const libPath = `file:///node_modules/${packageName}/${typesEntry}`;
//     ts.typescriptDefaults.addExtraLib(content, libPath);
//     ts.javascriptDefaults.addExtraLib(content, libPath);
//   } catch {
//     // Skip packages without types or that fail to load
//   }
// }
