exports.url = 'http://learnyouahaskell.com/chapters';

exports.selector = '#content > ol > li > a';

exports.options = {

  title: s => s.slice(0, s.indexOf('-') - 1),

  group: 'learnyou-haskell',

  eval: () => {
    document
      .querySelectorAll('.footdiv')
      .forEach((element) => element.parentNode.removeChild(element));
  },

};
