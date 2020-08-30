import { setupImJoyAPI } from "./imjoyAPI.js";
import Snackbar from "node-snackbar/dist/snackbar";
import "node-snackbar/dist/snackbar.css";

// setup a hook for fixing mobile touch event
const _createElement = document.createElement;
document.createElement = function (type){
    const elm = _createElement.call(document, type);
    elm.addEventListener("touchstart", (ev)=>{
        elm.click();
        ev.preventDefault();
    }, false);
    return elm
}

window.onSaveFileSelected = (name)=>{
    debugger
}

window.openURL = (url) =>{
    window.open(url);
}

const writingQueue = {};

async function startImageJ() {
  cheerpjInit({
    enableInputMethods: true,
    clipboardMode: "system"
  });
  
  const appContainer = document.getElementById("app-container");
  cheerpjCreateDisplay(-1, -1, appContainer);
  cheerpjRunStaticMethod(
    threads[0],
    "java/lang/System",
    cjSystemSetProperty,
    "user.dir",
    "/files"
  );
  cheerpjRunStaticMethod(
    threads[0],
    "java/lang/System",
    cjSystemSetProperty,
    "plugins.dir",
    "/app/ij153/plugins"
  );
  cheerpjRunMain(
    "ij.ImageJ",
    "/app/ij153/ij.jar:/app/ij153/plugins/Thunder_STORM.jar",
  );

  const ij = await getImageJInstance();
  // turn on debug mode
  // cjCall("ij.IJ", "setDebugMode", true)
    // setup file saving hook
    Snackbar.show({text:"ImageJ.JS is ready.", pos: 'bottom-left'}); 
    const _cheerpjWriteAsync = window.cheerpjWriteAsync
    window.cheerpjWriteAsync = function (fds, fd, buf, off, len, p){
        writingQueue[fd] = 1;
        return _cheerpjWriteAsync.apply(null, arguments);
    }
    const _cheerpjCloseAsync = window.cheerpjCloseAsync;
    window.cheerpjCloseAsync = function (fds, fd, p){
        if(writingQueue[fd]){
            delete writingQueue[fd];
            const fdObj = fds[fd];
            const fileData = fdObj.fileData;
            const tmp =fileData.path.split('/');
            const filename = tmp[tmp.length-1];
            downloadBytesFile(fileData.chunks, filename)
            _cheerpjCloseAsync.apply(null, arguments);
            // remove the file after downloading
            // cheerpOSUnlinkAsync(fileData.path, p)
        }
        else{
          _cheerpjCloseAsync.apply(null, arguments);
        }
    }
    const imagej_api = {
    run: await cjResolveCall("ij.IJ", "run", [
      "java.lang.String",
      "java.lang.String"
    ]),
    showStatus: await cjResolveCall("ij.IJ", "showStatus", [
      "java.lang.String"
    ]),
    showMessage: await cjResolveCall("ij.IJ", "showMessage", [
      "java.lang.String",
      "java.lang.String"
    ]),
    runPlugIn: await cjResolveCall("ij.IJ", "runPlugIn", [
      "java.lang.String",
      "java.lang.String"
    ]),
    runMacro: await cjResolveCall("ij.IJ", "runMacro", [
      "java.lang.String",
      "java.lang.String"
    ]),
    open: await cjResolveCall("ij.IJ", "open", ["java.lang.String"]),
    installPlugin: await cjResolveCall("ij.Menus", "installPlugin", null),
    getPlugins: await cjResolveCall("ij.Menus", "getPlugins", []),
    getPlugInsPath: await cjResolveCall("ij.Menus", "getPlugInsPath", []),
    getImage: await cjResolveCall("ij.IJ", "getImage", []),
    save: await cjResolveCall("ij.IJ", "save", [
      "ij.ImagePlus",
      "java.lang.String"
    ]),
    saveAs: await cjResolveCall("ij.IJ", "saveAs", [
      "ij.ImagePlus",
      "java.lang.String",
      "java.lang.String"
    ]),
    getString: await cjResolveCall("ij.IJ", "getString", [
      "java.lang.String",
      "java.lang.String"
    ]),
    listDir: await cjResolveCall("ij.IJ", "listDir", [
      "java.lang.String"
    ]),
    removeFile: await cjResolveCall("ij.IJ", "removeFile", [
      "java.lang.String"
    ]),
    openAsBytes: await cjResolveCall("ij.IJ", "openAsBytes", [
      "java.lang.String"
    ]),
    saveBytes: await cjResolveCall("ij.IJ", "saveBytes", null),
    // updateImageJMenus: await cjResolveCall("ij.Menus", "updateImageJMenus", null),
    // getPrefsDir: await cjResolveCall("ij.Prefs", "getPrefsDir", null),
  };
  return imagej_api;
}

