/* Translate text nodes without replacing the existing layout, icons or links. */
(() => {
  const pairs = [
    ['Özellikler','Features','Funktionen'],['Hesap','Account','Konto'],['Gizlilik','Privacy','Datenschutz'],['Destek','Support','Support'],
    ['✦ Sezgisel ve kişisel keşif','✦ Intuitive personal discovery','✦ Intuitive persönliche Entdeckung'],
    ['Her fincan,','Every cup,','Jede Tasse,'],['bin ihtimal.','a thousand possibilities.','tausend Möglichkeiten.'],
    ['Sezgilerinle teknolojiyi buluşturan Fincelya; kahve falından tarota, el falından astrolojiye uzanan zengin ve zarif bir keşif deneyimi sunar.','Fincelya brings intuition and technology together in an elegant journey through coffee readings, tarot, palm reading and astrology.','Fincelya verbindet Intuition und Technologie zu einer stilvollen Entdeckungsreise durch Kaffeesatzdeutung, Tarot, Handlesen und Astrologie.'],
    ['Deneyimi keşfet →','Explore the experience →','Entdecke das Erlebnis →'],['Gizlilik yaklaşımımız','Our privacy approach','Unser Datenschutzansatz'],
    ['✓ Apple ile giriş','✓ Sign in with Apple','✓ Mit Apple anmelden'],['✓ Google ile giriş','✓ Sign in with Google','✓ Mit Google anmelden'],['✓ Güvenli hesap','✓ Secure account','✓ Sicheres Konto'],
    ['GÜNÜN ENERJİSİ',"TODAY'S ENERGY",'ENERGIE DES TAGES'],['İçindeki sese güven.','Trust your inner voice.','Vertraue deiner inneren Stimme.'],['Bugün yeni ihtimaller için alan aç.','Make room for new possibilities today.','Schaffe heute Raum für neue Möglichkeiten.'],
    ['Tarot kartı','Tarot cards','Tarotkarten'],['Benzersiz falcı','Distinct readers','Verschiedene Deuterinnen'],['Türkçe deneyim','Turkish experience','Türkisches Erlebnis'],['Yeni ihtimal','New possibilities','Neue Möglichkeiten'],
    ['KEŞFET','DISCOVER','ENTDECKEN'],['Sezgine açılan yollar','Paths to your intuition','Wege zu deiner Intuition'],['Her niyet için farklı, özenle tasarlanmış bir yolculuk.','A thoughtfully designed journey for every intention.','Eine sorgfältig gestaltete Reise für jede Absicht.'],
    ['FİNCANIN HİKÂYESİ','THE STORY IN YOUR CUP','DIE GESCHICHTE DEINER TASSE'],['Kahve Falı','Coffee Reading','Kaffeesatzdeutung'],['Fincan ve tabak fotoğraflarındaki sembolleri, seçtiğin falcının üslubuyla kişisel bir yoruma dönüştür.','Explore the symbols in your cup and saucer photos with your chosen reader’s narrative style.','Entdecke die Symbole auf deinen Tassen- und Untertassenfotos im Erzählstil deiner gewählten Deuterin.'],
    ['GEÇMİŞ · ŞİMDİ · GELECEK','PAST · PRESENT · FUTURE','VERGANGENHEIT · GEGENWART · ZUKUNFT'],['78 kartlık kapalı desteden seçimini yap; kartların mesajını yorumla birlikte keşfet.','Choose from a face-down deck of 78 cards and discover their message with your reading.','Wähle aus 78 verdeckten Karten und entdecke ihre Botschaft mit deiner Deutung.'],
    ['ÇİZGİLERİN HİKÂYESİ','THE STORY OF YOUR LINES','DIE GESCHICHTE DEINER LINIEN'],['El Falı','Palm Reading','Handlesen'],['Avuç içi fotoğrafındaki belirgin çizgiler üzerinden eğlence ve farkındalık odaklı bir okuma al.','Explore visible palm lines in your photo through an entertainment-focused reflection.','Erkunde sichtbare Handlinien auf deinem Foto mit einer unterhaltenden Deutung.'],
    ['ASTROLOJİK YORUM','ASTROLOGICAL REFLECTION','ASTROLOGISCHE DEUTUNG'],['Astroloji','Astrology','Astrologie'],['Doğum tarihi, saati ve yerine göre sembolik eğilimleri ve günlük enerjini keşfet.','Explore symbolic themes using your birth date, time and place.','Entdecke symbolische Themen anhand deines Geburtsdatums, deiner Geburtszeit und deines Geburtsorts.'],
    ['ANINDA KİŞİSEL YANIT','PERSONAL RESPONSES','PERSÖNLICHE ANTWORTEN'],["Pandora'ya Sor",'Ask Pandora','Frag Pandora'],['Düşüncelerini paylaş ve konuşmalarını uygulamaya döndüğünde kaldığın yerden sürdür.','Share your thoughts and resume your conversations when you return to the app.','Teile deine Gedanken und setze deine Gespräche fort, wenn du zur App zurückkehrst.'],
    ['SEMBOLLERİN DİLİ','THE LANGUAGE OF SYMBOLS','DIE SPRACHE DER SYMBOLE'],['Rüya Sözlüğü','Dream Dictionary','Traumlexikon'],['Rüyandaki simgeleri ara ve olası anlamlarını merak uyandıran açıklamalarla incele.','Search dream symbols and explore their possible meanings.','Suche nach Traumsymbolen und entdecke ihre möglichen Bedeutungen.'],
    ['KOLAY VE GÜVENLİ','SIMPLE AND SECURE','EINFACH UND SICHER'],['Hesabınla güvenle başla.','Start securely with your account.','Starte sicher mit deinem Konto.'],["Fincelya'da",'Fincelya offers','Fincelya bietet'],['Apple ile giriş','Sign in with Apple','Anmeldung mit Apple'],['ve','and','und'],['Google ile giriş','Sign in with Google','Anmeldung mit Google'],['seçenekleri bulunur. Google girişi yalnızca hesabını oluşturmak ve oturumunu güvenle sürdürmek için temel profil bilgilerini kullanır.','options. Google sign-in uses basic profile information only to create your account and maintain your session securely.','an. Die Google-Anmeldung nutzt grundlegende Profildaten nur, um dein Konto zu erstellen und deine Sitzung sicher aufrechtzuerhalten.'],
    ['Verilerini nasıl koruduğumuzu incele →','Learn how we protect your data →','Erfahre, wie wir deine Daten schützen →'],['Apple ile Devam Et','Continue with Apple','Mit Apple fortfahren'],['Google ile Devam Et','Continue with Google','Mit Google fortfahren'],['veya','or','oder'],['Giriş seçeneklerinin tamamı uygulamada sunulur.','Both sign-in options are available in the app.','Beide Anmeldeoptionen sind in der App verfügbar.'],
    ['FİNCELYA TOPLULUĞU','FINCELYA COMMUNITY','FINCELYA-COMMUNITY'],['Yolculuğu birlikte paylaş.','Share the journey.','Teile die Reise.'],['Topluluğa katıl, deneyimlerini paylaş ve desteğe doğrudan ulaş.','Join the community, share your experiences and reach support directly.','Tritt der Community bei, teile deine Erfahrungen und erreiche den Support direkt.'],['Topluluğa katıl','Join the community','Community beitreten'],['Destek al','Get support','Support erhalten'],
    ['Eğlence ve kişisel farkındalık için tasarlandı.','Designed for entertainment and personal reflection.','Für Unterhaltung und persönliche Reflexion entwickelt.'],['Yasal','Legal','Rechtliches'],['Gizlilik Politikası','Privacy Policy','Datenschutzrichtlinie'],['Kullanım Koşulları','Terms of Service','Nutzungsbedingungen'],['Topluluk','Community','Community'],['Telegram Sohbet','Telegram Community','Telegram-Community'],['Telegram Destek','Telegram Support','Telegram-Support'],['E-posta Desteği','Email Support','E-Mail-Support'],['© 2026 Fincelya. Tüm hakları saklıdır.','© 2026 Fincelya. All rights reserved.','© 2026 Fincelya. Alle Rechte vorbehalten.'],['Fal ve yorum içerikleri yalnızca eğlence amaçlıdır.','Readings are for entertainment only.','Deutungen dienen ausschließlich der Unterhaltung.']
  ];
  const dictionary = new Map(pairs.map(row => [row[0], row]));
  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script,style,.intro-languages,.language-switch')) continue;
    const key = node.textContent.trim();
    if (dictionary.has(key)) nodes.push([node, key]);
  }
  const links = [...document.querySelectorAll('.home-language-links a')];
  function apply(language, remember = false) {
    const index = ['tr','en','de'].indexOf(language);
    for (const [node, key] of nodes) node.textContent = node.textContent.replace(node.textContent.trim(), dictionary.get(key)[index]);
    document.documentElement.lang = language;
    document.title = ['Fincelya — Sezgine Kulak Ver','Fincelya — Listen to Your Intuition','Fincelya — Höre auf deine Intuition'][index];
    document.querySelector('meta[name="description"]').content = ['Fincelya ile kahve falı, tarot, el falı, astroloji ve rüya sembollerini keşfet.','Discover coffee readings, tarot, palm reading, astrology and dream symbols with Fincelya.','Entdecke Kaffeesatzdeutung, Tarot, Handlesen, Astrologie und Traumsymbole mit Fincelya.'][index];
    document.querySelector('.hero-visual img').alt = ['Fincelya fincan, yıldız ve kristal küre logosu','Fincelya cup, star and crystal ball logo','Fincelya-Logo mit Tasse, Stern und Kristallkugel'][index];
    document.querySelectorAll('a[href^="privacy.html"],a[href^="terms.html"]').forEach(link => { link.href = link.getAttribute('href').split('#')[0] + '#' + language; });
    links.forEach((link, i) => link.setAttribute('aria-current', i === index ? 'true' : 'false'));
    if (remember) { try { localStorage.setItem('fincelya.language', language); } catch {} }
  }
  links.forEach((link,index) => link.addEventListener('click', event => { event.preventDefault(); apply(['tr','en','de'][index], true); }));
  let selected;
  try { selected = localStorage.getItem('fincelya.language'); } catch {}
  if (!['tr','en','de'].includes(selected)) selected = (navigator.languages || [navigator.language]).map(x => x.split('-')[0]).find(x => ['tr','en','de'].includes(x)) || 'en';
  apply(selected);
})();
