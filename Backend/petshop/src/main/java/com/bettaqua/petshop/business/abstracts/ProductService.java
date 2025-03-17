package com.bettaqua.petshop.business.abstracts;

import java.util.List;

import com.bettaqua.petshop.entities.concretes.Product;



public interface ProductService {
	void add(Product product);
	List<Product> getAll();
	String delete(int id);
	Product update(Product product);
}
