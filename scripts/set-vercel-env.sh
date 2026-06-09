#!/bin/bash
# Run this script once to sync .env.local values to Vercel
# Usage: bash scripts/set-vercel-env.sh

set -e

# Load .env.local
export $(grep -v '^#' .env.local | xargs)

add_env() {
  local key=$1
  local val=$2
  local envs=${3:-"production preview development"}
  for env in $envs; do
    vercel env add "$key" "$env" --value "$val" --yes --force 2>/dev/null && echo "✓ $key → $env" || echo "⚠ $key → $env (skipped)"
  done
}

# NextAuth
add_env NEXTAUTH_SECRET       "$NEXTAUTH_SECRET"       "production preview development"
add_env NEXTAUTH_URL          "https://ai-radar-ashen.vercel.app" "production"

# Google OAuth
add_env GOOGLE_CLIENT_ID      "$GOOGLE_CLIENT_ID"      "production preview development"
add_env GOOGLE_CLIENT_SECRET  "$GOOGLE_CLIENT_SECRET"  "production preview development"