async function listFiles(imagej, path){
  const files = await imagej.listDir(path)
  return files.map(cjStringJavaToJs);
}

async function mountFile(file) {
  const filepath = "/str/" + file.name;
  const bytes = await readFile(file);
  cheerpjAddStringFile(filepath, bytes);
  return filepath;
}

async function getImageData(imagej) {
  const imp = await imagej.getImage();
  const name = cjStringJavaToJs(await cjCall(imp, "getTitle"));
  const width = await cjCall(imp, "getWidth");
  const height = await cjCall(imp, "getHeight");
  const slices = await cjCall(imp, "getNSlices");
  const channels = await cjCall(imp, "getNChannels");
  const frames = await cjCall(imp, "getNFrames");
  const type = await cjCall(imp, "getType");
  const bytes = await saveFileToBytes(imagej, imp, "raw", name);
  const shape = [height.value0, width.value0, channels.value0];
  if (slices.value0 && slices.value0 !== 1) {
    shape.push(slices.value0);
  }
  if (frames.value0 && frames.value0 !== 1) {
    shape.push(frames.value0);
  }
  return {
    type: type.value0,
    shape: shape,
    bytes
  };
}

function saveFileToBytes(imagej, imp, format, filename) {
  return new Promise(async (resolve, reject) => {
    await imagej.saveAs(imp, format, "/files/" + filename);
    const request = indexedDB.open("cjFS_/files/");
    request.onerror = function(event) {
      console.error("Failed to read file", event);
      reject("Failed to open file system");
    };
    request.onsuccess = function(event) {
      const db = event.target.result;
      var transaction = db.transaction(["files"], "readwrite");
      var objectStore = transaction.objectStore("files");
      const req = objectStore.get("/" + filename);
      req.onsuccess = e => {
        const fileBytes = e.target.result.contents;
        objectStore.delete("/" + filename);
        resolve(fileBytes);
      };
      req.onerror = () => {
        reject("Failed to read file: " + filename);
      };
    };
  });
}

async function saveImage(imagej, filename, format, ext) {
  format = format || "tiff";

  const imp = await imagej.getImage();
  const original_name = cjStringJavaToJs(await cjCall(imp, "getTitle"));
  filename =
    filename ||
    cjStringJavaToJs(
      await imagej.getString(
        "Saving file as ",
        original_name.split(".")[0] + (ext || "." + format)
      )
    );
  if (filename) {
    const fileBytes = await saveFileToBytes(imagej, imp, format, filename);
    downloadBytesFile([fileBytes.buffer], filename)
  }
}

