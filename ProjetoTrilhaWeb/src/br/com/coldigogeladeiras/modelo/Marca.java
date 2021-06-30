package br.com.coldigogeladeiras.modelo;

import java.io.Serializable;

public class Marca implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private int id;
	
	private String nome;

	public Marca() {
		super();
	}
	
	public Marca(int id, String nome) {
		super();
		
		this.id = id;
		this.nome = nome;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	
}
