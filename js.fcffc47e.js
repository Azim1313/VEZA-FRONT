// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../js/_header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initHeader = void 0;

const initHeader = () => {
  const navSlide = () => {
    const body = document.querySelector('body');
    const burger = document.querySelector('.header__mobile-menu');
    const nav = document.querySelector('.header__menu');
    const navLinks = document.querySelectorAll('.header__nav > li');
    const header = document.querySelectorAll('header');
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
      burger.classList.toggle('toggle');
      body.classList.toggle('lock');
    });
    navLinks.forEach(link => link.addEventListener('click', () => closeMenu()));

    function closeMenu() {
      nav.classList.remove('active');
      burger.classList.remove('toggle');
      body.classList.remove('lock');
    }
  };

  navSlide();
};

exports.initHeader = initHeader;
},{}],"../js/_about.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAbout = void 0;

const initAbout = () => {
  function start() {
    let reqAnimFrame = function () {
      return requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 1000 / 60);
      };
    }();

    let dataCircle = document.querySelectorAll('.progressbar__thumb');

    function setProgress(percent, selector) {
      let circle = selector.querySelector('.progressbar__thumb');
      let total = Math.PI * circle.r.baseVal.value;
      circle.style.strokeDasharray = `${total * percent / 100} ${total * (1 - percent / 100) * 2}`;
      selector.querySelector('text').innerHTML = '<tspan>' + percent.toFixed(0) + '</tspan>';
    }

    function circle(final, i) {
      let number = -1;
      i++;
      let selector = '.progress__container:nth-child(' + i + ')';
      let mainSelector = document.querySelector(selector);
      let myReq = null;

      function circleStep() {
        myReq = reqAnimFrame(circleStep);
        setProgress(number, mainSelector);

        if (number >= final) {
          cancelAnimationFrame(myReq);
        }

        number++;
      }

      circleStep();
    }

    for (let i = 0; i < dataCircle.length; i++) {
      let num = dataCircle[i].getAttribute('data-circle');
      circle(num, i);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    start();
  });
};

exports.initAbout = initAbout;
},{}],"../js/_swiper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSwiper = void 0;

const initSwiper = () => {
  // banner slider
  const swiperGallery = new Swiper('.banner__slider', {
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    simulateTouch: true,
    loop: true
  }); // gallery slider

  const swiper = new Swiper('.gallery__slider', {
    effect: "cards",
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    simulateTouch: true,
    loop: true
  }); //sliderIndustry

  const swiperIndustry = new Swiper('.slider__industry', {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 40,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    simulateTouch: true,
    loop: true
  }); //SLIDER__FANS__VRAN

  const swiperFan = new Swiper('.fans__vran__slider', {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    simulateTouch: true,
    loop: true
  });
};

exports.initSwiper = initSwiper;
},{}],"../js/_equipmentpage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initEquipmentpage = void 0;

