$(function(){
  injeinc.init();

	$(".menu-open").click((e)=>{
		e.preventDefault();
		$(".mobile-nav").fadeIn(500);
		scrollOff();
	});

	$(".menu-close").click((e)=>{
		e.preventDefault();
		$(".mobile-nav").fadeOut(100);
		scrollOn();
	});

	$(".car-search-open").click(()=>{
		$(".info-search-box").addClass('active')
		scrollOff();
	});

	$(".car-search-close").click((e)=>{
		e.preventDefault();
		$(".info-search-box").removeClass('active')
		scrollOn();
	})

	$(".map-open").click(()=>{
		$(".modal-map,#overlay").addClass('active');
		scrollOff();
	})
	$(".map-close").click(()=>{
		$(".modal-map,#overlay").removeClass('active');
		scrollOn();
	})

	$(".check-top img, .check-top strong").click(function(){
		$(this).parent().parent('li').addClass('active')
	})
	$(".check-close").click(function(){
		$(this).parent().parent().parent().removeClass('active')
	})

	$(".view-sel a").click(function(e){
		e.preventDefault();
		$(".view-sel a").removeClass("active");
		$(this).addClass("active");
		$(this).hasClass('gallery') ?	$(".info-wrap").addClass("active") : $(".info-wrap").removeClass("active");
	});

	$(".gallery-thumbs-wrap .prev").click(()=>$(".purcharse .gallery-top .swiper-button-prev").trigger('click'))
	$(".gallery-thumbs-wrap .next").click(()=>$(".purcharse .gallery-top .swiper-button-next").trigger('click'))

	$(".check").click(function(){
		$(this).toggleClass('active')
	})
	$(".radio").click(function(){
		$(this).parent('div').siblings('div').children('.radio').removeClass('active');
		if(!$(this).hasClass('active')){
			$(this).addClass('active')
		}
	})

	function scrollOff(){
		$('html, body').css('overflow','hidden')
	}
	function scrollOn(){
		$('html, body').css('overflow','visible')
	}

	const swiper = new Swiper('.swiper.main', {
		effect:'fade',
		loop: true,
		pagination: {
			el: '.main .swiper-pagination',
			type : 'bullets',
			clickable : true,
		},
	});

	const sec3 = new Swiper('.swiper.sec-3', {
		loop: true,
		spaceBetween: 15,
		// centeredSlides: true, 
		pagination: {
			el: '.sec3 .swiper-pagination',
		},
		navigation: {
			nextEl: '.sec-3 .swiper-button-next',
			prevEl: '.sec-3 .swiper-button-prev',
		},
		breakpoints: {
			1280: {
				slidesPerView: 3.5,
				spaceBetween: 30,
			},
			640:{
				slidesPerView: 2.5,
				spaceBetween: 20,
			},
			320:{
				slidesPerView: 1.2,
				spaceBetween: 10,
			}
		},
	});

	const advisor = new Swiper('.swiper.advisor', {
		loop: true,
		spaceBetween: 30,
		slidesPerView:1,
		navigation: {
			nextEl: '.advisor .swiper-button-next',
			prevEl: '.advisor .swiper-button-prev',
		},
		breakpoints: {
			1280: {
				slidesPerView: 2,
				spaceBetween:40,
			},
		},
	});

	const photo = new Swiper('.swiper.photo', {
		loop: true,
		spaceBetween: 10,
		slidesPerView:1.5,
		navigation: {
			nextEl: '.photo .swiper-button-next',
			prevEl: '.photo .swiper-button-prev',
		},
		breakpoints: {
			961: {
				slidesPerView: 4,
				spaceBetween: 10,
			},
		},
	});

	const galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 10,
		slidesPerView: 7,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	const galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 10,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		thumbs: {
			swiper: galleryThumbs
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
	});

	
	// respond
	$(window).resize(function(){
		let windowWidth = $(window).width(); 
		if(windowWidth < 961){
			$(".info-wrap").addClass('active')
		}else{
			$(".info-wrap").removeClass('active')
		}
		if(windowWidth > 1280){
			$(".mobile-nav").fadeOut(100);
			scrollOn();
		}
	})

});



