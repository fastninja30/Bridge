// run-expo.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

try {
  // Start from current directory (assumed to be Bridge)
  const targetPath = path.join('BridgeApp', 'BridgeApp');

  // Verify the target path exists
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Directory not found: ${targetPath}`);
  }

  // Change directory and run Expo
  process.chdir(targetPath);
  execSync('npx expo start', { stdio: 'inherit' });

} catch (error) {
  console.error('\x1b[31mError: %s\x1b[0m', error.message);
  process.exit(1);
}