const fs = require('fs');
const path = require('path');

// List all directories at the project root to verify the existence of namespaces (ns)
const rootFolders = fs.readdirSync('./', { withFileTypes: true })
                      .filter(dirent => dirent.isDirectory()) // Keep only directories
                      .map(dirent => dirent.name); // Map to directory names

/**
 * Collects errors instead of immediately exiting the process.
 * @type {string[]}
 */
const errors = [];

/**
 * Checks the documentation of the provided file to ensure it matches specific criteria.
 * Adjusted to find 'ns' header anywhere in the file and collect errors without stopping.
 * @param {string} filePath The path of the file to be checked.
 */
const checkFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');

    // Adjusted regex to find 'ns' header anywhere in the file
    const nsHeaderRegex = /---\nns: (.*)\n/m;
    const nsMatch = content.match(nsHeaderRegex);
    if (!nsMatch) {
        errors.push(`Invalid or missing 'ns' header in ${filePath}`);
        return;
    }

    // Verify if ns matches the directory name (workspace)
    const nsValue = nsMatch[1].trim();
    const folderName = path.basename(path.dirname(filePath));
    if (nsValue !== folderName) {
        errors.push(`The file \`${path.basename(filePath)}\` is located in the '${folderName}' directory but should be in '${nsValue}' (based on the ns).`);
    }

    // Verify if the ns exists as a folder name in the project
    if (!rootFolders.includes(nsValue)) {
        errors.push(`The namespace '${nsValue}' specified in ${filePath} does not exist as a directory in the project. It should be one of ${rootFolders.join(', ')}.`);
        return;
    }
};

/**
 * Processes each file passed to the script, ignoring README.md, .github, and .ci directories.
 * @param {string[]} files The array of file paths to be processed.
 */
const processFiles = (files) => {
    files.forEach((file) => {
        // Normalize file path for consistent comparison across platforms
        const normalizedFile = path.normalize(file);
        
        // Check for exclusions
        if (normalizedFile.includes(path.normalize('/.github/')) || normalizedFile.includes(path.normalize('/.ci/')) || path.basename(normalizedFile) === 'README.md') {
            console.log(`Ignoring file: ${file}`);
            return; // Skip this file
        }

        checkFile(normalizedFile); // Perform the check on the file
    });
};

// Get the file paths from the command line arguments
const files = process.argv.slice(2);

// Process each file, excluding specific files and directories
processFiles(files);

// After all files have been processed, check if there were any errors
if (errors.length > 0) {
    console.error("Errors found:\n" + errors.join("\n"));
    process.exit(1); // Exit with an error code indicating failure
}
