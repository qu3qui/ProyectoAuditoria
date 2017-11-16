app.controller('ModalDetalleController', ['$scope', 'persona', '$uibModalInstance', 'PersonaRemoteResource', '$rootScope',
    function ($scope, persona, $uibModalInstance, PersonaRemoteResource, $rootScope) {
        $scope.archivoPersona = "";
        $scope.afiliado = {
            numeroDocumento: "",
            apellidos: "",
            nombres: "",
            genero: "",
            fechaNacimiento: ""
        };
        $scope.persona = persona;
        $scope.persona.fechaNacimiento = persona.fechaNacimiento;
        PersonaRemoteResource.ObtenerAfiliado(persona.numeroIdentificacion).then(function (afiliado) {
            if (afiliado !== "") {
                $scope.afiliado.numeroDocumento = afiliado.numeroDocumento.toString();
                $scope.afiliado.nombres = afiliado.nombres;
                $scope.afiliado.apellidos = afiliado.apellidos;
                $scope.afiliado.genero = afiliado.genero;
                $scope.afiliado.fechaNacimiento = afiliado.fechaNacimiento;
            }
        }, function (status) {
            console.log('Error', 'Problema recuperando el afiliado' + status, 'error');
        });
        
        for (var i = 0; i < persona.documentos.length; i++) {
            if ((persona.documentos[i].tipoClasificacion === 'CEDULA') | (persona.documentos[i].tipoClasificacion === 'TARJETA_IDENTIDAD')) {
                PersonaRemoteResource.ObtenerImagenesPersona(persona.documentos[i].ruta, $rootScope.parametroTipoExtraccion).then(function (rutaArchivo) {
                    $scope.archivoPersona = "http://" + window.location.host + "/images/" + rutaArchivo;
                }, function (status) {
                    console.log('Error', 'Problema recuperando el documento de identificacion de la persona' + status, 'error');
                });
                break;
            }
        }


        /*
         * Función que se encarga de verififcar la igualdad entre la información de una
         * persona, obtenida a través del OCR y la información de un afiliado, obtenida
         * de la base de datos
         * @param {type} campoPersona
         * @param {type} campoAfiliado
         * @returns {String}
         */
        $scope.compararConAfiliado = function (campoPersona, campoAfiliado) {
            if (campoPersona === campoAfiliado) {
                return "glyphicon glyphicon-ok green";
            } else {
                return "glyphicon glyphicon-remove red";
            }
        };

        /*
         * Función que tiene como objetivo principal, cerrar el modal actual
         */
        $scope.cerrarModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);


