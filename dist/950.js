"use strict";(self.webpackChunkzero=self.webpackChunkzero||[]).push([[950],{950:(e,t,n)=>{n.r(t),n.d(t,{form:()=>l});const o=document.forms[0],r=document.getElementById("errors");o.querySelector("button[type=submit]").addEventListener("click",(e=>{e.preventDefault(),(()=>{r.innerText="";const e=o.querySelectorAll(":invalid");e.length>0&&r.classList.remove("hide");for(const t of e){if("FIELDSET"===t.nodeName)continue;const e=t.getAttribute("placeholder"),n=t.id?o.querySelector(`label[for=${t.id}]`).innerText:"";let l=e||n;l+=": ",l+=t.validationMessage.toLowerCase()||"invalid value.";const c=document.createElement("li");c.innerText=l,r.append(c)}})()}));const l={init:async()=>{console.log("Form")}}}}]);