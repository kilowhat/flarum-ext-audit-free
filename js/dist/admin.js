module.exports=function(t){var n={};function e(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,e),a.l=!0,a.exports}return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)e.d(o,a,function(n){return t[n]}.bind(null,a));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=21)}([function(t,n){t.exports=flarum.core.compat.app},function(t,n){t.exports=flarum.core.compat.Model},function(t,n){t.exports=flarum.core.compat["components/Button"]},function(t,n){t.exports=flarum.core.compat["helpers/icon"]},function(t,n){t.exports=flarum.core.compat.Component},function(t,n){t.exports=flarum.core.compat["helpers/username"]},function(t,n){t.exports=flarum.core.compat["components/Badge"]},function(t,n){t.exports=flarum.core.compat["models/Group"]},function(t,n){t.exports=flarum.core.compat["helpers/avatar"]},function(t,n){t.exports=flarum.core.compat["utils/mixin"]},function(t,n){t.exports=flarum.core.compat.extend},function(t,n){t.exports=flarum.core.compat["components/AdminLinkButton"]},function(t,n){t.exports=flarum.core.compat["components/AdminNav"]},function(t,n){t.exports=flarum.core.compat["components/Page"]},function(t,n){t.exports=flarum.core.compat["components/LoadingIndicator"]},function(t,n){t.exports=flarum.core.compat["components/Placeholder"]},function(t,n){t.exports=flarum.core.compat["components/Dropdown"]},function(t,n){t.exports=flarum.core.compat["components/GroupBadge"]},function(t,n){t.exports=flarum.core.compat["helpers/humanTime"]},function(t,n){t.exports=flarum.core.compat["utils/extractText"]},function(t,n){t.exports=flarum.core.compat["utils/ItemList"]},function(t,n,e){"use strict";e.r(n);var o=e(0),a=e.n(o);function r(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n}var i=e(1),s=e.n(i),u=e(9),c=function(t){function n(){return t.apply(this,arguments)||this}return r(n,t),n}(e.n(u)()(s.a,{actorId:s.a.attribute("actorId"),client:s.a.attribute("client"),ipAddress:s.a.attribute("ipAddress"),action:s.a.attribute("action"),payload:s.a.attribute("payload"),createdAt:s.a.attribute("createdAt",s.a.transformDate),actor:s.a.hasOne("actor"),discussion:s.a.hasOne("discussion"),post:s.a.hasOne("post"),tag:s.a.hasOne("tag"),user:s.a.hasOne("user")})),l=e(10),d=e(11),p=e.n(d),f=e(12),h=e.n(f),g=e(13),w=e.n(g),_=e(4),y=e.n(_),k=e(2),b=e.n(k),v=e(14),x=e.n(v),A=e(15),R=e.n(A),O=e(6),I=e.n(O),B=e(16),S=e.n(B),P=e(17),Q=e.n(P),q=e(8),M=e.n(q),N=e(18),j=e.n(N),D=e(3),L=e.n(D),T=e(5),C=e.n(T),U=e(7),G=e.n(U),J=e(19),E=e.n(J),V=e(20),z=e.n(V),F="kilowhat-audit.lib.browser.";function H(t,n){void 0===n&&(n=!1);var e=t?JSON.parse(JSON.stringify(t)):[];if(!e.length){if(!n)return m("em",a.a.translator.trans(F+"noValue"));e.push(G.a.ADMINISTRATOR_ID)}return e.map((function(t){if(t+""===G.a.GUEST_ID)return I.a.component({icon:"fas fa-globe",label:a.a.translator.trans(F+"permissionGroup.everyone")});if(t+""===G.a.MEMBER_ID)return I.a.component({icon:"fas fa-user",label:a.a.translator.trans(F+"permissionGroup.members")});var n=a.a.store.getById("groups",t);return n?Q.a.component({group:n}):I.a.component({icon:"fas fa-question",label:E()(a.a.translator.trans(F+"deletedResource.group",{id:t}))})})).map((function(t,n){return[n>0?", ":null,t]}))}function W(t){return(t||[]).map((function(t,n){return[n>0?", ":null,m("code",t)]}))}var K=function(t){function n(){return t.apply(this,arguments)||this}r(n,t);var e=n.prototype;return e.init=function(){t.prototype.init.call(this),this.showRaw=!1},e.view=function(){var t,n,e,o=this,r=this.props.log,i=r.actor(),s=r.payload()||{},u=r.discussion(),c=r.post(),l=r.tag(),d=r.user(),p=[];r.ipAddress()&&p.push(m("a",{onclick:function(){o.props.changeQuery("ip:"+r.ipAddress())}},r.ipAddress())),"session"!==r.client()&&"cli"!==r.client()&&p.push(m("a",{onclick:function(){o.props.changeQuery("client:"+r.client())}},a.a.translator.trans(F+"client."+r.client()))),p.push(j()(r.createdAt())),t="cli"===r.client()?L()("fas fa-terminal"):null===r.actorId()?L()("fas fa-user-secret"):i?m("a",{href:i?a.a.route.user(i):"#"},M()(i)):M()(null),n="cli"===r.client()?m("a",{onclick:function(){o.props.changeQuery("client:cli")}},a.a.translator.trans(F+"client.cli")):null===r.actorId()?m("a",{onclick:function(){o.props.changeQuery("actor:guest")}},a.a.translator.trans(F+"withoutActor")):i?m("a",{onclick:function(){o.props.changeQuery("actor:"+i.username())}},C()(i)):C()(i);var f=F+r.action();if("setting_changed"===r.action()&&s.hasOwnProperty("new_value")&&(f=F+"setting_changed_with_values"),"string"==typeof a.a.translator.translations[f]){var h={username:m("a",{href:d?a.a.route.user(d):"#"},d?C()(d):a.a.translator.trans(F+"deletedResource.user",{id:s.user_id})),discussion:m("a",{href:u?a.a.route.discussion(u):"#"},u?u.title():a.a.translator.trans(F+"deletedResource.discussion",{id:s.discussion_id})),tag:m("a",{href:l?a.a.route.tag(l):"#"},l?l.name():a.a.translator.trans(F+"deletedResource.tag",{id:s.tag_id})),post:m("a",{href:c&&c.discussion()?a.a.route.post(c):"#"},c?"comment"===c.contentType()?"Comment":"Post":a.a.translator.trans(F+"deletedResource.post",{id:s.post_id})),postuser:m("a",{href:c&&c.user()?a.a.route.user(c.user()):"#"},C()(c?c.user():null)),until:s.until?moment(s.until).format("LLLL"):"?",old_title:m("em",s.old_title),new_title:s.new_title&&u?m("a",{href:a.a.route.discussion(u)},s.new_title):s.new_title,package:m("code",s.package),provider:m("code",s.provider),ip:m("code",s.ip),key:m("code",s.key),permission:m("code",s.permission),old_value:s.old_value?m("code",s.old_value):m("em",a.a.translator.trans(F+"noValue")),new_value:s.new_value?m("code",s.new_value):m("em",a.a.translator.trans(F+"noValue")),old_groups:H(s.old_group_ids,"permission_changed"===r.action()),new_groups:H(s.new_group_ids,"permission_changed"===r.action()),old_username:m("code",s.old_username),new_username:m("code",s.new_username),old_email:m("code",s.old_email),new_email:m("code",s.new_email),old_tags:W(s.old_tags),new_tags:W(s.new_tags),post_count:s.post_count};e=a.a.translator.trans(f,h),this.showRaw&&(e=[e,m("pre",JSON.stringify(s,null,2))])}else e=JSON.stringify(s);var g=new z.a;return g.add("raw",b.a.component({children:a.a.translator.trans(F+"controls."+(this.showRaw?"hideRaw":"showRaw")),onclick:function(){o.showRaw=!o.showRaw}})),i&&g.add("actor",b.a.component({children:a.a.translator.trans(F+"controls.filterActor"),onclick:function(){o.props.changeQuery("actor:"+i.username())}})),r.ipAddress()&&g.add("ip",b.a.component({children:a.a.translator.trans(F+"controls.filterIp"),onclick:function(){o.props.changeQuery("ip:"+r.ipAddress())}})),g.add("client",b.a.component({children:a.a.translator.trans(F+"controls.filterClient"),onclick:function(){o.props.changeQuery("client:"+r.client())}})),g.add("action",b.a.component({children:a.a.translator.trans(F+"controls.filterAction"),onclick:function(){o.props.changeQuery("action:"+r.action())}})),d&&g.add("user",b.a.component({children:a.a.translator.trans(F+"controls.filterUser"),onclick:function(){o.props.changeQuery("user:"+d.username())}})),s.discussion_id&&g.add("discussion",b.a.component({children:a.a.translator.trans(F+"controls.filterDiscussion"),onclick:function(){o.props.changeQuery("discussion:"+s.discussion_id)}})),m(".AuditItem",[m(".AuditItemAvatar",t),m(".AuditItemData",[S.a.component({children:g.toArray(),menuClassName:"Dropdown-menu--right",buttonClassName:"Button Button--icon Button--flat",label:a.a.translator.trans(F+"controls"),icon:"fas fa-ellipsis-v"}),m(".AuditItemRow",[n," - ",m("a",{onclick:function(){o.props.changeQuery("action:"+r.action())}},r.action())]),m(".AuditItemRow",e),m(".AuditItemRow",p.map((function(t,n){return[0===n?null:" - ",t]})))])])},n}(y.a),X=function(t){function n(){return t.apply(this,arguments)||this}r(n,t);var e=n.prototype;return e.init=function(){this.q="",this.loading=!0,this.moreResults=!1,this.logs=[],this.refresh()},e.view=function(){var t,n=this;return this.loading?t=x.a.component():this.moreResults&&(t=b.a.component({children:a.a.translator.trans("kilowhat-audit.lib.browser.loadMore"),className:"Button Button--block",onclick:this.loadMore.bind(this)})),m("div",[m(".AuditSearch",[m(".AuditSearchWrapper",[m("input.FormControl",{value:this.q,onchange:function(t){n.q=t.target.value},placeholder:a.a.translator.trans("kilowhat-audit.lib.browser.filterPlaceholder")}),this.q?b.a.component({className:"Search-clear Button Button--icon Button--link",onclick:function(){n.q="",n.refresh()},icon:"fas fa-times-circle"}):null]),b.a.component({className:"Button",onclick:function(){n.refresh()},children:a.a.translator.trans("kilowhat-audit.lib.browser.filterApply")})]),0!==this.logs.length||this.loading?null:R.a.component({text:a.a.translator.trans("kilowhat-audit.lib.browser.empty")}),m(".AuditList",this.logs.map((function(t){return K.component({log:t,changeQuery:function(t){n.q=t,n.refresh()}})}))),m(".AuditMore",t)])},e.requestParams=function(){var t={filter:{}},n=this.props.baseQ||"";return this.q&&(n+=" "+this.q),n&&(t.filter.q=n.trim()),t},e.refresh=function(t){var n=this;return void 0===t&&(t=!0),t&&(this.loading=!0,this.logs=[]),this.loadResults().then((function(t){n.logs=[],n.parseResults(t)}),(function(){n.loading=!1,m.redraw()}))},e.loadResults=function(t){var n=this.requestParams();return n.page={offset:t},a.a.store.find("kilowhat-audit/logs",n)},e.loadMore=function(){this.loading=!0,this.loadResults(this.logs.length).then(this.parseResults.bind(this))},e.parseResults=function(t){return[].push.apply(this.logs,t),this.loading=!1,this.moreResults=!!t.payload.links.next,m.lazyRedraw(),t},n}(y.a),Y=function(t){function n(){return t.apply(this,arguments)||this}return r(n,t),n.prototype.view=function(){return m(".AuditHeader",[L()("fas fa-book",{className:"AuditBanner"}),m("h1",[a.a.translator.trans("kilowhat-audit.admin.header.title"),m("span.badge",a.a.translator.trans("kilowhat-audit.admin.header.free")),m("a.AuditUpgrade",{target:"_blank",href:"https://kilowhat.net/flarum/extensions/audit"},[L()("fas fa-rocket")," ",a.a.translator.trans("kilowhat-audit.admin.header.upgrade")])]),m("ul",[m("li",m("a",{target:"_blank",href:"https://kilowhat.net/flarum/extensions/audit"},[a.a.translator.trans("kilowhat-audit.admin.header.documentation")," ",L()("fas fa-external-link-alt")])),m("li",m("a",{target:"_blank",href:"https://discuss.flarum.org/d/24432"},[a.a.translator.trans("kilowhat-audit.admin.header.discuss")," ",L()("fas fa-external-link-alt")])),m("li",a.a.translator.trans("kilowhat-audit.admin.header.version",{version:a.a.data.extensions["kilowhat-wordpress"].version}))])])},n}(y.a),Z=function(t){function n(){return t.apply(this,arguments)||this}return r(n,t),n.prototype.view=function(){return m(".AuditPage",m(".AuditPageContainer",[Y.component(),X.component()]))},n}(w.a);a.a.initializers.add("kilowhat-audit",(function(){a.a.store.models["kilowhat-audit"]=c,a.a.route.discussion||(a.a.route.discussion=function(t){return a.a.forum.attribute("baseUrl")+"/d/"+t.id()}),a.a.route.post||(a.a.route.post=function(t){return a.a.route.discussion(t.discussion())+"/"+t.number()}),a.a.route.tag||(a.a.route.tag=function(t){return a.a.forum.attribute("baseUrl")+"/t/"+t.slug()}),a.a.route.user||(a.a.route.user=function(t){return a.a.forum.attribute("baseUrl")+"/u/"+t.username()}),a.a.routes["kilowhat-audit"]={path:"/audit",component:Z.component()},a.a.extensionSettings["kilowhat-audit-free"]=function(){return m.route(a.a.route("kilowhat-audit"))},Object(l.extend)(h.a.prototype,"items",(function(t){t.add("kilowhat-audit",p.a.component({href:a.a.route("kilowhat-audit"),icon:"fas fa-book",children:a.a.translator.trans("kilowhat-audit.admin.menu.title"),description:a.a.translator.trans("kilowhat-audit.admin.menu.description")}))}))}))}]);
//# sourceMappingURL=admin.js.map