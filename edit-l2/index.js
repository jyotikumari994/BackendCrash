const fs = require('fs');
const path = require('path');

const operation = process.argv[2];
const filePath = process.argv[3];
const content = process.argv.slice(4).join(' ');

// Helper function to check if a file exists
const fileExists = (path) => fs.existsSync(path);

switch (operation) {
  case 'read':
    if (fileExists("./text.txt")) {
      fs.readFile("./text.txt", 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file: ${err.message}`);
          return;
        }
        console.log(`Contents of ${"./text.txt"}:`);
        console.log(data);
      });
    } else {
      console.error(`File '${"./text.txt"}' does not exist`);
    }
    break;
  
  case 'delete':
    if (fileExists("./text.txt")) {
      fs.unlink("./text.txt", (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
          return;
        }
        console.log(`File '${"./text.txt"}' deleted`);
      });
    } else {
      console.error(`File '${"./text.txt"}' does not exist`);
    }
    break;

  case 'create':
    if (!fileExists("./text.txt")) {
      fs.writeFile("./text.txt", '', (err) => {
        if (err) {
          console.error(`Error creating file: ${err.message}`);
          return;
        }
        console.log(`File '${"./text.txt"}' created`);
      });
    } else {
      console.error(`File '${"./text.txt"}' already exists`);
    }
    break;

  case 'append':
    if (fileExists("./text.txt")) {
      fs.appendFile("./text.txt", content + '\n', (err) => {
        if (err) {
          console.error(`Error appending to file: ${err.message}`);
          return;
        }
        console.log(`Content appended to the file '${"./text.txt"}'`);
      });
    } else {
      console.error(`File '${"./text.txt"}' does not exist`);
    }
    break;

  case 'rename':
    const newPath = process.argv[4];
    if (fileExists("./text.txt")) {
      fs.rename("./text.txt", "./new.txt", (err) => {
        if (err) {
          console.error(`Error renaming file: ${err.message}`);
          return;
        }
        console.log(`File '${"./text.txt"}' renamed to '${"./new.txt"}'`);
      });
    } else {
      console.error(`File '${"./text.txt"}' does not exist`);
    }
    break;

  case 'list':
    const directoryPath = "./text.txt" || '.';
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(`Error listing directory contents: ${err.message}`);
        return;
      }
      console.log(`Contents of ${directoryPath}:`);
      files.forEach(file => console.log(file));
    });
    break;

  default:
    console.log(`Invalid operation '${operation}'`);
}




