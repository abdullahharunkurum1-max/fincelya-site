(() => {
  const content = {
    tr: ['Hesap silme', 'Hesap silme özelliğini içeren güncel iOS sürümünde Mağaza → Hesabımı kalıcı olarak sil yolunu kullanabilirsiniz. Onaydan sonra hesap, profil, sunucudaki yorumlar, kullanım hakları ve cüzdan kayıtları silinir. Bu cihazdaki ilgili hesaba ait yerel sohbet ve fal geçmişi de temizlenir. Diğer cihazlardaki çevrimdışı kopyalar uzaktan temizlenmez. Kullanıcı bağlantısı kaldırılmış satın alma doğrulama ve denetim kayıtları tekrar işlem yapılmasını önlemek için tutulabilir. Eski sürümlerde veya erişim sorunlarında support@fincelya.com üzerinden talep gönderebilirsiniz.'],
    en: ['Account deletion', 'In the current iOS version supporting account deletion, use Store → Permanently delete my account. After confirmation, the account, profile, server readings, allowances and wallet records are deleted. Local chat and reading history for that account on this device is also cleared. Offline copies on other devices are not remotely erased. Purchase verification and audit records with the user association removed may be retained to prevent transaction replay. On older versions or if you cannot access your account, contact support@fincelya.com.'],
    de: ['Kontolöschung', 'In der aktuellen iOS-Version mit Kontolöschung wählen Sie Shop → Mein Konto dauerhaft löschen. Nach Bestätigung werden Konto, Profil, serverseitige Deutungen, Nutzungsrechte und Guthabeneinträge gelöscht. Der lokale Chat- und Deutungsverlauf dieses Kontos auf diesem Gerät wird ebenfalls entfernt. Offline-Kopien auf anderen Geräten werden nicht aus der Ferne gelöscht. Kaufprüfungs- und Prüfprotokolle ohne Benutzerzuordnung können zur Verhinderung wiederholter Transaktionen erhalten bleiben. Bei älteren Versionen oder Zugriffsproblemen wenden Sie sich an support@fincelya.com.']
  };
  for (const [lang, [title, text]] of Object.entries(content)) {
    const section = document.getElementById(lang);
    if (!section) continue;
    const heading = document.createElement('h3'); heading.textContent = title;
    const paragraph = document.createElement('p'); paragraph.textContent = text;
    section.append(heading, paragraph);
  }
})();
