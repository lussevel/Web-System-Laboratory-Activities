package com.example.demo.model;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProductService {

    private Map<Long, Product> productDB = new HashMap<>();
    private Long nextId = 4L;

    public ProductService() {

        // Initial mock data
        productDB.put(1L, new Product(1L, "Webcam", 12000.0));
        productDB.put(2L, new Product(2L, "Gaming Mouse", 700.0));
        productDB.put(3L, new Product(3L, "Projector", 18000.0));
    }

    public List<Product> getAll() {
        return new ArrayList<>(productDB.values());
    }

    public Product getById(Long id) {
        return productDB.get(id);
    }

    public Product create(Product product) {
        product.setId(nextId++);
        productDB.put(product.getId(), product);
        return product;
    }

    public Product update(Long id, Product updated) {
        if (!productDB.containsKey(id)) {
            return null;
        }
        updated.setId(id);
        productDB.put(id, updated);
        return updated;
    }

    public boolean delete(Long id) {
        return productDB.remove(id) != null;
    }
}
