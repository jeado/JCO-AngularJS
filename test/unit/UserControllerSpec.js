describe("mainCtrl", function() {
	
	var $httpBackend,
			userController,
			mongolabAPIKey,
			scope;

	beforeEach(module('UserMnge'));
	beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _mongolabAPIKey_) {
		
		scope = $rootScope.$new();
		mongolabAPIKey = _mongolabAPIKey_;
		$httpBackend = _$httpBackend_;

		$httpBackend.when('GET','https://api.mongolab.com/api/1/databases/jco-demo/collections/users?apiKey='+
			mongolabAPIKey+'&q=%7B%22name%22:%22%EA%B3%A0%EC%9E%AC%EB%8F%84%22%7D')
		.respond([{ _id : {$oid : 123}, name: '고재도', email: "haibane84@gmail.com"}]);

		userController = $controller("mainCtrl", {
        $scope: scope
    });
	}));

  it("사용자를 검색할 수 있어야 한다.", function() {
      scope.search("고재도");

      $httpBackend.flush();

      expect(scope.userList[scope.userList.length-1].name).toMatch("고재도");
  });

  it("사용자를 등록할 수 있어야 한다.", function() {
			var newUser,
					url="https://api.mongolab.com/api/1/databases/jco-demo/collections/users?apiKey=";

			scope.search("고재도");
			
			$httpBackend.flush();

			$httpBackend.expectPOST(url+mongolabAPIKey,
				'{"edit":false,"name":"고재도","email":"haibane84@gmail.com","regDate":"2012-03-01"}')
				.respond(200, '');

      scope.insert();
      
      newUser = scope.userList.pop();
      newUser.name = "고재도";
      newUser.email = "haibane84@gmail.com";
			newUser.regDate = "2012-03-01";

			scope.edit(newUser);

			$httpBackend.flush();
  });

  it("사용자를 수정할 수 있어야 한다.", function() {
  	var user,
  			url = "https://api.mongolab.com/api/1/databases/jco-demo/collections/users/123?apiKey=";

    scope.search("고재도");

		$httpBackend.flush();

		$httpBackend.expectPUT(url+mongolabAPIKey,
			'{"name":"고재도2","email":"haibane84@gmail.com","edit":false}')
			.respond(200, '');
		
    user = scope.userList.pop();
    user.edit = true;
    user.name = "고재도2";

    scope.edit(user);

		$httpBackend.flush();
  });

  it("사용자를 삭제할 수 있어야 한다.", function() {
		var user,
				url = "https://api.mongolab.com/api/1/databases/jco-demo/collections/users/123?apiKey=";   
  
    scope.search("고재도");

		$httpBackend.flush();

		$httpBackend.expectDELETE(url+mongolabAPIKey)
		.respond(200, '');
		
    scope.del(0);

		$httpBackend.flush();

		expect(scope.userList.length).toBe(0);
  });

});