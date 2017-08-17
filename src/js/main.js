(function () {
	function masinrycols(){
		var $grid = $('.colsBlock .lc');
		$grid.each(function(){
			var $thisGrid = $(this);
			$thisGrid.on( 'layoutComplete', function(){
				$thisGrid.addClass("initComplete");
			});
			$thisGrid.masonry({
			  itemSelector: '.news-item-lc',
			  columnWidth: 440,
			  gutter: 20,
			});
		});

	}
	function imageCover(){
		$('.item img.imgCover').each(function() {
		    var $im = $(this),//image
		    		$item = $(this).closest('.item'),
		    		th = $item.outerHeight(),//box height
		        tw = $item.outerWidth(),//box width
		        ih = $im.height(),//inital image height
		        iw = $im.width();//initial image width

		    if ((ih/iw)>(th/tw)) {//if portrait
		        $im.addClass('cover_ww').removeClass('cover_wh');//set width 100%
		    } else {//if landscape
		        $im.addClass('cover_wh').removeClass('cover_ww');//set height 100%
		    }
		});
	}
	function createSlider($items){
		$(".owl-carousel").each(function(){
			var $this = $(this);
			$this.find(".item:gt(4)").remove();
			$this.owlCarousel({
		    loop: true,
		    items: 1,
		    navRewind:false,
		    margin: 0,
		    nav: false,
		    dots:true,
		    navText: [
	      		'<svg class="icon">\
							    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="images/symbol/sprite.svg#sliderLA"></use>\
							</svg>',
						'<svg class="icon">\
							    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="images/symbol/sprite.svg#sliderRA"></use>\
							</svg>'
		    ],
		    autoplay: false,
		    autoplayHoverPause: true
		  });
		});
	}


	var globalForNewsDetail = false;
	function scrollAjaxPush(){
    function showNextNews(){
        if( globalForNewsDetail ){return false}
      	var $block = $(".colsBlock2"),
      			$loader = $(".colsBlock2 .loader"),
      			$lc = $(".colsBlock2 .lc"),
      			$rc = $(".colsBlock2 .rc");

        $loader.addClass("load");
        console.log("qwe");

        globalForNewsDetail = true;
        // xhr = $.ajax({
        //     type: "GET",
        //     url: window.location.href,
        //     data: dataObj,
        //     timeout: 10000,
        //     success: function(data) {
        //   		$loader.removeClass("load");
        //     }
        // });
    }

    $(window).on("scroll", function(){
        if($(window).scrollTop() + $(window).height()+75 > $(document).height() ) {
            showNextNews();
        }
    });
	}

	$(document).ready(function(){
		scrollAjaxPush();
		createSlider( $(".owl-carousel") );
		masinrycols();
	});

	$(window).on("load", function(){
		imageCover();
	});


}());