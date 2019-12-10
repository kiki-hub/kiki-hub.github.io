$(function() {
    //导航的hover事件
    $(".bg_nav .nav ul li").hover(function() {
        $(this).find("a").siblings().finish().slideDown();
        console.log("hover上去了 ");
    }, function() {
        $(this).find("a").siblings().finish().slideUp();
        console.log("hover上去了 ");
    });
})