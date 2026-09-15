/* Localize the shared legal-page shell; the approved documents remain unchanged. */
(() => {
  const languages = ['tr', 'en', 'de'];
  const rows = [
    ['Ana Sayfa', 'Home', 'Startseite'],
    ['Gizlilik', 'Privacy', 'Datenschutz'],
    ['Koşullar', 'Terms', 'Nutzungsbedingungen'],
    ['Destek', 'Support', 'Support'],
    ['✦ Şeffaflık ve güven', '✦ Transparency and trust', '✦ Transparenz und Vertrauen'],
    ['Gizlilik Politikası', 'Privacy Policy', 'Datenschutzrichtlinie'],
    ['Hangi verilerin neden işlendiğini, kimlerle paylaşıldığını ve seçimlerinizi açıkça anlatıyoruz.', 'We clearly explain what data is processed, why, who it is shared with, and your choices.', 'Wir erläutern klar, welche Daten warum verarbeitet und mit wem sie geteilt werden sowie Ihre Wahlmöglichkeiten.'],
    ['✦ Açık ve anlaşılır kurallar', '✦ Clear and understandable rules', '✦ Klare und verständliche Regeln'],
    ['Kullanım Koşulları', 'Terms of Service', 'Nutzungsbedingungen'],
    ['Fincelya deneyimini güvenli, adil ve keyifli tutan temel ilkeler.', 'The core principles that keep the Fincelya experience safe, fair, and enjoyable.', 'Die Grundprinzipien für ein sicheres, faires und angenehmes Fincelya-Erlebnis.'],
    ['© 2026 Fincelya. Tüm hakları saklıdır.', '© 2026 Fincelya. All rights reserved.', '© 2026 Fincelya. Alle Rechte vorbehalten.']
  ];
  const dictionary = new Map(rows.map(row => [row[0], row]));
  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script,style,.language-document,.language-switch')) continue;
    const key = node.textContent.trim();
    if (dictionary.has(key)) nodes.push([node, key]);
  }
  const links = [...document.querySelectorAll('.language-switch a')];
  const privacy = location.pathname.endsWith('privacy.html');
  function apply(language) {
    const index = languages.indexOf(language);
    if (index < 0) return;
    for (const [node, key] of nodes) node.textContent = node.textContent.replace(node.textContent.trim(), dictionary.get(key)[index]);
    document.querySelectorAll('.language-document').forEach(section => { section.hidden = section.lang !== language; });
    document.documentElement.lang = language;
    document.title = (privacy ? rows[5] : rows[8])[index] + ' — Fincelya';
    const names = { tr: ['Türkçe', 'English', 'Deutsch'], en: ['Türkçe', 'English', 'Deutsch'], de: ['Türkçe', 'English', 'Deutsch'] };
    links.forEach((link, position) => {
      link.textContent = names[language][position];
      link.setAttribute('aria-current', link.hash === '#' + language ? 'true' : 'false');
    });
    document.querySelectorAll('a[href^="privacy.html"],a[href^="terms.html"]').forEach(link => { link.href = link.getAttribute('href').split('#')[0] + '#' + language; });
    try { localStorage.setItem('fincelya.language', language); } catch {}
    window.dispatchEvent(new Event('fincelya-language-change'));
  }
  links.forEach(link => link.addEventListener('click', () => apply(link.hash.slice(1))));
  addEventListener('hashchange', () => apply(location.hash.slice(1)));
  let stored;
  try { stored = localStorage.getItem('fincelya.language'); } catch {}
  const hash = location.hash.slice(1);
  apply(languages.includes(hash) ? hash : languages.includes(stored) ? stored : 'tr');
})();
