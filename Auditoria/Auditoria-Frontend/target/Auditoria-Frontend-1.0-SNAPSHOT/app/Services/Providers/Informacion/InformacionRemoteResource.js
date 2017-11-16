function InformacionRemoteResource ($http, $q, baseUrl){
    /*
     * Método que envia un mensaje al back-end para ser procesado y generar
     * una respuesta.
     */
    this.procesarConversacion = function(mensaje){
        var defered = $q.defer();
        var promise = defered.promise;
        $http({
            method: 'post',
            url: baseUrl + "/resources/informacion/procesarConversacion",
            data: angular.toJson(mensaje)
        }).success(function(data, status, headers, config){
            defered.resolve(data);     
        }).error(function(data, status, headers, config){
            defered.reject(status);
        });       
        return promise;
    };
}

