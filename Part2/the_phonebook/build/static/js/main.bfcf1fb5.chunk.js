(this.webpackJsonpthe_phonebook=this.webpackJsonpthe_phonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t.n(c),r=t(14),o=t.n(r),u=t(4),s=t(3),i=t.n(s),l=t(0),b=function(e){var n=e.addNewName,t=e.newName,c=e.handleNameChange,a=e.newNumber,r=e.handleNumberChange;return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:n,children:[Object(l.jsx)("div",{children:Object(l.jsxs)("label",{children:["name: ",Object(l.jsx)("input",{value:t,onChange:c})]})}),Object(l.jsx)("div",{children:Object(l.jsxs)("label",{children:["number: ",Object(l.jsx)("input",{value:a,onChange:r})]})}),Object(l.jsx)("button",{type:"submit",children:"add new name"})]})})},j=function(e){var n=e.name,t=e.number,c=e.id,a=e.removePerson;return Object(l.jsx)("div",{children:Object(l.jsxs)("p",{children:[n," ",t," ",Object(l.jsx)("button",{onClick:function(){return a(c)},children:"delete"})]})})},d=function(e){var n=e.filter,t=e.handleFilterChange,c=e.personal_label;return Object(l.jsx)("div",{children:Object(l.jsxs)("label",{children:[c,": ",Object(l.jsx)("input",{value:n,onChange:t})]})})},h="/api/persons",m=function(e){return i.a.post(h,e).then((function(e){return e.data}))},f=function(e){var n=e.message;return null===n?null:Object(l.jsx)("div",{className:"error",children:n})},O=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(""),o=Object(u.a)(r,2),s=o[0],h=o[1],O=Object(c.useState)(""),p=Object(u.a)(O,2),v=p[0],x=p[1],g=Object(c.useState)(""),w=Object(u.a)(g,2),N=w[0],C=w[1],S=Object(c.useState)(null),_=Object(u.a)(S,2),k=_[0],y=_[1];Object(c.useEffect)((function(){i.a.get("/api/persons").then((function(e){console.log("persons response successful"),a(e.data)})).catch((function(e){console.log("error with fetching persons data in App.js:25"),console.log(e)}))}),[]);var E=function(e){var n=t.find((function(n){return n._id===e}));if(window.confirm("Do you want to remove '".concat(n.name,"'?"))){var c=t.filter((function(n){return n._id!==e}));i.a.delete("api/persons/".concat(e)).catch((function(e){console.log(e),y("".concat(n.name," ").concat(n.number," has been deleted")),setTimeout((function(){y(null)}),5e3)})),a(c)}},P=N?t.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())})):[];return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)(d,{filter:N,handleFilterChange:function(e){C(e.target.value)},personal_label:"Enter a name to search"}),P.map((function(e){return Object(l.jsx)(j,{name:e.name,number:e.number})})),Object(l.jsx)("h1",{children:"Add a New"}),Object(l.jsx)(f,{message:k}),Object(l.jsx)(b,{addNewName:function(e){e.preventDefault();var n={name:s,number:v};m(n).then((function(e){a(t.concat(e)),y("".concat(n.name," ").concat(n.number," has been added")),setTimeout((function(){y(null)}),5e3)})).catch((function(e){y(e.response.data.error),setTimeout((function(){y(null)}),5e3)})),h(""),x("")},newName:s,handleNameChange:function(e){h(e.target.value)},newNumber:v,handleNumberChange:function(e){x(e.target.value)}}),Object(l.jsx)("h1",{children:"Numbers"}),t.map((function(e){return Object(l.jsx)(j,{name:e.name,number:e.number,removePerson:E,id:e._id})}))]})};t(38);o.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(O,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.bfcf1fb5.chunk.js.map