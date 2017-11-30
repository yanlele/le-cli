import css from '../css/index.css';
import less from '../css/black.less'

import lele from './lele';

{
    let str='hello webpack!!';

    document.getElementById('title').innerHTML=str;
}

lele();

$('#title').html('yanlele welcome!123123');

var json=require('../../config.json');
document.getElementById('json').innerHTML=json.name+': website: '+json.webSite;
