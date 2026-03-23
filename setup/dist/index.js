/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 136:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { execSync } = __nccwpck_require__(317);
const path = __nccwpck_require__(928);
const fs = __nccwpck_require__(896);

const HOME = process.env.HOME || process.env.HOME_;
const ANDASY_DIR = path.join(HOME, '.andasy', 'bin');
const ANDASY_CLI = path.join(ANDASY_DIR, 'andasy');

async function install() {
  console.log('Installing Andasy CLI...');
  
  // Download and run install script
  execSync('curl -sSL https://andasy.io/install.sh | sh', {
    stdio: 'inherit',
    env: { ...process.env, HOME }
  });
  
  // Add to PATH for subsequent steps
  const stateFile = process.env.GITHUB_STATE ? path.join(process.env.GITHUB_STATE, 'andasy-state.json') : null;
  if (stateFile) {
    fs.writeFileSync(stateFile, JSON.stringify({ andasyDir: ANDASY_DIR }));
  }
  
  // Update PATH by writing to GITHUB_PATH
  if (process.env.GITHUB_PATH) {
    fs.appendFileSync(process.env.GITHUB_PATH, `${ANDASY_DIR}\n`);
  }
  
  console.log('Andasy CLI installed successfully');
}

async function cleanup() {
  console.log('Cleaning up Andasy CLI setup...');
  // Any cleanup needed
}

if (require.main === require.cache[eval('__filename')]) {
  const step = process.env.ACTION_STATE === 'post' ? 'post' : 'main';
  if (step === 'post') {
    cleanup();
  } else {
    install();
  }
}

module.exports = { install, cleanup };

/***/ }),

/***/ 317:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(136);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;