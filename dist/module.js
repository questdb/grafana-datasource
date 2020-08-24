/*! For license information please see module.js.LICENSE.txt */
define(["react","emotion","@grafana/ui","@grafana/data","@grafana/runtime"],(function(e,t,n,r,o){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=12)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(7);Object.defineProperty(t,"constants",{enumerable:!0,get:function(){return r.default}});var o=n(8);Object.defineProperty(t,"dataTypes",{enumerable:!0,get:function(){return o.default}});var i=n(9);Object.defineProperty(t,"functions",{enumerable:!0,get:function(){return i.default}});var a=n(10);Object.defineProperty(t,"keywords",{enumerable:!0,get:function(){return a.default}})},function(e,t){e.exports=r},function(e,t,n){"use strict";(function(e){var n=function(){if("undefined"!=typeof Map)return Map;function e(e,t){var n=-1;return e.some((function(e,r){return e[0]===t&&(n=r,!0)})),n}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var n=e(this.__entries__,t),r=this.__entries__[n];return r&&r[1]},t.prototype.set=function(t,n){var r=e(this.__entries__,t);~r?this.__entries__[r][1]=n:this.__entries__.push([t,n])},t.prototype.delete=function(t){var n=this.__entries__,r=e(n,t);~r&&n.splice(r,1)},t.prototype.has=function(t){return!!~e(this.__entries__,t)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(e,t){void 0===t&&(t=null);for(var n=0,r=this.__entries__;n<r.length;n++){var o=r[n];e.call(t,o[1],o[0])}},t}()}(),r="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,o=void 0!==e&&e.Math===Math?e:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),i="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(o):function(e){return setTimeout((function(){return e(Date.now())}),1e3/60)};var a=["top","right","bottom","left","width","height","size","weight"],s="undefined"!=typeof MutationObserver,c=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(e,t){var n=!1,r=!1,o=0;function a(){n&&(n=!1,e()),r&&c()}function s(){i(a)}function c(){var e=Date.now();if(n){if(e-o<2)return;r=!0}else n=!0,r=!1,setTimeout(s,t);o=e}return c}(this.refresh.bind(this),20)}return e.prototype.addObserver=function(e){~this.observers_.indexOf(e)||this.observers_.push(e),this.connected_||this.connect_()},e.prototype.removeObserver=function(e){var t=this.observers_,n=t.indexOf(e);~n&&t.splice(n,1),!t.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},e.prototype.updateObservers_=function(){var e=this.observers_.filter((function(e){return e.gatherActive(),e.hasActive()}));return e.forEach((function(e){return e.broadcastActive()})),e.length>0},e.prototype.connect_=function(){r&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),s?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){r&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(e){var t=e.propertyName,n=void 0===t?"":t;a.some((function(e){return!!~n.indexOf(e)}))&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),u=function(e,t){for(var n=0,r=Object.keys(t);n<r.length;n++){var o=r[n];Object.defineProperty(e,o,{value:t[o],enumerable:!1,writable:!1,configurable:!0})}return e},l=function(e){return e&&e.ownerDocument&&e.ownerDocument.defaultView||o},f=v(0,0,0,0);function d(e){return parseFloat(e)||0}function p(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return t.reduce((function(t,n){return t+d(e["border-"+n+"-width"])}),0)}function h(e){var t=e.clientWidth,n=e.clientHeight;if(!t&&!n)return f;var r=l(e).getComputedStyle(e),o=function(e){for(var t={},n=0,r=["top","right","bottom","left"];n<r.length;n++){var o=r[n],i=e["padding-"+o];t[o]=d(i)}return t}(r),i=o.left+o.right,a=o.top+o.bottom,s=d(r.width),c=d(r.height);if("border-box"===r.boxSizing&&(Math.round(s+i)!==t&&(s-=p(r,"left","right")+i),Math.round(c+a)!==n&&(c-=p(r,"top","bottom")+a)),!function(e){return e===l(e).document.documentElement}(e)){var u=Math.round(s+i)-t,h=Math.round(c+a)-n;1!==Math.abs(u)&&(s-=u),1!==Math.abs(h)&&(c-=h)}return v(o.left,o.top,s,c)}var m="undefined"!=typeof SVGGraphicsElement?function(e){return e instanceof l(e).SVGGraphicsElement}:function(e){return e instanceof l(e).SVGElement&&"function"==typeof e.getBBox};function b(e){return r?m(e)?function(e){var t=e.getBBox();return v(0,0,t.width,t.height)}(e):h(e):f}function v(e,t,n,r){return{x:e,y:t,width:n,height:r}}var y=function(){function e(e){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=v(0,0,0,0),this.target=e}return e.prototype.isActive=function(){var e=b(this.target);return this.contentRect_=e,e.width!==this.broadcastWidth||e.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var e=this.contentRect_;return this.broadcastWidth=e.width,this.broadcastHeight=e.height,e},e}(),g=function(e,t){var n,r,o,i,a,s,c,l=(r=(n=t).x,o=n.y,i=n.width,a=n.height,s="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,c=Object.create(s.prototype),u(c,{x:r,y:o,width:i,height:a,top:o,right:r+i,bottom:a+o,left:r}),c);u(this,{target:e,contentRect:l})},_=function(){function e(e,t,r){if(this.activeObservations_=[],this.observations_=new n,"function"!=typeof e)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=e,this.controller_=t,this.callbackCtx_=r}return e.prototype.observe=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(e instanceof l(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)||(t.set(e,new y(e)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(e instanceof l(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)&&(t.delete(e),t.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var e=this;this.clearActive(),this.observations_.forEach((function(t){t.isActive()&&e.activeObservations_.push(t)}))},e.prototype.broadcastActive=function(){if(this.hasActive()){var e=this.callbackCtx_,t=this.activeObservations_.map((function(e){return new g(e.target,e.broadcastRect())}));this.callback_.call(e,t,e),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),w="undefined"!=typeof WeakMap?new WeakMap:new n,O=function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=c.getInstance(),r=new _(t,n,this);w.set(this,r)};["observe","unobserve","disconnect"].forEach((function(e){O.prototype[e]=function(){var t;return(t=w.get(this))[e].apply(t,arguments)}}));var E=void 0!==o.ResizeObserver?o.ResizeObserver:O;t.a=E}).call(this,n(11))},function(e,t){e.exports=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["false","true"]},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["binary","date","double","float","int","long","long256","short","string","symbol","timestamp"]},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["abs","all_tables","avg","cast","coalesce","concat","count","dateadd","datediff","day","day_of_week","day_of_week_sunday_first","days_in_month","first","format","hour","ifnull","is_leap_year","isnull","ksum","last","lcase","len","length","long_sequence","max","micros","mid","millis","min","minute","month","now","nsum","nvl","rank","rnd_bin","rnd_boolean","rnd_byte","rnd_char","rnd_date","rnd_double","rnd_float","rnd_int","rnd_long","rnd_long256","rnd_short","rnd_str","rnd_symbol","rnd_timestamp","round","round_down","round_half_even","round_up","second","sum","sysdate","systimestamp","tables_columns","timestamp_sequence","to_date","to_str","to_timestamp","ucase","year"]},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["add","all","alter","and","as","asc","asof","backup","by","cache","capacity","case","cast","column","columns","copy","create","cross","database","default","delete","desc","distinct","drop","else","end","except","fill","foreign","from","grant","group","header","if","in","index","inner","insert","intersect","into","isolation","join","key","latest","left","level","limit","lock","lt","nan","natural","nocache","none","not","null","on","only","or","order","outer","over","partition","primary","references","rename","repair","right","sample","select","show","splice","system","table","tables","then","to","transaction","truncate","type","union","unlock","update","values","when","where","with","writer"]},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";n.r(t);var r=n(4),o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};var i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function a(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))}function s(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}function c(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}function u(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var l=n(2),f=n(0),d=n.n(f),p=l.LegacyForms.FormField,h=n(1),m=n(5);var b=f["undefined"!=typeof document&&void 0!==document.createElement?"useLayoutEffect":"useEffect"];var v=e=>{const t=f.useRef(e);return t.current=e,t};let y;const g=()=>y||(y=(()=>{const e=new Set;return{observer:new m.a((t,n)=>{for(const r of e)r(t,n)}),subscribe:t=>e.add(t),unsubscribe:t=>e.delete(t)}})());var _=(e,t)=>{const n=g(),r=v(t);return b(()=>{let t=!1;const o=(n,o)=>{if(t)return;const i=e&&"current"in e?e.current:e;for(let e=0;e<n.length;e++){const t=n[e];t.target===i&&r.current(t,o)}};return n.subscribe(o),()=>{t=!0,n.unsubscribe(o)}},[e,n,r]),b(()=>{const t=e&&"current"in e?e.current:e;if(t)return n.observer.observe(t),()=>n.observer.unobserve(t)},[e,n.observer]),n.observer};var w,O,E,x,j,M,k,T,S=(e,t)=>{const[n,r]=f.useState(()=>{var n,r;const o=e&&"current"in e?e.current:e;return o?[o.offsetWidth,o.offsetHeight]:[null!==(n=null==t?void 0:t.initialWidth)&&void 0!==n?n:0,null!==(r=null==t?void 0:t.initialHeight)&&void 0!==r?r:0]});return b(()=>{const t=e&&"current"in e?e.current:e;t&&r([t.offsetWidth,t.offsetHeight])},[e]),_(e,e=>{const t=e.target;r([t.offsetWidth,t.offsetHeight])}),n},P="SELECT ts, avg(x)\n  FROM long_sequence(5)\n  WHERE $__timeFilter(ts)\n  SAMPLE BY $__interval_ms;",q=n(3),A="questdb-sql",R={comments:{lineComment:"--",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}]},C={defaultToken:"",tokenPostfix:".sql",ignoreCase:!0,brackets:[{open:"[",close:"]",token:"delimiter.square"},{open:"(",close:")",token:"delimiter.parenthesis"}],keywords:q.keywords.concat(q.constants),operators:[],types:q.dataTypes,builtinFunctions:q.functions,builtinVariables:[],tokenizer:{root:[{include:"@comments"},{include:"@whitespace"},{include:"@numbers"},{include:"@strings"},{include:"@complexIdentifiers"},[/[;,.]/,"delimiter"],[/[()]/,"@brackets"],[/[\w@#$]+/,{cases:{"@keywords":"keyword","@operators":"operator","@builtinVariables":"predefined","@builtinFunctions":"predefined","@types":"type","@default":"identifier"}}],[/[<>=!%&+\-*/~^]/,"operator"]],whitespace:[[/\s+/,"white"]],comments:[[/--+.*/,"comment"],[/\/\*/,{token:"comment.quote",next:"@comment"}]],comment:[[/[^*/]+/,"comment"],[/\*\//,{token:"comment.quote",next:"@pop"}],[/./,"comment"]],numbers:[[/0[xX][0-9a-fA-F]*/,"number"],[/[$][+-]*\d*(\.\d*)?/,"number"],[/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/,"number"]],strings:[[/'/,{token:"string",next:"@string"}]],string:[[/[^']+/,"string"],[/''/,"string"],[/'/,{token:"string",next:"@pop"}]],complexIdentifiers:[[/"/,{token:"identifier.quote",next:"@quotedIdentifier"}]],quotedIdentifier:[[/[^"]+/,"identifier"],[/""/,"identifier"],[/"/,{token:"identifier.quote",next:"@pop"}]]}},D=Object(l.stylesFactory)((function(e,t,n){return{editorWrapper:Object(h.css)(w||(w=u(["\n    position: relative;\n    min-height: calc(","px + 2px);\n    margin-top: ",";\n    margin-right: ",";\n    align-content: stretch;\n  "],["\n    position: relative;\n    min-height: calc(","px + 2px);\n    margin-top: ",";\n    margin-right: ",";\n    align-content: stretch;\n  "])),250,e.spacing.sm,e.spacing.inlineFormMargin),editorInner:Object(h.cx)(Object(h.css)(O||(O=u(["\n      display: flex;\n      flex: 1 1 100%;\n      align-items: center;\n      justify-content: center;\n      border-radius: ",";\n      border: 1px solid ",";\n    "],["\n      display: flex;\n      flex: 1 1 100%;\n      align-items: center;\n      justify-content: center;\n      border-radius: ",";\n      border: 1px solid ",";\n    "])),e.border.radius.md,e.colors.formInputBorder),t&&Object(h.css)(E||(E=u(["\n        .react-monaco-editor-container {\n          opacity: 0.5;\n        }\n      "],["\n        .react-monaco-editor-container {\n          opacity: 0.5;\n        }\n      "])))),overlay:Object(h.cx)(Object(h.css)(x||(x=u(["\n      display: none;\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      align-items: center;\n      justify-content: center;\n      font-size: ",";\n      font-style: italic;\n      color: ",";\n    "],["\n      display: none;\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      align-items: center;\n      justify-content: center;\n      font-size: ",";\n      font-style: italic;\n      color: ",";\n    "])),e.typography.size.sm,e.colors.textWeak),t&&Object(h.css)(j||(j=u(["\n        display: flex;\n      "],["\n        display: flex;\n      "])))),wrapper:Object(h.css)(M||(M=u(["\n    flex-direction: column;\n    align-items: stretch;\n  "],["\n    flex-direction: column;\n    align-items: stretch;\n  "]))),pre:Object(h.css)(k||(k=u(["\n    position: relative;\n    padding: 15px ","px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n\n    ::before {\n      content: ' ';\n      display: block;\n      position: absolute;\n      height: 100%;\n      width: ","px;\n      top: 0;\n      left: 0;\n      border-radius: ",";\n      background: ",";\n    }\n  "],["\n    position: relative;\n    padding: 15px ","px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n\n    ::before {\n      content: ' ';\n      display: block;\n      position: absolute;\n      height: 100%;\n      width: ","px;\n      top: 0;\n      left: 0;\n      border-radius: ",";\n      background: ",";\n    }\n  "])),20,20,e.border.radius.md,e.colors.formValidationMessageBg),error:Object(h.css)(T||(T=u(["\n    white-space: initial;\n    overflow: initial;\n  "],["\n    white-space: initial;\n    overflow: initial;\n  "])))}})),N=function(e){function t(t){var n=e.call(this,t)||this;return n.filterQuery=function(e){return Boolean(e.queryText)&&""!==e.queryText},n}return function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(t,e),t.prototype.processResponse=function(e){return a(this,void 0,Promise,(function(){var t,n;return s(this,(function(r){return"Error"===e.state&&e.data.length>0?(t=e.data,n=t[0].fields,[2,Promise.resolve(i(i({},e),{data:[],error:i(i({},e.error),{query:n[0].values.toArray()[0],position:n[1].values.toArray()[0]})}))]):[2,e]}))}))},t}(n(6).DataSourceWithBackend);n.d(t,"plugin",(function(){return F}));var F=new r.DataSourcePlugin(N).setConfigEditor((function(e){var t=e.onOptionsChange,n=e.options,r=Object(f.useCallback)((function(e){t(i(i({},n),{jsonData:i(i({},n.jsonData),{url:e.target.value})}))}),[t,n]);return d.a.createElement("div",{className:"gf-form-group"},d.a.createElement("div",{className:"gf-form"},d.a.createElement(p,{label:"URL",labelWidth:6,inputWidth:20,onChange:r,value:n.jsonData.url||"",placeholder:"http://localhost:9000"})))})).setQueryEditor((function(e){var t,n=e.data,r=e.onChange,o=e.onRunQuery,a=e.query,s=(function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}}(e,["data","onChange","onRunQuery","query"]),Object(f.useRef)(null)),u=Object(f.useRef)(null),p=Object(l.useTheme)(),m=c(Object(f.useState)(!0),2),b=m[0],v=m[1],y=c(Object(f.useState)(),2),g=y[0],_=y[1],w=c(Object(f.useState)(0),2),O=w[0],E=w[1],x=c(Object(f.useState)(0),2),j=x[0],M=x[1],k=c(Object(f.useState)(!1),2),T=k[0],q=k[1],N=D(p,!0===a.hide,b),F=c(S(s),1)[0],I=Object(f.useCallback)((function(){return q(!T)}),[T]),L=Object(f.useCallback)((function(e){r(i(i({},a),{queryText:e}))}),[a]),W=Object(f.useCallback)((function(e){var t=e,n=[];return n.push(t.onDidChangeModelContent((function(e){L(t.getValue())}))),n.push(t.onDidFocusEditorText((function(){v(!0)}))),n.push(t.onDidBlurEditorText((function(){v(!1)}))),n.push(t.addAction({id:"run-questdb-query",label:"Run",keybindings:[monaco.KeyMod.Shift|monaco.KeyCode.Enter],contextMenuGroupId:"navigation",contextMenuOrder:1.5,run:function(){o()}})),monaco&&(monaco.languages.register({id:A}),monaco.languages.setMonarchTokensProvider(A,C),monaco.languages.setLanguageConfiguration(A,R)),t.focus(),L(a.queryText||P),function(){n.forEach((function(e){e.dispose()}))}}),[]);return Object(f.useEffect)((function(){var e,t=(null===(e=null==n?void 0:n.error)||void 0===e?void 0:e.refId)===a.refId;n&&n.error&&t?_(n.error):_(void 0)}),[n,a.refId]),Object(f.useEffect)((function(){var e=u.current;if(e){var t=e.getBoundingClientRect().width;E(t)}}),[g,u.current]),Object(f.useEffect)((function(){g&&7.2*g.position+40+150>=F?M(Math.max(0,7.2*g.position-O/3)):M(0)}),[F,g,O]),d.a.createElement("div",{className:Object(h.cx)("gf-form",N.wrapper)},d.a.createElement("div",{className:Object(h.cx)("gf-form-inline",N.editorWrapper),ref:s},d.a.createElement("div",{className:Object(h.cx)("gf-form",N.editorInner)},d.a.createElement(l.CodeEditor,{height:250,language:A,onBlur:L,onEditorDidMount:W,onSave:L,readOnly:!0===a.hide,showMiniMap:!1,showLineNumbers:!0,width:F-2||600,value:a.queryText||P}),d.a.createElement("div",{className:N.overlay},"Disabled"))),d.a.createElement("div",{className:"gf-form-inline"},d.a.createElement("div",{className:"gf-form"},d.a.createElement("label",{className:"gf-form-label query-keyword width-16"},d.a.createElement("span",null,d.a.createElement(l.Icon,{name:"info-circle"})," Run your query with: ",d.a.createElement("code",null,"Shift+Enter")))),d.a.createElement("div",{className:"gf-form gf-form--grow"},d.a.createElement("div",{className:"gf-form-label gf-form-label--grow"})),d.a.createElement("div",{className:"gf-form"},d.a.createElement("label",{className:"gf-form-label query-keyword width-6 pointer",onClick:I},"Show Help",d.a.createElement(l.Icon,{name:T?"angle-down":"angle-right"})))),T&&d.a.createElement("div",{className:"gf-form"},d.a.createElement("pre",{className:"gf-form-pre alert alert-info"},"Representation type:\n  # Time series\n    - Return a column with the TIMESTAMP or DATE type\n    Notes:\n      - If multiple TIMESTAMP/DATE columns are returned, Grafana will use the first column one for the time axis\n\n  # Table\n    - Return any set of columns\n\nMacros:\n- $__timeFilter(column); column > '2020-08-21T15:11:32Z' AND column < '2020-08-21T16:11:32Z'\n- $__interval_ms; a duration in milliseconds suffixed with an \"M\"; 1000M\n\nExample of aggregation using SAMPLE BY ($__interval_ms) and $__timeFilter:\nSELECT ts, avg(x)\n  FROM long_sequence(5)\n  WHERE $__timeFilter(ts)\n  SAMPLE BY $__interval_ms;\n")),g&&d.a.createElement("div",{className:"gf-form-inline"},d.a.createElement("pre",{className:Object(h.cx)("gf-form-pre","alert","alert-error",N.pre)},g.query&&d.a.createElement("span",{ref:u,style:{marginLeft:-j}},g.query),d.a.createElement("div",{className:N.error,style:{textIndent:7.2*g.position-j}},g.position>-1&&"^ ",null===(t=null==n?void 0:n.error)||void 0===t?void 0:t.message))))}))}])}));
//# sourceMappingURL=module.js.map