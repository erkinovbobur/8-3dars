"use strict";
class ProductManager {
    products = [];
    constructor() {
        this.loadProducts();
    }
    addProduct(product) {
        this.products.push(product);
        this.saveProducts();
        this.renderProducts(this.products);
    }
    searchProducts(query) {
        return this.products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.type.toLowerCase().includes(query.toLowerCase()) ||
            product.supplier.toLowerCase().includes(query.toLowerCase()));
    }
    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }
    loadProducts() {
        const products = localStorage.getItem('products');
        if (products) {
            this.products = JSON.parse(products);
            this.renderProducts(this.products);
        }
    }
    renderProducts(products) {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.price} so'm - ${product.type} - ${product.unit} - ${product.arrivalDate} - ${product.supplier}`;
            productList.appendChild(li);
        });
    }
}
const productManager = new ProductManager();
const productForm = document.getElementById('productForm');
const searchInput = document.getElementById('searchInput');
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const type = document.getElementById('type').value;
    const unit = document.getElementById('unit').value;
    const arrivalDate = document.getElementById('arrivalDate').value;
    const supplier = document.getElementById('supplier').value;
    const product = { name, price, type, unit, arrivalDate, supplier };
    productManager.addProduct(product);
    productForm.reset();
});
searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    const filteredProducts = productManager.searchProducts(query);
    productManager.renderProducts(filteredProducts);
});
