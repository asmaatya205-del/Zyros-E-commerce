package com.example.zyrosbackend2.controller; // تأكدي أن هذا هو السطر الأول

import com.example.zyrosbackend2.model.Product; // تغيير demo إلى zyrosbackend2
import com.example.zyrosbackend2.repository.ProductRepository; // تغيير demo إلى zyrosbackend2
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll(); // سيسحب كل الـ 323 منتج
    }
}