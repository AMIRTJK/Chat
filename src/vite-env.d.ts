/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_USER_TODOLIST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
