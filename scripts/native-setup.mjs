import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const appName = 'astro';

function writeIfChanged(file, next) {
  const current = fs.readFileSync(file, 'utf8');
  if (current !== next) fs.writeFileSync(file, next);
}

function patchAndroid() {
  const strings = path.join(root, 'android/app/src/main/res/values/strings.xml');
  if (!fs.existsSync(strings)) return false;
  const xml = fs.readFileSync(strings, 'utf8')
    .replace(/<string name="app_name">[^<]*<\/string>/, `<string name="app_name">${appName}</string>`)
    .replace(/<string name="title_activity_main">[^<]*<\/string>/, `<string name="title_activity_main">${appName}</string>`);
  writeIfChanged(strings, xml);
  return true;
}

function patchIos() {
  const plist = path.join(root, 'ios/App/App/Info.plist');
  if (!fs.existsSync(plist)) return false;
  const xml = fs.readFileSync(plist, 'utf8')
    .replace(/(<key>CFBundleDisplayName<\/key>\s*<string>)[^<]*(<\/string>)/, `$1${appName}$2`);
  writeIfChanged(plist, xml);
  return true;
}

const android = patchAndroid();
const ios = patchIos();
if (!android && !ios) {
  console.log('No android/ or ios/ project yet. Add one with: npx cap add android');
} else {
  console.log(`Native display name set to ${appName}.`);
}
