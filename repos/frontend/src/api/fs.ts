import axios from "axios";

export type FsEntry = {
  name: string;
  path: string;
  type: string;
};

const _api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const FsAPI = {
  listDir: async (path: string) => {
    const response = await _api.get(`/filesystem/listDir?path=${path}`);

    return (response.data?.entries ?? []) as FsEntry[];
  },
  readFile: async (path: string) => {
    const response = await _api.get(`/filesystem/readFile?path=${path}`);

    return (response.data?.content as string) ?? "";
  },
  treeDir: async (path: string, depth: number) => {
    const response = await _api.get(
      `/filesystem/treeDir?path=${path}&depth=${depth}`,
    );

    return (response.data?.entries ?? []) as FsEntry[];
  },
  writeFile: async (path: string, content: string) => {
    const response = await _api.post(`/filesystem/writeFile`, {
      path,
      content,
    });

    return response.data;
  },
};
