var Builder = require('systemjs-builder');

var builder = new Builder({
    transpiler: 'babel'
})
    .buildSFX('app/init.js', 'public/app.js')
    .then(function () {
        console.log('Build complete :)');
    })
    .catch(function (error) {
        console.log('Build error', error);
    });
