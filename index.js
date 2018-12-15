let http= require('http');
let cheerio= require('cheerio');
let requestHttp= require('request');
let fs= require('fs');
let url= require('url');

// var ajaxUrl= 'https://item.jd.hk/1975110538.html'

var server= http.createServer(function(request, response){
    var pathUrl = request.url;
    if(pathUrl === '/'){
        fs.readFile('./index.html', function(err, data){
          if(!err){
            response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
            response.end(data)
          }else{
              throw err;
          }
        });
    }else if(pathUrl.indexOf('data') !== -1){
        //拿到这个url后 解析这个url 然后 返回回去
        // response.end(request.path);
        let myURl= url.parse(pathUrl, true);//解析url
        let parseUrl= myURl.path.slice(8);
        // console.log(parseUrl);
        requestHttp(parseUrl, (error, res, html)=>{
            if(!error && response.statusCode == 200){
                let $= cheerio.load(html);
                let img = $('#spec-n1>img');
                let imgUrl= $(img).attr('data-origin') || $(img).attr('src');
                // console.log(imgUrl);
                response.end('http:'+ imgUrl);
            }
        });
        
    }else{
        response.end("<h1>404</h1>");
    }
});
server.listen(8080, '127.0.0.1');
console.log('server runing http://127.0.0.1:8080')


