const panel = document.getElementById('panel');
const updateLoginLayout = () => document.body.classList.toggle('signed-in', !panel.hidden);
new MutationObserver(updateLoginLayout).observe(panel, { attributes: true, attributeFilter: ['hidden'] });
updateLoginLayout();