function downloadBytesFile(fileByteArray, filename){
  const blob = new Blob(fileByteArray, {
    type: "application/octet-stream"
  });

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

function openImage(imagej, path) {
  if (path) {
    return imagej.open(filepath);
  }
  const fileInput = document.getElementById("open-file");
  fileInput.onchange = () => {
    const files = fileInput.files;
    for (let i = 0, len = files.length; i < len; i++) {
      if(files[i].name.endsWith('.jar') || files[i].name.endsWith('.jar.js')){
        saveFileToFS(imagej, files[i]);
      }
      else{
        mountFile(files[i]).then(filepath => {
          imagej.open(filepath);
        });
      }

    }
    fileInput.value = "";
  };
  fileInput.click();
}

async function saveFileToFS(imagej, file){
  const bytes = await readFile(file);
  await imagej.saveBytes(bytes, '/files/plugins/'+file.name);
  console.log(await listFiles(imagej, '/files/plugins/'));
}

async function fixMenu(imagej) {
  const removes = [
    "Open Samples",
    "Show Folder",
    "Copy to System",
    "Install...",
    "Compile and Run...",
    "Capture Screen",
    "Capture Delayed...",
    "Capture Image"
  ];
  const items = document.querySelectorAll(
    "#cheerpjDisplay>.window:nth-child(2) li > a"
  );
  for (let it of items) {
    it.text = it.text.trim();
    if (removes.includes(it.text)) {
      // remove li
      const el = it.parentNode;
      el.parentNode.removeChild(el);
    } else if (it.text === "Open...") {
      const openNode = it.parentNode;
      const openMenu = openNode.cloneNode(true);
      it.text = "Open Internal"
      openMenu.onclick = e => {
        e.stopPropagation();
        openImage(imagej);
      };
      openNode.parentNode.insertBefore(openMenu, openNode)
      
    }
  }
}

function setupDragAndDrop(imagej) {
  const appContainer = document.getElementById("app-container");
  const dragOverlay = document.getElementById("drag-overlay");

  appContainer.addEventListener(
    "dragenter",
    e => {
      if (e.dataTransfer.types.includes("Files")) {
        e.preventDefault();
        e.stopPropagation();
        dragOverlay.style.display = "block";
      }
    },
    false
  );
  appContainer.addEventListener(
    "dragover",
    e => {
      if (e.dataTransfer.types.includes("Files")) {
        e.preventDefault();
        e.stopPropagation();
        dragOverlay.style.display = "block";
      }
    },
    false
  );
  appContainer.addEventListener(
    "dragleave",
    e => {
      if (e.dataTransfer.types.includes("Files")) {
        e.preventDefault();
        e.stopPropagation();
        dragOverlay.style.display = "none";
      }
    },
    false
  );
  appContainer.addEventListener(
    "drop",
    e => {
      if (e.dataTransfer.types.includes("Files")) {
        e.preventDefault();
        e.stopPropagation();
        const data = e.dataTransfer,
          files = data.files;
        for (let i = 0, len = files.length; i < len; i++) {
          if(files[i].name.endsWith('.jar') || files[i].name.endsWith('.jar.js')){
            saveFileToFS(imagej, files[i]);
          }
          else{
            mountFile(files[i]).then(filepath => {
              imagej.open(filepath);
            });
          }

        }
        dragOverlay.style.display = "none";
      }
    },
    false
  );
}

function getImageJInstance() {
  return new Promise(resolve => {
    async function tryIJ() {
      const ij = await cjCall("ij.IJ", "getInstance");
      if (!ij) {
        setTimeout(tryIJ, 500);
      } else {
        resolve(ij);
      }
    }
    tryIJ();
  });
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function() {
      const arrayBuffer = reader.result;
      const bytes = new Uint8Array(arrayBuffer);
      resolve(bytes);
    };
    reader.onerror = function(e) {
      reject(e);
    };
  });
}

function fixHeight() {
  // fix ios height issue
  function resetHeight() {
    // reset the body height to that of the inner browser
    document.body.style.height = window.innerHeight + "px";
  }
  // reset the height whenever the window's resized
  window.addEventListener("resize", resetHeight);
  // called to initially set the height.
  resetHeight();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register("/service-worker.js").then(
        function(registration) {
          // Registration was successful
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function(err) {
          // registration failed :(
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }
}

registerServiceWorker();
fixHeight();
startImageJ().then(imagej => {
  setupDragAndDrop(imagej);
  setTimeout(() => {
    fixMenu(imagej);
  }, 2000);

  // if inside an iframe, setup ImJoy
  if (window.self !== window.top) {
    setupImJoyAPI(imagej, getImageData, saveFileToBytes, saveImage, openImage);
  }
});
