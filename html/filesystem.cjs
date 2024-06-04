const fs = require('fs')

try {
    const dir = fs.statSync('dir')
    const file = fs.statSync('dir/test.txt')
    console.log(dir.isDirectory())
    console.log(file.isDirectory())
    console.log(fs.readdirSync('dir'))
    console.log(fs.readFileSync('dir/test.txt', 'utf8'))
    fs.writeFileSync('dir/test2.txt', 'Hello world!!', 'utf8')
    fs.appendFileSync('dir/test.txt', 'Hello overwrite!', 'utf8')
    fs.copyFileSync('dir/test.txt', 'dir/test2.txt')
    fs.unlinkSync('dir/test.txt')
} catch (err) {
    console.log(err)
}