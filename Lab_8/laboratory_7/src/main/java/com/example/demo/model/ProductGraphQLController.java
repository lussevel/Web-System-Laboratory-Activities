package com.example.demo.model;

import org.springframework.graphql.data.method.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ProductGraphQLController {

    private final ProductService service;

    public ProductGraphQLController(ProductService service) {
        this.service = service;
    }

    // QUERIES
    @QueryMapping
    public List<Product> getAllProducts() {
        return service.getAll();
    }

    @QueryMapping
    public Product getProductById(@Argument Long id) {
        return service.getById(id);
    }

    // MUTATIONS
    @MutationMapping
    public Product createProduct(@Argument String name, @Argument Double price) {
        return service.create(new Product(null, name, price));
    }

    @MutationMapping
    public Product updateProduct(@Argument Long id, @Argument String name, @Argument Double price) {
        return service.update(id, new Product(id, name, price));
    }

    @MutationMapping
    public Boolean deleteProduct(@Argument Long id) {
        return service.delete(id);
    }
}