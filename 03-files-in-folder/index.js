const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true })
  .then(files => {
    files.forEach(file => {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        fs.stat(filePath)
          .then(stat => {
            const fileSize = stat.size;
            const fileExt = path.extname(filePath);
            const fileName = path.basename(filePath, fileExt);
            console.log(`${fileName}-${fileExt.slice(1)}-${fileSize/1000}kB`);
          })
          .catch(err => console.log(`Error getting file size: ${err}`));
      }
    });
  })
  .catch(err => console.log(`Error reading directory: ${err}`));