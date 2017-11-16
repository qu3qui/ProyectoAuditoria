app.controller('ParametroExtraccionController', ['$scope', 'ParametroRemoteResource', '$rootScope',
    function ($scope, ParametroRemoteResource, $rootScope) {

        $scope.parametro = {
            tipoExtraccion: 'default'
        };
        /**
         * Esta función observa la selección de extracción que realiza el usuario
         * y solicita la información de parametrización que se encuentra en
         * la base de datos
         */
        $scope.$watch('parametro.tipoExtraccion', function () {
            if ($scope.parametro.tipoExtraccion !== 'default') {
                if ($scope.parametro.tipoExtraccion === 'FTP') {
                    this.metodo = 2;
                } else {
                    if ($scope.parametro.tipoExtraccion === 'CARPETA_COMPARTIDA') {
                        this.metodo = 1;
                    }
                }
                ParametroRemoteResource.load(this.metodo).then(function (parametro) {
                    $scope.parametro = {
                        id: parametro.id,
                        usuario: parametro.usuario,
                        password: parametro.password,
                        servidor: parametro.servidor,
                        puerto: parametro.puerto,
                        directorio: parametro.directorio,
                        tipoExtraccion: parametro.tipoExtraccion
                    };
                }, function (status) {
                    console.log('Error', 'Hubo un problema cargando los parametros de la base de datos: '+status );
                });
            }
        });
        /**
         * Función que se encarga de actualizar el parámetro de extracción
         * en la base de datos
         */
        $scope.actualizar = function () {
            ParametroRemoteResource.update($scope.parametro).then(function () {
                $rootScope.actualizacionParametro = true;
                $rootScope.parametroTipoExtraccion = $scope.parametro.tipoExtraccion;
                sweetAlert('Exito', 'Se han actualizado los parámetros', 'success');
            }, function (status) {
                console.log('Error', 'Hubo un problema actualizando los parametros: '+status);
            });
        };
    }]);

