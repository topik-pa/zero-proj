(()=>{"use strict";const e=()=>{const e=document.querySelector("#cookie_layer_accept"),t=document.querySelector("#cookie_layer");""===function(e){const t="zero-project-privacy=",o=document.cookie.split(";");for(let e=0;e<o.length;e++){let c=o[e];for(;" "===c.charAt(0);)c=c.substring(1);if(0===c.indexOf(t))return c.substring(t.length,c.length)}return""}()&&setTimeout((()=>{t.classList.add("active")}),3e3),e.addEventListener("click",(e=>{e.preventDefault(),function(e,t,o){const c=new Date;c.setTime(c.getTime()+10368e6);const n="expires="+c.toUTCString();document.cookie="zero-project-privacy=true;"+n+";path=/"}(),t.classList.remove("active")}))},t=()=>{const e=document.getElementById("goto_top"),t="visible";window.addEventListener("scroll",function(e,t=300){let o;return(...c)=>{clearTimeout(o),o=setTimeout((()=>{e.apply(this,c)}),t)}}((function(){window.scrollY>=200?e.classList.add(t):e.classList.remove(t)}))),e.addEventListener("click",(()=>{window.scrollTo({top:0,behavior:"smooth"})}))};(()=>{const e=document.querySelector("header"),t=e.querySelector(".icon-menu"),o=e.querySelector("nav");t.addEventListener("click",(()=>{o.classList.toggle("show")}))})(),e(),t()})();