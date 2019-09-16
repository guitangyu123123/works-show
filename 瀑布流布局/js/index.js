   // 思路分析
   // 1 获取到.itemBox 宽度
   // 2 获取到.item 宽度
   // 3 求出列数
   // 4 求出间距
   // 5 实现瀑布流布局的方法
   // 6 滚动页面时 加载数据
   window.onload = function() {
       var itemBox = document.getElementById('itemBox');
       var items = document.getElementsByClassName('item');
       //获取大盒子和图片的宽度
       var itemBoxW = itemBox.offsetWidth;
       var itemW = items[0].offsetWidth;
       //求出列数
       var column = parseInt(itemBoxW / itemW);
       //求图片之间的间距
       var distence = (itemBoxW - itemW * column) / (column - 1);
       //实现瀑布流方法
       //定义个储存每列高度的容器
       var arr = [];
       waterFull();
       //滚动页面时加载数据
       window.onscroll = function() {
               if (window.pageYOffset + window.innerHeight > getMin(arr).minH) {
                   var json = [{
                       "src": "./images/P_000.jpg"
                   }, {
                       "src": "./images/P_001.jpg"
                   }, {
                       "src": "./images/P_002.jpg"
                   }, {
                       "src": "./images/P_003.jpg"
                   }, {
                       "src": "./images/P_004.jpg"
                   }, {
                       "src": "./images/P_005.jpg"
                   }, {
                       "src": "./images/P_006.jpg"
                   }, {
                       "src": "./images/P_007.jpg"
                   }, {
                       "src": "./images/P_008.jpg"
                   }, {
                       "src": "./images/P_009.jpg"
                   }, {
                       "src": "./images/P_010.jpg"
                   }];
                   for (var i = 0; i < json.length; i++) {
                       var div = document.createElement('div');
                       div.className = 'item';
                       var img = document.createElement('img');;
                       img.src = json[i].src;
                       div.appendChild(img);
                       itemBox.appendChild(div);
                   }
                   waterFull();

               }
           }
           //定义瀑布流方法
       function waterFull() {
           for (var i = 0; i < items.length; i++) {
               if (i < column) {
                   items[i].style.left = (itemW + distence) * i + 'px';
                   arr[i] = items[i].offsetHeight;
               } else {
                   var minH = getMin(arr).minH;
                   var minI = getMin(arr).minI;
                   items[i].style.left = (itemW + distence) * minI + 'px';
                   items[i].style.top = minH + distence + 'px';
                   arr[minI] = minH + distence + items[i].offsetHeight;
               }
           }
       }

       //获取数组的最小值高度及其索引
       function getMin(arr) {
           var obj = {};
           obj.minH = arr[0];
           obj.minI = 0;
           for (var i = 0; i < arr.length; i++) {
               if (obj.minH > arr[i]) {
                   obj.minH = arr[i]
                   obj.minI = i;
               }
           }
           return obj;
       }
   }