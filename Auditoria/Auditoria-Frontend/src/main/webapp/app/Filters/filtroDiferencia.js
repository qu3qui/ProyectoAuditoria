app.filter("filtroDiferencia", function () {
    return function (input, conceptoDiferencia) {
        var salida = [];
        angular.forEach(input, function (persona) {
            if (conceptoDiferencia === null) {
                salida.push(persona);
            } else {
                if (persona.comparacion === conceptoDiferencia) {
                    salida.push(persona);
                }

            }
        });
        return salida;
    };
});

