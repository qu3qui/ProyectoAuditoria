app.config(['$routeProvider', function ($routeProvider) {
        
    $routeProvider.when('/', {
        templateUrl: "app/Views/main.html"
    });
    
    //RUTAS PERSONA
    $routeProvider.when('/persona/lista',{
        templateUrl: "app/Views/Persona/PersonaLista.html",
        controller: "PersonaListaController"
    });
    
    //RUTAS INFORMACION
    $routeProvider.when('/informacion/acercaDe',{
        templateUrl: "app/Views/Informacion/AcercaDe.html"
    });
    
    //RUTAS PARAMETRO
    $routeProvider.when('/parametro/parametroExtraccion',{
        templateUrl: "app/Views/Parametro/ParametroExtraccion.html",
        controller: "ParametroExtraccionController"
    });
    
    $routeProvider.otherwise({
        redirectTo: '/'
    });
    
}]);

