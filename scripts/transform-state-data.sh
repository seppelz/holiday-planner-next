#!/bin/bash

# Get the absolute path of the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Source directory
STATES_DIR="$PROJECT_ROOT/src/config/states"

# Transform each state file
for file in "$STATES_DIR"/*.ts; do
  if [ -f "$file" ]; then
    echo "Transforming $(basename "$file")..."
    
    # Create temporary file
    temp_file=$(mktemp)
    
    # Write the transformed content
    (
      echo "import { StateInfo } from '../../types/StateInfo';"
      echo ""
      echo "export const $(basename "$file" .ts): StateInfo = {"
      
      # Extract and transform the data
      awk '
        # Inside the main object
        /^export const.*: StateInfo = {/,/^};$/ {
          # Skip the opening and closing lines
          if ($0 ~ /^export const.*: StateInfo = {/ || $0 ~ /^};$/) next
          
          # Transform the data structure
          if ($0 ~ /fullName:/) {
            name = $0
            sub(/.*"/, "", name)
            sub(/".*/, "", name)
            print "  name: \"" name "\","
            print "  fullName: \"Land " name "\","
          }
          else if ($0 ~ /shortName:/) next
          else if ($0 ~ /capital:/) print $0
          else if ($0 ~ /description:/) print $0
          else if ($0 ~ /culturalHighlights:/) {
            print "  culture: ["
            in_array = 1
            next
          }
          else if ($0 ~ /keyFacts:/) {
            print "  keyFacts: ["
            in_keyfacts = 1
            next
          }
          else if ($0 ~ /economicStrength:/) {
            print "  economy: ["
            in_economy = 1
            next
          }
          else if (in_array && $0 ~ /\]/) {
            print "  ],"
            in_array = 0
          }
          else if (in_keyfacts && $0 ~ /\}/) {
            print "  ],"
            in_keyfacts = 0
          }
          else if (in_economy && $0 ~ /\]/) {
            print "  ],"
            in_economy = 0
          }
          else if (in_array || in_economy) print $0
          else if (in_keyfacts && $0 ~ /population:/) {
            val = $0
            sub(/.*"/, "", val)
            sub(/".*/, "", val)
            print "    {"
            print "      icon: \"population\","
            print "      label: \"Einwohner\","
            print "      value: \"" val "\""
            print "    },"
          }
          else if (in_keyfacts && $0 ~ /area:/) {
            val = $0
            sub(/.*"/, "", val)
            sub(/".*/, "", val)
            print "    {"
            print "      icon: \"area\","
            print "      label: \"Fläche\","
            print "      value: \"" val "\""
            print "    },"
          }
        }
      ' "$file"
      
      # Add placeholder data
      cat << EOF
  destinations: [
    {
      name: "Placeholder Destination",
      type: "city",
      description: "A placeholder destination description.",
      highlights: [
        "Highlight 1",
        "Highlight 2"
      ]
    }
  ],
  holidays: [
    {
      name: "Neujahr",
      date: "2024-01-01",
      type: "public",
      description: "Neujahrsfeierlichkeiten",
      details: {
        activities: [
          "Feuerwerk",
          "Neujahrskonzerte"
        ],
        traditions: [
          "Bleigießen",
          "Neujahrswünsche"
        ]
      }
    }
  ],
  flag: "/images/states/$(basename "$file" .ts)/flag.svg",
  coat: "/images/states/$(basename "$file" .ts)/coat.svg"
};
EOF
    ) > "$temp_file"
    
    # Replace the original file
    mv "$temp_file" "$file"
  fi
done

echo "Done! Transformed all state files." 