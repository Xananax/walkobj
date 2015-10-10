# Walkobj

Very simple little module that walks an object recursively and calls a function on every object.

```js
var walkobj = require('walkobj');

var obj = {/**whatever you want*/};

walkobj(obj,function(val,type,path,parent,cache,cacheId,root){
    if(cacheId!==false){ 
        //this is a circular reference that has been encountered at least once before
        var circularlyReferencedObject = cache[cacheId][1]
        var circularlyReferencedObject_path = cache[cacheId][0] //first path where the object was encountered
        console.log('circular reference for object',circularlyReferencedObject)
        console.log('first encountered at path:',circularlyReferencedObject_path)
        return val;
    }
    console.log('curent value:',val)
    console.log('value is of type:',type)
    console.log('currently processing value at path:',path)
    console.log('value\'s parent object is:',parent)
    console.log('value\'s key is:',path[path.length-1])
    console.log('root is the object passed',(root==obj))
    return val;
});
```

`type` is whatever is returned by the following function:
```js
function toType(obj){
    return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
```

In essence: `string`, `array`, `date`, `regexp`, `boolean`, `function`, `number`, `undefined`, `null`.

The function is exposed on the walkobj function as `walkobj.toType`