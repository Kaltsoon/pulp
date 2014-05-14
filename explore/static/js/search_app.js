var SearchApp = angular.module("SearchApp", [])

SearchApp.filter("htmlToPlaintext", function() {
    return function(text) {
      	return String(text).replace(/<[^>]+>/gm, '');
    }
});

SearchApp.controller("SearchController", ["$scope", function($scope){

	$scope.results = [];

	$scope.search = function(){
		UI.back_to_top();
		UI.loading();
		$("#search-results").fadeOut(300, function(){
			fetch_articles();
		});
	}

	$scope.toggle_bookmark = function(result){
		result.bookmarked = !result.bookmarked;
	}

	var fetch_articles = function(){
		$.get("query", { "q": $scope.search_keyword, "article-count": parseInt($("#article-count option:selected").val()) })
		.done(function(data){
      		$scope.results = data;
      		for(var i = 0; i< $scope.results.length; i++){
      			$scope.results[i].bookmarked = false;
      		}
		})
		.fail(function(){
			$scope.results = [];
		})
		.always(function(){
			$scope.search_heading = $scope.search_keyword;
			$scope.$apply();
			UI.loaded();
      		$("#search-results").fadeIn(300);
		});
	}

	$scope.next = function(){
		UI.loading();
		alert(next_params());
		$("#search-results").fadeOut(300, function(){
			$.get("next", next_params())
			.done(function(response){
				alert(response)
			})
			.fail(function(){
				$scope.results = [];
			})
			.always(function(){
				$scope.search_heading = $scope.search_keyword;
				$scope.$apply();
				UI.loaded();
				UI.back_to_top();
	      		$("#search-results").fadeIn(300);
			});
		});

	}

	$scope.end = function(){
		UI.back_to_top();
		$("#search-results").fadeOut(300, function(){
			$scope.results = [];
		});
	}

	var next_params = function(){
		ids = [];
		$scope.results.forEach(function(result){
			if(result.bookmarked){
				ids.push(result.id);
			}
		});
		if(ids.length > 0){
			return "id=" + ids.join("&id=");
		}else{
			return "";
		}	
	}
	
}]);