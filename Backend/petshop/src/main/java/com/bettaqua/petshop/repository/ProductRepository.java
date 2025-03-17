package com.bettaqua.petshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bettaqua.petshop.entities.concretes.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

}
