COLDIGO.produto = new Object();

$(document).ready(function() {
	
	COLDIGO.PATH = "/ProjetoTrilhaWeb/rest/";
	
	COLDIGO.produto.carregarMarcas = function(id) {
		if (id != undefined) {
			select = "#selMarcaEdicao";
		} else {
			select = "#selMarca";
		}
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			success: function(marcas) {
				
				marcas = JSON.parse(marcas);
				
				if (marcas != "") {
					
					$(select).html("");
					var option = document.createElement("option");
					option.setAttribute("value", "");
					option.innerHTML = ("Escolha");
					$(select).append(option);
					
					for (var i = 0; i < marcas.length; i++) {
						
						var option = document.createElement("option");
						option.setAttribute("value", marcas[i].id);
						
						if ((id != undefined) && (id == marcas[i].id)) 
							option.setAttribute("selected", "selected");
							
						option.innerHTML = (marcas[i].nome);
						$(select).append(option);
					
					}
					
				} else {
					
					$(select).html("");
					var option = document.createElement("option");
					option.setAttribute("value", "");
					option.innerHTML = ("Erro ao carregar marcas!");
					$(select).append(option);
					$(select).addClass("aviso");
					
				}
				
			},
			error: function(info) {
				
				COLDIGO.exibirAviso("Erro ao buscar as marcas: " + info.status + " - " + info.statusText);
				
				$(select).html("");
				var option = document.createElement("option");
				option.setAttribute("value", "");
				option.innerHTML = ("Erro ao carregar marcas!");
				$(select).append(option);
				$(select).addClass("aviso");
				
			}
		});
	};
	
	COLDIGO.produto.carregarMarcas();
	
	COLDIGO.produto.cadastrar = function() {
		
		var produto = new Object();
		produto.categoria = document.frmAddProduto.categoria.value;
		produto.marcaId = document.frmAddProduto.marcaId.value;
		produto.modelo = document.frmAddProduto.modelo.value;
		produto.capacidade = document.frmAddProduto.capacidade.value;
		produto.valor = document.frmAddProduto.valor.value.replace(",", ".");
		
		var rg = new RegExp("^([0-9]{1,5}|([0-9]{1,5}[\.][0-9]{1,2}))$");
		
		if (rg.test(produto.valor) && produto.categoria != "" && produto.marcaId != "" && produto.modelo != "" && produto.capacidade != "") {
			$.ajax({
				type: "GET",
				url: COLDIGO.PATH + "marca/buscarPorId",
				data: "id=" + produto.marcaId,
				success: function(marca) {
					if (marca) {
						$.ajax({
							type: "POST",
							url: COLDIGO.PATH + "produto/inserir",
							data: JSON.stringify(produto),
							success: function(msg) {
								COLDIGO.exibirAviso(msg);
								COLDIGO.produto.buscar();
								$("#addProduto").trigger("reset");
							},
							error: function(info) {
								COLDIGO.exibirAviso("Erro ao cadastrar um novo produto: " + info.status + " - " + info.statusText);
							}
						});
					} else {
						COLDIGO.exibirAviso("Marca não existe, para criar produto é necessário inserir somente marcas válidas.");
						COLDIGO.carregaPagina('marcas');
					}
				},
				error: function(info) {
					
				}
			});
		} else {
			COLDIGO.exibirAviso("Necessário preencher todos os campos e o campo de valor deve ser preenchido com a formatação correta. \n Exemplo: 00000,00 ou 00000!");
		}
	};
	
	COLDIGO.produto.buscar = function() {
		
		var valorBusca = $("#campoBuscaProduto").val();
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "produto/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados) {
				
				dados = JSON.parse(dados);
				
				$("#listaProdutos").html(COLDIGO.produto.exibir(dados));
				
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao consultar os contatos: " + info.status + " - " + info.statusText);
			}
		});
	};
	
	COLDIGO.produto.exibir = function(listaDeProdutos) {
		
		var tabela = "<table>" +
		"<tr>" +
		"<th>Categoria</th>" +
		"<th>Marca</th>" +
		"<th>Modelo</th>" +
		"<th>Cap.(l)</th>" +
		"<th>Valor</th>" +
		"<th class='acoes'>Ações</th>" +
		"</tr>";
		
		if (listaDeProdutos != undefined && listaDeProdutos.length > 0) {
			for (var i = 0; i < listaDeProdutos.length; i++) {
				tabela += "<tr>" +
						  "<td>" + listaDeProdutos[i].categoria + "</td>" +
						  "<td>" + listaDeProdutos[i].marcaNome + "</td>" +
						  "<td>" + listaDeProdutos[i].modelo + "</td>" +
						  "<td>" + listaDeProdutos[i].capacidade + "</td>" +
						  "<td> R$ " + COLDIGO.formatarDinheiro(listaDeProdutos[i].valor) + "</td>" +
						  "<td>" +
						  		"<a onclick=\"COLDIGO.produto.exibirEdicao('" + listaDeProdutos[i].id + "')\"><img src='../../imgs/edit.png' alt='Editar registro'></a>" +
						  		"<a onclick=\"COLDIGO.produto.escolhaDeExcluir('" + listaDeProdutos[i].id + "','" + listaDeProdutos[i].categoria + "','" + listaDeProdutos[i].modelo + "')\">" +
						  				"<img src='../../imgs/delete.png' alt='Excluir registro'></a>" +
						  "</td>" +
						  "</tr>"
			}
		} else if (listaDeProdutos == "") {
			tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
		}
		
		tabela += "</table>";
		
		return tabela;
	};
	
	COLDIGO.produto.buscar();
	
	COLDIGO.produto.escolhaDeExcluir = function(id, categoria, modelo) {
		var modalEscolha = $("#modalEscolhaExclusao"); 

		var modalEditaProduto = {
			title: "Atenção!",
			heigth: 350,
			width: 550,
			modal: true,
			buttons: {
				"Ok": function() {
					$(modalEscolha).dialog("close");
					COLDIGO.produto.excluir(id);
				},
				"Cancelar": function() {
					$(this).dialog("close");							
				}
			}
		};
		
		modalEscolha.html(
				"<h3>Deseja continuar exclusão do produto?</h3>" +
				"<p>Categoria: " + categoria + "</p>" +
				"<p>Modelo: " + modelo + "</p>"
		);
		modalEscolha.dialog(modalEditaProduto);
	};
	
	COLDIGO.produto.excluir = function(id) {
		$.ajax({
			type: "DELETE",
			url: COLDIGO.PATH + "produto/excluir/"+id,
			success: function(msg) {
				COLDIGO.exibirAviso(msg);
				COLDIGO.produto.buscar();
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao excluir produto: " + info.status + " - " + info.statusText);
			}
		});
	};
	
	COLDIGO.produto.exibirEdicao = function(id) {
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "produto/buscarPorId",
			data: "id="+id,
			success: function(produto){
				
				document.frmEditaProduto.idProduto.value = produto.id;
				document.frmEditaProduto.modelo.value = produto.modelo;
				document.frmEditaProduto.capacidade.value = produto.capacidade;
				document.frmEditaProduto.valor.value = produto.valor;
				
				var selCategoria = document.getElementById("selCategoriaEdicao");
				for (var i = 0; i < selCategoria.length; i++) {
					if (selCategoria[i].value == produto.categoria) {
						selCategoria.options[i].setAttribute("selected", "selected");
					} else {
						selCategoria.options[i].removeAttribute("selected");
					}
				}
				
				COLDIGO.produto.carregarMarcas(produto.marcaId);
				
				var modalEditaProduto = {
					title: "Editar Produto",
					heigth: 400,
					width: 550,
					modal: true,
					buttons: {
						"Salvar": function() {
							COLDIGO.produto.editar();
						},
						"Cancelar": function() {
							$(this).dialog("close");							
						}
					},
					close: function() {
						
					}
				};
				
				$("#modalEditaProduto").dialog(modalEditaProduto);
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao buscar produto para edição: " + info.status + " - " + info.statusText);
			}
		});
	};
	
	COLDIGO.produto.editar = function() {
		
		var produto = new Object();
		produto.id = document.frmEditaProduto.idProduto.value;
		produto.categoria = document.frmEditaProduto.categoria.value;
		produto.marcaId = document.frmEditaProduto.marcaId.value;
		produto.modelo = document.frmEditaProduto.modelo.value;
		produto.capacidade = document.frmEditaProduto.capacidade.value;
		produto.valor = document.frmEditaProduto.valor.value;
		
		var rg = new RegExp("^([0-9]{1,5}|([0-9]{1,5}[\.][0-9]{1,2}))$");
		
		if (rg.test(produto.valor) && produto.categoria != "" && produto.marcaId != "" && produto.modelo != "" && produto.capacidade != "") {
			$.ajax({
				type: "PUT",
				url: COLDIGO.PATH + "produto/alterar",
				data: JSON.stringify(produto),
				success: function(msg) {
					COLDIGO.exibirAviso(msg);
					COLDIGO.produto.buscar();
					$("#modalEditaProduto").dialog("close");
				},
				error: function(info) {
					COLDIGO.exibirAviso("Erro ao editar produto: " + info.status + " - " + info.statusText);
				}
			});
		} else {
			COLDIGO.exibirAviso("Para que possa alterar, deve-se seguir a formatação correta. \n Exemplo: 00000,00 ou 00000!");
		}
	};
	
});