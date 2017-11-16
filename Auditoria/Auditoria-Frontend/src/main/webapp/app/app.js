var app = angular.module('Audimagenes', ["ngRoute", "ngMessages", "ui.bootstrap", 'angular-loading-bar', 'ngAnimate']);

app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

app.config(['baseUrl', 'PersonaRemoteResourceProvider',
    function (baseUrl, PersonaRemoteResourceProvider) {
        PersonaRemoteResourceProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'ParametroRemoteResourceProvider',
    function (baseUrl, ParametroRemoteResourceProvider) {
        ParametroRemoteResourceProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'InformacionRemoteResourceProvider',
    function (baseUrl, InformacionRemoteResourceProvider) {
        InformacionRemoteResourceProvider.setBaseUrl(baseUrl);
    }
]);

app.constant('baseUrl', 'http://'+window.location.host+'/audimagenes-backend');

app.value('pageSizeValue', 5);
app.value('currentPageValue', 1);
app.value('listaDocumentos', [
    "CEDULA",
    "TARJETA_IDENTIDAD",
    "FORMULARIO_VINCULACION",
    "CERTIFICADO_INGRESOS_RETENCIONES"
]);

app.run(['$rootScope', function ($rootScope) {
        $rootScope.archivos = [];
        $rootScope.personas = [];
        $rootScope.actualizacionParametro = false;
        $rootScope.parametroTipoExtraccion = 'CARPETA_COMPARTIDA';
    }]);

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});



