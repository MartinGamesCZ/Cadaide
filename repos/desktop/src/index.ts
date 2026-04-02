import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { DiscordRPCModule } from "./modules/discord-rpc";
import path from "path";
import axios from "axios";

const socketAxios = axios.create({
  baseURL: "http://localhost:3001",
  //socketPath: path.join(process.cwd(), "../backend/backend.sock"),
});

let rpcModule: DiscordRPCModule | null = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(app.getAppPath(), "dist/preload.js"),
      devTools: true,
    },
  });

  win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createWindow();
  rpcModule = new DiscordRPCModule();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("api-request", async (event, endpoint, options) => {
  try {
    const response = await socketAxios({ url: endpoint, ...options });

    return { data: response.data, status: response.status };
  } catch (error: any) {
    return { error: error.message };
  }
});

ipcMain.handle("dialog:openDirectory", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (canceled) return null;
  else return filePaths[0];
});

ipcMain.handle("discord-rpc:setActivity", async (event, file: string) => {
  rpcModule?.setActivity(`Editing ${file}`);
});
