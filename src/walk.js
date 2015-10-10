import has from './has';
import {
	TYPE_OBJECT
,	TYPE_ARRAY
,	TYPE_DATE
,	TYPE_REGEXP
,	TYPE_STRING
,	TYPE_NUMBER
,	TYPE_BOOL
,	TYPE_NULL
,	TYPE_UNDEFINED
} from './constants';
import toType from './toType';


function getIdifObJectinCaChe(obj,cache){
	const {length} = cache;
	var i = 0;
	while(i<length){
		if(cache[i][1] == obj){return i;}
		i++
	}
	return false;
}

function addToCache(cache,path,obj){
	cache.push([path,obj]);
}

function walkAny(obj,filter,path,root,cache,parent){
	var cacheId = getIdifObJectinCaChe(obj,cache);
	var type = toType(obj);
	if(cacheId!==false){
		return filter(obj,type,path,parent,cache,cacheId,root);
	}
	addToCache(cache,path,obj)
	if(type == TYPE_ARRAY){
		obj = walkArray(obj,filter,path,root,cache,parent);
	}
	if(type == TYPE_OBJECT){
		obj = walkObject(obj,filter,path,root,cache,parent);
	}
	obj = filter(obj,type,path,parent,cache,cacheId,root);
	return obj;
}

function walkArray(arr,filter,path,root,cache,parent){
	const length = arr.length;
	let i = 0;
	const newArr = new Array(length);
	while(i<length){
		let _path = path.slice();
		_path.push(i);
		newArr[i] = walkAny(arr[i++],filter,_path,root,cache,arr);
	}
	return newArr;
}


function walkObject(obj,filter,path,root,cache){
	const newObj = {};
	for(let name in obj){
		if(!has(obj,name)){continue;}
		let _path = path.slice();
		_path.push(name);
		newObj[name] = walkAny(obj[name],filter,_path,root,cache,obj);
	}
	return newObj;
}

function walk(obj,filter,cycle,cache){
	const path = [];
	const root = obj;
	cache = cache || [];
	return walkAny(obj,filter,path,root,cache,root);
}

walk.has = has;
walk.toType = toType;
walk.TYPE_OBJECT = TYPE_OBJECT
walk.TYPE_ARRAY = TYPE_ARRAY
walk.TYPE_DATE = TYPE_DATE
walk.TYPE_REGEXP = TYPE_REGEXP
walk.TYPE_STRING = TYPE_STRING
walk.TYPE_NUMBER = TYPE_NUMBER
walk.TYPE_BOOL = TYPE_BOOL
walk.TYPE_NULL = TYPE_NULL
walk.TYPE_UNDEFINED = TYPE_UNDEFINED

export default walk;