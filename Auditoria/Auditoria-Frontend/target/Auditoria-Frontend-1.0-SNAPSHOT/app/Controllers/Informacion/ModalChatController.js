app.controller('ModalChatController', ['$scope', 'InformacionRemoteResource', function ($scope, InformacionRemoteResource) {
        $scope.mensajes = [];
        $scope.encuesta = [0, 0, 0];
        $scope.contexto = null;
        $scope.mensajeUsuario = "";
        var mensajeInicial={
            contenido: "inicio",
                contexto: $scope.contexto,
                encuesta: $scope.encuesta    
        };
        InformacionRemoteResource.procesarConversacion(mensajeInicial).then(function (mensajeRespuesta) {
                $scope.contexto = mensajeRespuesta.contexto;
                var mensajeRecibido = {
                    remitente: "other",
                    imagen: "images/logoWatson.png",
                    contenido: mensajeRespuesta.contenido
                };
                $scope.mensajes.push(mensajeRecibido);
                $scope.encuesta = mensajeRespuesta.encuesta;
            }, function (status) {
                console.log("Hubo un error" + status);
            });
        /*
         * Función que se encarga de agregar el mensaje enviado por el usuario
         * y procesar el mensaje para generar la respuesta basado en el agente
         * conversacional de IBM Watson.
         */    
        $scope.enviarMensaje = function (mensajeUsuario) {
            var mensajeEnviado = {
                remitente: "self",
                imagen: "images/user.jpg",
                contenido: mensajeUsuario
            };
            $scope.mensajes.push(mensajeEnviado);
            $scope.mensajeUsuario = "";
            var mensajeDTO = {
                contenido: mensajeUsuario,
                contexto: $scope.contexto,
                encuesta: $scope.encuesta
            };
            InformacionRemoteResource.procesarConversacion(mensajeDTO).then(function (mensajeRespuesta) {
                $scope.contexto = mensajeRespuesta.contexto;
                var mensajeRecibido = {
                    remitente: "other",
                    imagen: "images/logoWatson.png",
                    contenido: mensajeRespuesta.contenido
                };
                $scope.mensajes.push(mensajeRecibido);
                $scope.encuesta = mensajeRespuesta.encuesta;
            }, function (status) {
                console.log("Hubo un error" + status);
            });
        };
    }]);

