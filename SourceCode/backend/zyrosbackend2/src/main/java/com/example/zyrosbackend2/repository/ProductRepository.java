package com.example.zyrosbackend2.repository;

import com.example.zyrosbackend2.model.Product; // تأكدي من هذا السطر
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
}