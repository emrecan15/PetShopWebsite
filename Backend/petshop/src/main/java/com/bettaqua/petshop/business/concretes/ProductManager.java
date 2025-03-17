package com.bettaqua.petshop.business.concretes;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bettaqua.petshop.business.abstracts.ProductService;
import com.bettaqua.petshop.entities.concretes.Product;
import com.bettaqua.petshop.repository.ProductRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductManager implements ProductService {

	private final ProductRepository repository;

	@Override
	public void add(Product product) {
		repository.save(product);

	}

	@Override
	public List<Product> getAll() {
		List<Product> products = repository.findAll();
		return products;
	}

	@Override
	public String delete(int id) {
		try {
			repository.deleteById(id);
			return id + " nolu ürün silindi.";
		} catch (Exception e) {
			return "Silme işlemi başarısız.";
		}

	}

	@Override
	public Product update(Product product) {
		Product productt = new Product();
		return productt;
	}

}
