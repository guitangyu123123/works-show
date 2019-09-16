var img = document.getElementById('icon');
//存放图片地址
var array = ['images/1.png', 'images/2.png']
var tag = 0;
img.onclick = function() {
    //如果tag为0，图片地址为array[1]，tag改为1
    if (tag == 0) {
        img.src = array[1];
        tag = 1;
    } else {
        //如果tag为1，图片地址改为array[0]，tag改为0
        img.src = array[0];
        tag = 0;
    }
}
var btn = document.getElementById('btn');
//记录聊天数，因为有num++，所有初始值设置为-1；第一次++就为第一条记录索引
var num = -1;
btn.onclick = function() {
    //获取text文本框的值
    var text = document.getElementById('text').value;
    //如果值为空，弹出框提示
    if (text == '') {
        alert('聊天内容不能为空');
    } else {
        //如果有值，那么获取ul的第一个元素，并往里面拼接内容
        var content = document.getElementsByTagName('ul')[0];
        content.innerHTML += "<li><img src='" + array[tag] + "'/><span>" + text + "</span></li>"
    }
    //每次发送内容记录数加1
    num++;
    //获取聊天区域的图片数量和span数量
    var imgs = content.getElementsByTagName('img');
    var span = content.getElementsByTagName('span');
    //如果tag=0；那么头像为array[1]的聊天内容设置imgLeft spanLeft类样式
    if (tag == 0) {
        imgs[num].className = 'imgLeft'
        span[num].className = 'spanLeft'
    } else {
        //如果tag=1，那么头像为array[0]的聊天内容设置imgRight spanRight类样式
        imgs[num].className = 'imgRight';
        span[num].className = 'spanRight';
    }
    //每次发送完清空文本框
    document.getElementById('text').value = '';
}