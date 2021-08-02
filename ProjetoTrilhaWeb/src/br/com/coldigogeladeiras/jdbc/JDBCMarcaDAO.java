package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;

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
				int status = rs.getInt("status");
				
				marca.addProperty("id", id);
				marca.addProperty("nome", nome);
				marca.addProperty("status", status);
				listMarcas.add(marca);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return listMarcas;
	}
	
	public boolean cadastrar(Marca marca) {
		
		String comando = "INSERT INTO marcas "
				+ "(id, nome, status) VALUES (?,?, ?)";
		PreparedStatement p;
		
		try {
			p = this.conexao.prepareStatement(comando);
			
			p.setInt(1, marca.getId());
			p.setString(2, marca.getNome());
			p.setInt(3, marca.getStatus());
			
			p.execute();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public boolean excluir(int id) {
		
		String comando = "DELETE FROM marcas WHERE id = ?";
		PreparedStatement p;
		
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			p.execute();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public Marca buscarPorId(int id) {
		String comando = "SELECT * FROM marcas WHERE marcas.id = ?";
		Marca marca = new Marca();
		PreparedStatement p;
		
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			
			while (rs.next()) {
				marca.setId(rs.getInt("id"));
				marca.setNome(rs.getString("nome"));
				marca.setStatus(rs.getInt("status"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return marca;
	}
	
	public boolean alterar(Marca marca) {
		String comando = "UPDATE marcas SET nome = ?, status = ? WHERE id=?";
		PreparedStatement p;
		
		try {
			p = this.conexao.prepareStatement(comando);
			
			p.setString(1, marca.getNome());
			p.setInt(2, marca.getStatus());
			p.setInt(3, marca.getId());
			
			p.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
}
