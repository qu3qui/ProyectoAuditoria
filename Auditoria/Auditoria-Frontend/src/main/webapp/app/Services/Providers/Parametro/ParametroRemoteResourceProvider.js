function ParametroRemoteResourceProvider() {
    var _baseUrl;
    this.setBaseUrl = function (baseUrl) {
        _baseUrl = baseUrl;
    };
    this.$get = ['$http', '$q', function ($http, $q) {
        return new ParametroRemoteResource($http, $q, _baseUrl);
    }];
}

app.provider("ParametroRemoteResource", ParametroRemoteResourceProvider);


