const fs = require('fs');
const path = require('path');

// Define an array of directories to exclude
const excludedDirectories = ['.git', '.github', '.ci'];

// List all directories at the project root, excluding specific directories
const rootFolders = fs.readdirSync('./', { withFileTypes: true })
                      .filter(dirent => dirent.isDirectory() && !excludedDirectories.includes(dirent.name))
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
    const nsHeaderRegex = /---\nns: (.*)\n/m;
    const nsMatch = content.match(nsHeaderRegex);

    if (!nsMatch) {
        errors.push(`Invalid or missing 'ns' header in ${filePath}`);
        return;
    }

    const nsValue = nsMatch[1].trim();
    const folderName = path.basename(path.dirname(filePath));

    if (nsValue !== folderName) {
        errors.push(`The file \`${path.basename(filePath)}\` is located in the '${folderName}' directory but should be in '${nsValue}' (based on the ns).`);
    }

    if (!rootFolders.includes(nsValue)) {
        errors.push(`The namespace '${nsValue}' specified in ${filePath} does not exist as a directory in the project. It should be one of ${rootFolders.join(', ')}.`);
    }
};

/**
 * Processes each file passed to the script, ignoring files in excluded directories and README.md.
 * @param {string[]} files The array of file paths to be processed.
 */
const processFiles = (files) => {
    files.forEach((file) => {
        const normalizedFile = path.normalize(file);
        const directoryName = normalizedFile.split(path.sep)[0]; // Get the top-level directory name
        
        // Check for exclusions, including specific files and directories
        if (excludedDirectories.includes(directoryName) || path.basename(normalizedFile) === 'README.md') {
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
