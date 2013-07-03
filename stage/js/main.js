(function(){define("managers/pubsub",["require","backbone"],function(e){var t;return t=e("backbone"),{subscribe:function(e,n){return this.listenTo(t,e,n)},publish:function(){return t.trigger.apply(t,arguments)}}})}).call(this),function(){define("managers/token",["require","backbone","underscore","managers/pubsub"],function(e){var t,n,r,i;return t=e("backbone"),i=e("underscore"),n=e("managers/pubsub"),r=function(){function e(){i.extend(this,t.Events),i.extend(this,n)}return e.prototype.token=null,e.prototype.set=function(e){return this.token=e,sessionStorage.setItem("huygens_token",e)},e.prototype.get=function(){return this.token==null&&(this.token=sessionStorage.getItem("huygens_token")),this.token==null?(this.publish("unauthorized"),!1):this.token},e.prototype.clear=function(){return sessionStorage.removeItem("huygens_token")},e}(),new r})}.call(this),function(){define("managers/ajax",["require","jquery","managers/token"],function(e){var t,n;return t=e("jquery"),n=e("managers/token"),{get:function(e){return this.fire("get",e)},post:function(e){return this.fire("post",e)},put:function(e){return this.fire("put",e)},fire:function(e,r){var i,s;return s=config.baseUrl+r.url,delete r.url,i={url:s,type:e,dataType:"json",beforeSend:function(e){return e.setRequestHeader("Authorization","SimpleAuth "+n.get())}},i=t.extend(i,r),t.ajax(i)}}})}.call(this),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("models/base",["require","backbone"],function(e){var n,r,i;return n=e("backbone"),r=function(e){function n(){return i=n.__super__.constructor.apply(this,arguments),i}return t(n,e),n}(n.Models)})}.call(this),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("models/main",["require","managers/ajax","models/base"],function(e){var n,r,i,s;return i=e("managers/ajax"),r={Base:e("models/base")},n=function(e){function n(){return s=n.__super__.constructor.apply(this,arguments),s}return t(n,e),n.prototype.defaults=function(){return{url:""}},n.prototype.query=function(e,t){var n,r,s=this;return n=function(e){var n;return n=i.get({url:s.get("url")+"/"+e}),n.done(t)},r=i.post({url:this.get("url"),contentType:"application/json; charset=utf-8",processData:!1,data:JSON.stringify(e)}),r.done(function(e){return n(e.key)}),r.fail(function(e,t,n){if(e.status===401)return s.publish("unauthorized")})},n}(r.Base),new n})}.call(this),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("views/base",["require","backbone"],function(e){var n,r,i;return n=e("backbone"),r=function(e){function n(){return i=n.__super__.constructor.apply(this,arguments),i}return t(n,e),n}(n.Models)})}.call(this),function(){define("helpers/fns",["require","jquery"],function(e){var t;return t=e("jquery"),{slugify:function(e){var t,n,r,i;t="àáäâèéëêìíïîòóöôùúüûñç·/_:;",i="aaaaeeeeiiiioooouuuunc-----",e=e.trim().toLowerCase(),r=e.length;while(r--)n=t.indexOf(e[r]),n!==-1&&(e=e.substr(0,r)+i[n]+e.substr(r+1));return e.replace(/[^a-z0-9 -]/g,"").replace(/\s+|\-+/g,"-").replace(/^\-+|\-+$/g,"")},generateID:function(e){var t,n;e=e!=null&&e>0?e-1:7,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t.charAt(Math.floor(Math.random()*52));while(e--)n+=t.charAt(Math.floor(Math.random()*t.length));return n},deepCopy:function(e){var n;return n=Array.isArray(e)?[]:{},t.extend(!0,n,e)},timeoutWithReset:function(){var e;return e=0,function(t,n){return clearTimeout(e),e=setTimeout(n,t)}}(),stripTags:function(e){return t("<span />").html(e).text()},onlyNumbers:function(e){return e.replace(/[^\d.]/g,"")}}})}.call(this),define("text!html/facet.html",[],function(){return'<div class="placeholder pad4"></div>'}),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("views/facet",["require","views/base","text!html/facet.html"],function(e){var n,r,i,s;return i={Base:e("views/base")},r={Facet:e("text!html/facet.html")},n=function(e){function n(){return s=n.__super__.constructor.apply(this,arguments),s}return t(n,e),n.prototype.render=function(){var e;return e=_.template(r.Facet),this.$el.html(e),this},n}(i.Base)})}.call(this),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("models/list.item",["require","models/base"],function(e){var n,r,i;return r={Base:e("models/base")},n=function(e){function n(){return i=n.__super__.constructor.apply(this,arguments),i}return t(n,e),n.prototype.parse=function(e){return e.name||(e.name="<i>empty</i>"),e},n}(r.Base)})}.call(this),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("collections/base",["require","backbone"],function(e){var n,r,i;return n=e("backbone"),r=function(e){function n(){return i=n.__super__.constructor.apply(this,arguments),i}return t(n,e),n}(n.Collections)})}.call(this),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("collections/list.items",["require","models/list.item","collections/base"],function(e){var n,r,i,s;return i={ListItem:e("models/list.item")},n={Base:e("collections/base")},r=function(e){function n(){return s=n.__super__.constructor.apply(this,arguments),s}return t(n,e),n.prototype.model=i.ListItem,n}(n.Base)})}.call(this),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("models/list",["require","models/base","collections/list.items"],function(e){var n,r,i,s;return i={Base:e("models/base")},n={ListItems:e("collections/list.items")},r=function(e){function r(){return s=r.__super__.constructor.apply(this,arguments),s}return t(r,e),r.prototype.parse=function(e){return e.options=new n.ListItems(e.options,{parse:!0}),e},r}(i.Base)})}.call(this),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("models/facet",["require","models/base"],function(e){var n,r,i;return r={Base:e("models/base")},n=function(e){function n(){return i=n.__super__.constructor.apply(this,arguments),i}return t(n,e),n}(r.Base)})}.call(this),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("collections/facets",["require","models/facet","collections/base"],function(e){var n,r,i,s;return i={Facet:e("models/facet")},n={Base:e("collections/base")},r=function(e){function n(){return s=n.__super__.constructor.apply(this,arguments),s}return t(n,e),n.prototype.model=i.Facet,n}(n.Base),new r})}.call(this),define("text!html/facet/list.html",[],function(){return'\n<header>\n  <h3><%= title %></h3>\n</header>\n<div class="body">\n  <div class="row span2 align middle">\n    <div class="cell span1 center">\n      <input type="text" name="listsearch" class="listsearch"/>\n    </div>\n    <div class="cell span1 right">\n      <nav>\n        <ul>\n          <li class="all">All </li>\n          <li class="none">None </li>\n        </ul>\n      </nav>\n    </div>\n  </div>\n  <ul class="items"></ul>\n</div>'}),define("text!html/facet/list.items.html",[],function(){return'\n<% _.each(items, function(item) { %>\n<% var someId = generateID(); %>\n<li class="item">\n  <div class="row span6">\n    <div class="cell span5">\n      <input id="<%= someId %>" type="checkbox" name="<%= someId %>"/>\n      <label for="<%= someId %>"><%= item.get(\'name\') %></label>\n    </div>\n    <div class="cell span1 right">\n      <div class="count"><%= item.get(\'count\') %></div>\n    </div>\n  </div>\n</li><% }); %>'}),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("views/facets/list",["require","helpers/fns","views/facet","models/list","collections/facets","text!html/facet/list.html","text!html/facet/list.items.html"],function(e){var n,r,i,s,o,u,a;return r=e("helpers/fns"),u={Facet:e("views/facet")},s={List:e("models/list")},n={Facets:e("collections/facets")},o={List:e("text!html/facet/list.html"),Items:e("text!html/facet/list.items.html")},i=function(e){function n(){return a=n.__super__.constructor.apply(this,arguments),a}return t(n,e),n.prototype.filtered_items=[],n.prototype.className="facet list",n.prototype.events=function(){return{"click li.all":"selectAll","click li.none":"deselectAll","click h3":"toggleBody","keyup input.listsearch":"showResults"}},n.prototype.toggleBody=function(e){return console.log($(e.currentTarget).parents(".list")),$(e.currentTarget).parents(".list").find(".body").slideToggle()},n.prototype.selectAll=function(){var e,t,n,r,i;t=this.el.querySelectorAll('input[type="checkbox"]'),i=[];for(n=0,r=t.length;n<r;n++)e=t[n],i.push(e.checked=!0);return i},n.prototype.deselectAll=function(){var e,t,n,r,i;t=this.el.querySelectorAll('input[type="checkbox"]'),i=[];for(n=0,r=t.length;n<r;n++)e=t[n],i.push(e.checked=!1);return i},n.prototype.showResults=function(e){var t,n;return n=e.currentTarget.value,t=new RegExp(n,"i"),this.filtered_items=this.model.get("options").filter(function(e){return t.test(e.get("name"))}),this.renderListItems()},n.prototype.initialize=function(e){return n.__super__.initialize.apply(this,arguments),this.model=new s.List(e.attrs,{parse:!0}),this.render()},n.prototype.render=function(){var e;return n.__super__.render.apply(this,arguments),e=_.template(o.List,this.model.attributes),this.$(".placeholder").html(e),this.renderListItems(),this},n.prototype.renderListItems=function(){var e,t;return e=this.filtered_items.length>0?this.filtered_items:this.model.get("options").models,t=_.template(o.Items,{model:this.model.attributes,items:e,generateID:r.generateID}),this.$(".body ul.items").html(t)},n}(u.Facet)})}.call(this),define("text!html/search.html",[],function(){return'<header><h3>Text search</h3></header><div class="body"><div class="row span4 align middle"><div class="cell span3"><div class="padr4"><input id="search" type="text" name="search"/></div></div><div class="cell span1"><button class="search">Search</button></div></div><br/><div class="align middle"><input id="matchcase" type="checkbox" name="matchcase"/><label for="matchcase">Match case</label></div></div>'}),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("views/search",["require","models/main","views/facet","text!html/search.html"],function(e){var n,r,i,s,o;return n={Main:e("models/main")},s={Facet:e("views/facet")},i={Search:e("text!html/search.html")},r=function(e){function r(){return o=r.__super__.constructor.apply(this,arguments),o}return t(r,e),r.prototype.className="facet search",r.prototype.events={"click button.search":"search"},r.prototype.search=function(e){var t=this;return e.preventDefault(),this.$("#search").addClass("loading"),this.model.query({term:this.$("input#search").val(),textLayers:["Diplomatic"]},function(e){return t.$("#search").removeClass("loading"),t.publish("faceted-search:results",e)})},r.prototype.initialize=function(){return r.__super__.initialize.apply(this,arguments),this.model=n.Main,this.render()},r.prototype.render=function(){var e;return r.__super__.render.apply(this,arguments),e=_.template(i.Search),this.$(".placeholder").html(e),this},r}(s.Facet)})}.call(this),define("text!html/faceted-search.html",[],function(){return"<form></form>"}),function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("main",["require","models/main","views/base","views/facets/list","views/search","text!html/faceted-search.html"],function(n){var r,i,s,o,u;return i={Main:n("models/main")},o={Base:n("views/base"),List:n("views/facets/list"),Search:n("views/search")},s={FacetedSearch:n("text!html/faceted-search.html")},r=function(n){function r(){return u=r.__super__.constructor.apply(this,arguments),u}return t(r,n),r.prototype.className="faceted-search",r.prototype.defaultOptions=function(){return{search:!0}},r.prototype.initialize=function(e){return r.__super__.initialize.apply(this,arguments),this.options=_.extend(this.defaultOptions(),e),this.model=i.Main,this.model.set("url",this.options.url),this.render()},r.prototype.render=function(){var e,t,n=this;return e=_.template(s.FacetedSearch),this.$el.html(e),this.options.search&&(t=new o.Search,this.$("form").html(t.$el)),this.model.query({},function(e){return n.facets=e.facets,n.renderFacets()}),this},r.prototype.renderFacets=function(){var t,n,r,i,s;i=this.facets,s=[];for(n in i){if(!e.call(i,n))continue;t=i[n],r=new o.List({attrs:t}),s.push(this.$("form").append(r.$el))}return s},r}(o.Base)})}.call(this);