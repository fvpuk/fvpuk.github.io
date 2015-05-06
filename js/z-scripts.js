$(document).ready(function () {
    // Carousel Time Interval
    $('.carousel').carousel({
        interval: 5000,
        cycle: true
    });

    // scroll down notice

    // pos from top at which notice vanishes
    var hidepos = 120;

    $('.notice').addClass('active');

    $(window).scroll(function () {
        if ($(this).scrollTop() > hidepos) {
            $('.notice').removeClass('active');
        } else{
            $('.notice').addClass('active');
        }
    });
});
