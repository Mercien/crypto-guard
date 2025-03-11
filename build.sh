
#!/bin/bash

# Make script output all commands for debugging
set -x

echo "=== Starting Cloudflare Pages build process ==="

# Display environment information
echo "Environment details:"
node --version
npm --version

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "=== Build process completed ==="
