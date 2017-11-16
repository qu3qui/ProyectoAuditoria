function PersonaRemoteResource ($http, $q, baseUrl){
    
    /*
     * Método que solicita la información de un archivo de una persona,
     * enviando la ruta del archivo y el tipo de extracción del mismo.
     */
    this.obtenerPersona = function (rutaArchivo, tipoExtraccion){
        var defered = $q.defer();
        var promise = defered.promise;
        var obtenerPersonaDTO = {
            rutaArchivo: rutaArchivo,
            tipoExtraccion: tipoExtraccion
        };
        $http({
            method: 'post',
            url: baseUrl + '/resources/persona/obtenerPersona',
            data: angular.toJson(obtenerPersonaDTO)
        }).success(function(data, status, headers, config){
            defered.resolve(data);     
        }).error(function(data, status, headers, config){
            defered.reject(status);
        });
        return promise;     
    };
    
    /*
     * Método que solicita al back-end la información de un afiliado,
     * que se encuentra en la persistencia a partir de su número de
     * identificación.
     */
    this.ObtenerAfiliado = function(numeroIdentificacion){
        var defered = $q.defer();
        var promise = defered.promise;
        $http({
            method: 'get',
            url: baseUrl + '/resources/afiliado/obtenerAfiliado/'+numeroIdentificacion    
        }).success(function(data, status, headers, config){
            defered.resolve(data);     
        }).error(function(data, status, headers, config){
            defered.reject(status);
        });       
        return promise;  
    };
    
    /*
     * Método que solicita todas las rutas de los archivos que se pueden 
     * procesar, indicndo el tipo de extracción, el cual esta ligado
     * a los parámetros necesarios en la persistencia.
     */
    this.obtenerRutasArchivos = function(tipoExtraccion){
         var defered = $q.defer();
        var promise = defered.promise;
        $http({
            method: 'post',
            url: baseUrl + '/resources/persona/obtenerRutasArchivos',
            data: angular.toJson(tipoExtraccion)
        }).success(function(data, status, headers, config){
            defered.resolve(data);     
        }).error(function(data, status, headers, config){
            defered.reject(status);
        });
        
        return promise;
    };
    
    /*
     * Método que se encargar de solicitar la imagen del documento de 
     * identificación de una persona.
     */
    this.ObtenerImagenesPersona = function(rutaArchivoPersona, tipoExtraccion){
        ArchivoDTO = {
            rutaArchivo : rutaArchivoPersona,
            tipoExtraccion : tipoExtraccion
        };
        var defered = $q.defer();
        var promise = defered.promise;
        
        $http({
            method: 'post',
            url: baseUrl + '/resources/persona/obtenerArchivo',
            data: angular.toJson(ArchivoDTO)
        
        }).success(function(data, status, headers, config){
            var rutaArchivos = data.archivos[0].split('\\');
            var archivo = rutaArchivos[rutaArchivos.length-1];
            defered.resolve(archivo);     
        }).error(function(data, status, headers, config){
            defered.reject(status);
        });       
        return promise;  
    };
    
    /*
     * Método que solicita al back-end la informacion de un certificado laboral,
     * enviando la ruta del archivo y la forma de extracción.
     */
    this.ObtenerInformacionCertificado = function(rutaArchivoPersona, tipoExtraccion){
        ArchivoDTO = {
            rutaArchivo : rutaArchivoPersona,
            tipoExtraccion : tipoExtraccion
        };
        var defered = $q.defer();
        var promise = defered.promise;
        $http({
            method: 'post',
            url: baseUrl + '/resources/persona/obtenerInformacionCertificado',
            data: angular.toJson(ArchivoDTO)  
        }).success(function(data, status, headers, config){
            defered.resolve(data);     
        }).error(function(data, status, headers, config){
            defered.reject(data);
        });       
        return promise;  
    };
}