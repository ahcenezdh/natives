#!/bin/bash

set -euo pipefail

# Detect modified .md files
changed_docs() {
    local commit_range="$1"
    git diff --name-only "$commit_range" -- '*.md'
}

# Determine commit range
commit_range="HEAD~1..HEAD"
if [ ! -z "${GITHUB_SHA-}" ]; then
    commit_range="${GITHUB_SHA}~1..${GITHUB_SHA}"
fi

echo "Checking documentation changes between $commit_range"

# Obtain a list of all project directories excluding .git, .github, and .ci
readarray -t valid_ns_dirs < <(find . -maxdepth 1 -type d -not -path "./.git" -not -path "./.github" -not -path "./.ci" -exec basename {} \;)

# Loop through each modified Markdown file
while IFS= read -r md_file; do
    echo "Processing $md_file..."

    # Extract 'ns' from the Markdown file
    ns=$(grep -Po '^---\nns: \K.*' "$md_file" | head -n 1)

    if [[ -z "$ns" ]]; then
        printf "Error: 'ns' missing in $md_file"
        exit 1
    fi

    # Check if 'ns' exists as a project directory
    if [[ ! " ${valid_ns_dirs[*]} " =~ " ${ns} " ]]; then
        printf "Error: The namespace '${ns}' specified in ${md_file} does not exist as a directory in the project."
        exit 1
    fi

    # Determine the directory name of the current file
    folderName=$(basename "$(dirname "$md_file")")

    # Check if file is in the correct directory according to its 'ns' value
    if [[ "$ns" != "$folderName" ]]; then
        printf "Error: The file \`${md_file}\` is located in the '${folderName}' directory but should be in '${ns}'."
        exit 1
    fi

    echo "$md_file successfully verified."
done < <(changed_docs "$commit_range")
