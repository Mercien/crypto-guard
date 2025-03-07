
#!/bin/bash

# Make script output all commands for debugging
set -x

echo "=== Starting custom build process ==="

# Don't let the script fail immediately to allow better error handling
set +e

# Display environment information
echo "Environment details:"
node --version
npm --version
bun --version

# Force remove any existing lockfile
echo "Removing existing lockfiles..."
rm -f bun.lockb
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

# Install dependencies without frozen lockfile and with verbose output
echo "Installing dependencies from scratch..."
bun install --no-save --verbose
INSTALL_EXIT_CODE=$?

if [ $INSTALL_EXIT_CODE -ne 0 ]; then
  echo "Bun install failed. Trying with npm..."
  npm install
  INSTALL_EXIT_CODE=$?
fi

if [ $INSTALL_EXIT_CODE -ne 0 ]; then
  echo "Both install methods failed. Exiting."
  exit $INSTALL_EXIT_CODE
fi

# Set error handling back for the build step
set -e

# Build the project
echo "Building the project..."
if command -v bun &> /dev/null; then
  bun run build
else
  npm run build
fi

echo "=== Build process completed ==="
