/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$3=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$5=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$2,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$4,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t=>t,s$1=t$2.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$3=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$3,r$2=`<${n$2}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$3+x):s+o$3+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$3),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$3)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$3),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$3,t+1));)d.push({type:7,index:l}),t+=o$3.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$2=s.litElementPolyfillSupport;o$2?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

const CARD_TYPE = 'skyfield-scenic-horizon-card';
const CARD_NAME = 'Skyfield Scenic Horizon Card';
const CARD_DESCRIPTION = 'Scenic day/night landscape card driven by Skyfield sun and moon sensors';
const DOMAIN = 'sol';
/** Default base path — where HACS installs the card files */
const HACS_BASE_PATH = '/hacsfiles/lovelace-skyfield-scenic-horizon-card/';
/** Bundled scene images (sky, stars, clouds, sun, moon). Not user-configurable. */
const DEFAULT_IMAGES = {
    skyBackground: 'Lake_Sky_Background5.png',
    stars: 'Lake_Sky_Stars.png',
    clouds: 'Lake_Sky_Clouds.png',
    sun: 'sun-48190c.png',
    moonPath: 'moon/phase_{angle}.png',
};
/**
 * Foreground scene filenames by number (1-based).
 * Foreground 1 = index 0, foreground 2 = index 1, etc.
 * Add more entries when you have more foreground images in the bundle.
 */
const FOREGROUND_IMAGES = [
    'Lake_Alpha.png', // foreground 1
];
/** Default sun width as percentage of card width */
const DEFAULT_SUN_SIZE = 25;
/** Default moon width as percentage of card width */
const DEFAULT_MOON_SIZE = 7;
/** Sensor name segments used to build default entity IDs (Sol integration) */
const SENSOR_NAMES = {
    sunElevation: 'sun_elevation',
    sunAzimuth: 'sun_azimuth',
    moonElevation: 'moon_elevation',
    moonAzimuth: 'moon_azimuth',
    moonPhaseAngle: 'moon_phase_angle',
    moonParallacticAngle: 'moon_parallactic_angle',
    sunrise: 'sunrise',
    sunset: 'sunset',
    moonrise: 'moonrise',
    moonset: 'moonset',
    sunTransit: 'sun_transit',
    moonTransit: 'moon_transit',
    declinationNormalized: 'declination_normalized',
};
/**
 * Default azimuth range when sunrise/sunset azimuth attributes are not available.
 * Approximate annual range for mid-latitudes (Calgary ~51°N).
 */
const DEFAULT_AZIMUTH_MIN = 60;
const DEFAULT_AZIMUTH_MAX = 300;
/**
 * Default horizon position: percentage from the BOTTOM of the card where 0° elevation falls.
 * 0 = bottom, 100 = top, 50 = middle.
 */
const DEFAULT_HORIZON_Y = 30;
/**
 * Fallback maximum elevation when transit sensors are unavailable.
 * Used as the elevation that maps to the top of the card.
 */
const FALLBACK_MAX_ELEVATION = 60;
/**
 * Sun elevation thresholds that define transition stages (degrees).
 * These match the pyscript circadian_evening / circadian_twilight boundaries.
 */
const ELEVATION = {
    GOLDEN_HOUR_START: 6, // above this → full day
    TWILIGHT_START: 0, // civil twilight begins
    TWILIGHT_END: -12};
/** CSS transition duration applied to all animated layer properties */
const CSS_TRANSITION_DURATION = '60s';

/**
 * Build the default entity ID for a sensor given an optional location_name prefix.
 * e.g. location_name="calgary" → sensor.sol_calgary_sun_elevation
 *      location_name=undefined  → sensor.sol_sun_elevation
 */
function defaultEntityId(sensorKey, locationName) {
    const name = SENSOR_NAMES[sensorKey];
    const prefix = locationName ? `${locationName.toLowerCase().replace(/\s+/g, '_')}_` : '';
    return `sensor.${DOMAIN}_${prefix}${name}`;
}
/** Resolve all entity IDs from config, falling back to defaults */
function resolveEntities(config) {
    const loc = config.location_name;
    return {
        sunElevation: config.sun_elevation_entity ?? defaultEntityId('sunElevation', loc),
        sunAzimuth: config.sun_azimuth_entity ?? defaultEntityId('sunAzimuth', loc),
        moonElevation: config.moon_elevation_entity ?? defaultEntityId('moonElevation', loc),
        moonAzimuth: config.moon_azimuth_entity ?? defaultEntityId('moonAzimuth', loc),
        moonPhaseAngle: config.moon_phase_angle_entity ?? defaultEntityId('moonPhaseAngle', loc),
        moonParallacticAngle: config.moon_parallactic_angle_entity ?? defaultEntityId('moonParallacticAngle', loc),
        sunrise: config.sunrise_entity ?? defaultEntityId('sunrise', loc),
        sunset: config.sunset_entity ?? defaultEntityId('sunset', loc),
        moonrise: config.moonrise_entity ?? defaultEntityId('moonrise', loc),
        moonset: config.moonset_entity ?? defaultEntityId('moonset', loc),
        sunTransit: config.sun_transit_entity ?? defaultEntityId('sunTransit', loc),
        moonTransit: config.moon_transit_entity ?? defaultEntityId('moonTransit', loc),
        declinationNormalized: config.declination_normalized_entity ?? defaultEntityId('declinationNormalized', loc),
    };
}
/** Safely read a numeric sensor state, returning a fallback on failure */
function getNumericState(hass, entityId, fallback) {
    const state = hass.states[entityId];
    if (!state)
        return fallback;
    const value = parseFloat(state.state);
    return isNaN(value) ? fallback : value;
}
/** Safely read a sensor state as a string, returning null on failure */
function getStringState(hass, entityId) {
    const state = hass.states[entityId];
    if (!state || !state.state)
        return null;
    return state.state;
}
/** Safely read a numeric attribute, returning a fallback on failure */
function getNumericAttribute(hass, entityId, attribute, fallback) {
    const state = hass.states[entityId];
    if (!state)
        return fallback;
    const value = parseFloat(state.attributes[attribute]);
    return isNaN(value) ? fallback : value;
}
/**
 * Determine the azimuth range for the current day.
 * Uses the wider of the sun and moon rise/set azimuths so both bodies
 * fit within the horizontal span of the card.
 * Falls back to config values or built-in defaults if attributes are absent.
 */
function getAzimuthRange(hass, entities, config) {
    const sunRiseAz = getNumericAttribute(hass, entities.sunrise, 'rise_azimuth', NaN);
    const sunSetAz = getNumericAttribute(hass, entities.sunset, 'set_azimuth', NaN);
    const moonRiseAz = getNumericAttribute(hass, entities.moonrise, 'rise_azimuth', NaN);
    const moonSetAz = getNumericAttribute(hass, entities.moonset, 'set_azimuth', NaN);
    const hasSun = !isNaN(sunRiseAz) && !isNaN(sunSetAz);
    // If moonset occurs before moonrise on the same calendar day, the set event
    // happened before tonight's rise — the moon's arc hasn't started yet.
    // Exclude the moon from range calculation to avoid an inverted/backwards arc.
    const moonRiseTime = getStringState(hass, entities.moonrise);
    const moonSetTime = getStringState(hass, entities.moonset);
    const moonSetBeforeRise = (moonRiseTime !== null && moonSetTime !== null)
        ? new Date(moonSetTime) < new Date(moonRiseTime)
        : false;
    const hasMoon = !isNaN(moonRiseAz) && !isNaN(moonSetAz) && !moonSetBeforeRise;
    if (hasSun || hasMoon) {
        const candidates = [
            hasSun ? sunRiseAz : Infinity,
            hasMoon ? moonRiseAz : Infinity,
        ];
        const minAz = Math.min(...candidates);
        const candidatesMax = [
            hasSun ? sunSetAz : -Infinity,
            hasMoon ? moonSetAz : -Infinity,
        ];
        const maxAz = Math.max(...candidatesMax);
        if (minAz < maxAz) {
            return { min: minAz, max: maxAz };
        }
    }
    return {
        min: config.azimuth_min ?? DEFAULT_AZIMUTH_MIN,
        max: config.azimuth_max ?? DEFAULT_AZIMUTH_MAX,
    };
}
/**
 * Return all sensor values needed to render the card in a single call.
 * maxElevation is the greater of today's solar and lunar transit elevations,
 * used to scale the vertical position of both bodies on the card.
 */
function readSensors(hass, entities, config) {
    const azRange = getAzimuthRange(hass, entities, config);
    const sunTransitElevation = getNumericAttribute(hass, entities.sunTransit, 'transit_elevation', NaN);
    const moonTransitElevation = getNumericAttribute(hass, entities.moonTransit, 'transit_elevation', NaN);
    const candidates = [
        !isNaN(sunTransitElevation) ? sunTransitElevation : -Infinity,
        !isNaN(moonTransitElevation) ? moonTransitElevation : -Infinity,
    ];
    const maxElevation = Math.max(...candidates);
    return {
        sunElevation: getNumericState(hass, entities.sunElevation, 0),
        sunAzimuth: getNumericState(hass, entities.sunAzimuth, azRange.min + (azRange.max - azRange.min) / 2),
        moonElevation: getNumericState(hass, entities.moonElevation, -30),
        moonAzimuth: getNumericState(hass, entities.moonAzimuth, azRange.min),
        moonPhaseAngle: getNumericState(hass, entities.moonPhaseAngle, 0),
        moonParallacticAngle: getNumericState(hass, entities.moonParallacticAngle, 0),
        declinationNormalized: getNumericState(hass, entities.declinationNormalized, 0.5),
        azimuthRange: azRange,
        maxElevation: maxElevation > 0 ? maxElevation : FALLBACK_MAX_ELEVATION,
    };
}

/** Clamp a value between min and max */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
/** Linear interpolation from a → b by t (0–1) */
function lerp(a, b, t) {
    return a + (b - a) * t;
}
/**
 * Map a value from [fromMin, fromMax] → [0, 1], clamped.
 * Returns 0 when value === fromMin, 1 when value === fromMax.
 */
function normalize(value, fromMin, fromMax) {
    if (fromMax === fromMin)
        return 0;
    return clamp((value - fromMin) / (fromMax - fromMin), 0, 1);
}
/**
 * Calculate all day/night transition values from sun elevation.
 *
 * Mirrors pyscript circadian_on_off() logic:
 *
 *   circadian_evening:  0 = full day (sun above threshold),
 *                       1 = evening reached (sun at 5°)
 *   circadian_twilight: 0 = day (sun at 0°),
 *                       1 = full night (sun at −12°)
 *   circadian_stars:    star layer opacity (appears in second half of twilight)
 *   sky:                vertical offset for sky background layer (percentage)
 */
function calcTransitions(sunElevation, _declinationNormalized, _config) {
    // evening: 0 = full day (sun at or above 6°), 1 = sun at horizon (0°)
    // Fixed range 6° → 0°; no seasonal shift.
    const evening = normalize(sunElevation, ELEVATION.GOLDEN_HOUR_START, ELEVATION.TWILIGHT_START);
    // circadian_twilight: 0 = sun at horizon (0°), 1 = full night (−12°)
    const twilight = normalize(sunElevation, ELEVATION.TWILIGHT_START, ELEVATION.TWILIGHT_END);
    // Stars: appear between twilight 0.5 (−6°) and 1 (−12°), curved with x^0.6
    // so they emerge quickly early in nautical twilight then ease to full opacity
    const stars = Math.pow(clamp((twilight - 0.5) * 2, 0, 1), 1 / 0.6);
    // Sky background position — mirrors pyscript circadian_sky:
    //   combined = (evening/2 + twilight/2) * 400
    //   if twilight == 0 (daytime): negate (morning/evening position above centre)
    const rawSky = ((evening / 2) + (twilight / 2)) * 400;
    const sky = twilight === 0 ? -rawSky : rawSky;
    return { evening, twilight, stars, sky };
}
/**
 * Build a CSS filter string for the scene layers based on current transition values.
 *
 * Stages:
 *   Day  (evening=0, twilight=0) → no filter modification
 *   Golden hour (evening rises)  → warm sepia tint, slight brightness drop
 *   Civil twilight (twilight 0→0.5) → blue-grey shift, dimming begins
 *   Nautical twilight (twilight 0.5→1) → deep blue, near-dark
 */
function calcSceneFilter(transitions, config) {
    const { evening, twilight } = transitions;
    const brightNight = config.min_brightness ?? 0.35;
    const contrastNight = config.max_contrast ?? 1.3;
    // x^0.6 on evening (day→golden hour) and on twilight (0°→-12°, single ramp).
    const eveC = Math.pow(evening, 0.6);
    const twilC = Math.pow(twilight, 0.6);
    // Foreground starts at whatever golden-hour level was reached, then ramps to night.
    const brightDay = 1.0;
    const brightGolden = 0.85;
    const satGolden = 1.3;
    const satNight = 0.70;
    const contrastGolden = 1.1;
    const brightness = lerp(lerp(brightDay, brightGolden, eveC), brightNight, twilC);
    const saturation = lerp(lerp(1.0, satGolden, eveC), satNight, twilC);
    const contrast = lerp(lerp(1.0, contrastGolden, eveC), contrastNight, twilC);
    return [
        `brightness(${brightness.toFixed(3)})`,
        `saturate(${saturation.toFixed(3)})`,
        `contrast(${contrast.toFixed(3)})`,
    ].join(' ');
}
/** Interpolate between two RGB colour stops and return a CSS rgb() string. */
function lerpColor(c1, c2, t) {
    const r = Math.round(lerp(c1[0], c2[0], t));
    const g = Math.round(lerp(c1[1], c2[1], t));
    const b = Math.round(lerp(c1[2], c2[2], t));
    return `rgb(${r},${g},${b})`;
}
/**
 * Sky colour key-stops for each transition stage.
 * Two stops: zenith (top, 0%) and bottom (40% down the card).
 * The gradient is solid below 40%.
 */
const SKY = {
    /**
    dayTop:          [ 80, 200, 250],  // light cyan-sky blue at zenith
    dayMid:          [140, 225, 230],  // light blue-green at midpoint
    dayBottom:       [200, 250, 210],  // extrapolated pale aqua at bottom
  
    goldenTop:       [205,  85,  50],  // bright warm orange-red at zenith
    goldenMid:       [238, 155, 110],  // light peach at midpoint
    goldenBottom:    [255, 225, 170],  // extrapolated pale warm yellow at bottom
  
    civilTop:        [ 30,  15,  70],  // deep indigo at zenith
    civilMid:        [ 88,  42, 128],  // vivid purple at midpoint
    civilBottom:     [146,  69, 186],  // extrapolated lighter purple at bottom
  
    nightTop:        [  8,  10,  40],  // near-black navy at zenith
    nightMid:        [ 12,  15,  50],  // very dark navy at midpoint
    nightBottom:     [ 16,  20,  60],  // extrapolated slightly lighter navy at bottom
    */
    dayTop: [80, 200, 250], // light cyan-sky blue at zenith
    dayBottom: [140, 225, 230], // light blue-green at 40%
    goldenTop: [80, 200, 250], // zenith at golden hour
    goldenBottom: [238, 155, 110], // warm peach at 40%
    civilTop: [12, 28, 65], // deep indigo at zenith
    civilBottom: [238, 102, 12], // vivid orange-red at 40%
    nightTop: [12, 28, 65], // near-black navy at zenith
    nightBottom: [12, 28, 80], // flat night at 40%
};
/**
 * Compute a CSS linear-gradient string for the sky layer from current transitions.
 *
 * Progression:
 *   Day           (evening=0, twilight=0) → blue sky top, light-blue horizon
 *   Golden hour   (evening=1, twilight=0) → dark purple top, warm-orange horizon
 *   Civil twilight (twilight 0→0.5)       → lerp toward dark navy / mauve
 *   Night          (twilight 0.5→1)       → deep flat navy
 */
function calcSkyGradient(transitions) {
    const { evening, twilight } = transitions;
    // x^0.6 curve on evening so the sky colour shifts quickly early in golden hour
    const eveC = Math.pow(evening, 0.6);
    let top;
    let bottom;
    if (twilight === 0) {
        top = lerpColor(SKY.dayTop, SKY.goldenTop, eveC);
        bottom = lerpColor(SKY.dayBottom, SKY.goldenBottom, eveC);
    }
    else if (twilight < 0.5) {
        const t = twilight * 2;
        top = lerpColor(SKY.goldenTop, SKY.civilTop, t);
        bottom = lerpColor(SKY.goldenBottom, SKY.civilBottom, t);
    }
    else {
        const t = (twilight - 0.5) * 2;
        top = lerpColor(SKY.civilTop, SKY.nightTop, t);
        bottom = lerpColor(SKY.civilBottom, SKY.nightBottom, t);
    }
    return { top, bottom };
}
/**
 * Map a celestial body's azimuth and elevation to x/y percentages within the card.
 *
 * Coordinate conventions:
 *   x: 0% = left edge, 100% = right edge (CSS left)
 *   y: CSS top percentage — 0% = top of card, 100% = bottom of card
 *
 * horizonY is expressed as % from the BOTTOM (0=bottom, 50=middle, 100=top),
 * so CSS top for the horizon = 100 - horizonY.
 *
 * maxElevation is today's peak elevation (greater of solar/lunar transit).
 * At maxElevation the body is at the very top of the card (CSS top = 0%).
 * At 0° the body is at the horizon line.
 * Negative elevation places the body below the horizon.
 *
 * @param azimuth      Body azimuth in degrees (0–360, north=0, east=90)
 * @param elevation    Body elevation in degrees (negative = below horizon)
 * @param range        Today's azimuth range (min = rise az, max = set az)
 * @param horizonY     % from bottom where 0° elevation falls (default 30)
 * @param maxElevation Peak elevation today — maps to top inset (default 60)
 * @param bodyHeightPct Body height as % of card height (for top-edge kissing)
 */
function celestialPosition(azimuth, elevation, range, horizonY = DEFAULT_HORIZON_Y, maxElevation = FALLBACK_MAX_ELEVATION, _bodyHeightPct = 0) {
    const span = range.max - range.min;
    const x = span > 0
        ? clamp(((azimuth - range.min) / span) * 100, -5, 105)
        : 50;
    // CSS top of the horizon line
    const horizonCssTop = 100 - horizonY;
    // Use increased effective max elevation so peak transit renders below top edge.
    const effectiveMaxElevation = maxElevation * 1.15;
    const elevationRatio = clamp(elevation / effectiveMaxElevation, -10, 1);
    // Scale elevation linearly: 0° → horizonCssTop, effectiveMaxElevation → 0%.
    // Negative elevation naturally places the body below the horizon.
    const y = horizonCssTop - elevationRatio * horizonCssTop;
    return { x, y };
}
/**
 * Format a moon phase angle (0–360) to a zero-padded 3-digit string for image lookup.
 * e.g. 7 → "007", 159 → "159"
 */
function formatPhaseAngle(angle) {
    const clamped = clamp(Math.round(angle), 0, 360);
    return clamped.toString().padStart(3, '0');
}
/**
 * Resolve the moon phase image URL from the config template and current phase angle.
 * The config template uses {angle} as placeholder, e.g. /local/moon/phase_{angle}.png
 */
function moonImageUrl(template, angle) {
    return template.replace('{angle}', formatPhaseAngle(angle));
}

const TRANSITION = r$4(CSS_TRANSITION_DURATION);
function fullPath(filename) {
    return `${HACS_BASE_PATH}${filename}`;
}
let SkylineHorizonCard = class SkylineHorizonCard extends i$2 {
    static get styles() {
        return i$5 `
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
      }

      ha-card {
        overflow: hidden;
        border-radius: inherit;
        background: none;
      }

      .card-container {
        position: relative;
        width: 100%;
        isolation: isolate;
        /* Height is established by the invisible aspect-ref image below */
      }

      /* Invisible image whose natural dimensions set the card aspect ratio */
      .aspect-ref {
        display: block;
        width: 100%;
        height: auto;
        visibility: hidden;
        pointer-events: none;
      }

      /* All scene layers sit on top of the aspect-ref, filling the container */
      .layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: fill;
      }

      @property --sky-top {
        syntax: '<color>';
        inherits: false;
        initial-value: rgb(80, 200, 250);
      }

      @property --sky-bottom {
        syntax: '<color>';
        inherits: false;
        initial-value: rgb(140, 225, 230);
      }

      .layer--sky {
        z-index: 0;
        background: linear-gradient(to bottom, var(--sky-top) 0%, var(--sky-bottom) 40%);
        transition: --sky-top ${TRANSITION} ease, --sky-bottom ${TRANSITION} ease;
      }

      .layer--stars {
        z-index: 2;
        mix-blend-mode: hard-light;
        transition: opacity ${TRANSITION} ease;
      }

      .layer--clouds {
        z-index: 5;
        mix-blend-mode: overlay;
      }

      .layer--foreground {
        z-index: 4;
        transition: filter ${TRANSITION} ease;
      }

      /* Celestial bodies (sun / moon) */
      .celestial-body {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 1;
        pointer-events: none;
        height: auto;
        transition:
          left ${TRANSITION} ease,
          top ${TRANSITION} ease,
          opacity ${TRANSITION} ease;
      }

      .moon-img {
        width: 100%;
        height: auto;
        display: block;
        mix-blend-mode: screen;
        z-index: 3;
      }

      .sun-img {
        width: 100%;
        height: auto;
        display: block;
      }
    `;
    }
    setConfig(config) {
        const n = Math.max(1, Math.min(config.foreground ?? 1, FOREGROUND_IMAGES.length));
        this._config = { ...config, foreground: n };
    }
    set hass(hass) {
        this._hass = hass;
        this.requestUpdate();
    }
    get hass() {
        return this._hass;
    }
    /** All scene image URLs — fixed, from bundle */
    get _images() {
        return {
            sky: fullPath(DEFAULT_IMAGES.skyBackground),
            stars: fullPath(DEFAULT_IMAGES.stars),
            clouds: fullPath(DEFAULT_IMAGES.clouds),
            sun: fullPath(DEFAULT_IMAGES.sun),
            moonPath: fullPath(DEFAULT_IMAGES.moonPath),
        };
    }
    /** Foreground image URL for the selected foreground number (1-based) */
    get _activeForegroundImage() {
        const index = (this._config.foreground ?? 1) - 1;
        const filename = FOREGROUND_IMAGES[Math.max(0, index)] ?? FOREGROUND_IMAGES[0];
        return fullPath(filename);
    }
    render() {
        if (!this._hass || !this._config)
            return b ``;
        const entities = resolveEntities(this._config);
        const sensors = readSensors(this._hass, entities, this._config);
        const transitions = calcTransitions(sensors.sunElevation, sensors.declinationNormalized, this._config);
        const sceneFilter = calcSceneFilter(transitions, this._config);
        const skyColors = calcSkyGradient(transitions);
        const horizonY = this._config.horizon_y ?? 30;
        const images = this._images;
        const fgImage = this._activeForegroundImage;
        const sunSize = this._config.sun_size ?? DEFAULT_SUN_SIZE;
        const moonSize = this._config.moon_size ?? DEFAULT_MOON_SIZE;
        const cardAspect = 3000 / 1029;
        const sunHeightPct = sunSize * cardAspect;
        const moonHeightPct = moonSize * cardAspect;
        const sunPos = celestialPosition(sensors.sunAzimuth, sensors.sunElevation, sensors.azimuthRange, horizonY, sensors.maxElevation, sunHeightPct);
        const moonPos = celestialPosition(sensors.moonAzimuth, sensors.moonElevation, sensors.azimuthRange, horizonY, sensors.maxElevation, moonHeightPct);
        const moonUrl = moonImageUrl(images.moonPath, sensors.moonPhaseAngle);
        // Moon mask for stars layer: punch a moon-shaped hole in the stars using the
        // moon image's alpha channel so stars don't bleed through the moon disk.
        // Reuse moonHeightPct from above (already converted to card-height percent).
        const moonMaskPos = [
            `calc(${moonPos.x.toFixed(3)}% - ${(moonSize / 2).toFixed(3)}%)`,
            `calc(${moonPos.y.toFixed(3)}% - ${(moonHeightPct / 2).toFixed(3)}%)`,
        ].join(' ');
        const moonMaskSize = `${moonSize}% ${moonHeightPct.toFixed(3)}%`;
        return b `
      <ha-card>
        <div class="card-container">

          <!-- Invisible image that establishes the card's aspect ratio from the actual image -->
          <img class="aspect-ref" src=${fgImage} alt="" />

          <!-- Layer 0: Sky gradient — colours transition via CSS @property -->
          <div
            class="layer layer--sky"
            style=${o({ '--sky-top': skyColors.top, '--sky-bottom': skyColors.bottom })}
          ></div>

          <!-- Layer 1: Sun -->
          ${this._renderSun(sunPos, sceneFilter, images.sun, sunSize)}

          <!-- Layer 1: Moon -->
          ${this._renderMoon(moonPos, moonUrl, sensors.moonParallacticAngle, moonSize)}

          <!-- Layer 2: Stars — opacity driven by twilight; moon alpha punches a hole -->
          <img
            class="layer layer--stars"
            src=${images.stars}
            alt=""
            style=${o({
            opacity: String(transitions.stars),
            maskImage: `url('${moonUrl}'), linear-gradient(white, white)`,
            maskSize: `${moonMaskSize}, 100% 100%`,
            maskPosition: `${moonMaskPos}, 0% 0%`,
            maskComposite: 'exclude, add',
            maskRepeat: 'no-repeat, no-repeat',
            maskMode: 'alpha, alpha',
        })}
          />

          <!-- Layer 3: Foreground scene — day/night filter applied here -->
          <img
            class="layer layer--foreground"
            src=${fgImage}
            alt=""
            style=${o({ filter: sceneFilter })}
          />

          <!-- Layer 3: Clouds overlay -->
          <img
            class="layer layer--clouds"
            src=${images.clouds}
            alt=""
          />

        </div>
      </ha-card>
    `;
    }
    _renderSun(pos, filter, sunImage, size) {
        return b `
      <img
        class="celestial-body sun-img"
        src=${sunImage}
        alt="Sun"
        style=${o({
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: `${size}%`,
            filter,
        })}
      />
    `;
    }
    _renderMoon(pos, imageUrl, parallacticAngle, size) {
        return b `
      <img
        class="celestial-body moon-img"
        src=${imageUrl}
        alt="Moon"
        style=${o({
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: `${size}%`,
            transform: `translate(-50%, -50%) rotate(${parallacticAngle}deg)`,
            transformOrigin: '50% 50%',
        })}
      />
    `;
    }
    getCardSize() {
        return 4;
    }
};
__decorate([
    r()
], SkylineHorizonCard.prototype, "_config", void 0);
SkylineHorizonCard = __decorate([
    t$1(CARD_TYPE)
], SkylineHorizonCard);
window.customCards ?? (window.customCards = []);
window.customCards.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    preview: false,
    description: CARD_DESCRIPTION,
});

export { SkylineHorizonCard };
