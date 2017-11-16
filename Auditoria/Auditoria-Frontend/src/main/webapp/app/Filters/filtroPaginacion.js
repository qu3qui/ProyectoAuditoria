app.filter('filtroPaginacion', function(){
	return function(data, start) {
		if (!data || !data.length) { return; }
		return data.slice(start);
	};
});
