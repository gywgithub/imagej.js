import {
  setupRPC
} from 'imjoy-rpc';

export async function setupImJoyAPI(imagej, getImageData) {
  const api = await setupRPC({
    name: "ImageJ.JS",
    version: "0.1.0",
    description: "ImageJ running in the browser",
    type: "rpc-window"
  });

  const service_api = {
    setup() {
      api.log("ImageJ.JS loaded successfully.");
    },
    async run(ctx) {
      if (ctx.data && ctx.data.images) {
        //TODO: load images
        for (let img of ctx.data.images) {
          this.addImage(img);
        }
      }
    },
    async addImage(img, options) {
      options = options || {}
      options.name = options.name || "tmp"
      const filepath = "/str/" + options.name
      const formats = {
        "uint8": "8-bit",
        "uint16": "16-bit Unsigned",
        "int16": "16-bit Signed",
        "uint32": "32-bit Unsigned",
        "int32": "32-bit Signed",
      }
      cheerpjAddStringFile(filepath, new Uint8Array(img._rvalue));
      let format = formats[img._rdtype];
      let number = img._rshape[2];
      if (img._rshape.length === 3) {
        if (img._rshape[2] === 3) {
          format = '[24-bit RGB]'
          number = 1;
        }
        return await imagej.run("Raw...", `open=${filepath} image=${format} width=${img._rshape[1]} height=${img._rshape[0]} number=${number}`)
      } else if (img._rshape.length === 2) {
        return await imagej.run("Raw...", `open=${filepath} image=${format} width=${img._rshape[1]} height=${img._rshape[0]}`)
      }

    },
    async getSelection() {
      const imp = await imagej.getImage();
      const bytes = await saveFileToBytes(imagej, imp, 'selection', 'tmp')
      return bytes
    },
    async addMenuItem(config) {
      // find the plugin menu
      const pluginMenu = document.querySelector("#cheerpjDisplay>.window>div.menuBar>.menu>.menuItem:nth-child(6)>ul")
      const newMenu = document.createElement('li')
      newMenu.classList.add("menuItem")
      newMenu.classList.add("subMenuItem")
      const button = document.createElement('a')
      button.innerHTML = config.label
      newMenu.appendChild(button)
      newMenu.onclick = () => {
        config.callback()
      }
      pluginMenu.appendChild(newMenu);
    },
    async getImage() {

      const data = await getImageData(imagej);
      const types = {
        0: "uint8", //GRAY8
        1: "int16", //GRAY16
        2: "uint16", //	GRAY16_UNSIGNED
        3: "uint8", //RGB
        4: "float32", //GRAY32_FLOAT
      }
      return {
        _rtype: "ndarray",
        _rvalue: data.bytes,
        _rshape: data.shape,
        _rdtype: types[data.type]
      }
    }
  };

  api.export(service_api);
}