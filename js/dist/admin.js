module.exports=function(t){var e={};function n(a){if(e[a])return e[a].exports;var o=e[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(a,o,function(e){return t[e]}.bind(null,o));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=17)}([function(t,e){t.exports=flarum.core.compat.app},function(t,e){t.exports=flarum.core.compat.Model},function(t,e){t.exports=flarum.core.compat["components/Button"]},function(t,e){t.exports=flarum.core.compat["helpers/icon"]},function(t,e){t.exports=flarum.core.compat["helpers/username"]},function(t,e){t.exports=flarum.core.compat["components/Badge"]},function(t,e){t.exports=flarum.core.compat["models/Group"]},function(t,e){t.exports=flarum.core.compat["helpers/avatar"]},function(t,e){t.exports=flarum.core.compat["components/ExtensionPage"]},function(t,e){t.exports=flarum.core.compat.Component},function(t,e){t.exports=flarum.core.compat["components/LoadingIndicator"]},function(t,e){t.exports=flarum.core.compat["components/Placeholder"]},function(t,e){t.exports=flarum.core.compat["components/Dropdown"]},function(t,e){t.exports=flarum.core.compat["components/GroupBadge"]},function(t,e){t.exports=flarum.core.compat["helpers/humanTime"]},function(t,e){t.exports=flarum.core.compat["utils/extractText"]},function(t,e){t.exports=flarum.core.compat["utils/ItemList"]},function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a);function r(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function s(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=n(1),l=n.n(u),c=function(t){function e(){for(var e,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return i(r(e=t.call.apply(t,[this].concat(a))||this),"actorId",l.a.attribute("actorId")),i(r(e),"client",l.a.attribute("client")),i(r(e),"ipAddress",l.a.attribute("ipAddress")),i(r(e),"action",l.a.attribute("action")),i(r(e),"payload",l.a.attribute("payload")),i(r(e),"createdAt",l.a.attribute("createdAt",l.a.transformDate)),i(r(e),"actor",l.a.hasOne("actor")),i(r(e),"discussion",l.a.hasOne("discussion")),i(r(e),"post",l.a.hasOne("post")),i(r(e),"tag",l.a.hasOne("tag")),i(r(e),"user",l.a.hasOne("user")),e}return s(e,t),e}(l.a),d=n(8),p=n.n(d),f=n(3),h=n.n(f),g=n(9),_=n.n(g),w=n(2),b=n.n(w),v=n(10),y=n.n(v),k=n(11),A=n.n(k),R=n(5),x=n.n(R),O=n(12),I=n.n(O),B=n(13),L=n.n(B),P=n(7),S=n.n(P),N=n(14),q=n.n(N),M=n(4),D=n.n(M),j=n(6),T=n.n(j),V=n(15),C=n.n(V),U=n(16),E=n.n(U),G="kilowhat-audit.lib.browser.";function J(t,e){void 0===e&&(e=!1);var n=t?JSON.parse(JSON.stringify(t)):[];if(!n.length){if(!e)return m("em",o.a.translator.trans(G+"noValue"));n.push(T.a.ADMINISTRATOR_ID)}return n.map((function(t){if(t+""===T.a.GUEST_ID)return x.a.component({icon:"fas fa-globe",label:o.a.translator.trans(G+"permissionGroup.everyone")});if(t+""===T.a.MEMBER_ID)return x.a.component({icon:"fas fa-user",label:o.a.translator.trans(G+"permissionGroup.members")});var e=o.a.store.getById("groups",t);return e?L.a.component({group:e}):x.a.component({icon:"fas fa-question",label:C()(o.a.translator.trans(G+"deletedResource.group",{id:t}))})})).map((function(t,e){return[e>0?", ":null,t]}))}function Q(t){return(t||[]).map((function(t,e){return[e>0?", ":null,m("code",t)]}))}var z=function(){function t(){}var e=t.prototype;return e.oninit=function(){this.showRaw=!1},e.view=function(t){var e,n,a,r=this,s=t.attrs,i=s.log,u=s.changeQuery,l=i.actor(),c=i.payload()||{},d=i.discussion(),p=i.post(),f=i.tag(),g=i.user(),_=[];i.ipAddress()&&_.push(m("a",{onclick:function(){u("ip:"+i.ipAddress())}},i.ipAddress())),"session"!==i.client()&&"cli"!==i.client()&&_.push(m("a",{onclick:function(){u("client:"+i.client())}},o.a.translator.trans(G+"client."+i.client()))),_.push(q()(i.createdAt())),e="cli"===i.client()?h()("fas fa-terminal"):null===i.actorId()?h()("fas fa-user-secret"):l?m("a",{href:l?o.a.route.user(l):"#"},S()(l)):S()(null),n="cli"===i.client()?m("a",{onclick:function(){u("client:cli")}},o.a.translator.trans(G+"client.cli")):null===i.actorId()?m("a",{onclick:function(){u("actor:guest")}},o.a.translator.trans(G+"withoutActor")):l?m("a",{onclick:function(){u("actor:"+l.username())}},D()(l)):D()(l);var w=G+i.action();if("setting_changed"===i.action()&&c.hasOwnProperty("new_value")&&(w=G+"setting_changed_with_values"),"string"==typeof o.a.translator.translations[w]){var v={username:m("a",{href:g?o.a.route.user(g):"#"},g?D()(g):o.a.translator.trans(G+"deletedResource.user",{id:c.user_id})),discussion:m("a",{href:d?o.a.route.discussion(d):"#"},d?d.title():o.a.translator.trans(G+"deletedResource.discussion",{id:c.discussion_id})),tag:m("a",{href:f?o.a.route.tag(f):"#"},f?f.name():o.a.translator.trans(G+"deletedResource.tag",{id:c.tag_id})),post:m("a",{href:p&&p.discussion()?o.a.route.post(p):"#"},p?o.a.translator.trans(G+"genericResource."+("comment"===p.contentType()?"comment":"post")):o.a.translator.trans(G+"deletedResource.post",{id:c.post_id})),postuser:m("a",{href:p&&p.user()?o.a.route.user(p.user()):"#"},D()(p?p.user():null)),until:c.until?moment(c.until).format("LLLL"):"?",old_title:m("em",c.old_title),new_title:c.new_title&&d?m("a",{href:o.a.route.discussion(d)},c.new_title):c.new_title,package:m("code",c.package),provider:m("code",c.provider),ip:m("code",c.ip),key:m("code",c.key),permission:m("code",c.permission),old_value:c.old_value?m("code",c.old_value):m("em",o.a.translator.trans(G+"noValue")),new_value:c.new_value?m("code",c.new_value):m("em",o.a.translator.trans(G+"noValue")),old_groups:J(c.old_group_ids,"permission_changed"===i.action()),new_groups:J(c.new_group_ids,"permission_changed"===i.action()),old_username:m("code",c.old_username),new_username:m("code",c.new_username),old_email:m("code",c.old_email),new_email:m("code",c.new_email),old_tags:Q(c.old_tags),new_tags:Q(c.new_tags),post_count:c.post_count,old_user:c.old_user_id?o.a.translator.trans(G+"deletedResource.user",{id:c.old_user_id}):m("em",o.a.translator.trans(G+"noValue")),new_user:c.new_user_id?o.a.translator.trans(G+"deletedResource.user",{id:c.new_user_id}):m("em",o.a.translator.trans(G+"noValue")),old_date:c.old_date?moment(c.old_date).format("LLLL"):m("em",o.a.translator.trans(G+"noValue")),new_date:c.new_date?moment(c.new_date).format("LLLL"):m("em",o.a.translator.trans(G+"noValue")),reason:c.reason?m("code",c.reason):m("em",o.a.translator.trans(G+"noReason"))};a=o.a.translator.trans(w,v),this.showRaw&&(a=[a,m("pre",JSON.stringify(c,null,2))])}else a=JSON.stringify(c);var y=new E.a;return y.add("raw",b.a.component({onclick:function(){r.showRaw=!r.showRaw}},o.a.translator.trans(G+"controls."+(this.showRaw?"hideRaw":"showRaw")))),l&&y.add("actor",b.a.component({onclick:function(){u("actor:"+l.username())}},o.a.translator.trans(G+"controls.filterActor"))),i.ipAddress()&&y.add("ip",b.a.component({onclick:function(){u("ip:"+i.ipAddress())}},o.a.translator.trans(G+"controls.filterIp"))),y.add("client",b.a.component({onclick:function(){u("client:"+i.client())}},o.a.translator.trans(G+"controls.filterClient"))),y.add("action",b.a.component({onclick:function(){u("action:"+i.action())}},o.a.translator.trans(G+"controls.filterAction"))),g&&y.add("user",b.a.component({onclick:function(){u("user:"+g.username())}},o.a.translator.trans(G+"controls.filterUser"))),c.discussion_id&&y.add("discussion",b.a.component({onclick:function(){u("discussion:"+c.discussion_id)}},o.a.translator.trans(G+"controls.filterDiscussion"))),m(".AuditItem",[m(".AuditItemAvatar",e),m(".AuditItemData",[I.a.component({menuClassName:"Dropdown-menu--right",buttonClassName:"Button Button--icon Button--flat",label:o.a.translator.trans(G+"controls"),icon:"fas fa-ellipsis-v"},y.toArray()),m(".AuditItemRow",[n," - ",m("a",{onclick:function(){u("action:"+i.action())}},i.action())]),m(".AuditItemRow",a),m(".AuditItemRow",_.map((function(t,e){return[0===e?null:" - ",t]})))])])},t}(),F=function(t){function e(){return t.apply(this,arguments)||this}s(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.q="",this.loading=!0,this.moreResults=!1,this.logs=[],this.refresh()},n.view=function(){var t,e=this;return this.loading?t=y.a.component():this.moreResults&&(t=b.a.component({className:"Button Button--block",onclick:this.loadMore.bind(this)},o.a.translator.trans("kilowhat-audit.lib.browser.loadMore"))),m("div",[m(".AuditSearch",[m(".AuditSearchWrapper",[m("input.FormControl",{value:this.q,onchange:function(t){e.q=t.target.value},placeholder:o.a.translator.trans("kilowhat-audit.lib.browser.filterPlaceholder")}),this.q?b.a.component({className:"Search-clear Button Button--icon Button--link",onclick:function(){e.q="",e.refresh()},icon:"fas fa-times-circle"}):null]),b.a.component({className:"Button",onclick:function(){e.refresh()}},o.a.translator.trans("kilowhat-audit.lib.browser.filterApply"))]),0!==this.logs.length||this.loading?null:A.a.component({text:o.a.translator.trans("kilowhat-audit.lib.browser.empty")}),m(".AuditList",this.logs.map((function(t){return m(z,{log:t,changeQuery:function(t){e.q=t,e.refresh()}})}))),m(".AuditMore",t)])},n.requestParams=function(){var t={filter:{}},e=this.attrs.baseQ||"";return this.q&&(e+=" "+this.q),e&&(t.filter.q=e.trim()),t},n.refresh=function(t){var e=this;return void 0===t&&(t=!0),t&&(this.loading=!0,this.logs=[]),this.loadResults().then((function(t){e.logs=[],e.parseResults(t)}),(function(){e.loading=!1,m.redraw()}))},n.loadResults=function(t){var e=this.requestParams();return e.page={offset:t},o.a.store.find("kilowhat-audit/logs",e)},n.loadMore=function(){this.loading=!0,this.loadResults(this.logs.length).then(this.parseResults.bind(this))},n.parseResults=function(t){return[].push.apply(this.logs,t),this.loading=!1,this.moreResults=!!t.payload.links.next,m.redraw(),t},e}(_.a),W=function(t){function e(){return t.apply(this,arguments)||this}s(e,t);var n=e.prototype;return n.className=function(){return t.prototype.className.call(this)+" AuditPage"},n.header=function(){var e=t.prototype.header.call(this);return e[0].children.push(h()("fas fa-book",{className:"AuditBanner"})),e[0].children[0].children[0].children[1].children=[m("h2",[o.a.translator.trans("kilowhat-audit.admin.header.title"),m("span.badge",o.a.translator.trans("kilowhat-audit.admin.header.free")),m("a.AuditUpgrade",{target:"_blank",href:"https://kilowhat.net/flarum/extensions/audit"},[h()("fas fa-rocket")," ",o.a.translator.trans("kilowhat-audit.admin.header.upgrade")])])],e},n.content=function(){return m(".AuditPageContainer",m(F))},e}(p.a);o.a.initializers.add("kilowhat-audit",(function(){o.a.store.models["kilowhat-audit"]=c,o.a.route.discussion||(o.a.route.discussion=function(t){return o.a.forum.attribute("baseUrl")+"/d/"+t.id()}),o.a.route.post||(o.a.route.post=function(t){return o.a.route.discussion(t.discussion())+"/"+t.number()}),o.a.route.tag||(o.a.route.tag=function(t){return o.a.forum.attribute("baseUrl")+"/t/"+t.slug()}),o.a.route.user||(o.a.route.user=function(t){return o.a.forum.attribute("baseUrl")+"/u/"+t.username()}),o.a.extensionData.for("kilowhat-audit-free").registerPage(W)}))}]);
//# sourceMappingURL=admin.js.map