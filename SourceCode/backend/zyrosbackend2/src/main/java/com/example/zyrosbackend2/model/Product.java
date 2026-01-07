package com.example.zyrosbackend2.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "zyros1")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Main_Category")
    private String mainCategory;

    @Column(name = "Sub_Category")
    private String subCategory;

    @Column(name = "sub_sub_category")
    private String subSubCategory;

    @Column(name = "name") // إذا كان في SQL يبدأ بحرف كبير Name غيريه هنا إلى Name
    private String name;

    @Column(name = "h_full_src")
    private String hFullSrc;

    @Column(name = "description")
    private String description;

    @Column(name = "product_card_promotion")
    private String productCardPromotion;

    @Column(name = "total_price")
    private Double totalPrice;

    public Integer getId() {
        return id;
    }

    public String getMainCategory() {
        return mainCategory;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setMainCategory(String mainCategory) {
        this.mainCategory = mainCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    public void setSubSubCategory(String subSubCategory) {
        this.subSubCategory = subSubCategory;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void sethFullSrc(String hFullSrc) {
        this.hFullSrc = hFullSrc;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setProductCardPromotion(String productCardPromotion) {
        this.productCardPromotion = productCardPromotion;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setBeforePrice(Double beforePrice) {
        this.beforePrice = beforePrice;
    }

    public String getSubSubCategory() {
        return subSubCategory;
    }

    public String getName() {
        return name;
    }

    public String gethFullSrc() {
        return hFullSrc;
    }

    public String getDescription() {
        return description;
    }

    public String getProductCardPromotion() {
        return productCardPromotion;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public Double getBeforePrice() {
        return beforePrice;
    }

    @Column(name = "before_price")
    private Double beforePrice;
}