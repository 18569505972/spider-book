const fs = require('fs')
const path = require('path')
module.exports = {
    writeAuthor: (obj = {}, callback) => {
        // let filepath = path.resolve(__dirname, `./api/author/${author}.json`)
        let filepath = `./api/author/${obj.authorid}`
        // 检查当前目录中是否存在该文件，以及该文件是否可写。
        fs.access(filepath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
            if (err) {
                // console.error(`${filepath} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`)
                fs.mkdirSync(filepath)
                fs.writeFile(filepath + `/${obj.authorid}.${obj.type}`, JSON.stringify(obj), (err) => {
                    if (err) throw err;
                    console.log(filepath + `/${obj.authorid}.${obj.type}已导入`);
                    callback()
                });
            } else {
                callback()
            }
        });
    },
    writeSection: (obj = {}, callback) => {
        let filepath = `./api/section/${obj.bookid}`
        // 检查当前目录中是否存在该文件，以及该文件是否可写。
        fs.access(filepath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
            if (err) {
                // let filepath = path.resolve(__dirname, `./api/author/${author}.json`)
                fs.mkdirSync(filepath)
                fs.writeFile(filepath + `/${obj.bookid}.${obj.type}`, JSON.stringify(obj), (err) => {
                    if (err) throw err;
                    console.log(`${filepath}已导入`);
                    callback()
                });
            } else {
                callback()
            }
        });
    }
}