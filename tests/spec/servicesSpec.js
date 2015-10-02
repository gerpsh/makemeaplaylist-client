describe("dataService", function() {
  var dataService, httpBackend
  beforeEach(function() {
    module('playlist');
    inject(function(_dataService_, $httpBackend) {
      dataService = _dataService_;
      httpBackend = $httpBackend;
    });
  });

  it("should return an actual response", function() {
    dataService.getASong.then(function(data) {
      expect(data.status).toEqual(1);
    });
  });

});
