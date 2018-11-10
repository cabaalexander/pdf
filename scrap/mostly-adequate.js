exports.url = 'https://mostly-adequate.gitbooks.io/mostly-adequate-guide/';

exports.selector = '.summary > li.chapter > a';

exports.options = {

  title: s => s.slice(0, s.indexOf('·') - 1),

  group: 'mostly-adequate',

};

