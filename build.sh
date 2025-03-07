
#!/bin/bash
# Remove existing lockfile
rm -f bun.lockb
# Install dependencies without frozen lockfile
bun install
# Build the project
npm run build
