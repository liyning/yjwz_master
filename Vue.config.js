const path = require('path');
 
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
  }
};
