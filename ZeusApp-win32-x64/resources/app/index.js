const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Carga la aplicación React desde la carpeta "build"
    mainWindow.loadFile(path.join(__dirname, "build", "index.html"));

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
