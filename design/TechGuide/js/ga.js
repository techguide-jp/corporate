function loadScript(src) {
  return new Promise(function (resolve, reject) {
    var s;
    s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

var src = "https://www.googletagmanager.com/gtag/js?id=G-MS3VSF32XF";
loadScript(src).then(function () {
  gtag('js', new Date());
  gtag('config', 'G-MS3VSF32XF');
});