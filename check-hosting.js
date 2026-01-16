// Run this in browser console on https://cisconnects.com to check hosting
console.log('=== Hosting Diagnostic ===');
console.log('Hostname:', window.location.hostname);
console.log('Protocol:', window.location.protocol);
console.log('Full URL:', window.location.href);
console.log('Server:', document.querySelector('meta[name="server"]')?.content || 'Not detected');
console.log('X-Powered-By:', document.querySelector('meta[name="x-powered-by"]')?.content || 'Not in meta');
