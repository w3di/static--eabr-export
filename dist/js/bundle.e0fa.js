/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/the-new-css-reset/css/reset.css":
/*!******************************************************!*\
  !*** ./node_modules/the-new-css-reset/css/reset.css ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/main/shared/sprite/icon-arrow-drop.svg":
/*!****************************************************!*\
  !*** ./src/main/shared/sprite/icon-arrow-drop.svg ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "icon-arrow-drop-usage",
      viewBox: "0 0 18 18",
      url: "/assets/sprite/" + "sprite-svg.svg#icon-arrow-drop-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./src/main/shared/sprite/icon-arrow-left.svg":
/*!****************************************************!*\
  !*** ./src/main/shared/sprite/icon-arrow-left.svg ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "icon-arrow-left-usage",
      viewBox: "0 0 10 16",
      url: "/assets/sprite/" + "sprite-svg.svg#icon-arrow-left-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./src/main/shared/sprite/icon-arrow-more.svg":
/*!****************************************************!*\
  !*** ./src/main/shared/sprite/icon-arrow-more.svg ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "icon-arrow-more-usage",
      viewBox: "0 0 28 28",
      url: "/assets/sprite/" + "sprite-svg.svg#icon-arrow-more-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./src/main/shared/sprite/icon-arrow-right.svg":
/*!*****************************************************!*\
  !*** ./src/main/shared/sprite/icon-arrow-right.svg ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "icon-arrow-right-usage",
      viewBox: "0 0 10 16",
      url: "/assets/sprite/" + "sprite-svg.svg#icon-arrow-right-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./src/main/shared/sprite/icon-search.svg":
/*!************************************************!*\
  !*** ./src/main/shared/sprite/icon-search.svg ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "icon-search-usage",
      viewBox: "0 0 20 20",
      url: "/assets/sprite/" + "sprite-svg.svg#icon-search-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./src/js/app/app.ts":
/*!***************************!*\
  !*** ./src/js/app/app.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: function() { return /* binding */ App; }
/* harmony export */ });
/* harmony import */ var _ui_mobileMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/mobileMenu */ "./src/js/ui/mobileMenu.ts");
/* harmony import */ var _ui_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/header */ "./src/js/ui/header.ts");
// import {Body} from "../ui/body";
// import {Filter} from "../filter/fliter";
// import {Dropdown} from "../ui/dropdown";
// import {Slider} from "../sliders/slider";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
// import {Header} from "../ui/header";


var App = /** @class */ (function () {
    // private body: Body | null;
    // private header: Header | null;
    // filter: Filter | null;
    // dynamicFilter: Filter | null;
    function App() {
        // this.body = null;
        // this.ticker = null;
        // this.header = null;
        var _this = this;
        this.init = function () {
            // console.log('App Inited');
            //
            // this.initAccordeons();
            // this.initSlider();
            // this.initFancybox();
            // this.initFilter();
            // this.initDropdown();
            // this.initDropdownCalendar();
            // this.initDropdownMenu();
            // this.initBody();
            // this.initMenu();
            // this.initTicker();
            // this.initTabs();
            // this.initArticlesPlan();
            // this.initTextCut();
            // this.initMainPreloader();
            // this.initLivePreloader();
            // this.initHallPreloader();
            // this.initDisability();
            _this.initHeader();
            // this.initShare();
            // this.initReturnButton();
            // this.initMenuSlide();
            // this.initFocusManager();
            // this.initModalForm();
            // this.initCheckboxes();
            // this.initInput();
            // this.initDropNav();
            _this.initSwitcher();
            _this.initMobileMenu();
        };
        this.initSwitcher = function () {
            var els = document.querySelectorAll('[data-switcher]');
            els.forEach(function (el) {
                el.addEventListener('click', function () {
                    el.classList.toggle('active');
                });
            });
        };
        this.initMobileMenu = function () {
            var el = document.querySelector('[data-mobile-menu]');
            if (el)
                new _ui_mobileMenu__WEBPACK_IMPORTED_MODULE_0__.MobileMenu(el);
        };
        this.initHeader = function () {
            var el = document.querySelector('[data-header]');
            if (el)
                new _ui_header__WEBPACK_IMPORTED_MODULE_1__.Header(el);
        };
        this.init();
    }
    return App;
}());



/***/ }),

/***/ "./src/js/ui/header.ts":
/*!*****************************!*\
  !*** ./src/js/ui/header.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Header: function() { return /* binding */ Header; }
