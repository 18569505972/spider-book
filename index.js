const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
const classUrl = require('./module/class');
//抓取地址
var indexUrl = "XXX";
//抓取首页数据
function sendRequest(url) {
    http.get(url, function(res) {
        var html1 = ''; //网页内容
        //请求数据拼接
        res.on('data', function(chk) {
            html1 += chk;
        })
        //数据接收完毕
        res.on('end', function() {
            var $ = cheerio.load(html1); //解析html
            var type = []; //获取电子书类别
            var typeList=[];
            var recommendList = []; //推荐图书
            var latestList = []; //最近更新
            //类别
            $(".tspl a").each(function() {
                type.push($(this).text().trim());
                typeList.push($(this).prop('href')+'index.html')
            });
            saveText('all', JSON.stringify(type), '.json',typeList);
            //推荐图书
            $(".picList img").each(function() {
                if (!$(this).parents('li').hasClass('clone')) {
                    var href = 'http://www.liuxd.com' + $(this).parent().prop('href');
                    var title = href.substring(0, href.length - 1);
                    title = title.substring(title.lastIndexOf("/"));
                    var itemRec = {
                        'imgUrl': $(this).prop('src'),
                        'bookNm': $(this).prop('alt'),
                        'href': href,
                        'title': title
                    }
                    recommendList.push(itemRec);
                }
            });
            saveText('recommendList', JSON.stringify(recommendList), '.json');
            //最近更新
            $(".sjgx img").each(function() {
                var href = 'http://www.liuxd.com' + $(this).parent().prop('href');
                var title = href.substring(0, href.length - 1);
                title = title.substring(title.lastIndexOf("/"));
                var itemLat = {
                    'imgUrl': $(this).prop('src'),
                    'bookNm': $(this).prop('alt'),
                    'href': href,
                    'title':title
                }
                latestList.push(itemLat);
            });
            saveText('latestList', JSON.stringify(latestList), '.json');
        })
    })
}
//书籍生成本地text
function saveText(title, text, type,typeList) {
    fs.appendFile((type == '.txt' ? './book/' : './api/') + title + type, text, 'utf-8', function(err) {
        if (err) {
            console.log(err);
        };
        totalContent = "";
    });
    if(typeList && typeList.length>0){
    	classUrl(typeList)
    }
}
sendRequest(indexUrl)
