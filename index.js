const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

// Function to get all .js files in the current directory
const getJsFiles = (dir) => {
  return fs.readdirSync(dir).filter((file) => file.endsWith(".js"));
};

// Function to create the build directory if it doesn't exist
const createBuildDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log(`Created directory: ${dir}`);
  }
};

// Function to minify a file using the uglifyjs command
const minifyFile = (inputFile, outputFile) => {
  const command = `uglifyjs ${inputFile} -c -m -o ${outputFile}`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error minifying ${inputFile}:`, stderr);
      return;
    }
    console.log(`Minified ${inputFile} to ${outputFile}`);
  });
};

// Main function to process all .js files
const main = () => {
  const currentDir = __dirname;
  const buildDir = path.join(currentDir, "build");
  createBuildDir(buildDir);

  const jsFiles = getJsFiles(currentDir);

  if (jsFiles.length === 0) {
    console.log("No .js files found in the current directory.");
    return;
  }

  jsFiles.forEach((file) => {
    const inputFile = path.join(currentDir, file);
    const outputFile = path.join(buildDir, file);
    minifyFile(inputFile, outputFile);
  });
};

main();
