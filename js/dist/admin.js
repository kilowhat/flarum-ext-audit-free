(()=>{var t={n:n=>{var o=n&&n.__esModule?()=>n.default:()=>n;return t.d(o,{a:o}),o},d:(n,o)=>{for(var e in o)t.o(o,e)&&!t.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:o[e]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},n={};(()=>{"use strict";t.r(n);const o=flarum.core.compat["admin/app"];var e=t.n(o);function r(t,n){return r=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},r(t,n)}function a(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,r(t,n)}const s=flarum.core.compat["common/Model"];var i=t.n(s),c=function(t){function n(){for(var n,o=arguments.length,e=new Array(o),r=0;r<o;r++)e[r]=arguments[r];return(n=t.call.apply(t,[this].concat(e))||this).actorId=i().attribute("actorId"),n.client=i().attribute("client"),n.ipAddress=i().attribute("ipAddress"),n.action=i().attribute("action"),n.payload=i().attribute("payload"),n.createdAt=i().attribute("createdAt",i().transformDate),n.actor=i().hasOne("actor"),n.discussion=i().hasOne("discussion"),n.post=i().hasOne("post"),n.tag=i().hasOne("tag"),n.user=i().hasOne("user"),n}return a(n,t),n}(i());const l=flarum.core.compat["admin/components/ExtensionPage"];var u=t.n(l);const d=flarum.core.compat["common/helpers/icon"];var p=t.n(d);const f=flarum.core.compat.app;var h=t.n(f);const g=flarum.core.compat["common/Component"];var _=t.n(g);const w=flarum.core.compat["common/components/Button"];var v=t.n(w);const y=flarum.core.compat["common/components/LoadingIndicator"];var b=t.n(y);const k=flarum.core.compat["common/components/Placeholder"];var A=t.n(k);const R=flarum.core.compat["common/app"];var I=t.n(R);const O=flarum.core.compat["common/components/Badge"];var B=t.n(O);const L=flarum.core.compat["common/components/Dropdown"];var P=t.n(L);const S=flarum.core.compat["common/components/GroupBadge"];var N=t.n(S);const q=flarum.core.compat["common/helpers/avatar"];var M=t.n(q);const D=flarum.core.compat["common/helpers/humanTime"];var j=t.n(D);const V=flarum.core.compat["common/helpers/username"];var x=t.n(V);const T=flarum.core.compat["common/models/Group"];var U=t.n(T);const C=flarum.core.compat["common/utils/extractText"];var G=t.n(C);const E=flarum.core.compat["common/utils/ItemList"];var J=t.n(E),Q="kilowhat-audit.lib.browser.";function F(t,n){void 0===n&&(n=!1);var o=t?JSON.parse(JSON.stringify(t)):[];if(!o.length){if(!n)return m("em",I().translator.trans(Q+"noValue"));o.push(U().ADMINISTRATOR_ID)}return o.map((function(t){if(t+""===U().GUEST_ID)return B().component({icon:"fas fa-globe",label:I().translator.trans(Q+"permissionGroup.everyone")});if(t+""===U().MEMBER_ID)return B().component({icon:"fas fa-user",label:I().translator.trans(Q+"permissionGroup.members")});var n=I().store.getById("groups",t);return n?N().component({group:n}):B().component({icon:"fas fa-question",label:G()(I().translator.trans(Q+"deletedResource.group",{id:t}))})})).map((function(t,n){return[n>0?", ":null,t]}))}function z(t){return(t||[]).map((function(t,n){return[n>0?", ":null,m("code",t)]}))}var W=function(){function t(){}var n=t.prototype;return n.oninit=function(){this.showRaw=!1},n.view=function(t){var n,o,e,r=this,a=t.attrs,s=a.log,i=a.changeQuery,c=s.actor(),l=s.payload()||{},u=s.discussion(),d=s.post(),f=s.tag(),h=s.user(),g=[];s.ipAddress()&&g.push(m("a",{onclick:function(){i("ip:"+s.ipAddress())}},s.ipAddress())),"session"!==s.client()&&"cli"!==s.client()&&g.push(m("a",{onclick:function(){i("client:"+s.client())}},I().translator.trans(Q+"client."+s.client()))),g.push(j()(s.createdAt())),n="cli"===s.client()?p()("fas fa-terminal"):null===s.actorId()?p()("fas fa-user-secret"):c?m("a",{href:c?I().route.user(c):"#"},M()(c)):M()(null),o="cli"===s.client()?m("a",{onclick:function(){i("client:cli")}},I().translator.trans(Q+"client.cli")):null===s.actorId()?m("a",{onclick:function(){i("actor:guest")}},I().translator.trans(Q+"withoutActor")):c?m("a",{onclick:function(){i("actor:"+c.username())}},x()(c)):x()(c);var _=Q+s.action();if("setting_changed"===s.action()&&l.hasOwnProperty("new_value")&&(_=Q+"setting_changed_with_values"),"string"==typeof I().translator.translations[_]){var w={username:m("a",{href:h?I().route.user(h):"#"},h?x()(h):I().translator.trans(Q+"deletedResource.user",{id:l.user_id})),discussion:m("a",{href:u?I().route.discussion(u):"#"},u?u.title():I().translator.trans(Q+"deletedResource.discussion",{id:l.discussion_id})),tag:m("a",{href:f?I().route.tag(f):"#"},f?f.name():I().translator.trans(Q+"deletedResource.tag",{id:l.tag_id})),post:m("a",{href:d&&d.discussion()?I().route.post(d):"#"},d?I().translator.trans(Q+"genericResource."+("comment"===d.contentType()?"comment":"post")):I().translator.trans(Q+"deletedResource.post",{id:l.post_id})),postuser:m("a",{href:d&&d.user()?I().route.user(d.user()):"#"},x()(d?d.user():null)),until:l.until?dayjs(l.until).format("LLLL"):"?",old_title:m("em",l.old_title),new_title:l.new_title&&u?m("a",{href:I().route.discussion(u)},l.new_title):l.new_title,package:m("code",l.package),provider:m("code",l.provider),ip:m("code",l.ip),key:m("code",l.key),permission:m("code",l.permission),old_value:l.old_value?m("code",l.old_value):m("em",I().translator.trans(Q+"noValue")),new_value:l.new_value?m("code",l.new_value):m("em",I().translator.trans(Q+"noValue")),old_groups:F(l.old_group_ids,"permission_changed"===s.action()),new_groups:F(l.new_group_ids,"permission_changed"===s.action()),old_username:m("code",l.old_username),new_username:m("code",l.new_username),old_nickname:l.old_nickname?m("code",l.old_nickname):m("em",I().translator.trans(Q+"noValue")),new_nickname:l.new_nickname?m("code",l.new_nickname):m("em",I().translator.trans(Q+"noValue")),old_email:m("code",l.old_email),new_email:m("code",l.new_email),old_tags:z(l.old_tags),new_tags:z(l.new_tags),post_count:l.post_count,old_user:l.old_user_id?I().translator.trans(Q+"deletedResource.user",{id:l.old_user_id}):m("em",I().translator.trans(Q+"noValue")),new_user:l.new_user_id?I().translator.trans(Q+"deletedResource.user",{id:l.new_user_id}):m("em",I().translator.trans(Q+"noValue")),old_date:l.old_date?dayjs(l.old_date).format("LLLL"):m("em",I().translator.trans(Q+"noValue")),new_date:l.new_date?dayjs(l.new_date).format("LLLL"):m("em",I().translator.trans(Q+"noValue")),reason:l.reason?m("code",l.reason):m("em",I().translator.trans(Q+"noReason"))};e=I().translator.trans(_,w),this.showRaw&&(e=[e,m("pre",JSON.stringify(l,null,2))])}else e=JSON.stringify(l);var y=new(J());return y.add("raw",v().component({onclick:function(){r.showRaw=!r.showRaw}},I().translator.trans(Q+"controls."+(this.showRaw?"hideRaw":"showRaw")))),c&&y.add("actor",v().component({onclick:function(){i("actor:"+c.username())}},I().translator.trans(Q+"controls.filterActor"))),s.ipAddress()&&y.add("ip",v().component({onclick:function(){i("ip:"+s.ipAddress())}},I().translator.trans(Q+"controls.filterIp"))),y.add("client",v().component({onclick:function(){i("client:"+s.client())}},I().translator.trans(Q+"controls.filterClient"))),y.add("action",v().component({onclick:function(){i("action:"+s.action())}},I().translator.trans(Q+"controls.filterAction"))),h&&y.add("user",v().component({onclick:function(){i("user:"+h.username())}},I().translator.trans(Q+"controls.filterUser"))),l.discussion_id&&y.add("discussion",v().component({onclick:function(){i("discussion:"+l.discussion_id)}},I().translator.trans(Q+"controls.filterDiscussion"))),m(".AuditItem",[m(".AuditItemAvatar",n),m(".AuditItemData",[P().component({menuClassName:"Dropdown-menu--right",buttonClassName:"Button Button--icon Button--flat",label:I().translator.trans(Q+"controls"),icon:"fas fa-ellipsis-v"},y.toArray()),m(".AuditItemRow",[o," - ",m("a",{onclick:function(){i("action:"+s.action())}},s.action())]),m(".AuditItemRow",e),m(".AuditItemRow",g.map((function(t,n){return[0===n?null:" - ",t]})))])])},t}(),H=function(t){function n(){return t.apply(this,arguments)||this}a(n,t);var o=n.prototype;return o.oninit=function(n){t.prototype.oninit.call(this,n),this.q="",this.loading=!0,this.moreResults=!1,this.logs=[],this.refresh()},o.view=function(){var t,n=this;return this.loading?t=b().component():this.moreResults&&(t=v().component({className:"Button Button--block",onclick:this.loadMore.bind(this)},h().translator.trans("kilowhat-audit.lib.browser.loadMore"))),m("div",[m(".AuditSearch",[m(".AuditSearchWrapper",[m("input.FormControl",{value:this.q,onchange:function(t){n.q=t.target.value},placeholder:h().translator.trans("kilowhat-audit.lib.browser.filterPlaceholder")}),this.q?v().component({className:"Search-clear Button Button--icon Button--link",onclick:function(){n.q="",n.refresh()},icon:"fas fa-times-circle"}):null]),v().component({className:"Button",onclick:function(){n.refresh()}},h().translator.trans("kilowhat-audit.lib.browser.filterApply"))]),0!==this.logs.length||this.loading?null:A().component({text:h().translator.trans("kilowhat-audit.lib.browser.empty")}),m(".AuditList",this.logs.map((function(t){return m(W,{log:t,changeQuery:function(t){n.q=t,n.refresh()}})}))),m(".AuditMore",t)])},o.requestParams=function(){var t={filter:{}},n=this.attrs.baseQ||"";return this.q&&(n+=" "+this.q),n&&(t.filter.q=n.trim()),t},o.refresh=function(t){var n=this;return void 0===t&&(t=!0),t&&(this.loading=!0,this.logs=[]),this.loadResults().then((function(t){n.logs=[],n.parseResults(t)}),(function(){n.loading=!1,m.redraw()}))},o.loadResults=function(t){var n=this.requestParams();return n.page={offset:t},h().store.find("kilowhat-audit/logs",n)},o.loadMore=function(){this.loading=!0,this.loadResults(this.logs.length).then(this.parseResults.bind(this))},o.parseResults=function(t){return[].push.apply(this.logs,t),this.loading=!1,this.moreResults=!!t.payload.links.next,m.redraw(),t},n}(_()),K=function(t){function n(){return t.apply(this,arguments)||this}a(n,t);var o=n.prototype;return o.className=function(){return t.prototype.className.call(this)+" AuditPage"},o.header=function(){var n=t.prototype.header.call(this);if(Array.isArray(n)&&n.length&&Array.isArray(n[0].children)){n[0].children.push(p()("fas fa-book",{className:"AuditBanner"}));try{n[0].children[0].children[0].children[1].children=[m("h2",[e().translator.trans("kilowhat-audit.admin.header.title"),m("span.badge",e().translator.trans("kilowhat-audit.admin.header.free")),m("a.AuditUpgrade",{target:"_blank",href:"https://kilowhat.net/flarum/extensions/audit"},[p()("fas fa-rocket")," ",e().translator.trans("kilowhat-audit.admin.header.upgrade")])])]}catch(t){console.warn("[audit-log] Unable to add Free badge to header")}}else console.warn("[audit-log] Unable to change header styling");return n},o.content=function(){return m(".AuditPageContainer",m(H))},n}(u());e().initializers.add("kilowhat-audit",(function(){e().store.models["kilowhat-audit"]=c,e().route.discussion||(e().route.discussion=function(t){return e().forum.attribute("baseUrl")+"/d/"+t.slug()}),e().route.post||(e().route.post=function(t){return e().route.discussion(t.discussion())+"/"+t.number()}),e().route.tag||(e().route.tag=function(t){return e().forum.attribute("baseUrl")+"/t/"+t.slug()}),e().route.user||(e().route.user=function(t){return e().forum.attribute("baseUrl")+"/u/"+t.slug()}),e().extensionData.for("kilowhat-audit-free").registerPage(K)}))})(),module.exports=n})();
//# sourceMappingURL=admin.js.map