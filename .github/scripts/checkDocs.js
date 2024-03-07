const fs = require('fs');
const path = require('path');

/**
 * Recursively checks documentation in the specified directory.
 * @param {string} dir The directory to check.
 */
const checkDocumentation = (dir) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
    if (file.isDirectory()) {
      const workspacePath = path.join(dir, file.name);
      fs.readdirSync(workspacePath).forEach((doc) => {
        const docPath = path.join(workspacePath, doc);
        if (doc.endsWith('.md')) {
          const content = fs.readFileSync(docPath, 'utf8');

          // Check for the ns header
          const nsHeaderRegex = /^---\nns: (.*)\n---/m;
          const nsMatch = content.match(nsHeaderRegex);
          if (!nsMatch) {
            console.error(`Invalid or missing 'ns' header in ${docPath}`);
            process.exit(1);
          }

          // Verify if ns matches the directory name (workspace)
          const nsValue = nsMatch[1];
          if (nsValue !== file.name) {
            console.error(`The native \`${doc}\` is located in the '${file.name}' directory but should be in '${nsValue}' (based on the ns).`);
            process.exit(1);
          }
        }
      });
    }
  });
};

// Start checking from the project's workspace directories under the root
checkDocumentation('./');