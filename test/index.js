import walk from '../src'

function makeObject(){
	var nestedObj1 = {nested:'nested1'}
	var nestedObj2 = {nested:'nested2'}
	var obj = {
		a:nestedObj1
	,	b:{
			ba:'ba'
		,	bb:nestedObj1
		,	bc:{
				bca:nestedObj2
			,	bcb:'bcb'
			}
		}
	,	c:nestedObj2
	}
	obj.d = obj;
	return obj;
}

describe('#walk(obj,function)',function(){
	it('should walk a complex object and call the function for every nested object',function(){
		var items = 12;
		var processed = 0;
		walk(makeObject(),function(val,type,path,parent,cache,cacheId,root){
			processed++;
			return val;
		});
		processed.should.equal(items);
	});
	it('should cache nested objects and call the function only once per circular reference',function(){
		var cycledItems = 3;
		var processed = 0;
		var paths = [];
		walk(makeObject(),function(val,type,path,parent,cache,cacheId,root){
			if(cacheId!==false){
				paths.push(cache[cacheId][1]);
				processed++
			}
			return val;
		});
		processed.should.equal(cycledItems);
	});
	it('should provide the type of object',function(){
		var undef;
		var obj = {
			string:'a string'
		,	number:2
		,	date:new Date()
		,	regexp:/a/
		,	'null':null
		,	'undefined':undef
		,	boolean:true
		,	object:{}
		,	array:[]
		}
		walk(obj,function(val,type,path,parent,cache,cacheId,root){
			if(path.length){
				type.should.equal(path[0])
			}
			return val;
		});
	});
});