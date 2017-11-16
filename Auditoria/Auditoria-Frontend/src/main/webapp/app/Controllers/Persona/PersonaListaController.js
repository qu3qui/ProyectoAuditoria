app.controller('PersonaListaController', ['$scope', 'PersonaRemoteResource',
    'pageSizeValue', 'currentPageValue', 'listaDocumentos', '$uibModal', '$rootScope', function ($scope,
            PersonaRemoteResource, pageSizeValue, currentPageValue, listaDocumentos, $uibModal, $rootScope) {
                
        $scope.personas = [];
        $scope.personaExiste = false;
        $scope.filtro = {
            conceptoDocumento: "",
            conceptoEdad: null,
            conceptoDiferencia: null
        };
        $scope.pageSize = pageSizeValue;
        $scope.currentPage = currentPageValue;
        $scope.listaDocumentos = listaDocumentos;
        $scope.isCollapsed = true;

        if ($rootScope.archivos.length === 0 | $rootScope.actualizacionParametro === true) {
            PersonaRemoteResource.obtenerRutasArchivos($rootScope.parametroTipoExtraccion).then(function (archivos) {
                var numHilos = 1;
                if ($rootScope.parametroTipoExtraccion === 'CARPETA_COMPARTIDA') {
                    numHilos = archivos.archivos.length;
                }
                $scope.recuperarPersonas(archivos, numHilos);
            }, function (status) {
                console.log('Error', 'Problema recuperando rutas de archivos: ' + status, 'error');
            });
        } else {
            $scope.archivos = $rootScope.archivos;
            $scope.personas = $rootScope.personas;
        }

        /**
         * Funcion que utiliza la lista de archivos y dependiendo del tipo de extracción, 
         * ejecuta un número determinado de peticiones asíncronas
         * @param {type} archivos
         * @param {type} numHilos
         * @returns {undefined}
         */
        $scope.recuperarPersonas = function (archivos, numHilos) {
            $scope.archivos = archivos.archivos;
            $rootScope.archivos = $scope.archivos;
            $rootScope.actualizacionParametro = false;

            var inicial = 0;
            var distancia = parseInt($scope.archivos.length / numHilos);
            var final = distancia - 1;

            for (var i = 0; i < numHilos; i++) {

                $scope.recuperarPersona(inicial, final, i, $rootScope.parametroTipoExtraccion);
                inicial = inicial + distancia;
                final = final + distancia;
            }

            var modulo = $scope.archivos.length % numHilos;

            if (modulo !== 0) {
                $scope.recuperarPersona($scope.archivos.length - modulo, $scope.archivos.length - 1, " FINAL", $rootScope.parametroTipoExtraccion);
            }
        };

        /**
         * Esta funcion se encarga de buscar la incidencia de un documento
         * de nuestra lista de documentos establecida en la lista de documentos
         * de cada persona
         * @param {type} documento
         * @param {type} persona
         * @returns {Boolean}
         */
        $scope.BuscarDocumento = function (documento, persona) {
            for (var i = 0; i < persona.documentos.length; i++) {
                if (documento === persona.documentos[i].tipoClasificacion) {
                    return "glyphicon glyphicon-ok green";
                }
            }
            ;
            return "glyphicon glyphicon-remove red";
        };

        /*
         * Función que se encarga de buscar y reportar la existencia de 
         * certififcados laborales asociados a una persona
         * @param {type} persona
         * @returns {String}
         */
        $scope.CertificadoLaboral = function (persona) {
            for (var i = 0; i < persona.documentos.length; i++) {
                if ("CERTIFICADO_LABORAL" === persona.documentos[i].tipoClasificacion) {
                    return "glyphicon glyphicon-file";
                }
            }
            ;
            return "glyphicon glyphicon-remove red";
        };

        /*
         * Función que tiene como objetivo verificar la igualdad de la información
         * obtenida utilizando el OCR y la base de datos
         * @param {type} comparacion
         * @returns {String}
         */
        $scope.DiferenciaConAfiliado = function (comparacion) {
            if (comparacion === "SI") {
                return "glyphicon glyphicon-remove red";
            } else {
                if (comparacion === "NO") {
                    return "glyphicon glyphicon-ok green";
                } else {
                    return "glyphicon glyphicon-exclamation-sign orange";
                }
            }
        };

        /**
         * Esta funcion se encarga modificar el filtro que vamos a utilizar para el
         * concepto de edad
         * @param {type} concepto
         * @returns {undefined}
         */
        $scope.filtroEdad = function (concepto) {
            $scope.filtro.conceptoEdad = concepto;
        };
        /*
         * Función que permite modificar el filtro de diferencias en los archivos
         * @param {type} concepto
         * @returns {undefined}
         */
        $scope.filtroDiferencia = function (concepto) {
            $scope.filtro.conceptoDiferencia = concepto;
        };
        $scope.reiniciarFiltros = function () {
            $scope.filtro.conceptoDiferencia = "";
            $scope.filtro.conceptoEdad = "";
            $scope.filtro.conceptoDocumento = "";
        };
        /**
         * Esta funcion se encarga de llamar al servicio remoto para recuperar la 
         * información de una persona asociada a cada archivo
         * @param {type} Pinicial
         * @param {type} Pfinal
         * @returns {undefined}
         */
        $scope.recuperarPersona = function (Pinicial, Pfinal, hilo, tipoExtraccion) {
            PersonaRemoteResource.obtenerPersona($scope.archivos[Pinicial].ruta, tipoExtraccion)
                    .then(function (persona) {
                        $scope.asociarPersonas(persona, Pinicial, Pfinal, hilo, tipoExtraccion);
                    }, function (status) {
                        console.log('Error', 'Hubo un problema con el archivo: ' +
                                $scope.archivos[Pinicial].ruta + "/n" + status, 'error');
                        if (Pinicial < Pfinal) {
                            $scope.recuperarPersona(Pinicial + 1, Pfinal, hilo, tipoExtraccion);
                        }
                    });
        };
        /**
         * Funcion que se encarga de llamar la función encargada de asociar un documento
         * por cada persona, se utiliza debido a los tipos de extracción que pueden haber, 
         * ya que invocan servicios diferentes cada uno
         * @param {type} persona
         * @param {type} Pinicial
         * @param {type} Pfinal
         * @param {type} hilo
         * @param {type} parametroTipoExtraccion
         * @returns {undefined}
         */
        $scope.asociarPersonas = function (persona, Pinicial, Pfinal, hilo, parametroTipoExtraccion) {
            console.log(Pinicial + "Numero hilo: " + hilo);
            if (persona.numeroIdentificacion !== null) {
                $scope.asociarPersona(persona);
            }

            if (Pinicial < Pfinal) {
                $scope.recuperarPersona(Pinicial + 1, Pfinal, hilo, parametroTipoExtraccion);
            }
        };

        /**
         * Esta función se encarga de crear o asociar la información de una
         * persona de acuerdo a su numero de identificación
         * @param {type} persona
         * @returns {undefined}
         */
        $scope.asociarPersona = function (persona) {

            for (var i = 0; i < $scope.personas.length; i++) {
                if (persona.numeroIdentificacion === $scope.personas[i].numeroIdentificacion) {

                    $scope.personas[i].documentos.push(persona.documentos[0]);
                    if (persona.documentos[0].tipoClasificacion === 'FORMULARIO_VINCULACION')
                    {
                        $scope.personas[i].numeroSolicitudFormularioVinculacion = persona.numeroSolicitudFormularioVinculacion;
                    } else if (persona.documentos[0].tipoClasificacion === 'CEDULA') {
                        $scope.personas[i].apellidos = persona.apellidos;
                        $scope.personas[i].estatura = persona.estatura;
                        $scope.personas[i].fechaExpedicion = persona.fechaExpedicion;
                        $scope.personas[i].fechaNacimiento = persona.fechaNacimiento;
                        $scope.personas[i].nombres = persona.nombres;
                        $scope.personas[i].rh = persona.rh;
                        $scope.personas[i].genero = persona.genero;
                        $scope.personas[i].comparacion = persona.comparacion;
                    }


                    $scope.personaExiste = true;
                }
            }
            if ($scope.personaExiste === false) {
                $scope.personas.push(persona);
            }
            $scope.personaExiste = false;
            $rootScope.personas = $scope.personas;
        };

        /**
         * Función que abre un modal el cual contiene detalles acerca de una
         * persona en específico
         * @param {type} personaDetalle
         * @returns {undefined}
         */
        $scope.mostrarDetalle = function (personaDetalle) {
            setTimeout(function () {
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/Views/Persona/ModalDetalle.html',
                    controller: 'ModalDetalleController',
                    size: 'lg',
                    resolve: {
                        persona: function () {
                            return personaDetalle;
                        }
                    }
                });

            }, 300);
        };

        /*
         * Función que abre un modal donde se muestra la historia laboral
         * de una persona en específico
         */
        $scope.mostrarHistoriaLaboral = function (persona) {
            setTimeout(function () {
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/Views/Persona/ModalHistoriaLaboral.html',
                    controller: 'ModalHistoriaLaboralController',
                    size: 'lg',
                    resolve: {
                        persona: function () {
                            return persona;
                        }
                    }
                });

            }, 300);
        };
    }]);


