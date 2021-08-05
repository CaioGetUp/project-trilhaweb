COLDIGO.marca = new Object();

$(document).ready(function() {
	
	COLDIGO.PATH = "/ProjetoTrilhaWeb/rest/";
	
	COLDIGO.marca.cadastrar = function() {
		
		var marca = new Object();
		marca.nome = document.frmAddMarca.nome.value;
		
		$.ajax({
			type: "POST",
			url: COLDIGO.PATH + "marca/cadastrar",
			data: JSON.stringify(marca),
			success: function(msg) {
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
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
				
				dados = JSON.parse(dados);
				
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
				"	<th>Nome da Marca</th>" +
				"	<th>Status</th>" +
				"	<th>Ações</th>" +
				"</tr>";
		
		if (listaDeMarcas != undefined && listaDeMarcas.length > 0) {
			for (var i = 0; i < listaDeMarcas.length; i++) {
				tabela += "<tr>" +
						"<td>" + listaDeMarcas[i].nome + "</td>" +
						"<td align='center'>" +
							" <label class='switch'>  ";
								if (listaDeMarcas[i].status) {
									tabela += "<input type='checkbox' onclick=\"COLDIGO.marca.alterarStatus(" + listaDeMarcas[i].id + ", this)\" checked> ";
								} else {
									tabela += "<input type='checkbox' onclick=\"COLDIGO.marca.alterarStatus(" + listaDeMarcas[i].id + ", this)\"> ";
								}
							tabela +="<span class='slider round'></span> " +
							"</label>" +
						"</td>" +
						"<td align='center'>" +
							"<a><img onclick=\"COLDIGO.marca.exibirMarca(" + listaDeMarcas[i].id + ")\" src='../../imgs/edit.png' alt='Editar registro'></a>" +
							"<a><img onclick=\"COLDIGO.marca.excluirMarca(" + listaDeMarcas[i].id + ")\" src='../../imgs/delete.png' alt='Excluir registro'></a>" +
						"</td>" +
					"</tr>";
			}
		} else if (listaDeMarcas == "") {
			tabela += "<tr><td colspan='2'>Nenhum registro encontrado</td></tr>";
		}
		
		tabela += "</table>";
		return tabela;
	};
	
	COLDIGO.marca.buscar();
	
	COLDIGO.marca.exibirMarca = function(id) {
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorId",
			data: "id=" + id,
			success: function(marca) {
				marca = JSON.parse(marca);
				
				document.frmEditaMarca.idMarca.value = marca.id;
				document.frmEditaMarca.nome.value = marca.nome;
				
				var modalEditaMarca = {
					title: "Edita Marca",
					heigth: 400,
					width: 450,
					modal: true,
					buttons: {
						"Salvar": function() {
							COLDIGO.marca.alterarEdicao();
						},
						"Cancelar": function() {
							$(this).dialog("close");							
						}
					},
					close: function() {
						$(this).dialog("close");
					}
				}
				
				$("#modalEditaMarca").dialog(modalEditaMarca);
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao buscar a marca: " + info.status + " - " + info.statusText);
			}
		});
	};
	
	COLDIGO.marca.excluirMarca = function(id) {
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "produto/marcaUtilizada",
			data: "id=" + id,
			success: function(data) {
				if (Boolean.call(data)) {
					COLDIGO.exibirAviso("Existe um ou mais produtos atrelados a está marca. Para remover a marca exclua o produto vínculado na mesma.");
				} else {
					$.ajax({
						type: "DELETE",
						url: COLDIGO.PATH + "marca/excluir/" + id,
						success: function(msg) {
							COLDIGO.exibirAviso(msg);
							COLDIGO.marca.buscar();
						},
						error: function(info) {
							COLDIGO.exibirAviso("Erro ao excluir a marca: " + info.status + " - " + info.statusText);
						}
					});
				}
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro buscar marca em produtos: " + info.status + " - " + info.statusText);
			}
		});
	};
	
	COLDIGO.marca.alterarEdicao = function() {
		var marca = new Object();
		marca.id = document.frmEditaMarca.idMarca.value;
		marca.nome = document.frmEditaMarca.nome.value;
		
		$.ajax({
			type: "PUT",
			url: COLDIGO.PATH + "marca/alterar",
			data: JSON.stringify(marca),
			success: function(msg) {
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
				$("#modalEditaMarca").dialog("close");
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao editar a marca: " + info.status + " - " + info.statusText);
			}
		});
	};
	
	COLDIGO.marca.alterarStatus = function(id, checkbox) {
		var status = checkbox.checked ? 1 : 0;
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/alterarStatus",
			data: "id=" + id + "&status=" + status,
			success: function(msg) {
				COLDIGO.exibirAviso(msg);
			},
			error: function(info) {
				checkbox.checked=!checkbox.checked;
				COLDIGO.exibirAviso(info.message);
			}
		});
	};
	
});