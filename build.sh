
#!/bin/bash

# Make script output all commands
set -x

# Make sure the script fails on any error
set -e

echo "=== Starting custom build process ==="

# Force remove any existing lockfile
echo "Removing existing lockfile..."
rm -f bun.lockb
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

# Install dependencies without frozen lockfile
echo "Installing dependencies from scratch..."
bun install --no-save

# Build the project
echo "Building the project..."
bun run build

echo "=== Build process completed ==="
