package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;

public class JDBCMarcaDAO implements MarcaDAO {
	
	private Connection conexao;
	
	public JDBCMarcaDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public List<JsonObject> buscar(String valorBusca) {
		
		String comando = "SELECT * FROM marcas ";
		
		if (valorBusca != "") {
			comando += "WHERE nome LIKE '%" + valorBusca + "%' ";
		}

		comando += " ORDER BY nome ASC";
		
		List<JsonObject> listMarcas = new ArrayList<JsonObject>();
		JsonObject marca = null;
		
		try {
			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			
			while (rs.next()) {
				marca = new JsonObject();
				
				int id = rs.getInt("id");
				String nome = rs.getString("nome");
				
				marca.addProperty("id", id);
				marca.addProperty("nome", nome);
				listMarcas.add(marca);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return listMarcas;
	}
	
	public boolean cadastrar(String nomeMarca) {
		
		String comando = "INSERT INTO marcas "
				+ "(nome) VALUES (?)";
		PreparedStatement p;
		
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, nomeMarca);
			
			p.execute();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
