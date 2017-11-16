app.filter("filtroEdad", function () {
    return function (input, conceptoEdad) {
        var salida = [];
        angular.forEach(input, function (persona) {
            if (conceptoEdad === null) {
                salida.push(persona);
            } else {
                for (var i = 0; i < persona.documentos.length; i++) {
                    if (persona.documentos[i].tipoClasificacion === conceptoEdad) {
                        salida.push(persona);
                    }
                }

            }
        });
        return salida;
    };
});