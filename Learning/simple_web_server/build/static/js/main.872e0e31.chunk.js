(this.webpackJsonpgetting_data_from_server=this.webpackJsonpgetting_data_from_server||[]).push([[0],{39:function(t,n,e){"use strict";e.r(n);var o=e(2),c=e(15),r=e.n(c),a=e(6),i=e(4),u=e(0),s=function(t){var n=t.note,e=t.toggleImportance,o=n.important?"make not important":"make important";return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("li",{children:[n.content," ",Object(u.jsx)("button",{onClick:e,children:o})]})})},l=e(3),f=e.n(l),d="http://localhost:3001/api/notes",j=function(){return f.a.get(d).then((function(t){return t.data}))},b=function(t){return f.a.post(d,t).then((function(t){return t.data}))},h=function(t,n){return f.a.put("".concat(d,"/").concat(t),n).then((function(t){return console.log("update response",t),t.data}))},p=function(t){var n=Object(o.useState)([]),e=Object(i.a)(n,2),c=e[0],r=e[1],l=Object(o.useState)(""),f=Object(i.a)(l,2),d=f[0],p=f[1],m=Object(o.useState)(!1),g=Object(i.a)(m,2),O=g[0],v=g[1];Object(o.useEffect)((function(){console.log("effect"),j().then((function(t){console.log("promise fulfilled"),r(t)})).catch((function(t){return console.log(t)}))}),[]),console.log("render",c.length,"notes");var x=O?c:c.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return v(!O)},children:["show ",O?"important":"all"]})}),Object(u.jsx)("ul",{children:x.map((function(t){return Object(u.jsx)(s,{note:t,toggleImportance:function(){return function(t){console.log("note id",t);var n=c.find((function(n){return n.id===t})),e=Object(a.a)(Object(a.a)({},n),{},{important:!n.important});h(t,e).then((function(n){r(c.map((function(e){return e.id!==t?e:n})))})).catch((function(e){console.log("".concat(n.content," was already deleted from the server")),r(c.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:d,date:(new Date).toISOString(),important:Math.random()>.5};b(n).then((function(t){console.log("note added to db:",t),r(c.concat(t)),p("")})).catch((function(t){console.log(t)}))},children:[Object(u.jsx)("input",{value:d,onChange:function(t){p(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"save"})]})]})};r.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.872e0e31.chunk.js.map