const { ipcRenderer, contextBridge } = require("electron");

const path = require("path");
const fs = require("fs");
const send = (handler) =>
  ipcRenderer.once(handler, (event, result) => {
    return window.postMessage(result);
  });
contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  batteryApi: {},
  filesApi: {},
  runScan: (_id) => {
    ipcRenderer.invoke("execute", _id);
    // console.log(res);
    send("scanResult");
    // return res;
  },
  register: (data) => {
    ipcRenderer.invoke("register", data).then((result) => {});
    send("reg-stats");
  },
  match: (data) => {
    ipcRenderer.invoke("match", data).then((result) => {});
    send("match-res");
  },
  uploadDP: (data) => {
    ipcRenderer.invoke("upload-dp", data).then((result) => {});
    send("upload-dp-res");
  },
  stats: () => {
    ipcRenderer.invoke("get-stats").then((result) => {});
    send("stats-res");
  },
  report: (id) => {
    ipcRenderer.invoke("get-report", id).then((result) => {});
    send("report-res");
  },
  login: (data) => {
    ipcRenderer.invoke("get-login", data).then((result) => {});
    send("login-res");
  },
  path: path,
});
