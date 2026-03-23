const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const HOME = process.env.HOME || process.env.HOME_;
const ANDASY_DIR = path.join(HOME, '.andasy', 'bin');
const ANDASY_CLI = path.join(ANDASY_DIR, 'andasy');

async function install() {
  console.log('Installing Andasy CLI...');
  
  // Download and run install script
  execSync('curl -sSL https://andasy.io/install.sh | sh', {
    stdio: 'inherit',
    env: { ...process.env, HOME }
  });
  
  // Add to PATH for subsequent steps
  const stateFile = process.env.GITHUB_STATE ? path.join(process.env.GITHUB_STATE, 'andasy-state.json') : null;
  if (stateFile) {
    fs.writeFileSync(stateFile, JSON.stringify({ andasyDir: ANDASY_DIR }));
  }
  
  // Update PATH by writing to GITHUB_PATH
  if (process.env.GITHUB_PATH) {
    fs.appendFileSync(process.env.GITHUB_PATH, `${ANDASY_DIR}\n`);
  }
  
  console.log('Andasy CLI installed successfully');
}

async function cleanup() {
  console.log('Cleaning up Andasy CLI setup...');
  // Any cleanup needed
}

if (require.main === module) {
  const step = process.env.ACTION_STATE === 'post' ? 'post' : 'main';
  if (step === 'post') {
    cleanup();
  } else {
    install();
  }
}

module.exports = { install, cleanup };