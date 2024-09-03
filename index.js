const fs = require('fs');

function getFileNames(directoryPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                reject('Unable to scan directory: ' + err);
            } else {
                resolve(files.sort());
            }
        });
    });
}

async function compareDirectories(dir1, dir2) {
    try {
        const files1 = await getFileNames(dir1);
        const files2 = await getFileNames(dir2);

        const diffFiles1 = files1.filter(f => !files2.includes(f));
        const diffFiles2 = files2.filter(f => !files1.includes(f));

        if (diffFiles1.length === 0 && diffFiles2.length === 0) {
            console.log('The directories have the same file names.');
        } else {
            console.log('The directories do not have the same file names.');
            console.log('Files in directory1 not found in directory2:', diffFiles1);
            console.log('Files in directory2 not found in directory1:', diffFiles2);
        }
    } catch (error) {
        console.error(error);
    }
}

// 使用你的目录路径替换下面的字符串
module.exports = compareDirectories