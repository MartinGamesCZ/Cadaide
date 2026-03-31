const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  fetch: (endpoint: string, options: any) =>
    ipcRenderer.invoke("api-request", endpoint, options),
  openSelectDirectoryDialog: () => ipcRenderer.invoke("dialog:openDirectory"),
  setActivity: (file: string) =>
    ipcRenderer.invoke("discord-rpc:setActivity", file),
});
