package br.com.coldigogeladeiras.rest;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
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
import br.com.coldigogeladeiras.jdbc.JDBCMarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;

@Path("marca")
public class MarcaRest extends UtilRest {
	
	@GET
	@Path("/buscar")
	@Produces("application/*")
	public Response buscar(@DefaultValue("") @QueryParam("valorBusca") String valorBusca) {
		try {
			List<JsonObject> listaMarcas = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			
			listaMarcas = jdbcMarca.buscar(valorBusca);
			
			conec.fecharConexao();
			return this.buildResponse(listaMarcas);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/buscarAtivos")
	@Produces("application/*")
	public Response buscarAtivos() {
		try {
			List<JsonObject> listaMarcas = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			
			listaMarcas = jdbcMarca.buscarAtivos();
			
			conec.fecharConexao();
			return this.buildResponse(listaMarcas);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@POST
	@Path("/cadastrar")
	@Consumes("application/*")
	public Response cadastrar(String marcaParam) {
		try {
			Marca marca = new Gson().fromJson(marcaParam, Marca.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			
			if (jdbcMarca.validarDuplicidade(marca, false)) {
				conec.fecharConexao();
				
				return this.buildErrorResponse("J� existe uma marca registrada com este nome!");
			} else {
				boolean retorno = jdbcMarca.cadastrar(marca);

				conec.fecharConexao();
				if (retorno) {
					return this.buildResponse("Marca foi salva com sucesso!");
				} else {
					return this.buildErrorResponse("Erro ao cadastrar marca.");
				}
			}
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
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			boolean retorno = jdbcMarca.excluir(id);
			conec.fecharConexao();
			
			if (retorno) {
				return this.buildResponse("Marca foi removida com sucesso!");
			} else {
				return this.buildErrorResponse("Erro ao remover marca.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/existeMarca")
	@Produces("application/*")
	public Response existeMarca(@QueryParam("id") int id) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			boolean marcaExistente = jdbcMarca.existeMarca(id);
			
			conec.fecharConexao();
			if (marcaExistente) {
				return this.buildResponse(marcaExistente);
			} else {
				return this.buildErrorResponse("Marca não existe, para criar produto é necessário inserir somente marcas válidas.");
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
			Marca marca = new Marca();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			marca = jdbcMarca.buscarPorId(id);
			
			conec.fecharConexao();
			return this.buildResponse(marca);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@PUT
	@Path("/alterar")
	@Consumes("application/*")
	public Response alterar(String marcaParam) {
		try {
			Marca marca = new Gson().fromJson(marcaParam, Marca.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			
			if (jdbcMarca.validarDuplicidade(marca, true)) {
				conec.fecharConexao();
				
				return this.buildErrorResponse("Não foi possível alterar, já existe uma marca com o mesmo nome. ");
			} else {
				boolean retorno = jdbcMarca.alterar(marca);
				conec.fecharConexao();
				
				if (retorno) {
					return this.buildResponse("Marca foi alterada com sucesso!");
				} else {
					return this.buildErrorResponse("Erro ao alterar marca.");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/alterarStatus")
	@Produces("application/*")
	public Response alterarStatus(@QueryParam("id") int id, @QueryParam("status") int status) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			
			if (jdbcMarca.validarDuplicidade(jdbcMarca.buscarPorId(id), true)) {
				conec.fecharConexao();
				
				return this.buildErrorResponse("Não foi possível alterar o status, já existe marca com o mesmo nome ativa, para poder ativar exclua marca com o mesmo nome");
			} else {
				boolean retorno = jdbcMarca.alterarStatus(id, status);
				
				conec.fecharConexao();
				if (retorno) {
					return this.buildResponse("Status da marca foi alterada com sucesso!");
				} else {
					return this.buildErrorResponse("Erro ao alterar status da marca.");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}
