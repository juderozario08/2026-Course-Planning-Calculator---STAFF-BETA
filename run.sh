#!/usr/bin/env bash
# Serve the planner locally and open it in the browser.
# Usage: ./run.sh [port]    (default port: 8000)

set -euo pipefail

PORT="${1:-8000}"
URL="http://localhost:${PORT}/"

cd "$(dirname "$0")"

if ! command -v python3 >/dev/null 2>&1; then
    echo "python3 is required but was not found." >&2
    exit 1
fi

# Open the browser shortly after the server starts.
(
    sleep 1
    if command -v open >/dev/null 2>&1; then
        open "$URL"
    elif command -v xdg-open >/dev/null 2>&1; then
        xdg-open "$URL"
    fi
) &

echo "Serving at ${URL} (press Ctrl+C to stop)"
python3 -m http.server "$PORT"
