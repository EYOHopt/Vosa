// Builds two copies of the app from src/:
//   public/index.html  – full page for Vercel (voice + Yorùbá speech service)
//   dist/vosa.html     – page body for the Claude preview link
const fs = require('fs');
const path = require('path');
const src = (f) => fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');

const body = src('app.html')
  .replace('/*LOGIC*/', () => src('logic.js'))
  .replace('/*UI*/', () => src('ui.js'));

const full = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' +
  '<meta name="theme-color" content="#1c3264">\n' +
  '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>\n' +
  '</head>\n<body>\n' + body + '\n</body>\n</html>\n';

fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), full);
fs.writeFileSync(path.join(__dirname, 'dist', 'vosa.html'), body);
console.log('Built public/index.html and dist/vosa.html');
