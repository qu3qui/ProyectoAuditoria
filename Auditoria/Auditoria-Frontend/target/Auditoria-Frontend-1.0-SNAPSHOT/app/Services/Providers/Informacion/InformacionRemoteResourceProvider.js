function InformacionRemoteResourceProvider() {
    var _baseUrl;
    this.setBaseUrl = function (baseUrl) {
        _baseUrl = baseUrl;
    };
    this.$get = ['$http', '$q', function ($http, $q) {
        return new InformacionRemoteResource($http, $q, _baseUrl);
    }];
}

app.provider("InformacionRemoteResource", InformacionRemoteResourceProvider);


