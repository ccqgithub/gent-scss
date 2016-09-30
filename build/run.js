var sass = require('node-sass');
var path = require('path');
var fs = require('fs');

var projectPath = path.join(__dirname, '../');
var sourcePath = path.join(projectPath, './src');
var distPath = path.join(projectPath, './dist');

// 创建目录
function mkdirsSync(dirname, mode) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname), mode)) {
      fs.mkdirSync(dirname, mode);
      return true;
    }
  }
}

function searchFiles(dir, base) {
  var fileList = [];

  function walk(p) {
    var dirList = fs.readdirSync(p);
    dirList.forEach(function(item) {
      if (fs.statSync(p + '/' + item).isDirectory()) {
        walk(p + '/' + item);
      } else {
        fileList.push(path.relative(base, p + '/' + item));
      }
    });
  }

  walk(dir);

  return fileList;
}

var sourceFiles = searchFiles(sourcePath, sourcePath);
var totalCount = sourceFiles.length;
var successCount = 0;
var errorCount = 0;

sourceFiles.forEach(function(item) {
  var output = path.join(distPath, item);

  sass
  .render({
    file: path.join(sourcePath, item),
    outFile: output,
  }, function(err, result) {
    if (err) {
      console.log(err);
      errorCount ++;
    } else {
      // wirte
      mkdirsSync(path.dirname(output));
      fs.writeFileSync(output, result.css);
      successCount ++;
    }

    console.log('total: ' + totalCount + ', error: ' + errorCount + ', success: ' + successCount + ', completed: ' + Number((errorCount + successCount) / totalCount).toFixed(2) * 100 + '%');
  });
});
