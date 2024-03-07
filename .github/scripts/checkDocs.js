const fs = require('fs');
const path = require('path');

/**
 * Checks the documentation of the provided file if it matches the criteria.
 * @param {string} filePath The path to the file to check.
 */
const checkFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check for the ns header
    const nsHeaderRegex = /^---\nns: (.*)\n---/m;
    const nsMatch = content.match(nsHeaderRegex);
    if (!nsMatch) {
        console.error(`Invalid or missing 'ns' header in ${filePath}`);
        process.exit(1);
    }

    // Verify if ns matches the directory name (workspace)
    const nsValue = nsMatch[1];
    const folderName = path.basename(path.dirname(filePath));
    if (nsValue !== folderName) {
        console.error(`The native \`${path.basename(filePath)}\` is located in the '${folderName}' directory but should be in '${nsValue}' (based on the ns).`);
        process.exit(1);
    }
};

/**
 * Processes each file passed to the script, ignoring README.md, .github, and .ci directories.
 * @param {string[]} files The array of file paths to process.
 */
const processFiles = (files) => {
    files.forEach((file) => {
        // Normalize file path for consistent comparison across platforms
        const normalizedFile = path.normalize(file);
        
        // Check for exclusions
        if (normalizedFile.includes(path.normalize('/.github/')) || normalizedFile.includes(path.normalize('/.ci/')) || normalizedFile === 'README.md') {
            console.log(`Ignoring file: ${file}`);
            return; // Skip this file
        }

        checkFile(normalizedFile);
    });
};

// Gets the file paths from the command line arguments
const files = process.argv.slice(2);

// Process each file, excluding specific files and directories
processFiles(files);
