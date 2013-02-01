/**
 * UserMnge Module
 *
 * Description
 */
angular.module('UserMnge', [])
.controller('mainCtrl',function($scope) {

	var userList = [
		{ name : "고재도", email : "haibane84@gmail.com", regDate : "2013-01-20" },
		{ name : "고재도2", email : "haibane84@gmail.com", regDate : "2013-01-20" },
		{ name : "고재도3", email : "haibane84@gmail.com", regDate : "2013-01-20" }
	];

	$scope.search = function() {
		$scope.userList = userList;
	};

	$scope.insert = function() {

		if($scope.userList !== undefined &&
			$scope.userList[$scope.userList.length-1].name !== undefined){
				
				$scope.userList.push({});
		}
	};

	$scope.edit = function(user) {
		user.edit = (user.edit) ? false : true;
	};

	$scope.del = function(index) {
		$scope.userList.splice(index, 1);
	};

});

/**
 * UserMnge Module
 *
 * Description
 */
angular.module('UserMnge', []).
	controller("controllerA",function($scope) {
		// ...
	}).
	directive('directiveA', ['$rootScope', function($rootScope){
		return {
			link: function($scope, iElm, iAttrs, controller) {
				// ...
			}
		};
	}])
	.filter('filterA',function() {
		// ...
	})
	.factory('serviceA',function() {
		return {
			//...
		};
	});










