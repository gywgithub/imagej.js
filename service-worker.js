if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let e=Promise.resolve();return i[s]||(e=new Promise(async e=>{if("document"in self){const i=document.createElement("script");i.src=s,document.head.appendChild(i),i.onload=e}else importScripts(s),e()})),e.then(()=>{if(!i[s])throw new Error(`Module ${s} didn’t register its module`);return i[s]})},e=(e,i)=>{Promise.all(e.map(s)).then(s=>i(1===s.length?s[0]:s))},i={require:Promise.resolve(e)};self.define=(e,o,n)=>{i[e]||(i[e]=Promise.resolve().then(()=>{let i={};const a={uri:location.origin+e.slice(1)};return Promise.all(o.map(e=>{switch(e){case"exports":return i;case"module":return a;default:return s(e)}})).then(s=>{const e=n(...s);return i.default||(i.default=e),i})}))}}define("./service-worker.js",["./workbox-61aa104a"],(function(s){"use strict";s.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"1.index.js",revision:"e6337b1f83c577673218db9a0d95b8dc"},{url:"2.index.js",revision:"4f691c8c5b2f49a9e0191d1edbe74326"},{url:"3.index.js",revision:"b174505f9e17f38a9224ae40723cffeb"},{url:"CNAME",revision:"e2097ae457c8bf14e1ce299ba1a053c7"},{url:"assets/css/micromodal.css",revision:"1bc455ff0d195fe330cfcb0e4200a6bc"},{url:"assets/icons/android/android-launchericon-144-144.png",revision:"44f4993415ad915d1c2965b779c517c2"},{url:"assets/icons/android/android-launchericon-192-192.png",revision:"89dcc05232a5432140a8100603fa76ca"},{url:"assets/icons/android/android-launchericon-48-48.png",revision:"309ba59ef7542b92ba3c84538f37481f"},{url:"assets/icons/android/android-launchericon-512-512.png",revision:"befc62231aadce932764f673f996389c"},{url:"assets/icons/android/android-launchericon-72-72.png",revision:"99e2ab875c56f3a7f443cfd245ac3aa0"},{url:"assets/icons/android/android-launchericon-96-96.png",revision:"a8cfedf4354310d82c003480d2b19ecb"},{url:"assets/icons/chrome/chrome-extensionmanagementpage-48-48.png",revision:"309ba59ef7542b92ba3c84538f37481f"},{url:"assets/icons/chrome/chrome-favicon-16-16.png",revision:"ad558917755a285947de2d96f7e690af"},{url:"assets/icons/chrome/chrome-installprocess-128-128.png",revision:"428caa05d2aa66862bcf6b9c1732db41"},{url:"assets/icons/firefox/firefox-general-128-128.png",revision:"428caa05d2aa66862bcf6b9c1732db41"},{url:"assets/icons/firefox/firefox-general-16-16.png",revision:"ad558917755a285947de2d96f7e690af"},{url:"assets/icons/firefox/firefox-general-256-256.png",revision:"8b2235cb0565f68a20327cd4a9ab7a5e"},{url:"assets/icons/firefox/firefox-general-32-32.png",revision:"be3bd6d5ec3d986005353f6bb3b9497a"},{url:"assets/icons/firefox/firefox-general-48-48.png",revision:"309ba59ef7542b92ba3c84538f37481f"},{url:"assets/icons/firefox/firefox-general-64-64.png",revision:"659416fa736ad2a9ca91040ae6be2ce6"},{url:"assets/icons/firefox/firefox-general-90-90.png",revision:"1d1aa73c1a530831f849ea5721efc42a"},{url:"assets/icons/firefox/firefox-marketplace-128-128.png",revision:"428caa05d2aa66862bcf6b9c1732db41"},{url:"assets/icons/firefox/firefox-marketplace-512-512.png",revision:"befc62231aadce932764f673f996389c"},{url:"assets/icons/msteams/msteams-192-192.png",revision:"89dcc05232a5432140a8100603fa76ca"},{url:"assets/icons/msteams/msteams-silhouette-32-32.png",revision:"be3bd6d5ec3d986005353f6bb3b9497a"},{url:"assets/icons/windows/windows-smallsquare-24-24.png",revision:"8cf9b73811fbb632a78fb9fbfa4f6360"},{url:"assets/icons/windows/windows-smallsquare-30-30.png",revision:"fa0b94a85ead65b214ee51ca8cb73f21"},{url:"assets/icons/windows/windows-smallsquare-42-42.png",revision:"2cd2dbe62e217a18a8da06ef4acc9da5"},{url:"assets/icons/windows/windows-smallsquare-54-54.png",revision:"5def0fccdb52eb138208706aaede4822"},{url:"assets/icons/windows/windows-splashscreen-1116-540.png",revision:"eb92ae4faf9d15fbe771bb72525713b5"},{url:"assets/icons/windows/windows-splashscreen-620-300.png",revision:"744b894c4e5fe7845fbcef60328b539c"},{url:"assets/icons/windows/windows-splashscreen-868-420.png",revision:"3116b760f7f547e18309daf61b65f36d"},{url:"assets/icons/windows/windows-squarelogo-120-120.png",revision:"e18aa0add91f8fdafce5b99f59163cce"},{url:"assets/icons/windows/windows-squarelogo-150-150.png",revision:"a983e9af966c5d3d4ef3e0d6fe2c01b0"},{url:"assets/icons/windows/windows-squarelogo-210-210.png",revision:"c02789fb1f4b7676dea535763851c257"},{url:"assets/icons/windows/windows-squarelogo-270-270.png",revision:"81fb5ef91ac9d9d69120ccc43613f5db"},{url:"assets/icons/windows/windows-storelogo-50-50.png",revision:"804421b8716d7e4106e6216ae440785a"},{url:"assets/icons/windows/windows-storelogo-70-70.png",revision:"902587167301407790232b508e8e87a3"},{url:"assets/icons/windows/windows-storelogo-90-90.png",revision:"1d1aa73c1a530831f849ea5721efc42a"},{url:"assets/icons/windows/windowsphone-appicon-106-106.png",revision:"062c22ec14989eb6bb0a5f87e5838ae1"},{url:"assets/icons/windows/windowsphone-appicon-44-44.png",revision:"9f6c5a9673a1fa57bbd38fe15a7c0bf7"},{url:"assets/icons/windows/windowsphone-appicon-62-62.png",revision:"c0a6886ded7c5c177b92cba0faa365b9"},{url:"assets/icons/windows/windowsphone-mediumtile-150-150.png",revision:"a983e9af966c5d3d4ef3e0d6fe2c01b0"},{url:"assets/icons/windows/windowsphone-mediumtile-210-210.png",revision:"c02789fb1f4b7676dea535763851c257"},{url:"assets/icons/windows/windowsphone-mediumtile-360-360.png",revision:"149c07defd814953f72970b16d3871e0"},{url:"assets/icons/windows/windowsphone-smalltile-170-170.png",revision:"0df47f7f24417eb99249c86585105add"},{url:"assets/icons/windows/windowsphone-smalltile-71-71.png",revision:"fcb63bb97f2c5b0d09a7ba0c4dfcef51"},{url:"assets/icons/windows/windowsphone-smalltile-99-99.png",revision:"fc4529d61750618c45551507e7f7fc25"},{url:"assets/icons/windows/windowsphone-storelogo-120-120.png",revision:"e18aa0add91f8fdafce5b99f59163cce"},{url:"assets/icons/windows/windowsphone-storelogo-50-50.png",revision:"804421b8716d7e4106e6216ae440785a"},{url:"assets/icons/windows/windowsphone-storelogo-70-70.png",revision:"902587167301407790232b508e8e87a3"},{url:"assets/icons/windows10/SplashScreen.scale-100.png",revision:"744b894c4e5fe7845fbcef60328b539c"},{url:"assets/icons/windows10/SplashScreen.scale-125.png",revision:"8b6b6f58a62bf082e12a17bc3b88ab5b"},{url:"assets/icons/windows10/SplashScreen.scale-150.png",revision:"e7a3c3b2f9e0d41351e05b8136ebba34"},{url:"assets/icons/windows10/SplashScreen.scale-200.png",revision:"b0db04831c2de7016b87b36acf4383d9"},{url:"assets/icons/windows10/SplashScreen.scale-400.png",revision:"10c608c52966c05ac7b6ce66c2cf5c02"},{url:"assets/icons/windows10/Square150x150Logo.scale-100.png",revision:"a983e9af966c5d3d4ef3e0d6fe2c01b0"},{url:"assets/icons/windows10/Square150x150Logo.scale-125.png",revision:"653ce1d8e5d1c23624f8d90cd1356e5a"},{url:"assets/icons/windows10/Square150x150Logo.scale-150.png",revision:"b762ff7280bdb4818641942b6394e667"},{url:"assets/icons/windows10/Square150x150Logo.scale-200.png",revision:"373886d0e819d00bb29f53e33c88826c"},{url:"assets/icons/windows10/Square150x150Logo.scale-400.png",revision:"0b07a32b6de3bbe61a3aadbcbedb78e3"},{url:"assets/icons/windows10/Square310x310Logo.scale-100.png",revision:"835648661ca13f113da5343a4a7f661e"},{url:"assets/icons/windows10/Square310x310Logo.scale-125.png",revision:"d59f06310f08bd05a33e0b7b6815060f"},{url:"assets/icons/windows10/Square310x310Logo.scale-150.png",revision:"bb2756bd84e2c607c3620371d1d9f891"},{url:"assets/icons/windows10/Square310x310Logo.scale-200.png",revision:"3b676a1f93432da7ae95400b5814e676"},{url:"assets/icons/windows10/Square310x310Logo.scale-400.png",revision:"66e10135e2d9e9654f1072aa2e4c4e24"},{url:"assets/icons/windows10/Square44x44Logo.scale-100.png",revision:"9f6c5a9673a1fa57bbd38fe15a7c0bf7"},{url:"assets/icons/windows10/Square44x44Logo.scale-125.png",revision:"4698f9dac1f3870abac3f7087c696d20"},{url:"assets/icons/windows10/Square44x44Logo.scale-150.png",revision:"e7fedd7d35f0de776fe96f252b790ba2"},{url:"assets/icons/windows10/Square44x44Logo.scale-200.png",revision:"3292872dae23739056163bebf7e75999"},{url:"assets/icons/windows10/Square44x44Logo.scale-400.png",revision:"8fba04374f5f0437fea4c1bdc6d2dc49"},{url:"assets/icons/windows10/Square44x44Logo.targetsize-16.png",revision:"ad558917755a285947de2d96f7e690af"},{url:"assets/icons/windows10/Square44x44Logo.targetsize-16_altform-unplated.png",revision:"ad558917755a285947de2d96f7e690af"},{url:"assets/icons/windows10/Square44x44Logo.targetsize-24.png",revision:"8cf9b73811fbb632a78fb9fbfa4f6360"},{url:"assets/icons/windows10/Square44x44Logo.targetsize-24_altform-unplated.png",revision:"8cf9b73811fbb632a78fb9fbfa4f6360"},{url:"assets/icons/windows10/Square44x44Logo.targetsize-256.png",revision:"8b2235cb0565f68a20327cd4a9ab7a5e"},{url:"assets/icons/windows10/Square44x44Logo.targetsize-256_altform-unplated.png",revision:"8b2235cb0565f68a20327cd4a9ab7a5e"},{url:"assets/icons/windows10/Square44x44Logo.targetsize-48.png",revision:"309ba59ef7542b92ba3c84538f37481f"},{url:"assets/icons/windows10/Square44x44Logo.targetsize-48_altform-unplated.png",revision:"309ba59ef7542b92ba3c84538f37481f"},{url:"assets/icons/windows10/Square71x71Logo.scale-100.png",revision:"fcb63bb97f2c5b0d09a7ba0c4dfcef51"},{url:"assets/icons/windows10/Square71x71Logo.scale-125.png",revision:"44acac0232f43bd82d3f94809f1a10e6"},{url:"assets/icons/windows10/Square71x71Logo.scale-150.png",revision:"f87c94f324de77f790ba36d1f8ddb7f1"},{url:"assets/icons/windows10/Square71x71Logo.scale-200.png",revision:"7bc52651df4fe7f086531cb450d3f26b"},{url:"assets/icons/windows10/Square71x71Logo.scale-400.png",revision:"148a379d2d1e8f8f6fbfac8e69537ad3"},{url:"assets/icons/windows10/StoreLogo.png",revision:"804421b8716d7e4106e6216ae440785a"},{url:"assets/icons/windows10/StoreLogo.scale-100.png",revision:"804421b8716d7e4106e6216ae440785a"},{url:"assets/icons/windows10/StoreLogo.scale-125.png",revision:"bd4c2f23d4eeb79229c404c3eb1fb96a"},{url:"assets/icons/windows10/StoreLogo.scale-150.png",revision:"89c28c11588c843121d80d779c7cd16e"},{url:"assets/icons/windows10/StoreLogo.scale-200.png",revision:"4ce69c9e6c02e4cac89fe47dedb238f5"},{url:"assets/icons/windows10/StoreLogo.scale-400.png",revision:"fb753c05cd7d3bcd6210e996520f0d2e"},{url:"assets/icons/windows10/Wide310x150Logo.scale-100.png",revision:"1c890f9772f62a995acee89fea8db8a4"},{url:"assets/icons/windows10/Wide310x150Logo.scale-125.png",revision:"74b86b79a377abbda750ef9369a7f7e4"},{url:"assets/icons/windows10/Wide310x150Logo.scale-150.png",revision:"305a8518fd822b65a7cf138da61847b5"},{url:"assets/icons/windows10/Wide310x150Logo.scale-200.png",revision:"744b894c4e5fe7845fbcef60328b539c"},{url:"assets/icons/windows10/Wide310x150Logo.scale-400.png",revision:"b0db04831c2de7016b87b36acf4383d9"},{url:"assets/img/cheerpj.png",revision:"3f41a03212af12db6ff98f98ae15b272"},{url:"assets/img/ij2.ico",revision:"fd9a68e024e3c02d8af38503a3d9ec69"},{url:"assets/img/imagej-js-loading.gif",revision:"d2db94f6276431f43e600803ae3e36d3"},{url:"assets/img/imagej-js-splash.png",revision:"e8499e89526adeb010e330419e104441"},{url:"assets/img/imagej-js-splash.psd",revision:"9ced6419788609b1ffacc23e3802750b"},{url:"assets/img/imagej-js-splash.svg",revision:"fbda9d36b6627a538884e38128fcb0ab"},{url:"assets/img/screenshot-1.png",revision:"74b57f3e6f81bc8d71f3872a90e8b6f0"},{url:"index.html",revision:"d795375e29241fcedfe6d3298cebc93a"},{url:"index.js",revision:"d2d545cf0d64255268146f0f411bf09e"},{url:"manifest.webmanifest",revision:"c28575ca4c95a46782606b12ab8f1c73"},{url:"style.css",revision:"54cbd51318bd7043555847992b64119d"}],{}),s.registerRoute(/https:\/\/cjrtnc.leaningtech.com\/.*/,new s.StaleWhileRevalidate,"GET"),s.registerRoute(/https:\/\/stackpath.bootstrapcdn.com\/font-awesome\/.*/,new s.CacheFirst,"GET"),s.registerRoute(/https:\/\/imjoy.io\/static\/.*/,new s.StaleWhileRevalidate,"GET"),s.registerRoute(/https:\/\/static.imjoy.io\/.*/,new s.StaleWhileRevalidate,"GET"),s.registerRoute(/\/ij153\/.*/,new s.StaleWhileRevalidate,"GET"),s.registerRoute(/\/sockjs-node.*/,new s.NetworkOnly,"GET")}));
//# sourceMappingURL=service-worker.js.map
