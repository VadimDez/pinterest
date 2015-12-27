'use strict';

describe('Controller: WallCtrl', function () {

  // load the controller's module
  beforeEach(module('pinterestApp'));

  var WallCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WallCtrl = $controller('WallCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
