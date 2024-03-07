const fs = require('fs');
const path = require('path');

const rootFolders = fs.readdirSync('./', { withFileTypes: true })
                      .filter(dirent => dirent.isDirectory())
                      .map(dirent => dirent.name);

const excludedDirectories = ['.git', '.github', '.ci'];
const errors = [];

const processFile = (filePath) => {
    if (!fs.existsSync(filePath)) {
        console.log(`File does not exist: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const nsHeaderRegex = /---\nns: (.*)\n/m;
    const nsMatch = content.match(nsHeaderRegex);

    if (!nsMatch) {
        errors.push(`Invalid or missing 'ns' header in ${filePath}`);
        return;
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

const main = () => {
    const files = process.argv.slice(2).join(' ').split(' ');
    files.forEach(file => {
        const normalizedFile = path.normalize(file);
        const directoryName = path.dirname(normalizedFile);
        
        // Skip if in an excluded directory or is README.md
        if (excludedDirectories.includes(directoryName) || path.basename(normalizedFile) === 'README.md') {
            return;
        }

        processFile(normalizedFile);
    });

    if (errors.length > 0) {
        console.error("Errors found:\n" + errors.join("\n"));
        process.exit(1);
    } else {
        console.log("No errors found.");
    }
};

main();
