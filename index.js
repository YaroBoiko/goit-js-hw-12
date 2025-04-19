import{a as q,S as B,i as n}from"./assets/vendor-Db2TdIkw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const $="https://pixabay.com/api/",M="42378066-015a1b30c7edae39918794555";async function f(r,t=1){return(await q.get($,{params:{key:M,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const h=document.querySelector(".gallery"),g=document.querySelector(".loader"),E=new B(".gallery a",{captionsData:"alt",captionDelay:250});function y(r){const t=r.map(({webformatURL:a,largeImageURL:i,tags:e,likes:o,views:s,comments:S,downloads:v})=>`
      <li class="photo-card">
        <a href="${i}">
          <img src="${a}" alt="${e}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${o}
          </p>
          <p class="info-item">
            <b>Views</b>${s}
          </p>
          <p class="info-item">
            <b>Comments</b>${S}
          </p>
          <p class="info-item">
            <b>Downloads</b>${v}
          </p>
        </div>
      </li>
    `).join("");h.insertAdjacentHTML("beforeend",t),E.refresh()}function H(){h.innerHTML=""}function p(){g.classList.remove("is-hidden")}function l(){g.classList.add("is-hidden")}const L=document.querySelector(".load-more");function b(){L.classList.remove("is-hidden")}function u(){L.classList.add("is-hidden")}const m=document.querySelector(".form"),O=document.querySelector(".load-more");let c="",d=1,w=0;m.addEventListener("submit",async r=>{if(r.preventDefault(),c=m.elements["search-text"].value.trim(),!c){n.warning({message:"Please enter something to search"});return}d=1,H(),u(),p();try{const t=await f(c,d);if(w=t.totalHits,l(),!t.hits.length){n.error({message:"No images found. Try again!"});return}y(t.hits),t.totalHits>15&&b()}catch{l(),n.error({message:"Something went wrong. Try later!"})}});O.addEventListener("click",async()=>{d+=1,p(),u();try{const r=await f(c,d);y(r.hits),P(),document.querySelectorAll(".gallery li").length>=w?(n.info({message:"We're sorry, but you've reached the end of search results."}),u()):b(),l()}catch{l(),n.error({message:"Something went wrong while loading more images."})}});function P(){const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
