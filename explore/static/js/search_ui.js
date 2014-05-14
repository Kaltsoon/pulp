var UI = (function(){
	var loading = function(){
		$("#loading-results").fadeIn(300);
	}
	
	var loaded = function(){
		$("#loading-results").fadeOut(300);
	}

	var back_to_top = function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	}

	return {
		loading: loading,
		loaded: loaded,
		back_to_top: back_to_top
	};
	
})();

$(document).on("ready", function(){
	$("#back-to-top").on("click", function() {
		UI.back_to_top();
	});
	$("#article-count").selectpicker();
	$("#back-to-top").removeAttr("disabled")
});

$(document).on("scroll", function(){
	var scrollAmount = $(window).scrollTop();
	var documentHeight = $(document).height();
	var scrollPercent = (scrollAmount / documentHeight) * 100;
	if(scrollPercent > 0){
		$("#back-to-top").animate({
			bottom: 0
		},400);
	}else{
		$("#back-to-top").clearQueue().animate({
			bottom: -45
		},400);
	}
});