const fs = require("fs");

const uploadsFolders = [
  `${__dirname}/uploads`, 
  `${__dirname}/uploads/resized`, 
  `${__dirname}/uploads/resized/user`,
  `${__dirname}/uploads/resized/book`,
];

if (!fs.existsSync(uploadsFolders[0])) {
  uploadsFolders.forEach(folder => {
    fs.mkdirSync(folder, (err) => {
      if (err) {
        console.log("Error in creating uploads folders");
        return;
      };
  
      console.log("Created uploads folders");
    });
  });
}
