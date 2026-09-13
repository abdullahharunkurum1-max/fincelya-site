(() => {
  const storageKey = 'fincelya-theme';
  const root = document.documentElement;
  const saved = localStorage.getItem(storageKey);
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
    button.setAttribute('aria-label', light ? 'Koyu moda geç' : 'Açık moda geç');
    button.dataset.mode = light ? 'light' : 'dark';
  };

  apply(initial);
  addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme || initial);
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem(storageKey, next);
      apply(next);
    });
  });
})();


