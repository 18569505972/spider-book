const { writeSection, writeAuthor } = require('./mkdirPath')
module.exports = {
    // 获取章节目录回调
    sectionCallback: (err, res, done) => {
        if (err) {
            console.log('err:======' + err)
        } else {
            let $ = res.$
            let sectionList = []
            // 获取章节内容url集合
            let bookId = res.request.uri.pathname.replace(/\//g,'')
            $('.content a').each(function(index, value) {
                if ($(this).prop('href')) {
                    let currenturl = res.request.uri.href + $(this).prop('href')
                    global.sectionUris.push(currenturl)
                    sectionList.push({ sectionname: $(this).text(), sectionid: index })
                }
            })
            writeSection({ author: 'gulong', sectionList: sectionList, bookid: bookId, type: 'json' }, done)
        }
    },
    // 获取书籍列表回调
    bookCallback: (err, res, done) => {
        if (err) {
            console.log('err:======' + err)
        } else {
            let $ = res.$
            let bookList = []
            // 获取书籍目录url集合
            let origin = res.request.uri.href
            let authorid = res.request.uri.pathname.match(/\/(.+?)\//)[1]
            $('center a').each(function() {
                if ($(this).prop('href')) {
                    let ahref = $(this).prop('href')
                    let currenturl = origin + ahref.substring(0,ahref.indexOf('/'))
                    global.bookUris.push({ uri: currenturl })
                    let id = authorid + ahref.substring(0,ahref.indexOf('/'))
                    let img = origin + $(this).find('img:first-child').prop('src')
                    bookList.push({ bookid: id, bookimg: img })
                }
            })
            writeAuthor({ authorid: authorid, type: 'json', author: "古龙", bookList: bookList }, done)
        }
    },
    // 获取书籍列表回调
    contentCallback: (err, res, done) => {
        if (err) {
            console.log('err:======' + err)      
        } else {
            let $ = res.$
            let bookList = []
            // 获取书籍目录url集合
            let origin = res.request.uri.href
            let authorid = res.request.uri.pathname.match(/\/(.+?)\//)[1]
            $('center a').each(function() {
                if ($(this).prop('href')) {
                    let ahref = $(this).prop('href')
                    let currenturl = origin + ahref.substring(0,ahref.indexOf('/'))
                    global.bookUris.push({ uri: currenturl })
                    let id = authorid + ahref.substring(0,ahref.indexOf('/'))
                    let img = origin + $(this).find('img:first-child').prop('src')
                    bookList.push({ bookid: id, bookimg: img })
                }
            })
            writeAuthor({ authorid: authorid, type: 'json', author: "古龙", bookList: bookList }, done)
        }
    },
}