export default function has(obj,propName){
	return Object.prototype.hasOwnProperty.call(obj,propName)
}