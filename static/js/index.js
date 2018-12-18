
var inp= document.getElementById('inp'),
    img= document.getElementById('img'),
    btn= document.getElementById('btn'),
    iconImg= btn.childNodes[1],
    boxImg= document.querySelector('.boxImg'),
    title= document.getElementById('title'),
    detail= document.getElementById('detail');
btn.onclick=function(){
    inpUrl= inp.value;
    var http= new XMLHttpRequest();
    http.onreadystatechange= function(){
    if(http.status == 200 && http.readyState == 4){
        // var msg= JSON.parse(http.responseText);
        var msg= http.responseText;
        // console.log(JSON.parse(msg));
        img.src= JSON.parse(msg).imgUrl;
        title.innerHTML= JSON.parse(msg).title;
        detail.innerHTML= JSON.parse(msg).detail;
        if(img.src){
            img.style.display="block";
        }else{
            alert('解析失败')
        }
    }
}
//发送请求 带着url发送到服务端
http.open('GET', '/data?q=' + inpUrl);
http.send();
}    

// btn.onclick = function (){
//     console.log(img.width);
//     if(img.width > 100){
//         boxImg.style.display="block";
//     }else{
//         alert('解析失败')
//     }
// }
btn.onmouseover= function (){
    iconImg.src= "images/icon_hover.png";
}
btn.onmouseout= function (){
    iconImg.src= "images/icon.png"
}
