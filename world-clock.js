(() => {
  const clock = document.querySelector('.world-clock');
  if (!clock) return;
  const places = [
    ['Europe/Istanbul', ['Türkiye · İstanbul', 'Türkiye · Istanbul', 'Türkei · Istanbul']],
    ['Europe/Berlin', ['Almanya · Berlin', 'Germany · Berlin', 'Deutschland · Berlin']],
    ['Europe/London', ['Birleşik Krallık · Londra', 'United Kingdom · London', 'Vereinigtes Königreich · London']],
    ['America/New_York', ['ABD · New York', 'USA · New York', 'USA · New York']],
    ['Europe/Paris', ['Fransa · Paris', 'France · Paris', 'Frankreich · Paris']],
    ['Asia/Tokyo', ['Japonya · Tokyo', 'Japan · Tokyo', 'Japan · Tokio']],
    ['Asia/Kolkata', ['Hindistan · Yeni Delhi', 'India · New Delhi', 'Indien · Neu-Delhi']],
    ['Asia/Dubai', ['BAE · Dubai', 'UAE · Dubai', 'VAE · Dubai']]
  ];
  const buttons = [...clock.querySelectorAll('button')];
  let selected = 0;
  let timer;
  function render() {
    const language = ['tr', 'en', 'de'].includes(document.documentElement.lang) ? document.documentElement.lang : 'tr';
    const index = ['tr', 'en', 'de'].indexOf(language);
    const locale = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE' }[language];
    const now = new Date();
    const zone = places[selected][0];
    clock.querySelector('h2').textContent = ['Dünya saati', 'World clock', 'Weltzeit'][index];
    clock.querySelector('.clock-place').textContent = places[selected][1][index];
    const time = clock.querySelector('time');
    time.dateTime = now.toISOString();
    time.textContent = new Intl.DateTimeFormat(locale, { timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).format(now);
    clock.querySelector('.clock-date').textContent = new Intl.DateTimeFormat(locale, { timeZone: zone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
    buttons.forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === selected));
      button.setAttribute('aria-label', places[i][1][index]);
      button.title = places[i][1][index];
    });
  }
  function tick() {
    clearTimeout(timer);
    render();
    if (!document.hidden) timer = setTimeout(tick, 1000 - Date.now() % 1000);
  }
  buttons.forEach((button, i) => button.addEventListener('click', () => { selected = i; tick(); }));
  addEventListener('fincelya-language-change', render);
  document.addEventListener('visibilitychange', tick);
  tick();
})();
