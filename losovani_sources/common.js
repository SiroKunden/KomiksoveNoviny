/*
 * Copyright https://www.randomnamepicker.net/
 */
function set_name(){var e=store.data.index||0,t=get_name_obj(e),a=name_method.get_names(t);$("#dial").val(e),$("#display").val(a.join("\n"))}function get_params(){for(var e=window.location.search.substring(1),t=e.split("&"),a={},n=0;n<t.length;n++){var r=t[n].split("=");a[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return a}function get_name_obj(e){return window._db_name_set?window._db_name_set:store.data.names[e]}function shuffle(e){for(var t,a,n=e.length;0!==n;)a=Math.floor(Math.random()*n),n-=1,t=e[n],e[n]=e[a],e[a]=t;return e}function split_array(e,t){var a=e.map(function(a,n){return n%t===0?e.slice(n,n+t):null}).filter(function(e){return e});return a}var store={name:"rnp_sw_ar",data:null,default_name:["Kunden","Kuba Kvíz","Walome","Venca s kamerou","Vojta s pivem"],init:function(){store.data={names:[[],[],[],[],[],[],[],[],[],[]],index:0,sw_option:{speed:30}}},set_name_and_access:function(e){for(var t=new Array,a=new Array,n=0;n<e.length;n++)e[n]&&(t.push(e[n].trim()),a.push(1));return{names:t,access:a}},save:function(){localStorage.setItem(store.name,JSON.stringify(store.data))},set:function(e,t,a){if("undefined"==typeof a&&(a=0),store.storage&&e.length>1){var n=store.clean(e);store.data.index=a,store.data.names[a]={names:n,access:t},store.save()}},get:function(e){return store.storage?(store.data=JSON.parse(localStorage.getItem(store.name)),store.data||(store.init(),store.data.names[0]=store.default_name),store.data.sw_option||(store.data.sw_option={speed:30})):store.data.names[0]=store.default_name,"undefined"==typeof e?store.data.names:store.data.names[e]},remove:function(){return store.storage?(localStorage.removeItem(store.name),!0):!1},clean:function(e){for(var t=new Array,a=0;a<e.length;a++)e[a]&&t.push(e[a].trim());return t},storage:function(){var e="test";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}},name_method={hide_name:function(e,t){return t&&"..."!=t?(e.names.forEach(function(a,n){a==t&&(e.access[n]=0)}),e):void 0},reset_name:function(e){return e.access.forEach(function(t,a){e.access[a]=1}),e},save_name:function(e,t){if(e.trim()){var a=store.set_name_and_access(e.split("\n"));return store.set(a.names,a.access,t),!0}return!1},get_names:function(e){if(Array.isArray(e))return e;var t=[],a=e.names,n=e.access;return a.forEach(function(e,a){1==n[a]&&t.push(e)}),t}};store.get(),$(function(){$('[data-toggle="tooltip"]').tooltip()}),$(function(){function e(e){"undefined"==typeof e&&(e=store.data.index||0);var t,a=store.data.names[e];t=Array.isArray(a)?a:a.names,$("#dial").val(e),$("#display").val(t.join("\n"))}$("#myModal").on("shown.bs.modal",function(){e()}),$(".modal-trigger").click(function(){$("#myModal").modal({keyboard:!0})}),$("#dial").on("click",function(){var t=$(this).val();e(t)}).on("dblclick",function(){var e=$(this).val(),t=$("#display").val();name_method.save_name(t,e)?location.reload():alert("Please enter names first before using this set.")}),$("#display").on("blur",function(){var e=$(this).val(),t=$("#dial").val();name_method.save_name(e,t)})});