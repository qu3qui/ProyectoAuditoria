function ParametroRemoteResource ($http, $q, baseUrl){
    /*
     * Método que envía al back-end los parámetros para ser actualizados en
     * la persistencia
     */
    this.update = function(parametro){
        var defered = $q.defer();
        var promise = defered.promise;
        $http({
            method: 'post',
            url: baseUrl + "/resources/parametrizacionExtraccion/actualizarParametro",
            data:angular.toJson(parametro)
        
        }).success(function(data, status, headers, config){
            defered.resolve(data);     
        }).error(function(data, status, headers, config){
            defered.reject(status);
        });       
        return promise;
    };
    
    /*
     * Método que solicita al back-end a partir de un id los parámetros de 
     * autenticación para cada tipo de extracción
     */
    this.load = function(id){
        var defered = $q.defer();
        var promise = defered.promise;
        
        $http({
            method: 'get',
            url: baseUrl + "/resources/parametrizacionExtraccion/obtenerParametro/"+id
        
        }).success(function(data, status, headers, config){
            defered.resolve(data);     
        }).error(function(data, status, headers, config){
            defered.reject(status);
        });       
        return promise;
    };
}

