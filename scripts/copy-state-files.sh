#!/bin/bash

# Get the absolute path of the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Source and destination directories
SRC_DIR="/media/sebastian/DATA/holiday/src/config/states"
DEST_DIR="$PROJECT_ROOT/src/config/states"

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Copy and modify each state file
for file in "$SRC_DIR"/*.ts; do
  if [ -f "$file" ] && [ "$(basename "$file")" != "index.ts" ]; then
    filename=$(basename "$file")
    state_name="${filename%.ts}"  # Remove .ts extension
    echo "Processing $filename..."
    
    # Create temporary file with modified content
    (
      echo "import { StateInfo } from '../../types/StateInfo';"
      echo ""
      echo "export const $state_name: StateInfo = {"
      
      # Extract the main state data object
      sed -n '/^export const.*: StateInfo = {/,/^};$/p' "$file" |
        # Remove the export line and the closing line
        sed '1d;$d' |
        # Add proper indentation
        sed 's/^/  /'
      
      echo "};"
    ) > "$DEST_DIR/$filename"
    
    echo "Created $DEST_DIR/$filename"
  fi
done

echo "Done! Copied and modified all state files." 