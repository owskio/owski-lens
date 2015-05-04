
var expose = require('owski-expose');
require('owski-primitives').mport(function(I){
require('owski-lists').mport(function(eachOwn,map){
require('owski-curry').mport(function(curry,curry2,curry3){
  var
  lens = curry3(function(nextAcc,nextLens,o,prevAcc) {
    prevAcc = prevAcc || I;
    return nextLens(prevAcc(o),nextAcc);
  }),
  // filter = curry3(function(predicate,nextAcc,nextLens,o,prevAcc) {
  //   prevAcc = prevAcc || I;
  //   return nextLens(prevAcc(o),nextAcc);
  // }),
  traversal = curry3(function(nextAcc,nextLens,o,prevAcc) {
    prevAcc = prevAcc || I;
    return map(function(v){
      return nextLens(v,nextAcc);
    },prevAcc(o));
  }),
  acc = curry2(function(k,o,v){
    return o[k] = v || o[k];
  }),
  filter =
  get = function(o,l){
    return l(o);
  },
  set = curry(function(value,o,l){
    l(o,value);
  }),
  lensMap = curry(function(fn,o,l){
    l(o,fn(l(o)));
  });
  expose(module,{
    lens: lens,
    acc: acc,
    get:get,
    set:set,
    map: lensMap,
    filter: filter,
    traversal: traversal
  });
});});});
