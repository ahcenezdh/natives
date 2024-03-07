const fs = require('fs');
const path = require('path');

// Define an array of directories to exclude
const excludedDirectories = ['.git', '.github', '.ci'];

// List all directories at the project root, excluding specific directories
const rootFolders = fs.readdirSync('./', { withFileTypes: true })
                      .filter(dirent => dirent.isDirectory() && !excludedDirectories.includes(dirent.name))
                      .map(dirent => dirent.name); // Map to directory names

const errors = []; // Collects errors instead of immediately exiting the process.

console.log("Directories considered as valid namespaces:", rootFolders);

const checkFile = (filePath) => {
    console.log(`Processing file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    const nsHeaderRegex = /---\nns: (.*)\n/m;
    const nsMatch = content.match(nsHeaderRegex);

    if (!nsMatch) {
        errors.push(`Invalid or missing 'ns' header in ${filePath}`);
        return; // Continue to next file instead of exiting.
    }

    const nsValue = nsMatch[1].trim();

    if (!rootFolders.includes(nsValue)) {
        errors.push(`The namespace '${nsValue}' specified in ${filePath} does not exist as a directory in the project.`);
    } else {
        const folderName = path.basename(path.dirname(filePath));
        if (nsValue !== folderName) {
            errors.push(`The file \`${path.basename(filePath)}\` is located in the '${folderName}' directory but should be in '${nsValue}' (based on the ns).`);
        }
    }
};

const processFiles = (files) => {
    files.forEach((file) => {
        const normalizedFile = path.normalize(file);
        
        if (excludedDirectories.includes(path.basename(path.dirname(normalizedFile))) || path.basename(normalizedFile) === 'README.md') {
            console.log(`Ignoring file: ${file}`);
            return; // Skip this file
        }

        checkFile(normalizedFile);
    });
};

const files = process.argv.slice(2);
if (files.length === 0) {
    console.error("No files provided to the script.");
} else {
    processFiles(files);

    if (errors.length > 0) {
        console.error("Errors found:\n" + errors.join("\n"));
        process.exit(1);
    } else {
        console.log("No errors found.");
    }
}
