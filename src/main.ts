import * as monaco from "monaco-editor";
import prettier from "prettier/standalone";
import "./style.css";

console.log(prettier);

const app = document.querySelector<HTMLDivElement>("#app")!;

const modelUri = monaco.Uri.file("file.tsx");

monaco.languages.typescript.typescriptDefaults.addExtraLib(
  `declare module "react/jsx-runtime"`,
  "global.d.ts"
);

const STORAGE_KEY = "monaco-editor-value";

const initialContent = localStorage.getItem(STORAGE_KEY) ?? "";

const codeModel = monaco.editor.createModel(
  initialContent,
  "typescript",
  modelUri
);

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
});

monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: false,
  noSyntaxValidation: false,
});

const editor = monaco.editor.create(app, {
  theme: "vs-dark",
  language: "typescript",
  formatOnType: false,
  fontSize: 36,
  tabSize: 2,
  padding: { top: 30, bottom: 30 },
  lineNumbersMinChars: 3,
  minimap: {
    enabled: true,
  },
  scrollbar: {
    useShadows: false,
  },
  mouseWheelZoom: true,
});

editor.setModel(codeModel);

codeModel.onDidChangeContent(() => {
  const newValue = editor.getValue();
  console.log(newValue);
  localStorage.setItem(STORAGE_KEY, newValue);
});

window.addEventListener("resize", function () {
  editor.layout();
});