/* harmony export */ });
var Header = /** @class */ (function () {
    function Header(el) {
        this.header = el;
        this.navLinks = this.header.querySelectorAll('[data-nav-link]');
        this.dropdownItems = this.header.querySelectorAll('[data-dropdown]');
        this.timeout = null;
        this.init();
    }
    Header.prototype.init = function () {
        // this.updateHeader()
        this.toggleDropdown();
    };
    // updateHeader() {
    //     let lastScrollY = window.scrollY;
    //     window.addEventListener('scroll', () => {
    //         const currentScrollY = window.scrollY;
    //         if (currentScrollY > lastScrollY && currentScrollY >= 105) {
    //             this.header.classList.add('hidden');
    //             removeClasses()
    //         } else if (currentScrollY < lastScrollY) {
    //             this.header.classList.remove('hidden');
    //         } else {
    //             this.header.classList.remove('hidden');
    //         }
    //
    //         lastScrollY = currentScrollY;
    //     })
    //
    //     const removeClasses = () => {
    //         this.navLinks.forEach(el => el.classList.remove('hidden'));
    //         this.dropdownItems.forEach((item) => item.classList.remove('active'));
    //     }
    // }
    Header.prototype.toggleDropdown = function () {
        var _this = this;
        this.navLinks.forEach(function (link) {
            link.addEventListener('mouseenter', function (evt) {
                setDefault(link);
                setActive(link);
            });
            link.addEventListener('mouseleave', function (evt) {
                _this.timeout = setTimeout(function () {
                    setDefault(link);
                }, 400);
            });
        });
        var setActive = function (link) {
            var index = link.dataset.navLink;
            link.classList.add('active');
            _this.dropdownItems.forEach(function (item) {
                if (item.dataset.dropdown === index) {
                    item.classList.add('active');
                    item.addEventListener('mouseenter', function (evt) {
                        if (_this.timeout) {
                            clearTimeout(_this.timeout);
                        }
                    });
                    item.addEventListener('mouseleave', function (evt) {
                        setDefault(link);
                    });
                }
            });
        };
        var setDefault = function (link) {
            if (_this.timeout) {
                clearTimeout(_this.timeout);
            }
            _this.navLinks.forEach(function (el) { return el.classList.remove('active'); });
            // link.classList.remove('active');
            _this.dropdownItems.forEach(function (item) {
                item.classList.remove('active');
            });
        };
    };
    return Header;
}());



/***/ }),

/***/ "./src/js/ui/mobileMenu.ts":
/*!*********************************!*\
  !*** ./src/js/ui/mobileMenu.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MobileMenu: function() { return /* binding */ MobileMenu; }
/* harmony export */ });
var MobileMenu = /** @class */ (function () {
    function MobileMenu(el) {
        this.menu = el;
        this.burger = document.querySelector('[data-burger]');
        this.body = document.querySelector('body');
        this.navigationItems = this.menu.querySelectorAll('.nav > .nav__link');
        this.init();
    }
    MobileMenu.prototype.init = function () {
        var _this = this;
        this.burger.addEventListener('click', function () {
            _this.burger.classList.toggle('active');
            _this.menu.classList.toggle('active');
            _this.body.classList.toggle('fixed');
        });
        this.navigationItems.forEach(function (navItem) {
            navItem.addEventListener('click', function () {
                navItem.classList.toggle('active');
            });
        });
    };
    return MobileMenu;
}());



/***/ }),

/***/ "./src/main/shared/libs/index.ts":
/*!***************************************!*\
  !*** ./src/main/shared/libs/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var the_new_css_reset_css_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! the-new-css-reset/css/reset.css */ "./node_modules/the-new-css-reset/css/reset.css");



/***/ }),

/***/ "./src/main/shared/sprite/index.ts":
/*!*****************************************!*\
  !*** ./src/main/shared/sprite/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _icon_arrow_drop_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icon-arrow-drop.svg */ "./src/main/shared/sprite/icon-arrow-drop.svg");
/* harmony import */ var _icon_arrow_left_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icon-arrow-left.svg */ "./src/main/shared/sprite/icon-arrow-left.svg");
/* harmony import */ var _icon_arrow_more_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icon-arrow-more.svg */ "./src/main/shared/sprite/icon-arrow-more.svg");
/* harmony import */ var _icon_arrow_right_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon-arrow-right.svg */ "./src/main/shared/sprite/icon-arrow-right.svg");
/* harmony import */ var _icon_search_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icon-search.svg */ "./src/main/shared/sprite/icon-search.svg");







/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_app_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app/app */ "./src/js/app/app.ts");
/* harmony import */ var _main_shared_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main/shared/sprite */ "./src/main/shared/sprite/index.ts");
/* harmony import */ var _main_shared_libs___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/shared/libs/ */ "./src/main/shared/libs/index.ts");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");




