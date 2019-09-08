$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    //获取所有Item元素
    var items = $(".carousel-inner .item")
    $(window).on("resize", function () {
        // 获取当前屏幕宽度
        var width = $(window).width();
        // 判断屏幕宽度
        if (width >= 768) { //说明是非移动端
            $(items).each(function (index, value) {
                var item = $(this);
                var imgSrc = item.data("largeImage");
                console.log(imgSrc);
                item.html($('<a href="javascript:;" class="pcImg"></a>').css("backgroundImage", "url('" + imgSrc + "')"));
            });
        } else {
            $(items).each(function (index, value) {
                var item = $(this);
                var imgSrc = item.data("smallImage");
                item.html($('<a href="javascript:;" class="mobileImg"><img src="' + imgSrc + '" alt=""></a>'));
            })
        }
    }).trigger("resize");
    /*添加移动端的滑动操作*/
var startX, endX;
var carousel_inner = $(".carousel-inner")[0];

/*获取当前轮播图*/
var carousel = $(".carousel");

carousel_inner.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].clientX;
});
carousel_inner.addEventListener("touchend", function (e) {
    endX = e.changedTouches[0].clientX;
    if (endX - startX > 0) {
        /*上一张*/
        carousel.carousel('prev');
    } else if (endX - startX < 0) {
        /*下一张*/
        carousel.carousel('next');
    }
});
//计算产品块导航栏的原始宽度
var ul = $(".wjs_product .nav-tabs");
var lis=ul.find("li");
var totalWidth=0;
lis.each(function(index,value){
    totalWidth +=$(value).innerWidth();
});
 ul.width(totalWidth);

 //使用scroll插件实现滑动操作
  var myScroll = new IScroll('.tabs_parent',{
      //设置水平滑动，禁用垂直滑动
      scrollX:true,scrollY:false
  });
})
