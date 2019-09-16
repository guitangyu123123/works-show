// 顶部搜索框颜色渐变
window.onload = function() {
  searchShow();
  timeBack(3600);
  bannerEffect();
};
// 搜索框显示
function searchShow() {
  var banner = document.querySelector(".jd_banner");
  var bannerHeight = banner.offsetHeight;

  var search = document.querySelector(".jd_search");
  window.onscroll = function() {
    var offTop = document.documentElement.scrollTop;
    var opacity = 0;
    if (offTop < bannerHeight) {
      opacity = offTop / bannerHeight;
      search.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
    }
  };
}

// 秒杀倒计时
function timeBack(timer) {
  var spans = document.querySelector(".jd_skill_time").querySelectorAll("span");
  var timerId = setInterval(function() {
    timer--;
    if (timer < 0) {
      clearInterval(timerId);
      alert("开始抢购");
      span.style.color = "red";
      return;
    }
    var h = Math.floor(timer / 3600);
    var m = Math.floor((timer % 3600) / 60);
    var s = Math.floor(timer % 60);
    spans[0].innerHTML = Math.floor(h / 10);
    spans[1].innerHTML = Math.floor(h % 10);
    spans[3].innerHTML = Math.floor(m / 10);
    spans[4].innerHTML = Math.floor(m % 10);
    spans[6].innerHTML = Math.floor(s / 10);
    spans[7].innerHTML = Math.floor(s % 10);
  }, 1000);
}
//轮播图
function bannerEffect() {
  //a 开始位置添加原始的最后一张图片
  //b 结束位置添加原始的第一张图片

  // 1.1 获取轮播图结构
  var banner = document.querySelector(".jd_banner");
  //1.2 获取图片容器
  var imgBox = banner.querySelector("ul:first-of-type");
  //1.3 获取原始的第一张图片
  var first = imgBox.querySelector("li:first-of-type");
  //1.4 获取原始的最后一张图片
  var last = imgBox.querySelector("li:last-of-type");
  // 1.5末尾插入第一张复制的图片
  imgBox.appendChild(first.cloneNode(true));
  //1.6开始位置前插入最后一张的复制图片
  imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

  //2 设置对应样式
  //   2.1 获取图片盒子所有li元素
  var lis = imgBox.querySelectorAll("li");
  // 2.2获取li的数量
  var count = lis.length;
  //2.3获取banner的宽度
  var bannerWidth = banner.offsetWidth;
  //2.4设置图片盒子宽度
  imgBox.style.width = count * bannerWidth + "px";
  //2.5设置每个图片元素的宽度
  for (var i = 0; i < lis.length; i++) {
    lis[i].style.width = bannerWidth + "px";
  }
  //2.6定义图片索引
  var index = 1;

  // 3.设置盒子默认的偏移
  imgBox.style.left = -bannerWidth + "px";

  // 4.当屏幕发生变化,重新计算宽度
  window.onresize = function() {
    //4.1获取banner的宽度
    bannerWidth = banner.offsetWidth;
    //4.2设置图片盒子宽度
    imgBox.style.width = count * bannerWidth + "px";
    //4.3设置每个图片元素的宽度
    for (var i = 0; i < lis.length; i++) {
      lis[i].style.width = bannerWidth + "px";
    }
    //4.4设置盒子默认的偏移
    imgBox.style.left = -bannerWidth + "px";
  };
  //   4.5实现点标记
  var setIndicator = function(index) {
    var indicators = banner
      .querySelector("ul:last-of-type")
      .querySelectorAll("li");
    //遍历li清除current样式
    for (var i = 0; i < indicators.length; i++) {
      indicators[i].classList.remove("current");
    }
    indicators[index - 1].classList.add("current");
  };
  //   5.实现自动轮播
  setInterval(function() {
    // 5.1变换索引
    index++;
    //5.2添加图片移动过渡效果
    imgBox.style.transition = "left 0.5s ease-in-out";
    // 5.3设置偏移
    imgBox.style.left = -index * bannerWidth + "px";
    //判断是不是最后一张
    setTimeout(function() {
      if (index == count - 1) {
        index = 1;
        imgBox.style.transition = "none";
        imgBox.style.left = -index * bannerWidth + "px";
      }
      setIndicator(index);
    }, 500);
  }, 2000);
}
