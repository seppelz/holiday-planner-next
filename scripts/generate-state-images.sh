#!/bin/bash

# List of states
states=(
  "baden-wuerttemberg"
  "bayern"
  "berlin"
  "brandenburg"
  "bremen"
  "hamburg"
  "hessen"
  "mecklenburg-vorpommern"
  "niedersachsen"
  "nordrhein-westfalen"
  "rheinland-pfalz"
  "saarland"
  "sachsen"
  "sachsen-anhalt"
  "schleswig-holstein"
  "thueringen"
)

# Create base directory
mkdir -p public/images/states

# Generate placeholder SVGs for each state
for state in "${states[@]}"; do
  # Create state directory
  mkdir -p "public/images/states/$state"
  
  # Generate flag SVG
  cat > "public/images/states/$state/flag.svg" << EOF
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#eee"/>
  <text x="300" y="200" font-family="Arial" font-size="24" text-anchor="middle">
    $state Flag
  </text>
</svg>
EOF

  # Generate coat of arms SVG
  cat > "public/images/states/$state/coat.svg" << EOF
<svg width="400" height="500" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="500" fill="#eee"/>
  <text x="200" y="250" font-family="Arial" font-size="24" text-anchor="middle">
    $state Coat of Arms
  </text>
</svg>
EOF
done 