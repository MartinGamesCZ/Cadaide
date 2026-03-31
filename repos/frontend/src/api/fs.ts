export type FsEntry = {
  name: string;
  path: string;
  type: string;
};

export const FsAPI = {
  listDir: async (path: string) => {
    const response = await window.api.fetch(
      `/filesystem/listDir?path=${path}`,
      {
        method: "GET",
      },
    );

    return response.data.entries as FsEntry[];
  },
  readFile: async (path: string) => {
    const response = await window.api.fetch(
      `/filesystem/readFile?path=${path}`,
      {
        method: "GET",
      },
    );

    return response.data.content as string;
  },
};
