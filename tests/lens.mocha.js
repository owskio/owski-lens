
require('must');
var eyes = require('eyes');
require('owski-apply').mport(function(compose){
require('owski-primitives').mport(function(I){
require('../src/lens').mport(function(lens,acc,get,set,map,filter,traversal){
  var farm = {
    cow:{
      milk: 'yumm',
      stomachs:[
        { contents: 'grass' },
        { contents: 'digested grass' },
        { contents: 'bullshit' },
      ]
    }
  };
  describe('lens',function(){
    it('must provide property getting',function(){
      //eyes.inspect(farm);
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk')),
      got = compose(cow,milk)(function(o,l){
        return l(o);
      })(farm);
      got.must.be('yumm');
    });
    it('must provide property setting',function(){
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk'));
      compose(cow,milk)(function(o,l){
        l(o,'yuck');
      })(farm);
      // eyes.inspect(farm);
    });
    it('must provide property mapping',function(){
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk'));
      compose(cow,milk)(function(o,l){
        //f(f() + 'y!');
        l(o,l(o) + 'y!');
      })(farm);
      //eyes.inspect(farm);
    });
    it('get: must simplify getting',function(){
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk'));
      compose(cow,milk)(get)(farm);
      //eyes.inspect(farm);
    });
    it('set: must simplify setting',function(){
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk'));
      compose(cow,milk)(set('disgusting!'))(farm);
      //eyes.inspect(farm);
    });
    it('map: must simplify mapping',function(){
      var
      cow = lens(acc('cow')),
      milk = lens(acc('milk'));
      compose(cow,milk)(map(function(x){
        return x + 'alicious!';
      }))(farm);
      //eyes.inspect(farm);
    });
    it('must access arrays',function(){
      var
      cow = lens(acc('cow')),
      stomachs = lens(acc('stomachs')),
      second = lens(acc('1')),
      contents = lens(acc('contents'));
      compose(cow,stomachs,second,contents)(map(function(x){
        return x + 'y wassy!';
      }))(farm);
    });
    it('must provide get traversals',function(){
      var
      cow = lens(acc('cow')),
      stomachs = lens(acc('stomachs')),
      contentses = traversal(acc('contents'));
      var result = compose(cow,stomachs,contentses)(get)(farm);
      eyes.inspect(result);
    });
    it('must provide map traversals',function(){
      var
      cow = lens(acc('cow')),
      stomachs = lens(acc('stomachs')),
      contentses = traversal(acc('contents'));
      compose(cow,stomachs,contentses)(map(function(x){
        return x + ' (traversed)';
      }))(farm);
      //eyes.inspect(farm);
    });
    it('must provide filtered traversals',function(){
      var
      cow = lens(acc('cow')),
      stomachs = lens(acc('stomachs')),
      contentses = traversal(acc('contents'));
      compose(cow,stomachs,contentses)(map(function(x){
        return x + ' (traversed)';
      }))(farm);
      eyes.inspect(farm);
    });
  });
});});});
