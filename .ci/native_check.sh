#!/bin/bash

set -eu

# Function to fetch the list of directories in the project
get_project_directories() {
    # List all directories except .github, .git, and .ci
    find . -mindepth 1 -maxdepth 1 -type d ! -name '.github' ! -name '.git' ! -name '.ci'
}

# Function to check if a namespace exists
check_namespace_exists() {
    local ns="$1"
    local project_directories=($(get_project_directories))

    for dir in "${project_directories[@]}"; do
        if [[ "$dir" == "$ns" ]]; then
            return 0  # Namespace exists
        fi
    done

    return 1  # Namespace does not exist
}

# Function to validate a file
validate_file() {
    local file="$1"
    local content="$(<"$file")"
    local ns_regex="^---\s*\nns:\s*(\S+)\s*\n"

    # Check if the file contains an ns header
    if [[ "$content" =~ $ns_regex ]]; then
        local ns="${BASH_REMATCH[1]}"
        local folder_name="$(basename "$(dirname "$file")")"

        # Check if the namespace exists
        if ! check_namespace_exists "$ns"; then
            printf "The namespace '%s' specified in %s does not exist as a directory in the project.\n" "$ns" "$file" >&2
            exit 1
        fi

        # Check if the namespace matches the folder name
        if [[ "$ns" != "$folder_name" ]]; then
            printf "The file '%s' is located in the '%s' directory but should be in '%s'.\n" "$(basename "$file")" "$folder_name" "$ns" >&2
            exit 1
        fi
    else
        printf "Invalid or missing 'ns' header in %s\n" "$file" >&2
        exit 1
    fi
}

# Main function
main() {
    local modified_files="$@"

    for file in $modified_files; do
        validate_file "$file"
    done
}

# Invoke the main function with the list of modified files
main "$@"
