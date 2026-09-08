/* daily-app 共通シェル。
   各アプリは <body data-app-title="..." data-app-summary="..."> を書いて
   このスクリプトを defer で読むだけ。ヘッダと一覧への戻り導線が入る。 */
(function () {
  function mount() {
    var d = document.body.dataset;
    var title = d.appTitle || document.title || 'app';
    var summary = d.appSummary || '';
    var home = d.appHome || '../../index.html';

    if (!document.title || document.title === 'app') document.title = title;

    var bar = document.createElement('header');
    bar.className = 'appbar';

    var inner = document.createElement('div');
    inner.className = 'inner';

    var back = document.createElement('a');
    back.className = 'back';
    back.href = home;
    back.textContent = '← 一覧';

    var h = document.createElement('span');
    h.className = 'title';
    h.textContent = title;

    inner.appendChild(back);
    inner.appendChild(h);

    if (summary) {
      var s = document.createElement('span');
      s.className = 'summary';
      s.textContent = summary;
      inner.appendChild(s);
    }

    bar.appendChild(inner);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
