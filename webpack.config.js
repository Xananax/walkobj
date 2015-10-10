var path = require('path');
var path_in = 'src';
var path_out = ''
var file_in = 'index.js';
var name = 'walkobj';
module.exports = {
	entry: './'+path_in+'/'+file_in
,	output: {
		path: path.join(__dirname, path_out)
	,	filename: 'index.js'
	,	libraryTarget: 'umd'
    ,	library: name.replace(/^\w/,function(a){return a.toUpperCase()})
	}
,	module: {
		loaders: [
			{
				test: path.join(__dirname, path_in)
			,	loader: 'babel-loader' 
			,	query: {
					optional: [
						"es7.decorators"
					,	"es7.classProperties"
					]
				}
			}
		]
	}
};