/*Injeinc Libary*/
var injeinc = {
	'init':function(){
		injeinc.tab();
		injeinc.datepicker();
		injeinc.modal(); 
	},
	'tab':function(){
		$(".tab-content").each(function(){
			var tabBar = $(this).children(".tab-bar");
			var tabPage = $(this).children(".tab-page");
			if(!$(this).hasClass("not-used")){
				if(tabBar.children("li.active").length == 0 && !tabBar.children("li").eq(0).children("a").hasClass("use-link")){
					injeinc.tabReset($(this));
					tabBar.children("li").eq(0).addClass("active");
					tabPage.eq(0).addClass("active");
				}
				tabBar.children("li").children("a").unbind("click").click(function(e){ 
					if(!$(this).hasClass("use-link")){
						e.preventDefault();
						injeinc.tabReset($(this));
						$(this).parent().parent().siblings(".tab-page").eq($(this).parent().index()).addClass("active");
						$(this).parent().addClass("active");
					}
				}).keydown(function(e){
					if($(this).parent().hasClass("active") && e.keyCode == 9){
						var focusItem = injeinc.findFocusItem($(this).parents(".tab-bar").eq(0).siblings(".tab-page.active"));
						if(focusItem.length == 0 || $(this).hasClass("use-link")){
							if($(this).parent().next().children("a").length > 0){
								e.preventDefault();
								$(this).parent().next().children("a").trigger("click").focus();
							}
						}else{
							e.preventDefault();
							focusItem.eq(0).focus();
						}
					}
				});
			}
		});
		$(".tab-page").each(function(){
			if(!$(this).parent(".tab-content").hasClass("not-used")){
				var focusItem = injeinc.findFocusItem($(this)); 
				if(focusItem.length > 0){
					focusItem.last().unbind("keydown").keydown(function(e){
						var inTabPage = $(this).parents(".tab-page").eq(0);
						var inTabBar = inTabPage.siblings(".tab-bar");
						var target = inTabBar.children("li.active").next();
						if(e.keyCode == 9 && target.length > 0){
							e.preventDefault();
							if(!target.children("a").hasClass("use-link")){
								target.children("a").trigger("click");
							}else{
								inTabBar.children("li").removeClass("active");
								target.addClass("active");
							}
							target.children("a").focus();
						}
					});
				}
			}
		});
	},
	'tabReset':function(tabItem){
		if(tabItem.hasClass("tab-content")){
			tabItem.children(".tab-bar").children("li.active").removeClass("active");
			tabItem.children(".tab-page").removeClass("active");
		}else{
			tabItem.parents(".tab-content").eq(0).children(".tab-bar").children("li.active").removeClass("active");
			tabItem.parents(".tab-content").eq(0).children(".tab-page").removeClass("active");
		}
	},
	'datepicker':function(){
		var holidayData = [
			{'mmdd':'1-1','title':'신정'},
			{'mmdd':'3-1','title':'3.1절'},
			{'mmdd':'5-5','title':'어린이날'},
			{'mmdd':'5-10','title':'석가탄신일'},
			{'mmdd':'6-6','title':'현충일'},
			{'mmdd':'8-15','title':'광복절'},
			{'mmdd':'10-3','title':'개천절'},
			{'mmdd':'10-9','title':'한글날'},
			{'mmdd':'12-25','title':'크리스마스'}
		];

		$(".useDatepicker").each(function(){
			if(!$(this).hasClass(".hasDatepicker")){
				var minDate = $(this).attr("data-minDate");
				var maxDate = $(this).attr("data-maxDate");
				var dateFormat = "yy-mm-dd";
				if($(this).attr("data-format")){
					dateFormat = $(this).attr("data-format");
				}
				$(this).datepicker({
					prevText: '이전 달',
					nextText: '다음 달',
					monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
					dayNamesShort: ['일','월','화','수','목','금','토'],
					dayNamesMin: ['일','월','화','수','목','금','토'],
					dateFormat: dateFormat,
					showMonthAfterYear: true,
					yearSuffix: '&nbsp;/',
                    changeMonth: true,
					changeYear: true,
                    yearRange: 'c-121:c+1',
					minDate: minDate,
					maxDate: maxDate,
					beforeShowDay: function(date){
						var holidayCheck = false;
						var mmdd = (date.getMonth() + 1)+"-"+date.getDate();
						for(var i=0; i<holidayData.length; i++){
							if(holidayData[i].mmdd == mmdd){
								holidayCheck = true;
								return [true, "date-holiday", holidayData[i].title];
								break;
							}
						}
						if(holidayCheck == false){
							return [true, ""];
						}
					},
					onSelect: function(selectedDate){
					},
					onClose: function(selectedDate){
						if($(this).hasClass("data-form")) {
							if(selectedDate != "" && $(this).parent().children(".data-top").val() != ""){
								if(selectedDate >= $(this).parent().children(".data-top").val()){
									alert("시작날짜는 종료날짜보다 작아야 합니다.");
									$(this).val("");
									return;
								}
							}
						}else if($(this).hasClass("data-top")) {
							if(selectedDate != "" && $(this).parent().children(".data-form").val() != ""){
								if($(this).parent().children(".data-form").val() >= selectedDate){
									alert("종료날짜는 시작날짜보다 커야 합니다.");
									$(this).val("");
									return;
								}
							}
						}
					}
				});
			}
		});
	},
	'fileBtn':function(){
		$("input.file-btn").each(function(){
			if($(this).css("display") != "none"){
				var file_name = $(this).attr("id");
				var file_class = $(this).attr("class").replace("file-btn","");
				$(this).after('<span id="for_'+file_name+'"><input type="text" class="'+file_class+'" value="" title="사진"> <a href="#" class="btn_inline for_file-btn">찾아보기</a></span>');
				$(this).hide();
				$(this).change(function(){
					$("#for_"+file_name+" input[type='text']").val($(this).val());
				});
				$("#for_"+file_name+" .for_file-btn").click(function(e){
					e.preventDefault();
					var id = $(this).parent().attr("id").replace("for_","");
					$("#"+id).click();
				});
			}
		});
	},
	'modal':function(){
		$(document).on("click",".modal-open",function(e){
			e.preventDefault();
			var targetModal = $(this).attr("href");
			injeinc.modalClose();
			injeinc.modalOpen(targetModal);
		});
		$(document).on("click","#overlay, .btn_modalClose",function(e){
			e.preventDefault();
			injeinc.modalClose();
		});
	},
	'modalOpen':function(id){
		$("#overlay").show();
		$(id).addClass("active");
		$(id).find(".modal-close").eq(0).focus();
		$('html, body').css('overflow','hidden')
	},
	'modalClose':function(){
		var modalId = $(".modal-wrap.active").attr("id");
		$(".modal-wrap").removeClass("active");
		$("#overlay").hide();
		$("a.modal-open[href='#"+modalId+"']").focus();
		$('html, body').css('overflow','visible')
	},
	'findFocusItem':function(area){
		return area.find("input, select, textarea, button, a");
	}
	
};