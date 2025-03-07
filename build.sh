
#!/bin/bash

# Make sure the script fails on any error
set -e

echo "=== Starting custom build process ==="

# Remove existing lockfile
echo "Removing existing lockfile..."
rm -f bun.lockb

# Install dependencies without frozen lockfile
echo "Installing dependencies..."
bun install

# Build the project
echo "Building the project..."
npm run build

echo "=== Build process completed ==="