document.addEventListener('DOMContentLoaded', function () {
    // @ts-ignore
    window.app = new _js_app_app__WEBPACK_IMPORTED_MODULE_0__.App();
});

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNObUM7QUFDTDtBQUNEO0FBQ1A7QUFDdEI7QUFDQTtBQUNBLHFCQUFxQiw0Q0FBRztBQUN4QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9sb3NhdGlrLy4vbm9kZV9tb2R1bGVzL3RoZS1uZXctY3NzLXJlc2V0L2Nzcy9yZXNldC5jc3M/NjYwOCIsIndlYnBhY2s6Ly9wb2xvc2F0aWsvLi9zcmMvc3R5bGUuc2Nzcz8yMzM1Iiwid2VicGFjazovL3BvbG9zYXRpay8uL3NyYy9tYWluL3NoYXJlZC9zcHJpdGUvaWNvbi1hcnJvdy1kcm9wLnN2ZyIsIndlYnBhY2s6Ly9wb2xvc2F0aWsvLi9zcmMvbWFpbi9zaGFyZWQvc3ByaXRlL2ljb24tYXJyb3ctbGVmdC5zdmciLCJ3ZWJwYWNrOi8vcG9sb3NhdGlrLy4vc3JjL21haW4vc2hhcmVkL3Nwcml0ZS9pY29uLWFycm93LW1vcmUuc3ZnIiwid2VicGFjazovL3BvbG9zYXRpay8uL3NyYy9tYWluL3NoYXJlZC9zcHJpdGUvaWNvbi1hcnJvdy1yaWdodC5zdmciLCJ3ZWJwYWNrOi8vcG9sb3NhdGlrLy4vc3JjL21haW4vc2hhcmVkL3Nwcml0ZS9pY29uLXNlYXJjaC5zdmciLCJ3ZWJwYWNrOi8vcG9sb3NhdGlrLy4vc3JjL2pzL2FwcC9hcHAudHMiLCJ3ZWJwYWNrOi8vcG9sb3NhdGlrLy4vc3JjL2pzL3VpL2hlYWRlci50cyIsIndlYnBhY2s6Ly9wb2xvc2F0aWsvLi9zcmMvanMvdWkvbW9iaWxlTWVudS50cyIsIndlYnBhY2s6Ly9wb2xvc2F0aWsvLi9zcmMvbWFpbi9zaGFyZWQvbGlicy9pbmRleC50cyIsIndlYnBhY2s6Ly9wb2xvc2F0aWsvLi9zcmMvbWFpbi9zaGFyZWQvc3ByaXRlL2luZGV4LnRzIiwid2VicGFjazovL3BvbG9zYXRpay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb2xvc2F0aWsvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3BvbG9zYXRpay93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BvbG9zYXRpay93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3BvbG9zYXRpay8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgICBpZDogXCJpY29uLWFycm93LWRyb3AtdXNhZ2VcIixcbiAgICAgIHZpZXdCb3g6IFwiMCAwIDE4IDE4XCIsXG4gICAgICB1cmw6IFwiL2Fzc2V0cy9zcHJpdGUvXCIgKyBcInNwcml0ZS1zdmcuc3ZnI2ljb24tYXJyb3ctZHJvcC11c2FnZVwiLFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsO1xuICAgICAgfVxuICAgIH0iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgICBpZDogXCJpY29uLWFycm93LWxlZnQtdXNhZ2VcIixcbiAgICAgIHZpZXdCb3g6IFwiMCAwIDEwIDE2XCIsXG4gICAgICB1cmw6IFwiL2Fzc2V0cy9zcHJpdGUvXCIgKyBcInNwcml0ZS1zdmcuc3ZnI2ljb24tYXJyb3ctbGVmdC11c2FnZVwiLFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsO1xuICAgICAgfVxuICAgIH0iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgICBpZDogXCJpY29uLWFycm93LW1vcmUtdXNhZ2VcIixcbiAgICAgIHZpZXdCb3g6IFwiMCAwIDI4IDI4XCIsXG4gICAgICB1cmw6IFwiL2Fzc2V0cy9zcHJpdGUvXCIgKyBcInNwcml0ZS1zdmcuc3ZnI2ljb24tYXJyb3ctbW9yZS11c2FnZVwiLFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsO1xuICAgICAgfVxuICAgIH0iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgICBpZDogXCJpY29uLWFycm93LXJpZ2h0LXVzYWdlXCIsXG4gICAgICB2aWV3Qm94OiBcIjAgMCAxMCAxNlwiLFxuICAgICAgdXJsOiBcIi9hc3NldHMvc3ByaXRlL1wiICsgXCJzcHJpdGUtc3ZnLnN2ZyNpY29uLWFycm93LXJpZ2h0LXVzYWdlXCIsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cmw7XG4gICAgICB9XG4gICAgfSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICAgIGlkOiBcImljb24tc2VhcmNoLXVzYWdlXCIsXG4gICAgICB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLFxuICAgICAgdXJsOiBcIi9hc3NldHMvc3ByaXRlL1wiICsgXCJzcHJpdGUtc3ZnLnN2ZyNpY29uLXNlYXJjaC11c2FnZVwiLFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsO1xuICAgICAgfVxuICAgIH0iLCIvLyBpbXBvcnQge0JvZHl9IGZyb20gXCIuLi91aS9ib2R5XCI7XHJcbi8vIGltcG9ydCB7RmlsdGVyfSBmcm9tIFwiLi4vZmlsdGVyL2ZsaXRlclwiO1xyXG4vLyBpbXBvcnQge0Ryb3Bkb3dufSBmcm9tIFwiLi4vdWkvZHJvcGRvd25cIjtcclxuLy8gaW1wb3J0IHtTbGlkZXJ9IGZyb20gXCIuLi9zbGlkZXJzL3NsaWRlclwiO1xyXG4vLyBpbXBvcnQgeyBGYW5jeWJveCB9IGZyb20gXCJAZmFuY3lhcHBzL3VpXCI7XHJcbi8vIGltcG9ydCBcIkBmYW5jeWFwcHMvdWkvZGlzdC9mYW5jeWJveC9mYW5jeWJveC5jc3NcIjtcclxuLy8gaW1wb3J0IHtIZWFkZXJ9IGZyb20gXCIuLi91aS9oZWFkZXJcIjtcclxuaW1wb3J0IHsgTW9iaWxlTWVudSB9IGZyb20gXCIuLi91aS9tb2JpbGVNZW51XCI7XHJcbmltcG9ydCB7IEhlYWRlciB9IGZyb20gXCIuLi91aS9oZWFkZXJcIjtcclxudmFyIEFwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIHByaXZhdGUgYm9keTogQm9keSB8IG51bGw7XHJcbiAgICAvLyBwcml2YXRlIGhlYWRlcjogSGVhZGVyIHwgbnVsbDtcclxuICAgIC8vIGZpbHRlcjogRmlsdGVyIHwgbnVsbDtcclxuICAgIC8vIGR5bmFtaWNGaWx0ZXI6IEZpbHRlciB8IG51bGw7XHJcbiAgICBmdW5jdGlvbiBBcHAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5ib2R5ID0gbnVsbDtcclxuICAgICAgICAvLyB0aGlzLnRpY2tlciA9IG51bGw7XHJcbiAgICAgICAgLy8gdGhpcy5oZWFkZXIgPSBudWxsO1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQXBwIEluaXRlZCcpO1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRBY2NvcmRlb25zKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaW5pdFNsaWRlcigpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRGYW5jeWJveCgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5pbml0RHJvcGRvd24oKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5pbml0RHJvcGRvd25DYWxlbmRhcigpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXREcm9wZG93bk1lbnUoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5pbml0Qm9keSgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRNZW51KCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaW5pdFRpY2tlcigpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRUYWJzKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaW5pdEFydGljbGVzUGxhbigpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRUZXh0Q3V0KCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaW5pdE1haW5QcmVsb2FkZXIoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5pbml0TGl2ZVByZWxvYWRlcigpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRIYWxsUHJlbG9hZGVyKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaW5pdERpc2FiaWxpdHkoKTtcclxuICAgICAgICAgICAgX3RoaXMuaW5pdEhlYWRlcigpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRTaGFyZSgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRSZXR1cm5CdXR0b24oKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5pbml0TWVudVNsaWRlKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaW5pdEZvY3VzTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRNb2RhbEZvcm0oKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5pbml0Q2hlY2tib3hlcygpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXRJbnB1dCgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmluaXREcm9wTmF2KCk7XHJcbiAgICAgICAgICAgIF90aGlzLmluaXRTd2l0Y2hlcigpO1xyXG4gICAgICAgICAgICBfdGhpcy5pbml0TW9iaWxlTWVudSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0U3dpdGNoZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zd2l0Y2hlcl0nKTtcclxuICAgICAgICAgICAgZWxzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW5pdE1vYmlsZU1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1vYmlsZS1tZW51XScpO1xyXG4gICAgICAgICAgICBpZiAoZWwpXHJcbiAgICAgICAgICAgICAgICBuZXcgTW9iaWxlTWVudShlbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmluaXRIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcl0nKTtcclxuICAgICAgICAgICAgaWYgKGVsKVxyXG4gICAgICAgICAgICAgICAgbmV3IEhlYWRlcihlbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBBcHA7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEFwcCB9O1xyXG4iLCJ2YXIgSGVhZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSGVhZGVyKGVsKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBlbDtcclxuICAgICAgICB0aGlzLm5hdkxpbmtzID0gdGhpcy5oZWFkZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbmF2LWxpbmtdJyk7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bkl0ZW1zID0gdGhpcy5oZWFkZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGRvd25dJyk7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICAgIEhlYWRlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyB0aGlzLnVwZGF0ZUhlYWRlcigpXHJcbiAgICAgICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xyXG4gICAgfTtcclxuICAgIC8vIHVwZGF0ZUhlYWRlcigpIHtcclxuICAgIC8vICAgICBsZXQgbGFzdFNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgIC8vICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBjb25zdCBjdXJyZW50U2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgLy8gICAgICAgICBpZiAoY3VycmVudFNjcm9sbFkgPiBsYXN0U2Nyb2xsWSAmJiBjdXJyZW50U2Nyb2xsWSA+PSAxMDUpIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmVtb3ZlQ2xhc3NlcygpXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFNjcm9sbFkgPCBsYXN0U2Nyb2xsWSkge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy9cclxuICAgIC8vICAgICAgICAgbGFzdFNjcm9sbFkgPSBjdXJyZW50U2Nyb2xsWTtcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy9cclxuICAgIC8vICAgICBjb25zdCByZW1vdmVDbGFzc2VzID0gKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5hdkxpbmtzLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLmRyb3Bkb3duSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgSGVhZGVyLnByb3RvdHlwZS50b2dnbGVEcm9wZG93biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubmF2TGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICBzZXREZWZhdWx0KGxpbmspO1xyXG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlKGxpbmspO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldERlZmF1bHQobGluayk7XHJcbiAgICAgICAgICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgc2V0QWN0aXZlID0gZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gbGluay5kYXRhc2V0Lm5hdkxpbms7XHJcbiAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIF90aGlzLmRyb3Bkb3duSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZGF0YXNldC5kcm9wZG93biA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy50aW1lb3V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RGVmYXVsdChsaW5rKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgc2V0RGVmYXVsdCA9IGZ1bmN0aW9uIChsaW5rKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy50aW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMudGltZW91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3RoaXMubmF2TGlua3MuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpOyB9KTtcclxuICAgICAgICAgICAgLy8gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgX3RoaXMuZHJvcGRvd25JdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIZWFkZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEhlYWRlciwgfTtcclxuIiwidmFyIE1vYmlsZU1lbnUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBNb2JpbGVNZW51KGVsKSB7XHJcbiAgICAgICAgdGhpcy5tZW51ID0gZWw7XHJcbiAgICAgICAgdGhpcy5idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1idXJnZXJdJyk7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvbkl0ZW1zID0gdGhpcy5tZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uYXYgPiAubmF2X19saW5rJyk7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICBNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgX3RoaXMubWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgX3RoaXMuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdmaXhlZCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvbkl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKG5hdkl0ZW0pIHtcclxuICAgICAgICAgICAgbmF2SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBNb2JpbGVNZW51O1xyXG59KCkpO1xyXG5leHBvcnQgeyBNb2JpbGVNZW51LCB9O1xyXG4iLCJpbXBvcnQgXCJ0aGUtbmV3LWNzcy1yZXNldC9jc3MvcmVzZXQuY3NzXCI7XHJcbiIsImltcG9ydCAnLi9pY29uLWFycm93LWRyb3Auc3ZnJztcclxuaW1wb3J0ICcuL2ljb24tYXJyb3ctbGVmdC5zdmcnO1xyXG5pbXBvcnQgJy4vaWNvbi1hcnJvdy1tb3JlLnN2Zyc7XHJcbmltcG9ydCAnLi9pY29uLWFycm93LXJpZ2h0LnN2Zyc7XHJcbmltcG9ydCAnLi9pY29uLXNlYXJjaC5zdmcnO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9qcy9hcHAvYXBwXCI7XHJcbmltcG9ydCBcIi4vbWFpbi9zaGFyZWQvc3ByaXRlXCI7XHJcbmltcG9ydCBcIi4vbWFpbi9zaGFyZWQvbGlicy9cIjtcclxuaW1wb3J0IFwiLi9zdHlsZS5zY3NzXCI7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICB3aW5kb3cuYXBwID0gbmV3IEFwcCgpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9