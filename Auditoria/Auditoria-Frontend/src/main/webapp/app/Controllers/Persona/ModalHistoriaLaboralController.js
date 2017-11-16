app.controller('ModalHistoriaLaboralController', ['$scope', 'persona', '$uibModalInstance', 'PersonaRemoteResource', '$rootScope',
    function ($scope, persona, $uibModalInstance, PersonaRemoteResource, $rootScope) {
       
        /*
         * Función que recorre los documentos de manera recursiva para evitar
         * los llamados asíncronos con los que tiene problemas la extracción
         * de archivos FTP
         */
        $scope.recorrer = function (i) {
            if (i < persona.documentos.length) {
                if (persona.documentos[i].tipoClasificacion === 'CERTIFICADO_LABORAL') {
                    PersonaRemoteResource.ObtenerInformacionCertificado(persona.documentos[i].ruta, $rootScope.parametroTipoExtraccion).then(function (resultado) {
                        $scope.certificados.push(resultado);
                        $scope.recorrer(i+1);
                    }, function (status) {
                        console.log('Error', 'Problema obteniendo detalles del certificado laboral' + status, 'error');
                    });
                }
                else{
                    $scope.recorrer(i+1);
                }
            }
        };     
        
        /*
         * Funcion que tiene como objetivo cerrar el modal actual
         */
        $scope.cerrarModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.persona = persona;
        $scope.certificados = [];
        $scope.recorrer(0);
    }]);