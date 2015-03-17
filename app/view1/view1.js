'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','summonerFactory','championFactory','infoFactory',function($scope,summonerFactory,championFactory,infoFactory) {
	$scope.fetchSummoner = function() {
      console.log(this.summonerName);
      var sname
      if (this.summonerName) {
      	summonerFactory.getSummonner(this.summonerName).then(function(data) {

			$scope.summonerData = data[Object.keys(data)[0]];
			var id = data[Object.keys(data)[0]].id;
			infoFactory.getInfo(id).then(function(info) {
				var temp = info[Object.keys(info)[0]];
				$scope.information = temp[0];
				console.log("information",$scope.information);
			})

         $scope.haveSummoner = true;
			})
      }
   }

	$scope.getChampion = function () {
    championFactory.getChampion().then(function(data){
 		$scope.champion = data.champions.slice(1,99);
   })

  	}
	$scope.resetSearch = function() {
	   console.log('search reset');
	   $scope.haveSummoner = false;
	   this.summonerName = "";
	   $scope.$broadcast('resetSearch');
	}

}])


.factory('championFactory', function($http,$q) {
       return {
         getChampion: function() {
           var deferred = $q.defer();
           var url = "https://na.api.pvp.net/api/lol/na/v1.2/champion?api_key=8c522586-0da9-4899-aec8-fc09133e2fd9";
         $http.get(url).success(function (data, status, headers, config) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                //this always gets called
                console.log(status);
                deferred.reject(status);
            });
            return deferred.promise;

     	}
  }
})
.factory('summonerFactory', function($http,$q) {
       return {
         getSummonner: function(name) {
         	console.log(name);
           var deferred = $q.defer();
           var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"+name+"?api_key=8c522586-0da9-4899-aec8-fc09133e2fd9";
         $http.get(url).success(function (data, status, headers, config) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                //this always gets called
                console.log(status);
                deferred.reject(status);
            });
            return deferred.promise;

     	}

  }
})

.factory('infoFactory', function($http,$q) {
       return {
        getInfo: function(id) {
         	console.log(name);
           var deferred = $q.defer();
           var url = "https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/"+id+"?api_key=8c522586-0da9-4899-aec8-fc09133e2fd9";
         $http.get(url).success(function (data, status, headers, config) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                //this always gets called
                console.log(status);
                deferred.reject(status);
            });
            return deferred.promise;
     		}

 	 }
});



