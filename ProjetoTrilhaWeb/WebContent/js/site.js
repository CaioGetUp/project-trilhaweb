function validaFaleConosco() {
	var nome = document.frmfaleconosco.txtnome.value;
	var expRegNome = new RegExp("^[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})+$");
	
	//Validação do Nome
	if (!expRegNome.test(nome)) {
		alert("Preencha o campo Nome Corretamente.");
		document.frmfaleconosco.txtnome.focus();
		return false;
	}
	
	var fone = document.frmfaleconosco.txtfone.value;
	var expRegFone = new RegExp("^[(]{1}[1-9]{2}[)]{1}[0-9]{4,5}[-]{1}[0-9]{4}$");
	//Corrigir
	
	//Validação do telefone
	if (!expRegFone.test(fone)) {
		alert("Preencha o campo Telefone Corretamente.");
		document.frmfaleconosco.txtfone.focus();
		return false;
	}
	
	//Validação do E-mail
	if (document.frmfaleconosco.txtemail.value=="") {
		alert("Preencha o campo E-mail.");
		document.frmfaleconosco.txtemail.focus();
		return false;
	}
	
	//Validação do Motivo
	if (document.frmfaleconosco.selmotivo.value=="") {
		alert("Selecione um Motivo.");
		document.frmfaleconosco.selmotivo.focus();
		return false;
	}
	
	//Validação do Motivo
	if (document.frmfaleconosco.selmotivo.value=="PR") {
		if (document.frmfaleconosco.selproduto.value=="") {
			alert("Escolha um Produto.");
			document.frmfaleconosco.selproduto.focus();
			return false;
		}
	}
	
	//Validação do Comentário
	if (document.frmfaleconosco.txacomentario.value=="") {
		alert("Preencha o campo Comentário.");
		document.frmfaleconosco.txacomentario.focus();
		return false;
	}
	
	return true;
}

function verificaMotivo(motivo) {
	//Capturamos a estrutura da div cujo ID é opcaoProduto na variável elemnto
	var elemento = document.getElementById("opcaoProduto");
	
	//Se o valor da variável motivo for "PR"
	if (motivo == "PR") {
		//Criamos um elemento (tag) <select> e guardamos na variável homônima
		var select = document.createElement("select");
		
		//Setamos nesse novo select o atributo 'name' com o valor 'selproduto'
		select.setAttribute("name", "selproduto");
		
		//Conteúdo atual da variável select:
		//<select name="selproduto"></select>
		
		//Criamos um elemento (tag) <option> e guardamos na variável homônia
		var option = document.createElement("option");
		//Setamos nesse novo option o atributo 'value' com o valor vázio
		option.setAttribute("value", "");
		
		//Criamos um nó de texto "Escolha" e gramos na variável 'texto'
		var texto = document.createTextNode("Escolha");
		//Colocamos o nó de texto criado como "filho" da tag option criado
		option.appendChild(texto);
		//Conteúdo atual da variável option:
		//<option value="">Escolha</option>
		
		//colocamos o option criado como "filho" da tag select criada
		select.appendChild(option);
		//Conteúdo atual da variável select:
		/*<select name="selproduto"><option value="">Escolha</option></select>*/
		
		/*Freezer*/
		//Criamos um elemento (tag) <option> e guardamos na variável homônia
		var option = document.createElement("option");
		//Setamos nesse novo option o atributo 'value' com o valor "FR"
		option.setAttribute("value", "FR");
		
		//Criamos um nó de texto "Freezer" e gramos na variável 'texto'
		var texto = document.createTextNode("Freezer");
		//Colocamos o nó de texto criado como "filho" da tag option criado
		option.appendChild(texto);
		//Conteúdo atual da variável option:
		//<option value="FR">Freezer</option>
		
		//colocamos o option criado como "filho" da tag select criada
		select.appendChild(option);
		//Conteúdo atual da variável select:
		/*<select name="selproduto"><option value="FR">Freezer</option></select>*/
		
		/*Geladeira*/
		//Criamos um elemento (tag) <option> e guardamos na variável homônia
		var option = document.createElement("option");
		//Setamos nesse novo option o atributo 'value' com o valor "GE"
		option.setAttribute("value", "GE");
		
		//Criamos um nó de texto "Geladeira" e gramos na variável 'texto'
		var texto = document.createTextNode("Geladeira");
		//Colocamos o nó de texto criado como "filho" da tag option criado
		option.appendChild(texto);
		//Conteúdo atual da variável option:
		//<option value="GE">Geladeira</option>
		
		//colocamos o option criado como "filho" da tag select criada
		select.appendChild(option);
		//Conteúdo atual da variável select:
		/*<select name="selproduto"><option value="FR">Freezer</option><option value="GE">Geladeira</option></select>*/
	
		//Colocamos o select criado como "filho" da tag div capturada no inicio da função
		elemento.appendChild(select);
		
	//Se o valor da variável motivo não for "PR"
	} else {
		//Se a div possuir algum "primeiro filho"
		if (elemento.firstChild) {
			//Removemos ele
			elemento.removeChild(elemento.firstChild);
		}
	}
	
}//fim da função verificaMotivo

//Assim que o documento HTML for carregado por completo...
$(document).ready(function() {
	//Carrega cabeçalho, menu e rodapé aos respectivos locais.
	$("header").load("/ProjetoTrilhaWeb/pages/site/general/cabecalho.html");
	$("nav").load("/ProjetoTrilhaWeb/pages/site/general/menu.html");
	$("footer").load("/ProjetoTrilhaWeb/pages/site/general/rodape.html");
});