const initEquipmentpage = () => {
  function clickHandler(nodeList = []) {
    nodeList.forEach(link => link.addEventListener("click", function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        this.parentNode.nextElementSibling.classList.remove("active");
      } else {
        nodeList.forEach(item => {
          item.classList.remove("active");
          item.parentNode.nextElementSibling.classList.remove("active");
        });
        this.classList.add("active");
        this.parentNode.nextElementSibling.classList.add("active");
      }
    }));
  }

  const clicker1 = document.querySelectorAll('.clicker');
  const clicker2 = document.querySelectorAll('.clicker__2');
  const clicker3 = document.querySelectorAll('.clicker__3');
  const nodeList = [clicker1, clicker2, clicker3];
  nodeList.map(node => clickHandler(node)); // PAGINATION
  // selecting required element
  // const element = document.querySelector(".pagination ul");
  // let totalPages = 350;
  // let page = 12;
  // //calling function with passing parameters and adding inside element which is ul tag
  // element.innerHTML = createPagination(totalPages, page);
  // function createPagination(totalPages, page) {
  //   let liTag = '';
  //   let active;
  //   let beforePage = page - 1;
  //   let afterPage = page + 1;
  //   if(page > 1){ //show the next button if the page value is greater than 1
  //     liTag += `<li class="btn prev btn-prev"><span><i class="fas fa-angle-left"></i> Назад</span></li>`;
  //   }
  //   if(page > 2){ //if page value is less than 2 then add 1 after the previous button
  //     liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
  //     if(page > 3){ //if page value is greater than 3 then add this (...) after the first li or page
  //       liTag += `<li class="dots"><span>...</span></li>`;
  //     }
  //   }
  //   // how many pages or li show before the current li
  //   if (page == totalPages) {
  //     beforePage = beforePage - 2;
  //   } else if (page == totalPages - 1) {
  //     beforePage = beforePage - 1;
  //   }
  //   // how many pages or li show after the current li
  //   if (page == 1) {
  //     afterPage = afterPage + 2;
  //   } else if (page == 2) {
  //     afterPage  = afterPage + 1;
  //   }
  //   for (let plength = beforePage; plength <= afterPage; plength++) {
  //     if (plength > totalPages) { //if plength is greater than totalPage length then continue
  //       continue;
  //     }
  //     if (plength == 0) { //if plength is 0 than add +1 in plength value
  //       plength = plength + 1;
  //     }
  //     if(page == plength){ //if page is equal to plength than assign active string in the active variable
  //       active = "active";
  //     }else{ //else leave empty to the active variable
  //       active = "";
  //     }
  //     liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  //   }
  //   if(page < totalPages - 1){ //if page value is less than totalPage value by -1 then show the last li or page
  //     if(page < totalPages - 2){ //if page value is less than totalPage value by -2 then add this (...) before the last li or page
  //       liTag += `<li class="dots"><span>...</span></li>`;
  //     }
  //     liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  //   }
  //   if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
  //     liTag += `<li class="btn next btn-next" onclick="createPagination(totalPages, ${page + 1})"><span>Следующая <i class="fas fa-angle-right"></i></span></li>`;
  //   }
  //   element.innerHTML = liTag; //add li tag inside ul tag
  //   return liTag; //reurn the li tag
  // }
};

exports.initEquipmentpage = initEquipmentpage;
},{}],"../js/_tabssizes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTabssizes = void 0;

const initTabssizes = () => {
  document.querySelectorAll('.typesizes__menu-link').forEach(elem => {
    elem.addEventListener('click', function (e) {
      e.preventDefault();
      const id = e.target.getAttribute('href').replace('#', '');
      document.querySelectorAll('.typesizes__menu-link').forEach(element => element.classList.remove('active'));
      document.querySelectorAll('.tab__cont').forEach(el => el.classList.add('hide'));
      elem.classList.add('active');
      document.getElementById(id).classList.remove('hide');
    });
  });
};

exports.initTabssizes = initTabssizes;
},{}],"../js/_authorization.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAuthorization = void 0;

const initAuthorization = () => {
  const tabLinks = document.querySelectorAll(".authorization__nav__menu-item-link");
  const tabsItem = document.querySelectorAll(".tab__cont");
  tabLinks.forEach(elem => {
    elem.addEventListener("click", function (e) {
      e.preventDefault();
      const id = e.target.getAttribute('href').replace("#", "");
      tabLinks.forEach(element => element.classList.remove("active"));
      tabsItem.forEach(el => el.classList.add("hide"));
      elem.classList.add("active");
      document.getElementById(id).classList.remove("hide");
    });
  });
};

exports.initAuthorization = initAuthorization;
},{}],"../js/_resources.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initResources = void 0;

