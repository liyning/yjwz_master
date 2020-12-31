const path = require('path');
const TransformPages = require('uni-read-pages')
const {webpack} = new TransformPages()
 
function resolve (dir) {
  return path.join(__dirname, dir)
}
 
module.exports = {
  chainWebpack: (config) => {   
    config.resolve.alias
    .set('$img',resolve('/static/images'))
    .set('$common',resolve('/common'))
    .set('$components',resolve('/components'))
    .set('$page',resolve('/pages'))
  },
  configureWebpack: {
  	plugins: [
  		new webpack.DefinePlugin({
  			ROUTES: webpack.DefinePlugin.runtimeValue(() => {
  				const tfPages = new TransformPages({
  					includes: ['path', 'name', 'aliasPath']
  				});
  				return JSON.stringify(tfPages.routes)
  			}, true )
  		})
  	]
  }
};
