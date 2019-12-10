$(function() {
    // 外部引入头部html
    $(".wrap_header").load("header.html", function() {
        console.log("外部html引入完毕");
        $.getScript("../js/header.js", function() {
            console.log("外部js引入完毕");
        })
    });

    //外部引入尾部的html
    $(".wrap_footer").load("footer.html", function() {
        console.log("外部html引入完毕");
        $.getScript("../js/footer.js", function() {
            console.log("外部js引入完毕");
        })
    });

})