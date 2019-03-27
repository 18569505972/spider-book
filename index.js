const Crawler = require('crawler')
const config = require('./config/config')
global.sectionUris = []
global.bookUris = []
let { sectionCallback, bookCallback } = require('./module/callback')
const a = new Crawler({
    // 最大并发数
    maxconnctions: config.maxconnctions,
    // 请求间隔
    rateLimit: config.rateLimit,
    // 开启cheerio
    jQuery: config.cheerio,
    // 重连次数
    retries: config.retries,
    // 每次重连时间间隔 
    retryTimeout: config.retryTimeout,
    // 开启UA数组轮换UA
    rotateUA: config.rotateUA,
    // UA数组
    userAgent: config.ua,
    callback: bookCallback
})
a.queue([{
    uri: 'http://www.xiexingcun.com/gulong' 
}])
const b = new Crawler({
    // 最大并发数
    maxconnctions: config.maxconnctions,
    // 请求间隔
    rateLimit: config.rateLimit,
    // 开启cheerio
    jQuery: config.cheerio,
    // 重连次数
    retries: config.retries,
    // 每次重连时间间隔
    retryTimeout: config.retryTimeout,
    // 开启UA数组轮换UA
    rotateUA: config.rotateUA,
    // UA数组
    userAgent: config.ua,
    callback: sectionCallback
})
// 第一个爬虫结束之后开启第二个爬虫
a.on('drain', () => {
  b.queue(bookUris)
});
const c = new Crawler({
    // 最大并发数
    maxconnctions: config.maxconnctions,
    // 请求间隔
    rateLimit: config.rateLimit,
    // 开启cheerio
    jQuery: config.cheerio,
    // 重连次数
    retries: config.retries,
    // 每次重连时间间隔
    retryTimeout: config.retryTimeout,
    // 开启UA数组轮换UA
    rotateUA: config.rotateUA,
    // UA数组
    userAgent: config.ua
})
// 第二个爬虫结束之后开启第三个爬虫
b.on('drain', () => {
  //c.queue(sectionUris)
});  