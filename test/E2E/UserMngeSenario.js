describe("UserMnge 시나리오 테스트", function() {
    beforeEach(function() {
      browser().navigateTo("index.html");
    });

    describe("사용자 CRUD 테스트", function() {
    	it("새로운 사용자를 입력한다.", function() {
    	  element('.input-append button').click();
    	  element('button[ng-click="insert()"]').click();
	
				input("user.name").enter("테스트 사용자");
    	  element('tr[ng-repeat="user in userList"]:last button.btn-info').click();

    	  expect(element('tr[ng-repeat="user in userList"]:last input[ng-model="user.name"]').val()).toEqual("테스트 사용자");
    	});

      it("검색 조건을 입력하면 테스트 사용자를 입력하면 검색된다.", function() {
      	input("searchName").enter("테스트 사용자");
      	element(".input-append button").click();

      	expect(repeater('table tbody tr[ng-repeat="user in userList"]').count()).toEqual(1);
      });

      it("테스트 사용자의 이름을 수정한다.", function() {
      	input("searchName").enter("테스트 사용자");
      	element(".input-append button").click();

      	element('tr[ng-repeat="user in userList"]:last button.btn-danger[ng-click="edit(user)"]').click();
      	input("user.name").enter("테스트 사용자2");
				element('tr[ng-repeat="user in userList"]:last button.btn-info').click();
      	
      	expect(element('tr[ng-repeat="user in userList"]:last input[ng-model="user.name"]').val()).toEqual("테스트 사용자2");
      });

      it("수정한 사용자를 삭제 한다.", function() {
				input("searchName").enter("테스트 사용자2");
      	element(".input-append button").click();

      	element('tr[ng-repeat="user in userList"]:last button[ng-click="del($index)"]').click();

      	expect(repeater('table tbody tr[ng-repeat="user in userList"]').count()).toEqual(0);
      }); 
    });
});