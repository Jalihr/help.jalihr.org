/**
 * Filters the help home page's article list as the reader types.
 *
 * There is no search index and no server: the home page already carries every
 * article title, so matching against the rendered text is both the simplest
 * way to do this and the only one that cannot go stale. A category hides once
 * none of its own articles match, so the reader never scrolls past empty cards.
 */
(function () {
  'use strict';

  var field = document.querySelector('.help-search__field');
  var count = document.querySelector('.help-search__count');
  var cats = Array.prototype.slice.call(document.querySelectorAll('.help-cat'));

  if (!field || !cats.length) return;

  var entries = cats.map(function (cat) {
    return {
      cat: cat,
      haystack: (cat.querySelector('.help-cat__title').textContent + ' ' +
                 (cat.querySelector('.help-cat__sub') || { textContent: '' }).textContent).toLowerCase(),
      items: Array.prototype.slice.call(cat.querySelectorAll('.help-cat__articles li')).map(function (li) {
        return { li: li, haystack: li.textContent.toLowerCase() };
      })
    };
  });

  var total = entries.reduce(function (n, entry) { return n + entry.items.length; }, 0);

  var apply = function () {
    var query = field.value.trim().toLowerCase();
    var shown = 0;

    entries.forEach(function (entry) {
      // A category name that matches keeps all of its articles visible.
      var catMatches = query !== '' && entry.haystack.indexOf(query) !== -1;
      var visibleInCat = 0;

      entry.items.forEach(function (item) {
        var match = query === '' || catMatches || item.haystack.indexOf(query) !== -1;
        item.li.hidden = !match;
        if (match) visibleInCat++;
      });

      entry.cat.hidden = query !== '' && visibleInCat === 0;
      shown += visibleInCat;
    });

    if (query === '') {
      count.textContent = total + (total === 1 ? ' article' : ' articles');
    } else if (shown === 0) {
      count.textContent = 'Nothing matches "' + field.value.trim() + '". Book a call and we will answer directly.';
    } else {
      count.textContent = shown + (shown === 1 ? ' article matches' : ' articles match');
    }
  };

  field.addEventListener('input', apply);
  apply();
})();
