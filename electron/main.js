const { app, BrowserWindow } = require('electron')
// 在你文件顶部导入 Node.js 的 path 模块
const path = require('node:path')

// const NODE_ENV = process.env.NODE_ENV
const NODE_ENV = 'prod' // 判断开发或生产模式(建议写成这种,开发模式就可以用,等即将打包了再把这个变量换成打包模式)

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载 index.html
    // mainWindow.loadFile('dist/index.html') // 此处跟electron官网路径不同，需要注意
    mainWindow.loadURL(
        NODE_ENV === 'development'
            ? 'http://localhost:5173'
            : `file://${path.join(__dirname, '../dist/index.html')}`
    );
    // 打开开发工具
    if (NODE_ENV === "development") {
        mainWindow.webContents.openDevTools()
    }

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})