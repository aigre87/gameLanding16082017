(function () {

	function masinrycols(){
		var $grid = $('.colsBlock .lc .iw');
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


	function buttonCountDown($buttons, munutes, seconds){
		$buttons.find(".time").each(function(){
			var $this = $(this);
			var min =  typeof(munutes) != 'undefined' ?  munutes * 60 * 1000 : parseInt( $this.text().split(":")[0] ) * 60 * 1000;
			var sec =  typeof(seconds) != 'undefined' ?  seconds * 1000 : parseInt( $this.text().split(":")[1] ) * 1000;

			selectedDate = new Date().valueOf() + min + sec;

			$this.countdown(selectedDate.toString(), function(event) {
			  $this.html(event.strftime('%M:%S'));
			}).on('finish.countdown', function(event) {
				var $thisIW = $this.closest(".iw");
				$this.closest(".button").remove();
				$thisIW.masonry();
	    });
		});
	}
	

	function imageCover($img){
		$img.each(function() {
		    var $im = $(this),//image
		    		$item = $(this).closest('.item'),
		    		th = $item.outerHeight(),//box height
		        tw = $item.outerWidth(),//box width
		        ih = $im.height(),//inital image height
		        iw = $im.width();//initial image width

		    if ((ih/iw)>(th/tw)) {
		        $im.addClass('cover_ww').removeClass('cover_wh');//set width 100%
		    } else {
		        $im.addClass('cover_wh').removeClass('cover_ww');//set height 100%
		    }
		});
	}
	function createSlider($owlCaruosels){
		$owlCaruosels.each(function(){
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

	function noteDetail(){
		$("body").on("click", ".news-item-lc:not(.newAjaxItem) .name, .news-item-lc.newAjaxItem.start .name", function(){
			console.log("WW");
			var $thisName = $(this),
					$thisItem = $thisName.closest(".news-item-lc");

					if( $thisItem.find(".videoBlock").length > 0 ){
						var $thisDetailContent = $thisItem.find(".videoBlock");
						$.magnificPopup.open({
						    items: {
						        src: "<div class='defaultPopupContent mfp-with-anim'>"+$thisDetailContent[0].outerHTML+"</div>",
						        type: 'inline'
						    },
						    removalDelay: 500,
						    closeBtnInside: true,
						    mainClass: 'mfp-with-zoom',
						    callbacks: {
						        beforeOpen: function() {
						            this.st.mainClass = "mfp-zoom-in defaultPopup";
						        },
						        beforeClose: function() {
						            
						        },
						    },
						    midClick: true
						});
					}else if( $thisItem.find(".prevImgBlock").length > 0 ){
						var $thisDetailContent = "<div class='prevImgBlock owl-carousel'>";
						$thisItem.find(".prevImgBlock img").each(function(){
							$thisDetailContent += $(this)[0].outerHTML;
							console.log($(this)[0].outerHTML);
						});
						$thisDetailContent += "</div>";

						$.magnificPopup.open({
						    items: {
						        src: "<div class='defaultPopupContent mfp-with-anim'>"+$thisDetailContent+"</div>",
						        type: 'inline'
						    },
						    removalDelay: 500,
						    closeBtnInside: true,
						    mainClass: 'mfp-with-zoom',
						    callbacks: {
						        beforeOpen: function() {
						            this.st.mainClass = "mfp-zoom-in defaultPopup";
						        },
						        open: function(){

												$(".defaultPopupContent .prevImgBlock").each(function(){
													var $this = $(this);
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
						        },
						        beforeClose: function() {
						            
						        },
						    },
						    midClick: true
						});
					}else{
						return false;
					}
		});
	}

	function buttonClick(){
		$("body").on("click", ".button[data-hash]:not(.loading)", function(){
			var $thisBut = $(this),
					thisHash = $thisBut.attr("data-hash");

			$thisBut.addClass("loading");

			$.ajax({
		    type: "POST",
		    data: thisHash,
		    url: "/ajax/guru_coin/send.html",
		    timeout: 10000,
		    success: function(data) {
		    	if( data == true ){
		    		$thisBut.removeClass("loading");
		    		$(".coinCount").text( parseInt( $(".coinCount").text() ) +1 );
		        $.magnificPopup.open({
		            items: {
		                src: "<div class='defaultPopupContent mfp-with-anim'>Успешно!</div>",
		                type: 'inline'
		            },
		            removalDelay: 500,
		            closeBtnInside: true,
		            mainClass: 'mfp-with-zoom',
		            callbacks: {
		                beforeOpen: function() {
		                    this.st.mainClass = "mfp-zoom-in defaultPopup";
		                },
		                beforeClose: function() {
		                    
		                },
		            },
		            midClick: true
		        });
		    	}else{
		    		$thisBut.removeClass("loading");
		        $.magnificPopup.open({
		            items: {
		                src: "<div class='defaultPopupContent mfp-with-anim'>Потрачено!</div>",
		                type: 'inline'
		            },
		            removalDelay: 500,
		            closeBtnInside: true,
		            mainClass: 'mfp-with-zoom',
		            callbacks: {
		                beforeOpen: function() {
		                    this.st.mainClass = "mfp-zoom-in defaultPopup";
		                },
		                beforeClose: function() {
		                    
		                },
		            },
		            midClick: true
		        });
		    	}
		    },
		    error: function(){
		    		$thisBut.removeClass("loading");
		        $.magnificPopup.open({
		            items: {
		                src: "<div class='defaultPopupContent mfp-with-anim'>Потрачено!</div>",
		                type: 'inline'
		            },
		            removalDelay: 500,
		            closeBtnInside: true,
		            mainClass: 'mfp-with-zoom',
		            callbacks: {
		                beforeOpen: function() {
		                    this.st.mainClass = "mfp-zoom-in defaultPopup";
		                },
		                beforeClose: function() {
		                    
		                },
		            },
		            midClick: true
		        });
		    }
			});
		});
	}

	data = {
	    "notes": [{
	        "id": "10",
	        "last_modified": "1502969840",
	        "title": "asd",
	        "text": "<p><br><\/p>",
	        "video": "sd",
	        "created_at": "1502969837",
	        "updated_at": "1502969837",
	        "author": "\u0412\u0430\u0441\u0438\u043b\u0438\u0439 \u0420\u044f\u0431\u043e\u0432",
	        "coin_hash": "f257cfc18242baab4d65888bf5bdf9b3",
	        "images": []
	    }, {
	        "id": "9",
	        "last_modified": "1502969567",
	        "title": "asd",
	        "text": "<p>asdasdsdsdsdsd<\/p>",
	        "video": "sdasd",
	        "created_at": "1502969557",
	        "updated_at": "1502969557",
	        "author": "\u041c\u0438\u0445\u0430\u0438\u043b \u041a\u043e\u043b\u044c\u0431\u0443\u0441",
	        "coin_hash": "27f7c0f759957368cd524433812f478f",
	        "images": []
	    }, {
	        "id": "8",
	        "last_modified": "1502959689",
	        "title": "\u0444\u044b\u0444\u0444\u044b\u043c\u0444\u043c\u043c\u0432\u0432\u044b\u043c\u0432\u044b\u043c",
	        "text": "<p>\u044b\u0432\u043c\u044b\u0432\u043c\u044b\u0432\u043c\u044b\u0432\u043c\u044b\u0432\u043c\u044b\u0432\u043c\u044b\u0432\u043c<\/p>",
	        "video": null,
	        "created_at": "1502959675",
	        "updated_at": "1502959675",
	        "author": "\u041c\u0438\u0445\u0430\u0438\u043b \u041a\u043e\u043b\u044c\u0431\u0443\u0441",
	        "coin_hash": "3cee3e69e8eaaef0f12492bf88e7845d",
	        "images": {
	            "170852": {
	                "id": "170852",
	                "file": "\/clf\/a7\/ac\/c0\/8f\/059955846ddaf0.gamescom2017.img7_3101.jpg",
	                "filename": "059955846ddaf0.gamescom2017.img7_3101.jpg",
	                "subpath": "a7\/ac\/c0\/8f",
	                "mimetype": "image\/jpg",
	                "title": "",
	                "image": "1",
	                "type": "image",
	                "thumb": "\/clf\/a7\/ac\/c0\/8f\/059955846ddaf0.gamescom2017.img7_3101.jpg.thumb.jpg",
	                "thumbname": "059955846ddaf0.gamescom2017.img7_3101.jpg.thumb.jpg"
	            },
	            "170853": {
	                "id": "170853",
	                "file": "\/clf\/2b\/36\/05\/7f\/05995584700b42.gamescom2017.img7_29707.jpg",
	                "filename": "05995584700b42.gamescom2017.img7_29707.jpg",
	                "subpath": "2b\/36\/05\/7f",
	                "mimetype": "image\/jpg",
	                "title": "",
	                "image": "1",
	                "type": "image",
	                "thumb": "\/clf\/2b\/36\/05\/7f\/05995584700b42.gamescom2017.img7_29707.jpg.thumb.jpg",
	                "thumbname": "05995584700b42.gamescom2017.img7_29707.jpg.thumb.jpg"
	            },
	            "170854": {
	                "id": "170854",
	                "file": "\/clf\/ea\/fe\/5b\/13\/0599558470bcca.gamescom2017.it_is_a_biiiig_picture.jpg",
	                "filename": "0599558470bcca.gamescom2017.it_is_a_biiiig_picture.jpg",
	                "subpath": "ea\/fe\/5b\/13",
	                "mimetype": "image\/jpg",
	                "title": "",
	                "image": "1",
	                "type": "image",
	                "thumb": "\/clf\/ea\/fe\/5b\/13\/0599558470bcca.gamescom2017.it_is_a_biiiig_picture.jpg.thumb.jpg",
	                "thumbname": "0599558470bcca.gamescom2017.it_is_a_biiiig_picture.jpg.thumb.jpg"
	            }
	        }
	    }, {
	        "id": "7",
	        "last_modified": "1502959082",
	        "title": "sdbdfnfgmghmgm",
	        "text": "<p>fgnfgnfgngfngfn<\/p>",
	        "video": null,
	        "created_at": "1502959070",
	        "updated_at": "1502959070",
	        "author": "\u0410\u043b\u0435\u043a\u0441\u0435\u0439 \u0413\u0440\u0435\u0448\u0438\u043b\u043e\u0432",
	        "coin_hash": "e99abf5651fa4fedb60e5ede9f5bfe94",
	        "images": {
	            "170851": {
	                "id": "170851",
	                "file": "\/clf\/ea\/fe\/5b\/13\/0599555e615268.gamescom2017.it_is_a_biiiig_picture.jpg",
	                "filename": "0599555e615268.gamescom2017.it_is_a_biiiig_picture.jpg",
	                "subpath": "ea\/fe\/5b\/13",
	                "mimetype": "image\/jpg",
	                "title": "",
	                "image": "1",
	                "type": "image",
	                "thumb": "\/clf\/ea\/fe\/5b\/13\/0599555e615268.gamescom2017.it_is_a_biiiig_picture.jpg.thumb.jpg",
	                "thumbname": "0599555e615268.gamescom2017.it_is_a_biiiig_picture.jpg.thumb.jpg"
	            }
	        }
	    }],
	    "news": [{
	        "id": "31249",
	        "title": "saavdsvds",
	        "anons_image": "\/f\/news\/anons_image-31249.jpg",
	        "date_public": "2017-08-16 16:10:00",
	        "author": "sdvdsv vsddsvvsd"
	    }, {
	        "id": "31248",
	        "title": "123",
	        "anons_image": "\/f\/news\/anons_image-31248.jpg",
	        "date_public": "2017-08-16 16:04:00",
	        "author": "sdvdsv vsddsvvsd"
	    }]
	}

	var globalForajaxNews = false;
	var ajaxCurNewsPage = 1;
	function scrollAjaxPush(){
    function appendNextNews(){
        if( globalForajaxNews ){return false}
      	var $block = $(".colsBlock2 .rc .iw"),
      			$loader = $(".colsBlock2 .rc .loader");

        $loader.addClass("load");

        globalForajaxNews = true;
        // xhr = $.ajax({
        //     type: "GET",
        //     url: "http://gameguru.kurbanov.dev/gamescom2017/"+ajaxCurNewsPage+"/ajax.html",
        //     timeout: 10000,
        //     success: function(data) {
        //   		$loader.removeClass("load");
        //   		ajaxCurNewsPage++;
        //   		globalForajaxNews = false;
        //   		console.log(data);
        //     }
        // });


				//console.log(data);

				var newsL = data.news.length;
				if (newsL == 0 ) {
					$loader.removeClass("load");
					return false;
				}
				//инит новых новостей
				for(var i=0; i < newsL; i++){
					var newsItemTitle = data.news[i].title,
							newsItemAnonsImg = data.news[i].anons_image,
							newsItemDateArray = data.news[i].date_public.split(" ")[0].split("-"),
							newsItemDate = newsItemDateArray[2]+"."+newsItemDateArray[1]+"."+newsItemDateArray[0],
							newsItemTimeArray = data.news[i].date_public.split(" ")[1].split(":"),
							newsItemTime = newsItemTimeArray[0]+"."+newsItemTimeArray[1],
							logoBlock;

					if( typeof newsItemAnonsImg == 'undefined' || newsItemAnonsImg == null ){
						logoBlock = '<div class="logo"><img src="images/gamescomNewsLogo.png"/></div>';
					}else{
						logoBlock = '<div class="logo"><img src='+newsItemAnonsImg+'/></div>';
					}

					var nextNewsNote = $('<div class="news-item-rc newAjaxItem">\
															<div class="date">'+newsItemTime+' '+newsItemDate+'</div>\
															'+logoBlock+'\
															<div class="name">'+newsItemTitle+'</div>\
														</div>');

					$block.append(nextNewsNote);
					animateNewAjaxItems($block);
				}
				globalForajaxNews = true;
    }


		var globalForajaxNotes = false;
		var ajaxCurNotesPage = 1;
    function appendNextNotes(){
        if( globalForajaxNotes ){return false}
      	var $block = $(".colsBlock2 .lc .iw"),
      			$loader = $(".colsBlock2 .loader");

        $loader.addClass("load");

        // globalForajaxNotes = true;
        // xhr = $.ajax({
        //     type: "GET",
        //     url: "http://gameguru.kurbanov.dev/gamescom2017/"+ajaxCurNotesPage+"/ajax.html",
        //     timeout: 10000,
        //     success: function(data) {
        //   		$loader.removeClass("load");
        //   		ajaxCurNotesPage++;
        //   		globalForajaxNotes = false;
        //   		console.log(data);
        //     }
        // });


				//console.log(data);

				var notesL = data.notes.length;
				if (notesL == 0 ) {
					$loader.addClass("load");
					return false;
				}
				//инит новых нод
				for(var i=0; i < notesL; i++){
					var noteItemTitle = data.notes[i].title,
							noteItemText = data.notes[i].text,
							noteItemVideo = data.notes[i].video,
							coinHash = data.notes[i].coin_hash,
							curPrevBlock,
							create_date			 = new Date(data.notes[i].created_at*1000),
							create_day 		 	 = (create_date.getDate()+"").length == 1 ? "0"+create_date.getDate() : create_date.getDate(),
							create_mounth  	 = (create_date.getMonth()+1+"").length == 1 ? "0"+(create_date.getMonth()+1) : create_date.getMonth(),
							create_hours   	 = create_date.getHours(),
							create_minutes 	 = create_date.getMinutes(),
							create_seconds 	 = create_date.getSeconds(),
							now_date 				 = new Date(),
							now_date_minutes = now_date.getMinutes(),
							now_date_seconds = now_date.getSeconds(),
							now_dateTime		 = now_date.getTime(),
							create_dateTime  = create_date.getTime(),
							diff = moment.utc(moment(now_dateTime).diff(moment(create_dateTime))).format("DD:HH:mm:ss"),
							diffArray = diff.toString().split(":");
							var newDiffArray = diffArray.map(function (x) { 
							    return parseInt(x, 10); 
							});
							var	diffDays 		= newDiffArray[0],
									diffHours 	= newDiffArray[1],
									diffMinutes = newDiffArray[2],
									diffSeconds = newDiffArray[3],
									button;

							//console.log(diff);
							if( diffMinutes > 10 || diffDays > 0 || diffHours > 0 ){
								button = "";
							}else{
								button = '<div class="button" data-hash='+coinHash+'>\
										<span class="buttonText">Успей схватить&nbsp;&nbsp;gurucoin!</span>\
										<span class="time">'+diffMinutes+':'+diffSeconds+'</span>\
										<span class="coin"></span>\
									</div>';
							}

							if( typeof noteItemVideo == 'undefined' || noteItemVideo == null ){
								var noteItemImagesObj = data.notes[i].images,
										noteItemImagesL = Object.keys(noteItemImagesObj).length;
										if( noteItemImagesL > 1 ){
											curPrevBlock = '<div class="prevImgBlock owl-carousel">';
											for (var prop in noteItemImagesObj) {
												var imgSrc = noteItemImagesObj[prop].thumb;
												curPrevBlock+= '<div class="item"><img class="imgCover" src="'+imgSrc+'" alt=""></div>';
											}
											curPrevBlock+= '</div>';
										}else{
											curPrevBlock = '<div class="prevImgBlock">\
																				<img class="imgCover" src="'+noteItemImagesObj[Object.keys(noteItemImagesObj)[0]]+'" alt="">\
																			</div>';
										}
							}else{
								curPrevBlock = '<div class="prevVideoBlock">\
																	'+noteItemVideo+'\
																</div>';
							}


					var nextNote = $('<div class="news-item-lc newAjaxItem">\
															'+curPrevBlock+'\
															<div class="name">\
																'+noteItemTitle+'\
															</div>\
															<div class="text">\
																'+noteItemText+'\
															</div>\
															<div class="date">'+create_day+'.'+create_mounth+' '+create_hours+':'+create_minutes+'</div>\
															'+button+'\
														</div>');
					//инит картинок левой колонки
					$block.append(nextNote).masonry( 'appended', nextNote );
					if( $block.find(".newAjaxItem:not(.start) img.imgCover").length > 0 ){
						imageCover( $block.find(".newAjaxItem:not(.start) img.imgCover") )
					}
					//инит галерей
					if( $block.find(".newAjaxItem:not(.start) .owl-carousel").length > 0 ){
						createSlider($block.find(".newAjaxItem:not(.start) .owl-carousel"))
					}
					//инит обратного отсчета кнопок
					if( $block.find(".newAjaxItem:not(.start) .button[data-hash]").length > 0 ){
						$block.find(".newAjaxItem:not(.start) .button[data-hash]").each(function(){
							var $button = $(this);
							buttonCountDown( $button );
						});
					}
					
					animateNewAjaxItems($block);
				}
				globalForajaxNotes = true;
    }

    function animateNewAjaxItems($block){
    	if( $block.find(".newAjaxItem:not(.start)").length == 0 ){ return false; }
    	$block.find(".newAjaxItem:not(.start)").each(function(){
    		var $this = $(this);
	  		if( $(window).scrollTop() + $(window).height() - $(window).height()*0.5 > $this.offset().top ) {
  				$this.addClass("start");
	  		}
			});
    }

    // Пушим новости по офсету
    $(window).on("scroll", function(){
    		var rcFullOffset = $(".colsBlock2 .rc .iw").outerHeight()+$(".colsBlock2 .rc .iw").offset().top;
    		var lcFullOffset = $(".colsBlock2 .lc .iw").outerHeight()+$(".colsBlock2 .lc .iw").offset().top;

        if( $(window).scrollTop() + rcFullOffset+170 > rcFullOffset ) {
          appendNextNews();
        }
        if( $(window).scrollTop() + lcFullOffset+170 > lcFullOffset ) {
          appendNextNotes();
        }
        animateNewAjaxItems($(".colsBlock2 .rc .iw"));
        animateNewAjaxItems($(".colsBlock2 .lc .iw"));
    });
	}

	$(document).ready(function(){
		$(".button[data-hash]").each(function(){
			var $button = $(this);
			buttonCountDown( $button );
		});
		createSlider( $(".owl-carousel") );
		masinrycols();
		buttonClick();
		noteDetail();
		scrollAjaxPush();
	});

	$(window).on("load", function(){
		imageCover($('.item img.imgCover'));
	});


}());
var data;