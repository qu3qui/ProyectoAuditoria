app.filter("filtroDocumento", ["$filter", function ($filter) {
        var filterFn = $filter("filter");


        /** Esta función es el comparator en el filter **/
        function comparator(actual, expected) {
            if (actual.indexOf(expected) >= 0) {
                return true;
            } else {
                return false;
            }
        }

        /** Este es realmente el filtro **/
        function filteri18n(array, expression) {
            //Lo único que hace es llamar al filter original pero pasado
            //la nueva función de comparator
            return filterFn(array, expression, comparator)
        }

        return filteri18n;

    }]);
