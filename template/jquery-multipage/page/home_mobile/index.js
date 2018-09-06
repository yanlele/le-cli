import('./home.css');
let helloTemplate = require('../../template/hello.hbs');
let helloTemplateComponent = helloTemplate({
    name: 'yanle',
    a: 1,
    b: 2
});

$('#container').html(helloTemplateComponent);

console.log('home');