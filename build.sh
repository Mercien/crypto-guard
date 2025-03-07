
#!/bin/bash

# Make script output all commands for debugging
set -x

echo "=== Starting custom build process ==="

# Display environment information
echo "Environment details:"
node --version
npm --version

# Force remove any existing lockfile
echo "Removing existing lockfiles..."
rm -f bun.lockb
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

# Install dependencies with npm (more stable in CF Pages environment)
echo "Installing dependencies from scratch..."
npm install

# Build the project with npm
echo "Building the project..."
npm run build

echo "=== Build process completed ==="
