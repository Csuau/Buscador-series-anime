"use strict";const searchBtn=document.querySelector(".js_searchBtn"),userSearch=document.querySelector(".js_userSearch"),resultList=document.querySelector(".js_resultList"),favoritesList=document.querySelector(".js_favoritesList"),resetBtn=document.querySelector(".js_resetBtn"),resetBtnFav=document.querySelector(".js_resetBtnFavorite"),urlImgNotFound="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",defaultImg="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let favorites=[];function getItems(e){e.preventDefault(),fetch("https://api.jikan.moe/v4/anime?q="+userSearch.value).then(e=>e.json()).then(({data:e})=>{e.forEach(({title:e,images:{jpg:{image_url:t}},mal_id:r})=>{renderResults(e,checkImg(t),r)})})}function checkImg(e){return e===urlImgNotFound?defaultImg:e}function createHtml(e,t,r){const s=document.createElement("li");s.classList.add("liContainer"),s.dataset.id=r;const i=document.createElement("div"),a=document.createElement("img");a.setAttribute("src",t);const n=document.createElement("h2"),o=document.createTextNode(e);return n.appendChild(o),s.appendChild(n),s.appendChild(i),i.appendChild(a),s}function renderResults(e,t,r){const s=createHtml(e,t,r);favorites.find(e=>parseInt(e.id)===r)&&s.classList.add("favorite"),resultList.appendChild(s),s.addEventListener("click",addFavorites)}function addFavorites(e){const t=e.currentTarget,r=t.querySelector("h2").innerHTML,s=t.querySelector("img").src,i=t.dataset.id,a=favorites.findIndex(e=>e.id===i);-1===a?(favorites.push({id:i,title:r,img:s}),renderFavorite(r,s,i)):(favorites.splice(a,1),removeFavorite(i)),localStorage.setItem("favorites",JSON.stringify(favorites)),t.classList.toggle("favorite"),toggleResetBtnFavorites()}function renderFavorites(){const e=localStorage.getItem("favorites");e&&(JSON.parse(e).forEach(({id:e,title:t,img:r})=>{favorites.push({id:e,title:t,img:r}),renderFavorite(t,r,e)}),toggleResetBtnFavorites())}function toggleResetBtnFavorites(){favorites.length>0&&resetBtnFav.classList.contains("hidden")?(resetBtnFav.classList.remove("hidden"),resetBtnFav.addEventListener("click",resetLocalStorage)):0===favorites.length&&resetBtnFav.classList.add("hidden")}function resetLocalStorage(){favorites.forEach(e=>removeFavorite(e.id)),localStorage.removeItem("favorites"),favorites=[],favoritesList.innerHTML=null,resetBtnFav.classList.add("hidden")}function renderFavorite(e,t,r){const s=createHtml(e,t,r),i=document.createElement("span");i.innerText="x",i.classList.add("btnRemove"),i.dataset.id=r,i.addEventListener("click",checkIdRemove),s.appendChild(i),favoritesList.appendChild(s)}function checkIdRemove(e){const t=e.currentTarget.dataset.id,r=favorites.findIndex(e=>e.id===t);-1!==r&&(favorites.splice(r,1),removeFavorite(t),localStorage.setItem("favorites",JSON.stringify(favorites)))}function removeFavorite(e){favoritesList.querySelector(`[data-id="${e}"]`).remove();const t=resultList.querySelector(`[data-id="${e}"]`);t&&t.classList.remove("favorite")}searchBtn.addEventListener("click",getItems),renderFavorites();