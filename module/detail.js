const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
const bookContent = require('./book');
var bookUrl = [];
//url分隔
function splitUrl(src) {
    src = src.replace(/http\:\/\/www\.liuxd\.com\//, '');
    src = src.substring(0, src.lastIndexOf("/"));
    return {
        bookType: src
    }
}
//目录详情
function sectionDetail(detailUrlList) {
    //遍历所以书籍
    if (detailUrlList[0].indexOf('http://www.liuxd.com') < 0) {
        var url = 'http://www.liuxd.com' + detailUrlList[0];
    } else {
        var url = detailUrlList[0];
    }
    var serve = http.get(url, function(res) {
        var sectionList = [];
        var html4 = ''; //网页内容
        //请求数据拼接
        res.on('data', function(chk) {
            html4 += chk;
        })
        //数据接收完毕
        res.on('end', function() {
            var $ = cheerio.load(html4); //解析html
            $(".sml a").each(function() {
                var obj = {
                    'href': $(this).prop('href'),
                    'sectionname': $(this).text()
                }
                sectionList.push(obj);
                bookUrl.push($(this).prop('href'));
            });
            var title = url.substring(0, url.length - 1);
            title = title.substring(title.lastIndexOf("/"));
            var detailList = {
                'imgUrl': $(".sjx img").prop('src'),
                'bookNm': $(".sjx img").prop('alt'),
                'decription': $(".sjx dl dd").eq(2).text(),
                'auth': $(".sjx dl dd").eq(1).text(),
                'title': title,
                'sectionList': sectionList
            }
            detailUrlList.splice(0, 1);
            saveText(title, JSON.stringify(detailList), '.json', detailUrlList);
        })
        res.on('error', function(err) {
            console("errrrr" + err)
        });
    });
    serve.on('error', function(err) {
        console.log(err);
    });
}

//书籍生成本地text
function saveText(title, text, type, detailUrlList) {
    var exists = fs.existsSync('./api/' + title);
    if (!exists) {
        fs.mkdirSync('./api/' + title);
    }
    fs.appendFileSync('./api/' + title + '/' + title + type, text, 'utf-8', function(err) {
        if (err) {
            console.log(err);
        };
        console.log(bookNm + "保存完成")
    });
    if (detailUrlList.length != 0) {
        sectionDetail(detailUrlList);
    } else {
        bookContent(bookUrl, 0);
    }
}
module.exports = sectionDetail;