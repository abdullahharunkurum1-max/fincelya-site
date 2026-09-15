(() => {
  const storageKey = 'fincelya-theme';
  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem(storageKey); } catch {}
  const preferred = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const initial = saved === 'light' || saved === 'dark' ? saved : preferred;

  const apply = theme => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#fbf4ed' : '#120414';
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const light = theme === 'light';
    button.setAttribute('aria-pressed', String(light));
    const labels = { tr: ['Koyu moda geç', 'Açık moda geç'], en: ['Switch to dark mode', 'Switch to light mode'], de: ['Zum dunklen Modus wechseln', 'Zum hellen Modus wechseln'] };
    button.setAttribute('aria-label', (labels[root.lang] || labels.tr)[light ? 0 : 1]);
    button.dataset.mode = light ? 'light' : 'dark';
  };

  apply(initial);
  addEventListener('fincelya-language-change', () => apply(root.dataset.theme || initial));
  addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme || initial);
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem(storageKey, next); } catch {}
      apply(next);
    });
  });
})();


