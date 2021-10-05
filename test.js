const a = {one:1, sub: {two:2}}
const b = {...a}
const c = {...a, sub: {...a.sub}}

console.log("1st");
console.log("a", a,  "b", b, "c", c);

b.one = 2
b.sub.two=3

console.log("2nd");
console.log("a", a, "b", b, "c",c);