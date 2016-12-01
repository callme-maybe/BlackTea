$(function() {
    var w_width = $(window).width();
    var w_banner = (1920 - w_width) / 2;
    //	$('.banner_s img').css('margin-left','-'+w_banner+'px');
    $('.header .head_bg').css('left', '-' + w_banner + 'px');
    $('.banner_s .jt').css('left', '-' + w_banner + 'px');
    $('.pro_lei .lei_bg').css('left', '-' + w_banner + 'px');
    $('.foot_m a:last-child').css('background', 'none');
    $('.ctt .ctt_bg').css('left', '-' + w_banner + 'px');
    $('.i_pro .bg').css('left', '-' + w_banner + 'px');
    $('.dp .bg').css('left', '-' + w_banner + 'px');
    $('.md .bg').css('left', '-' + w_banner + 'px');
    $('.about .box').css('margin-left', '-' + w_banner + 'px');

    $('.pro_l .p_list li:nth-child(3n)').css('float', 'right');
    $('.pro_l .p_list li:nth-child(3n)').css('margin-right', 0 + 'px');
    $('.pro_l .p_list li .p_m').mousemove(function() {
        $(this).children('.wen').css('top', 0 + 'px')
    });
    $('.pro_l .p_list li .p_m').mouseleave(function() {
        $(this).children('.wen').css('top', '-120%')
    });

    $('.more').click(function() {
        $('.tck_bg').css('top', 0 + 'px');
    });
    $('.close').click(function() {
        $(this).parent('.tck').parent('.tck_bg').css('top', '100%');
    });
    $('.nav_m .n_icon').click(function() {
        $(this).siblings('ul').slideToggle();
    });

	
	
	 //锚点平滑滚动
    $('.scroll').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
        return false;
    });
	
	//手机端按钮点击动画
	$('.btn-nav-bx').on('mouseover mouseout', function () {
		$(this).toggleClass('animated');
	});
	
	
	//滚动监听动画
	$(function(){
	var title1 = $(".gy").offset().top;
    var title2 = $(".i_pro").offset().top;
    var title3 = $(".dp").offset().top;
    var title4 = $(".hz").offset().top;
    var title5 = $(".md").offset().top;
    $(window).scroll(function(){
        var this_scrollTop = $(this).scrollTop();
        if(this_scrollTop>title1 ){
            $(".i_pro").css({'opacity':'1','margin-top':'20px'});
        }
        if(this_scrollTop>title2 ){
            $(".dp").css({'opacity':'1','margin-top':'0px'});
        }
        if(this_scrollTop>title3 ){
            $(".hz").css({'opacity':'1','margin':'0 auto'});
        }
        if(this_scrollTop>title3 ){
            $(".md").css({'opacity':'1'});
        }
    });
});

})
