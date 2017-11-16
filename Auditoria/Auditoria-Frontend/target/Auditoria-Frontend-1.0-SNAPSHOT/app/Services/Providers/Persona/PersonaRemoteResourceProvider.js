function PersonaRemoteResourceProvider() {
    var _baseUrl;
    this.setBaseUrl = function (baseUrl) {
        _baseUrl = baseUrl;
    };
    this.$get = ['$http', '$q', function ($http, $q) {
        return new PersonaRemoteResource($http, $q, _baseUrl);
    }];
}
app.provider("PersonaRemoteResource", PersonaRemoteResourceProvider);

