package br.com.coldigogeladeiras.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.modelo.Marca;

public interface MarcaDAO {
	
	public List<JsonObject> buscar(String valorBusca);
	
	public List<JsonObject> buscarAtivos();
	
	public boolean cadastrar(Marca marca);
	
	public boolean excluir(int id);
	
	public boolean alterar(Marca marca);
	
	public Marca buscarPorId(int id);
	
	public boolean existeMarca(int id);
	
	public boolean alterarStatus(int id, int status);
	
	public boolean validarDuplicidade(Marca marca, boolean alterar);
}
