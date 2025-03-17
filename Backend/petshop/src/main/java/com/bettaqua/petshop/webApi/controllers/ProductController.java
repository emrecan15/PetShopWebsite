package com.bettaqua.petshop.webApi.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bettaqua.petshop.business.abstracts.ProductService;
import com.bettaqua.petshop.entities.concretes.Product;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {
	
	private final ProductService productService;
	
	
	@PostMapping("/add")
	public void add(Product product) {
		productService.add(product);
		System.out.println("Product added.");
	}
	
	@GetMapping("")
	public List<Product> getAll(){
		System.out.println("getAll methodu çağrıldı.");
		return productService.getAll();
	}
	
	@DeleteMapping
	public String delete(@RequestParam int id) {
		return productService.delete(id);
	}
	
	
	// use request-response pattern !!
	@PutMapping
	public void update(@RequestBody Product product)
	{
		
	}

}
