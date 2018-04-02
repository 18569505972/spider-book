const http = require('http');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const sectionDetail = require('./detail');
var bookList = [];
var detailUrlList = new Set([]);
var typeList=[];
//url分隔
function splitUrl(src) {
    src = src.replace(/http\:\/\/www\.liuxd\.com\//, '');
    src = src.substring(0, src.lastIndexOf("/"));
    return {
        bookType: src
    }
}
//分类
function bookStyle(type,newurl) {
    //遍历所以书籍
    if (newurl) {
        var url = newurl;
    } else {
        var url = type[0];
    }
    http.get(url, function(res) {
        var html2 = ''; //网页内容
        //请求数据拼接
        res.on('data', function(chk) {
            html2 += chk;
        })
        //数据接收完毕
        res.on('end', function() {
            var $ = cheerio.load(html2); //解析html
            if ($(".sjgx ul li").length != 0) {
                $(".sjgx ul img").each(function() {
                    var href = 'http://www.liuxd.com' + $(this).parent().prop('href');
                    var title = href.substring(0, href.length - 1);
                    title = title.substring(title.lastIndexOf("/")+1);
                    var o = {
                        'bookNm': $(this).prop('alt'),
                        'href': href,
                        'imgUrl': $(this).prop('src'),
                        'title': title
                    };
                    bookList.push(o);
                    detailUrlList.add($(this).parent().prop('href')); //章节url集合
                })
                var newurl = url.substring(url.lastIndexOf("/") + 1);
                newurl = newurl.substring(0, newurl.lastIndexOf("."));
                if (newurl == 'index') {
                    newurl = 1;
                };
                newurl = parseInt(newurl) + 1;
                newurl = url.substring(0, url.lastIndexOf("/") + 1) + newurl + '.html';
                bookStyle(type,newurl);
            } else {
                obj = splitUrl(url);
                var bookDetail = {
                    bookList: bookList,
                    bookType: obj.bookType,
                };
                saveText(obj.bookType, JSON.stringify(bookDetail), '.json');
                type.splice(0, 1);
                if (type.length > 0) {
                    bookStyle(type,type[0]);
                }
            }
        })
    })
}
//书籍生成本地text
function saveText(title, text, type) {
    fs.appendFileSync((type == '.txt' ? './book/' : './api/') + title + type, text, 'utf-8', function(err) {
        if (err) {
            console.log(err);
        };
    });
    bookList = [];
    detailUrlList = Array.from(detailUrlList);
    sectionDetail(detailUrlList);
    detailUrlList = new Set([]);
}
module.exports = bookStyle;