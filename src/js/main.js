function initSlider(){
	$(".items.owl-carousel").each(function(){
		var $this = $(this);
		$this.owlCarousel({
	    loop:false,
	    items: 5,
	    navRewind:false,
	    margin: 15,
	    nav: true,
	    dots:false,
	    navText: [
      		'<svg class="icon">\
						    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="images/symbol/sprite.svg#sliderLA"></use>\
						</svg>',
					'<svg class="icon">\
						    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="images/symbol/sprite.svg#sliderRA"></use>\
						</svg>'
	    ],
	    autoplay: false,
	    autoplayHoverPause: false
	  });
	});
}

function defaultPopup(){
    var $items = $(".popupLink");
    var $rightPop = $("#rightPopup");
    var $rightPopCon = $("#rightPopup .content");
    var $rightPopClose = $("#rightPopup .closeBut");
  	$("#rightPopup .content").scrollbar({
  		disableBodyScroll : true,
  	});

  	$rightPopClose.on("click", function(){
  		$(".popupLink.rightPopup").add($rightPop).removeClass("active");
  		TweenLite.to( $rightPop, 0.3, { x:"100%", onComplete:function(){
  				$rightPopCon.html("");
  			} 
  		});
  	});
    $items.on("click", function(){
        var $this = $(this),
            $thisDetail = $this.find(".popup"),
            rightPopup = $this.hasClass("rightPopup") ? true : false;

        if( rightPopup ){
        	if( $this.hasClass("active") ){ return false; }

        	if( $rightPop.hasClass("active") ){
        		$(".popupLink.rightPopup").removeClass("active");
        		$this.add($rightPop).addClass("active");
        		$rightPopCon.html("");
	      		$rightPopCon.append($thisDetail.html());
        	}else{
        		$(".popupLink.rightPopup").removeClass("active");
        		$this.add($rightPop).addClass("active");
						$rightPopCon.html("");
	      		$rightPopCon.append($thisDetail.html());
	      		TweenLite.to( $rightPop, 0.3, { x:"0%" });
        	}
        }else{
	        $this.addClass("active");
	        $.magnificPopup.open({
	            items: {
	                src: "<div class='defaultPopupContent mfp-with-anim'>"+$thisDetail[0].outerHTML+"</div>",
	                type: 'inline'
	            },
	            removalDelay: 500, //delay removal by X to allow out-animation
	            closeBtnInside: true,
	            mainClass: 'mfp-with-zoom',
	            callbacks: {
	                beforeOpen: function() {
	                    this.st.mainClass = "mfp-zoom-in defaultPopup salesPopup";
	                },
	                beforeClose: function() {
	                    $this.removeClass("active");
	                },
	            },
	            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	        });
        }


    });
}

var landMenuScene;
function landMenu(){
	var hwaderH = parseInt($("header").outerHeight());
	var landMenuH = parseInt($("#landMenu").outerHeight());
  var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
          triggerHook: 'onLeave',
      }
  });
  var $navBlock = $("#landMenu");
  landMenuScene = new ScrollMagic.Scene({triggerElement: $navBlock, duration: $("body").outerHeight() - $(".landMenuWrapper").offset().top -100, offset: -hwaderH })
  .setPin($navBlock, {pushFollowers: false})
  //.addIndicators({name: "1"}) // add indicators (requires plugin)
  .addTo(controller);

  $("*[data-ar]").each(function(i){
      var $thisAr = $(this),
          thisArAttr = $thisAr.attr("data-ar"),
          $thisLink = $("*[data-link='"+thisArAttr+"']"),
          curDur = null,
          offsetT;


          if( $("*[data-ar]:eq("+(i+1)+")").length > 0 && i != 0 ){
              curDur = $("*[data-ar]:eq("+(i+1)+")").offset().top - $thisAr.offset().top;
          }else if ( $("*[data-ar]:eq("+(i+1)+")").length > 0 && i == 0 ){
          		curDur = $("*[data-ar]:eq("+(i+1)+")").offset().top - $thisAr.offset().top-80;
          }

          if( i==0 ){
          	offsetT = -(hwaderH+landMenuH);
          }else{
          	offsetT = -(hwaderH+landMenuH)-80;
          }
          
          
          new ScrollMagic.Scene({triggerElement: $thisAr, duration: curDur, offset: offsetT })
          .setClassToggle( $thisLink , "active") // add class toggle
          //.addIndicators() // add indicators (requires plugin)

          .addTo(controller);
  });


  $("*[data-link]").on("click", function(e){
      e.preventDefault();
      var $link = $(this),
          linkAttr = $link.attr("data-link"),
          $ar = $("*[data-ar='"+linkAttr+"']");
          
      if ( $ar.length > 0 ){
          var arSC = $ar.offset().top;
          TweenLite.to(window, 0.5, { ease: Sine.easeInOut, scrollTo: arSC-(hwaderH+landMenuH)});
      }
  });
  $(".footerLinkAnchor").on("click", function(){
  	TweenLite.to(window, 0.5, { ease: Sine.easeInOut, scrollTo: $("body").outerHeight()});
  });
}


function tabs(){
	$(".tabsBlock").each(function(){
		var $content = $(".tabsContent");
		TweenMax.set( $content, {  height: $content.find(".tab.selected").outerHeight() } );
		TweenMax.set( $(".tabsBlock .tab"), { position: "absolute", left: 0, top: 0, display: "block" } );
		setTimeout(function(){
			TweenMax.set($content,{clearProps:"height"});
			TweenMax.set($(".tabsBlock .tab"),{clearProps:"left,position,top"});
			TweenMax.set($(".tabsBlock .tab.selected"), { display: "block", autoAlpha:1 });
			TweenMax.set($(".tabsBlock .tab:not(.selected)"), { display: "none", autoAlpha:0 });
		},100);
	});

	$(".tabLinks .link").each(function(){
			var tl;
			$(this).on("click", function(){
				if( $(this).hasClass("selected") ){return false;}
				var $thisLink = $(this),
						$prevCurLink = $(".tabLinks .link.selected"),
						$prevCurTab = $(".tabsBlock .tab.selected"),
						index = $thisLink.index(),
						$block = $thisLink.closest(".tabsBlock"),
						$tabsContent = $block.find(".tabsContent"),
						$links = $block.find(".tabLinks .link"),
						$tabs = $block.find(".tab"),
						$thisTab = $tabs.eq(index),
						$otherTabs = $tabs.siblings(".tab"),
						$otherlinks = $thisLink.siblings(".link");


				if( typeof tl != 'undefined' ){tl.stop().kill();}

				tl = new TimelineLite({});

				tl.set( $tabsContent, {  height: $tabsContent.outerHeight() } )
					.set( $prevCurTab.add($thisTab), { position: "absolute", left: 0, top: 0, display: "block" } )
					.to( $tabsContent, 0.2, {  height: $thisTab.outerHeight() }, "f1" )
					.to( $prevCurTab, 0.3, {  autoAlpha:0, display: "none" }, "f1" )
					.to( $thisTab, 0.3, {  autoAlpha:1 }, "f1" )
					.set($tabsContent,{clearProps:"height"})
					.set($prevCurTab.add($thisTab),{clearProps:"left,position,top"});

				$prevCurTab.add($prevCurLink).removeClass("selected");
				$thisTab.add($thisLink).addClass("selected");
			});
	});

}

$(document).ready(function(){
	svg4everybody({});
	//tabs();
	initSlider();
	defaultPopup();
	landMenu();
	$(window).on("load", function(){
		landMenuScene.duration($("body").outerHeight() - $(".landMenuWrapper").offset().top -100);
	});
});