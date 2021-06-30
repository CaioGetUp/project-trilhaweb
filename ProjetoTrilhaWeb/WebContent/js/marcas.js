COLDIGO.marca = new Object();

$(document).ready(function() {
	
	COLDIGO.PATH = "/ProjetoTrilhaWeb/rest/";
	
	COLDIGO.marca.cadastrar = function() {
		
		var nomeMarca = document.frmAddMarca.nome.value;
		
		$.ajax({
			type: "POST",
			url: COLDIGO.PATH + "marca/cadastrar",
			data: "nomeMarca=" + nomeMarca,
			success: function(msg) {
				COLDIGO.exibirAviso(msg);
				$("#addMarca").trigger("reset");
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao cadastrar uma nova marca: " + info.status + " - " + info.statusText);
			}
		});
	}
	
	COLDIGO.marca.buscar = function() {
		
		var valorBusca = $("#campoBuscaMarca").val();
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			data: "valorBusca=" + valorBusca,
			success: function(dados) {
				$("#listaMarca").html(COLDIGO.marca.exibirTabela(dados));
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao consultar as marcas: " + info.status + " - " + info.statusText);
			}
		});
	};
	
	COLDIGO.marca.exibirTabela = function(listaDeMarcas) {
		var tabela = "<table>" +
				"<tr>" +
				"	<th colspan='2'>Nome da Marca</th>" +
				"	<th>Ações</th>" +
				"</tr>";
		
		if (listaDeMarcas != undefined && listaDeMarcas.length > 0) {
			for (var i = 0; i < listaDeMarcas.length; i++) {
				tabela += "<tr>" +
					"<td colspan='2'>" + listaDeMarcas[i].nome + "</td>" +
					"<td align='center'>" +
						"<a><img src='../../imgs/edit.png' alt='Editar registro'></a>" +
						"<a><img src='../../imgs/delete.png' alt='Excluir registro'></a>" +
					"</td>" +
					"</tr>";
			}
		} else if (listaDeProdutos == "") {
			tabela += "<tr><td>Nenhum registro encontrado</td></tr>";
		}
		
		tabela += "</table>";
		return tabela;
	};
	
	COLDIGO.marca.buscar();
	
//	COLDIGO.marca.exibirEdicao = function(id) {
//		
//	}
});