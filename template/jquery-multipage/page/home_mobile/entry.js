import('./home.css');
let helloTemplate = require('../../template/hello.hbs');
let helloTemplateComponent = helloTemplate({
    name: 'yanle'
});

$('#container').html(helloTemplate);

console.log('home');