COLDIGO.produto = new Object();

$(document).ready(function() {
	
	COLDIGO.produto.carregarMarcas = function() {
		alert("Tentando buscar marcas");
		$.ajax({
			type: "GET",
			url: "/ProjetoTrilhaWeb/rest/marca/buscar",
			success: function(marcas) {
				alert("Sucesso!");
			},
			error: function(info) {
				alert("Erro");
			}
		});
		
	}
	
	COLDIGO.produto.carregarMarcas();
});