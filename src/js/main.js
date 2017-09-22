(function () {
	var lay;
	if( $('#lt1400').is(':visible') ){
		lay = "lt1400";
	}else{
		lay = "gt1400";
	}

	function isChangePageLayout() {
		if( $('#lt1400').is(':visible') && lay == "gt1400" ) {
			lay = "lt1400";
			return true;
		} else if( !$('#lt1400').is(':visible') && lay == "lt1400" ){
			lay = "gt1400";
			return true;
		} else {
			return false;
		}
	}

	$(window).resize(function(){
		if( isChangePageLayout() ){
			$('.colsBlock .lc .iw').masonry( 'option', { columnWidth: parseInt( $(".colsBlock.colsBlock2 .lc").outerWidth()/2 - 20 ) });
		}
	});

	function masonrycols() {
		var $grid = $('.colsBlock .lc .iw');
		$grid.each(function () {
			var $thisGrid = $(this);
			$thisGrid.on('layoutComplete', function () {
				$thisGrid.addClass("initComplete");
			});
			$thisGrid.masonry({
				itemSelector: '.news-item-lc',
				columnWidth: parseInt( $(".colsBlock.colsBlock2 .lc").outerWidth()/2 - 20 ),
				gutter: 20
			});
		});
	}


	function buttonCountDown($buttons, munutes, seconds) {
		$buttons.find(".time").each(function () {
			var $this = $(this);
			var min =  typeof(munutes) != 'undefined' ?  munutes * 60 * 1000 : parseInt( $this.text().split(":")[0] ) * 60 * 1000;
			var sec =  typeof(seconds) != 'undefined' ?  seconds * 1000 : parseInt( $this.text().split(":")[1] ) * 1000;

			selectedDate = new Date().valueOf() + min + sec;

			$this.countdown(selectedDate.toString(), function (event) {
			  $this.html(event.strftime('%M:%S'));
			}).on('finish.countdown', function (event) {
				var $thisIW = $this.closest(".iw");
				$this.closest(".button").remove();
				$thisIW.masonry();
			});
		});
	}

	function imageCoverPreloader($items){
		$items.addClass("preLoad");
		$items.each(function(){
			var $this = $(this);
			$this.imagesLoaded( function() {
				var $thisImg = $this.find('img.imgCover'),
					thisImgSrc = $thisImg.attr("src");
					$siblingsClonedItems =  $thisImg.closest(".owl-item").siblings(".owl-item").find(".item:has(img[src='"+thisImgSrc+"'])");
				imageCover( $this.find('img.imgCover') );

				$this.removeClass("preLoad");
				if( $siblingsClonedItems.length > 0 ){
					imageCover( $siblingsClonedItems.find('img.imgCover') );
					$siblingsClonedItems.removeClass("preLoad");
				}

			});
		});
	}

	function imageCover($img) {
		$img.each(function() {
			var $im = $(this),//image
					$item = $(this).closest('.item'),
				th = $item.outerHeight(),//box height
				tw = $item.outerWidth(),//box width
				ih = $im.height(),//inital image height
				iw = $im.width();//initial image width

			$im.removeClass("cover_wh cover_ww");
			if ((ih / iw) > (th / tw)) {
				$im.addClass('cover_ww').removeClass('cover_wh');//set width 100%
			} else {
				$im.addClass('cover_wh').removeClass('cover_ww');//set height 100%
			}
			// $item.removeClass("preLoad");
		});
	}

	function createSlider($owlCaruosels) {
		$owlCaruosels.each(function () {
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
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/x/gamescom2017/images/symbol/sprite.svg#sliderLA"></use>\
								</svg>',
							'<svg class="icon">\
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/x/gamescom2017/images/symbol/sprite.svg#sliderRA"></use>\
								</svg>'
				],
				autoplay: false,
				autoplayHoverPause: true
			});
		});
	}

	function noteDetail() {
		$("body").on("click", ".news-item-lc:not(.newAjaxItem) .name, .news-item-lc:not(.newAjaxItem) .prevImgBlock img, .news-item-lc.newAjaxItem.start .name, .news-item-lc.newAjaxItem.start .prevImgBlock img", function () {
			var $thisName = $(this),
				$thisItem = $thisName.closest(".news-item-lc");

			if($thisItem.find(".videoBlock").length > 0) {
				var $thisDetailContent = $thisItem.find(".videoBlock");
				$.magnificPopup.open({
					items: {
						src: "<div class='defaultPopupContent mfp-with-anim'>" + $thisDetailContent[0].outerHTML + "</div>",
						type: 'inline'
					},
					removalDelay: 500,
					closeBtnInside: true,
					mainClass: 'mfp-with-zoom',
					callbacks: {
						beforeOpen: function() {
							//$thisItem.find("iframe").attr( "src", $thisItem.find("iframe").attr("src") );
							this.st.mainClass = "mfp-zoom-in defaultPopup";
						},
						beforeClose: function() {

						},
					},
					midClick: true
				});
			} else if ($thisItem.find(".prevImgBlock").length > 0) {
				if( $thisItem.find(".prevImgBlock img").length > 1 ) {
					var $thisDetailContent = "<div class='prevImgBlock owl-carousel'>";

					$thisItem.find(".prevImgBlock  .owl-item:not(.cloned) img").each(function () {
						$thisDetailContent += $(this)[0].outerHTML;
					});
				} else {
					var $thisDetailContent = "<div class='prevImgBlock'>";

					$thisItem.find(".prevImgBlock  img").each(function () {
						$thisDetailContent += $(this)[0].outerHTML;
					});
				}


				$thisDetailContent += "</div>";

				$.magnificPopup.open({
					items: {
						src: "<div class='defaultPopupContent mfp-with-anim'>" + $thisDetailContent + "</div>",
						type: 'inline'
					},
					removalDelay: 500,
					closeBtnInside: true,
					mainClass: 'mfp-with-zoom',
					callbacks: {
						beforeOpen: function () {
							this.st.mainClass = "mfp-zoom-in defaultPopup";
						},
						open: function () {
							$(".defaultPopupContent .prevImgBlock").each(function () {
								var $this = $(this);
								$this.find("img").removeClass("cover_ww cover_wh");

								if( $this.find("img").length < 2 ) {
									return false;
								}

								$this.owlCarousel({
									loop: true,
									items: 1,
									navRewind:false,
									margin: 0,
									nav: true,
									dots:true,
									navText: ["<div class='arrow left'><div class='icon'></div></div>","<div class='arrow right'><div class='icon'></div></div>"],
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

	function buttonClick() {
		$("body").on("click", ".button[data-hash]:not(.loading)", function () {
			if (!window.uid) {
				return;
			}

			var $thisBut = $(this),
				thisHash = $thisBut.attr("data-hash");

			$thisBut.addClass("loading");

			$.ajax({
				type: "POST",
				data: {
					hash: thisHash
				},
				url: "/ajax/guru_coin/send.html",
				timeout: 10000,
				success: function (data) {
					data = JSON.parse(data);
					if (data.success == true) {
						$thisBut.removeClass("loading");
						$(".coinCount").text(parseInt($(".coinCount").text()) + parseInt(data.count));
						$.magnificPopup.open({
							items: {
								src: "<div class='defaultPopupContent mfp-with-anim'>Ты успел взять GURUCOIN! Так держать!</div>",
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
									$thisBut.remove();
									$(".colsBlock2 .lc .iw").masonry();
									$(".colsBlock1 .lc .iw").masonry();
								},
							},
							midClick: true
						});
					} else {
						$thisBut.removeClass("loading");
						$.magnificPopup.open({
							items: {
								src: "<div class='defaultPopupContent mfp-with-anim'>Ты уже брал этот GURUCOIN!</div>",
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
									$thisBut.remove();
									$(".colsBlock2 .lc .iw").masonry();
									$(".colsBlock1 .lc .iw").masonry();
								},
							},
							midClick: true
						});
					}
				},
				error: function () {
					$thisBut.removeClass("loading");

					$.magnificPopup.open({
						items: {
							src: "<div class='defaultPopupContent mfp-with-anim'>Упс! Что-то пошло не так.</div>",
							type: 'inline'
						},
						removalDelay: 500,
						closeBtnInside: true,
						mainClass: 'mfp-with-zoom',
						callbacks: {
							beforeOpen: function () {
								this.st.mainClass = "mfp-zoom-in defaultPopup";
							},
							beforeClose: function () {

							},
						},
						midClick: true
					});
				}
			});
		});
	}

	function scrollAjaxPush() {

		var globalForajaxNotes = false;
		var globalForajaxNews = false;
		var ajaxCurNotesPage = 1;
		var ajaxCurNewsPage = 1;

		function appendNextNews() {
			if (globalForajaxNews || $(".colsBlock2 .rc .newAjaxItem:not(.start)").length > 0 ) {
				return false;
			}

			var $block = $(".colsBlock2 .rc .iw"),
				$loader = $(".colsBlock2 .rc .loader");

			$loader.addClass("load");

			globalForajaxNews = true;
			xhr = $.ajax({
				type: "GET",
				url: "/gamescom2017/" + ajaxCurNewsPage + "/ajax.html",
				timeout: 10000,
				success: function(data) {
					data = JSON.parse(data);
					$loader.removeClass("load");
					ajaxCurNewsPage++;

					var newsL = data.news.length;

					if (newsL == 0 ) {
						$loader.removeClass("load");
						globalForajaxNews = true;
						return false;
					}
					//инит новых новостей
					for(var i=0; i < newsL; i++) {
						var newsItemTitle = data.news[i].title,
							newsItemAnonsImg = data.news[i].anons_image,
							newsItemDateArray = data.news[i].date_public.split(" ")[0].split("-"),
							newsItemDate = newsItemDateArray[2]+"."+newsItemDateArray[1]+"."+newsItemDateArray[0],
							newsItemTimeArray = data.news[i].date_public.split(" ")[1].split(":"),
							newsItemTime = newsItemTimeArray[0]+"."+newsItemTimeArray[1],
							logoBlock;

						if( typeof newsItemAnonsImg == 'undefined' || newsItemAnonsImg == null ){
							logoBlock = '<div class="logo"><img src="/x/gamescom2017/images/gamescomNewsLogo.png"/></div>';
						}else{
							logoBlock = '<div class="logo"><img src="'+newsItemAnonsImg+'"/></div>';
						}

						var nextNewsNote = $('<div class="news-item-rc newAjaxItem">\
														<div class="date">'+newsItemTime+' '+newsItemDate+'</div>\
														'+logoBlock+'\
														<div class="name"><a href="/news/' + data.news[i].url + '/view.html" style="color: white; text-decoration: none;" target="_blank">'+newsItemTitle+'</a></div>\
													</div>');

						$block.append(nextNewsNote);
						animateNewAjaxItems($block);
					}
					globalForajaxNews = false;
				}
			});
		}

		function appendNextNotes() {
			if( globalForajaxNotes ){
				return false;
			}

			var $block = $(".colsBlock2 .lc .iw"),
					$loader = $(".colsBlock2 .loader");

			$loader.addClass("load");

			globalForajaxNotes = true;
			xhr = $.ajax({
				type: "GET",
				url: "/gamescom2017/" + ajaxCurNotesPage + "/ajax.html",
				timeout: 10000,
				success: function (data) {
					data = JSON.parse(data);
					$loader.removeClass("load");
					ajaxCurNotesPage++;

					var notesL = data.notes.length;
					if (notesL == 0 ) {
						$loader.addClass("load");
						globalForajaxNotes = true;
						return false;
					}

					//инит новых нод
					for (var i = 0; i < notesL; i++) {

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
							now_date 				 = new Date(),
							now_dateTime		 = now_date.getTime(),
							create_dateTime  = create_date.getTime(),
							diff_dateTime = Math.floor(now_dateTime / 1000) - Math.floor(create_dateTime / 1000),
							diffMinutes = 20 - Math.ceil(diff_dateTime / 60),
							diffSeconds = 60 - Math.ceil(diff_dateTime - Math.floor(diff_dateTime / 60) * 60),
							button;

						if((now_dateTime - create_dateTime > 1000 * 60 * 20) && coinHash != 'first_note' || data.hashes[coinHash]) {
							button = "";
						} else {
							button = '<div class="button' + (!window.uid ? ' js-auth-button' : '') + '" data-hash='+coinHash+'>\
							<span class="buttonText">Успей забрать&nbsp;&nbsp;gurucoin!</span>\
							<span class="time"' + (coinHash === 'first_note' ? ' style="display: none;"' : '') + '>' + diffMinutes + ':' + diffSeconds + '</span>\
							<span class="coin"></span>\
							</div>';
						}

						if (typeof noteItemVideo == 'undefined' || noteItemVideo == null) {
							var noteItemImagesObj = data.notes[i].images;

							if ( noteItemImagesObj.length > 1 ) {
								curPrevBlock = '<div class="prevImgBlock owl-carousel">';
								for (var prop in noteItemImagesObj) {
									var imgSrc = noteItemImagesObj[prop].file;
									curPrevBlock+= '<div class="item"><img class="imgCover" src="'+imgSrc+'.medium.jpg'+'" alt=""></div>';
								}
								curPrevBlock+= '</div>';
							} else if (noteItemImagesObj.length > 0) {
								curPrevBlock = '<div class="prevImgBlock">\
													<div class="item"><img class="imgCover" src="' + noteItemImagesObj[0].file + '.medium.jpg' + '" alt=""></div>\
												</div>';
							}
						} else {
							curPrevBlock = '<div class="videoBlock">\
												'+noteItemVideo+'\
											</div>';
						}


						var nextNote = $('<div class="news-item-lc newAjaxItem">\
											' + curPrevBlock + '\
											<div class="name">\
												' + noteItemTitle + '\
											</div>\
											<div class="text">\
												' + noteItemText + '\
											</div>\
											<div class="date">'
							+ (window.isallow && isallow === true ? '<a href="/gamescom2017/' + data.notes[i].id + '/edit.html" target="_blank">Ред.</a>' : '')
							+ create_day + '.' + create_mounth + ' ' + create_hours + ':' + (create_minutes < 10 ? '0' + create_minutes : create_minutes) + '</div>\
											' + button + '\
										</div>');
						//инит картинок левой колонки
						$block.masonry().append(nextNote).masonry( 'appended', nextNote ).masonry();
						if( $block.find(".newAjaxItem:not(.start) img.imgCover").length > 0 ){
							imageCoverPreloader( $block.find(".newAjaxItem:not(.start) .item:has(img.imgCover)") );
						}
						//инит галерей
						if( $block.find(".newAjaxItem:not(.start) .owl-carousel").length > 0 ){
							createSlider($block.find(".newAjaxItem:not(.start) .owl-carousel"));
						}
						//инит обратного отсчета кнопок
						if( $block.find(".newAjaxItem:not(.start) .button[data-hash]").length > 0 ){
							$block.find(".newAjaxItem:not(.start) .button[data-hash]").each(function(){
								var $button = $(this);
								buttonCountDown( $button );
							});
						}
						//просьба регистрации
						if (!window.uid) {
							$block.find('.js-auth-button').on('click', function () {
								var fnReload = function () {
									window.location.reload();
								}, actions = [{
									fname: fnReload
								}];
								if (!window.uid) {
									air_auth2(actions);
								}
							});
						}
						$block.masonry();

						animateNewAjaxItems($block);
					}
					globalForajaxNotes = false;
				}
			});
		}

		function animateNewAjaxItems($block){
			if( $block.find(".newAjaxItem:not(.start)").length == 0 ){ return false; }
			$block.find(".newAjaxItem:not(.start)").each(function(){
				var $this = $(this);
				if( $block.closest(".rc").length > 0 ){

					var rcFullOffset = $(".colsBlock2 .rc .iw").outerHeight()+$(".colsBlock2 .rc .iw").offset().top;
					var lcFullOffset = $(".colsBlock2 .lc .iw").outerHeight()+$(".colsBlock2 .lc .iw").offset().top;
					if(
						$(window).scrollTop() + $(window).height() * 0.75 > $this.offset().top &&
						rcFullOffset < lcFullOffset
					) {
						$this.addClass("start");
					}
				}else{
					if( $(window).scrollTop() + $(window).height() * 0.75 > $this.offset().top ) {
						$this.addClass("start");
					}
				}

			});
		}

		// Пушим новости по офсету
		$(window).on("scroll", function(){
			var rcFullOffset = $(".colsBlock2 .rc .iw").outerHeight()+$(".colsBlock2 .rc .iw").offset().top;
			var lcFullOffset = $(".colsBlock2 .lc .iw").outerHeight()+$(".colsBlock2 .lc .iw").offset().top;

			if( $(window).scrollTop() + 3000 > rcFullOffset && rcFullOffset < lcFullOffset) {
			  appendNextNews();
			}
			if( $(window).scrollTop() + 3000 > lcFullOffset ) {
			  appendNextNotes();
			}
			animateNewAjaxItems($(".colsBlock2 .rc .iw"));
			animateNewAjaxItems($(".colsBlock2 .lc .iw"));
		});
	}

	$(document).ready(function(){
		svg4everybody({});
		imageCoverPreloader( $('#lp_gamescom .item:has(img.imgCover)') );
		$(".button[data-hash]").each(function(){
			var $button = $(this);
			buttonCountDown( $button );
		});
		$('.js-auth-button').on('click', function () {
			var fnReload = function () {
				window.location.reload();
			}, actions = [{
				fname: fnReload
			}];
			if (!window.uid) {
				air_auth2(actions);
			}
		});
		createSlider( $(".owl-carousel") );

		masonrycols();
		buttonClick();
		noteDetail();
		scrollAjaxPush();
	});

	$(window).on('load', function () {
		$('.colsBlock .lc .iw').each(function () {
			$(this).masonry();
		});
	});
}());