const initResources = () => {
  document.querySelectorAll('.resources__nav__menu-item-link').forEach(elem => {
    elem.addEventListener('click', function (e) {
      const id = e.target.getAttribute('href').replace('#', '');
      document.querySelectorAll('.resources__nav__menu-item-link').forEach(element => element.classList.remove('active'));
      document.querySelectorAll('.tab__cont').forEach(el => el.classList.add('hide'));
      elem.classList.add('active');
      document.getElementById(id).classList.remove('hide');
    });
  }); // Accordions

  const accordionItem = document.querySelectorAll(".resources__faq__accordion-item");
  const accordionTitle = document.querySelectorAll(".resources__faq__accordion-title");
  accordionTitle.forEach(item => item.addEventListener('click', () => {
    const parent = item.parentNode;

    if (parent.classList.contains("active")) {
      parent.classList.remove("active");
    } else {
      accordionItem.forEach(child => child.classList.remove("active"));
    }

    parent.classList.toggle("active");
  }));
};

exports.initResources = initResources;
},{}],"../js/_helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bodyLock = bodyLock;
exports.bodyUnlock = bodyUnlock;
exports.popupClose = popupClose;
exports.popupOpen = popupOpen;
let unlock = true;
const timeout = 800;

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }

    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__body')) {
        popupClose(currentPopup);
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');

    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPadding = document.querySelectorAll('lock');
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
      document.body.classList.add('lock');

      unlock: false;

      setTimeout(function () {
        unlock: true;
      }, timeout);
    }
  }
}

function bodyUnlock() {
  document.body.style.paddingRight = '0px';
  document.body.classList.remove('lock');

  unlock: false;

  setTimeout(function () {
    unlock: true;
  }, timeout);
}
},{}],"../js/_popup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPopup = void 0;

var _helpers = require("./_helpers");

const initPopup = () => {
  const popupLinks = document.querySelectorAll('.popup-links');

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener('click', function (e) {
        e.preventDefault();
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const currentPopup = document.getElementById(popupName);
        (0, _helpers.popupOpen)(currentPopup);
        (0, _helpers.bodyLock)();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll('.close-popup');

  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
        e.preventDefault();
        (0, _helpers.popupClose)(el.closest('.popup'));
        document.getElementById('form').reset();
        (0, _helpers.bodyUnlock)();
        document.querySelectorAll('input,textarea,.label-file').forEach(item => {
          item.style.borderWidth = '1px';
          item.classList.remove('error');
          document.querySelector('.checkbox-box>label').classList.remove('error');

          if (item.classList.contains('label-file')) {
            item.textContent = '';
            item.style.color = '#6C6D70';
          }
        });
      });
    }
  }
};

exports.initPopup = initPopup;
},{"./_helpers":"../js/_helpers.js"}],"../js/index.js":[function(require,module,exports) {
"use strict";

var _header = require("./_header");

var _about = require("./_about");

var _swiper = require("./_swiper");

var _equipmentpage = require("./_equipmentpage");

var _tabssizes = require("./_tabssizes");

var _authorization = require("./_authorization");

var _resources = require("./_resources");

var _popup = require("./_popup");

// import { initForms } from './_forms';
(function () {
  if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  try {
    (0, _header.initHeader)();
    (0, _about.initAbout)();
    (0, _swiper.initSwiper)();
    (0, _equipmentpage.initEquipmentpage)();
    (0, _tabssizes.initTabssizes)();
    (0, _authorization.initAuthorization)();
    (0, _resources.initResources)(); // initForms();

    (0, _popup.initPopup)();
  } catch (err) {
    console.log(err);
  }
})();
},{"./_header":"../js/_header.js","./_about":"../js/_about.js","./_swiper":"../js/_swiper.js","./_equipmentpage":"../js/_equipmentpage.js","./_tabssizes":"../js/_tabssizes.js","./_authorization":"../js/_authorization.js","./_resources":"../js/_resources.js","./_popup":"../js/_popup.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50356" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../js/index.js"], null)
//# sourceMappingURL=/js.fcffc47e.js.map