package br.com.coldigogeladeiras.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

public interface MarcaDAO {
	
	public List<JsonObject> buscar(String valorBusca);
	
	public boolean cadastrar(String nomeMarca);
	
}
