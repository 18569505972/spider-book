const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
//全角转半角
function ToCDB(str) {
    var tmp = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
            tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
        } else {
            tmp += String.fromCharCode(str.charCodeAt(i));
        }
    }
    return tmp
}
//书籍内容
function bookContent(contentUrl) {
    //遍历所以书籍
    var url = contentUrl[0];
    http.get(url, function(res) {
        var html3 = ''; //网页内容
        //请求数据拼接
        res.on('data', function(chk) {
            html3 += chk;
        })
        //数据接收完毕
        res.on('end', function() {
            var $ = cheerio.load(html3); //解析html
            var content = $("#Content").html();
            content=content.toString();
            var str = $(".pnext").prop("href");
            var sectionname = ToCDB($("h1").text());
            var bookNm = url.substring(0, url.lastIndexOf('/'));
            bookNm = bookNm.substring(bookNm.lastIndexOf('/'));
            console.log(bookNm);
            if (sectionname) {
                sectionname = sectionname.match(/[a-zA-Z0-9\u4e00-\u9fa5]+/g).join('');
                saveText(sectionname, sectionname + '\n\n' + content, '.txt', bookNm);
            }
            contentUrl.splice(0, 1);
            if (contentUrl.length > 0) {
                bookContent(contentUrl);
            }
            //}
        });
    })
}
//书籍生成本地text
function saveText(title, text, type, bookNm) {
    var exists = fs.existsSync('./book/' + bookNm);
    if (!exists) {
        fs.mkdirSync('./book/' + bookNm);
    }
    console.log(exists)
    console.log(fs.existsSync('./book/' + bookNm + '/' + title + type))
    if (!(fs.existsSync('./book/' + bookNm + '/' + title + type))) {
        fs.appendFileSync('./book/' + bookNm + '/' + title + type, text, 'utf-8', function(err) {
            if (err) {
                console.log(err);
            };
            console.log(bookNm + "保存完成")
        });
    }
}
module.exports = bookContent;