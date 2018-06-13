$(document).ready(function() {
	console.log("Document ready!");

	//go top on load
	$('html, body').animate({scrollTop: '0px'}, 0);

	// Preloader func
	setTimeout(function() {
        $('#preloader').fadeOut();
    }, 1000);

    // go top func
    $("#go_top").on("click", function(e) {
    	$('html, body').animate({ scrollTop: 0 }, 500);
    });


	var myViewportWidth = $(window).width();
	console.log(myViewportWidth);
	var myViewportHeight = $(window).height();
	console.log(myViewportHeight);

	$('#header').css({'height': myViewportHeight});

    //MASK for telephones
    $('input[name="телефон"]').mask('+38(999)999-99-99');

	// add Google map
    $('<figure><object data="ajax/map.html"></object></figure>').appendTo('#map');
    console.log('map.append');

    //SHOW-HIDE GO Top BTN
    $(window).scroll(function() {
        var top = $(window).scrollTop();
        // console.log(top);

        if(top>769){
        	$('#go_top').slideDown(500);
        }
        if(top<769){
        	$('#go_top').slideUp(500);
        }
    });


    // OPEN/CLOSE IMAGE FROM GALLERY
    $('#close').on("click", function(e) {
    	$('.popup_image').fadeOut(300);
    	 $("body").removeClass("modal-open");
    });


    $('.hover_layer').on("click", function(e) {
    	$('.popup_image').fadeIn(300);
        $('.left_arr_slider').css('display', 'none');
        $('.right_arr_slider').css('display', 'inline-block');

        var $this = $(this);
        var myFolder = $this.parent('.item_photo').children('.item_photo_img').attr("data-folder");
        var totalFolder = $this.parent('.item_photo').children('.item_photo_img').attr("data-total");

        var currentImage = 1;

        $('.popup_image').children('.image_wrapper').html('<img class="openImageInSlider" data-total="' + totalFolder + '" data-folder="' + myFolder + '" data-image="' + currentImage + '" src="img/gallery/' + myFolder + '/' + currentImage + '.jpg" alt="">');

        // console.log(myFolder);
        // console.log(totalFolder);

    	setTimeout(function() {
    			$("body").addClass("modal-open");
   			}, 150);
    });


    $('.left_arr_slider').on("click", function(e) {
        $('.left_arr_slider').css('display', 'inline-block');
        $('.right_arr_slider').css('display', 'inline-block');                
        
        var $this = $(this);
        var myImage =  $this.parent('.popup_image').children('.image_wrapper').children('.openImageInSlider').attr('data-image');
        var imgFolder =  $this.parent('.popup_image').children('.image_wrapper').children('.openImageInSlider').attr('data-folder');
        var imgTotal =  $this.parent('.popup_image').children('.image_wrapper').children('.openImageInSlider').attr('data-total');
        // var myPath =  $this.parent('.popup_image').children('.image_wrapper').children('.openImageInSlider').attr('src');


        if(1==Number(myImage-1)){
            $('.left_arr_slider').css('display', 'none');                
        }

        // console.log(myImage);
        // console.log(imgFolder);

        $('.popup_image').children('.image_wrapper').html('<img class="openImageInSlider" data-total="' + imgTotal + '" data-folder="' + imgFolder + '" data-image="' + Number(myImage-1) + '" src="img/gallery/' + imgFolder + '/' + Number(myImage-1) +'.jpg" alt="">');

    });


    $('.right_arr_slider').on("click", function(e) {
        $('.right_arr_slider').css('display', 'inline-block');
        $('.left_arr_slider').css('display', 'inline-block');                
        
        var $this = $(this);
        var myImage =  $this.parent('.popup_image').children('.image_wrapper').children('.openImageInSlider').attr('data-image');
        var imgFolder =  $this.parent('.popup_image').children('.image_wrapper').children('.openImageInSlider').attr('data-folder');
        var imgTotal =  $this.parent('.popup_image').children('.image_wrapper').children('.openImageInSlider').attr('data-total');
        // var myPath =  $this.parent('.popup_image').children('.image_wrapper').children('.openImageInSlider').attr('src');


        if(myImage==imgTotal-1){
            $('.right_arr_slider').css('display', 'none');                
        }

        // console.log(myImage);
        // console.log(imgFolder);
        
        myImage++;
        $('.popup_image').children('.image_wrapper').html('<img class="openImageInSlider" data-total="' + imgTotal + '" data-folder="' + imgFolder + '" data-image="' + myImage + '" src="img/gallery/' + imgFolder + '/' + myImage +'.jpg" alt="">');

    });

    //POPUP WRITE US - Page contacts.html
    $('#write_us').on("click", function(e) {
        $('.write_popup').fadeIn(500);
        $("body").addClass("modal-open");
    });

    $('#close_btn_write').on("click", function(e){
        $('.write_popup').fadeOut(500);
        $("body").removeClass("modal-open");
        $('form').trigger("reset");
    });



    $("form").submit(function(e) {
        e.preventDefault();
        $('form_send').find('input[type="text"]').trigger('red');
        $('form_send').find('textarea').trigger('blur');
        if (!$(this).find('input[type="text"]').hasClass('error_input') && !$(this).find('textarea').hasClass('error_input')) {
            var type = $(this).attr('method');
            var url = $(this).attr('action');
            var data = $(this).serialize();
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function() {
                    $('.get_success').fadeIn(500);
                setTimeout(function() {
                    $('.write_popup').fadeOut(500);
                    $("body").removeClass("modal-open");
                    }, 1000);
                }
            });
        }
        $(this).trigger("reset");
        setTimeout(function() {
            $('.get_success').fadeOut(500);
        }, 5000);
    });

    $('.get_success').on("click", function(e) {
        $('.write_popup').fadeOut(500);
        $('.get_success').fadeOut(500);
        $("body").removeClass("modal-open");
    });



});