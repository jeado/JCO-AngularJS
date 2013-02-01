/**
 * UserMnge Module
 */

// var factory = {
// 	getUserResource : function() {
// 		return new UserResource(factory.getAjax(), factory.getJsonParser());
// 	},
// 	getAjax : function() {
// 		return new Ajax();
// 	},
// 	getJsonParser : function() {
// 		return new JsonPartser();
// 	}
// };

angular.module('UserMnge', ['ngResource'])
.controller('mainCtrl',function($scope, UserResource) {

	// var userResource = factory.getUserResource();

	// var userResource = new UserResource(new Ajax(), new JsonParser());

	// var userList = [
	// 	{ name : "고재도", email : "haibane84@gmail.com", regDate : "2013-01-20" },
	// 	{ name : "고재도2", email : "haibane84@gmail.com", regDate : "2013-01-20" },
	// 	{ name : "고재도3", email : "haibane84@gmail.com", regDate : "2013-01-20" }
	// ];

	$scope.search = function(searchName) {
		var query = JSON.stringify((searchName === "") ? null : { name : searchName });
		
		$scope.userList = UserResource.query({q : query});
	};

	$scope.insert = function() {
		if($scope.userList !== undefined){
			if($scope.userList[$scope.userList.length-1] === undefined){
				$scope.userList.push({ edit : true });
			}else if($scope.userList[$scope.userList.length-1].name !== undefined){
				$scope.userList.push({ edit : true });
			}
		}
	};

	$scope.edit = function(user) {
		user.edit = (user.edit) ? false : true;

		if(user.edit === false){
			if(user instanceof UserResource){
				user.$update();
			}else {
				new UserResource(user).$save();
			}
		}
	};

	$scope.del = function(index) {
		var user = $scope.userList[index];
		
		if(user instanceof UserResource){
			user.$remove();
		}
		
		$scope.userList.splice(index, 1);
	};

})
.value('mongolabAPIKey','50728d46e4b088be4c29ea02')
.factory('UserResource',function($resource, mongolabAPIKey) {

	var User = $resource('https://api.mongolab.com/api/1/databases/jco-demo/collections/users/:id',{
		apiKey : mongolabAPIKey
	},{
		update : {method:'PUT'}
	});

	User.prototype.$remove = function(){
		User.remove({id: this._id.$oid});
	};

	User.prototype.$update = function() {
		return User.update({id: this._id.$oid},angular.extend({},this,{_id: undefined }));
	};

	return User;
});