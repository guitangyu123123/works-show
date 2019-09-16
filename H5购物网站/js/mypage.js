$(function () {
    var k = $(window).height();
    var flag = false;
    var flg = false;
    $('#fullpage').fullpage({
        navigation: true,
        // loopTop: true,
        // loopBottom: true,
        continuousVertical: true,
        scrollingSpeed: 1200,
        afterLoad: function (anchorLink, index) {
            if (index == 2 && flag == false) {
                $(".search").show().animate({
                    "right": 370
                }, 1300, "easeOutBack", function () {
                    $(".search-words").animate({
                        "opacity": 1
                    }, 500, function () {
                        $(".search").hide();
                        $(".search-02-1").show().animate({
                            "height": 35,
                            "right": 250,
                            "bottom": 450
                        }, 1000, function () {
                            flag = true;
                        });
                        $(".goods").show().animate({
                            "height": 225
                        }, 1000)
                        $(".words-02").animate({
                            "opacity": 1
                        }, 1000)
                    })
                })
            }
        },
        onLeave: function (index, nextIndex, direction) {
            if (index == 2 && nextIndex == 3 && flag == true) {
                $(".shirt-02").show().animate({
                    "bottom": -(k - 250),
                    "width": 207,
                    "left": 260
                }, 2000, function () {
                    $(".img-01-a").animate({
                        "opacity": 1
                    }, 500, function () {
                        $(".btn-01-a").animate({
                            "opacity": 1
                        }, 500)
                    })
                });
                $(".cover").show();
            };

            if (index == 3 && nextIndex == 4 && flg == false) {
                $(".shirt-02").hide();
                $(".t1f").show().animate({
                    "bottom": -(k - 250),
                    "left": 260
                }, 1500, "easeInOutElastic", function () {
                    $(this).hide();
                    $(".car-img").show();
                    $(".car").animate({
                        "left": "150%"
                    }, 3000, "easeInElastic", function () {
                        $(".note").show();
                        $(".note-img, .word-04-a").animate({
                            "opacity": 1
                        }, 1000)
                    });
                })
            }

            if (index == 4 && nextIndex == 5) {
                $(".hand-05").animate({
                    "bottom": 0
                }, 2000, function () {
                    $(".mouse-05-a").animate({
                        "opacity": 1
                    });
                    $(".t1f-05").show().animate({
                        "bottom": 170
                    }, 1000, function () {
                        $(".order-05").animate({
                            "bottom": 460
                        }, 1000, function () {
                            $(".words-05").addClass("words-05-a");
                        });
                    })
                })
            }
        }
    });

})