let http= require('http');
let cheerio= require('cheerio');
let requestHttp= require('request');
let fs= require('fs');
let url= require('url');
let express= require('express');
let app= express();
let path= require('path');

app.use(express.static('static'));
app.use('/', express.static('static'));
// app.use('/', express.static(path.join(__dirname, 'static')));
app.get('/', function(req, res){
    fs.readFile('/index.html', function(err, data){
        if(!err){
          res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
          rs.end(data)
        }else{
            throw err;
        }
      });
});
app.get('/data+', function(request, response){
    //拿到这个url后 解析这个url 然后 返回回去
    // response.end(request.path);
    let myURl= url.parse(request.url, true);//解析url
    let parseUrl= myURl.path.slice(8);
    console.log(parseUrl);
    requestHttp(parseUrl, (error, res, html)=>{
        if(!error && response.statusCode == 200){
            let $= cheerio.load(html);
            let img = $('#spec-n1>img');
            let imgUrl= $(img).attr('data-origin') || $(img).attr('src');
            response.end('http:'+ imgUrl);
        }
    });
});

server= app.listen(8080);
console.log('server runing http://127.0.0.1:8080')


/*
var server= http.createServer(function(request, response){
    var pathUrl = request.url;
    if(pathUrl === '/'){
        fs.readFile('./static/index.html', function(err, data){
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



*/