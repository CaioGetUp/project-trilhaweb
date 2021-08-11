package br.com.coldigogeladeiras.rest;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.bd.Conexao;
import br.com.coldigogeladeiras.jdbc.JDBCProdutoDAO;
import br.com.coldigogeladeiras.modelo.Produto;

@Path("produto")
public class ProdutoRest extends UtilRest {

	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String produtoParam) {
		
		 try {
			Produto produto = new Gson().fromJson(produtoParam, Produto.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProdutoDAO jdbcProduto = new JDBCProdutoDAO(conexao);

			if (jdbcProduto.validaDuplicidade(produto, false)) {
				conec.fecharConexao();
				
				return this.buildErrorResponse("Produto no qual esteja tentando inserir, j� possui informa��es similares cadastrado em outro produto. (Categoria, Marca e Modelo)");
			} else {
				boolean retorno = jdbcProduto.inserir(produto);
				
				conec.fecharConexao();
				if (retorno) {
					return this.buildResponse("Produto cadastrado com sucesso!");
				} else {
					return this.buildErrorResponse("Erro ao cadastrar produto.");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/buscar")
	@Produces("application/*")
	public Response buscarPorNome(@QueryParam("valorBusca") String nome) {
		try {
			List<JsonObject> listaProdutos = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProdutoDAO jdbcProduto = new JDBCProdutoDAO(conexao);
			listaProdutos = jdbcProduto.buscarPorNome(nome);
			
			conec.fecharConexao();
			return this.buildResponse(listaProdutos);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@DELETE
	@Path("/excluir/{id}")
	@Produces("application/*")
	public Response excluir(@PathParam("id") int id) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProdutoDAO jdbcProduto = new JDBCProdutoDAO(conexao);
			boolean retorno = jdbcProduto.deletar(id);
			
			conec.fecharConexao();
			if (retorno) {
				return this.buildResponse("Produto excluído com sucesso!");
			} else {
				return this.buildErrorResponse("Erro ao excluir produto.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/buscarPorId")
	@Produces("application/*")
	public Response buscarPorId(@QueryParam("id") int id) {
		
		try {
			Produto produto = new Produto();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProdutoDAO jdbcProduto = new JDBCProdutoDAO(conexao);
			
			produto = jdbcProduto.buscarPorId(id);
			
			conec.fecharConexao();
			return this.buildResponse(produto);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@PUT
	@Path("/alterar")
	@Consumes("application/*")
	public Response alterar(String produtoParam) {
		try {
			Produto produto = new Gson().fromJson(produtoParam, Produto.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProdutoDAO jdbcProduto = new JDBCProdutoDAO(conexao);
			
			if (jdbcProduto.validaDuplicidade(produto, true)) {
				conec.fecharConexao();
				
				return this.buildErrorResponse("Não é possível alterar, pois já existe um produto com as mesmas informações!");
			} else {
				boolean retorno = jdbcProduto.alterar(produto);
				conec.fecharConexao();
				
				if (retorno) {
					return this.buildResponse("Produto alterado com sucesso!");
				} else {
					return this.buildErrorResponse("Erro ao alterar produto.");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/marcaUtilizada")
	@Produces("application/*")
	public Response marcaUtilizada(@QueryParam("id") int id) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProdutoDAO jdbcProduto = new JDBCProdutoDAO(conexao);
			boolean marcaUtilizada = jdbcProduto.buscarMarca(id);
			
			conec.fecharConexao();
			if (marcaUtilizada) {
				return this.buildErrorResponse("Existe um ou mais produtos atrelados nesta marca. Para remover a marca exclua o produto vínculado na mesma.");
			} else {
				return this.buildResponse(marcaUtilizada);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}
