const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../../', 'src'); // đường dẫn đến thư mục src

function readFilesRecursively(directory, fileList = []) {
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      readFilesRecursively(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

describe('No log in project', () => {
  const allFiles = readFilesRecursively(directoryPath);
  allFiles.forEach(file => {
    test(`checking ${file} for log`, () => {
      const fileContent = fs.readFileSync(file, 'utf-8');
      expect(fileContent).not.toMatch(/console\.log/);
    });
  });
});
