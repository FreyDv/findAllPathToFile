const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html');
    if(req.url!='/favicon.ico')console.log(req.url)
    switch (req.url){
        case'/':
        case'/home': {
            res.write("<h2>Home Page</h2>")
            break;
        }
        case'/about':{
            res.write("<h2>About</h2>")
            break;
        }
        case'/contact':{
            res.write("<h2>Contact</h2>")
            break;
        }
        default:{
            res.write("<h2>Not Find</h2>")
            break;
        }
    }
    res.statusCode=200;
    res.write("&nbsp<a href='/home'>Home Page</a>&nbsp")
    res.write("&nbsp<a href='/about'>About</a>&nbsp")
    res.write("&nbsp<a href='/contact'>Contact</a>&nbsp")
    res.write("&nbsp<a href='/notfinde'>Not Find</a>&nbsp")
    res.end();
});

server.listen(port,12.,()=>{
    console.log(`Sever running at http://${hostname}:${port}/`);
})

