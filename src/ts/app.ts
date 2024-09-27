

interface Product {
    name: string;
    price: number;
    type: string;
    unit: string;
    arrivalDate: string;
    supplier: string;
}

class ProductManager {
    private products: Product[] = [];

    constructor() {
        this.loadProducts();
    }

    addProduct(product: Product): void {
        this.products.push(product);
        this.saveProducts();
        this.renderProducts(this.products);
    }

    deleteProduct(index: number): void {
        this.products.splice(index, 1);
        this.saveProducts();
        this.renderProducts(this.products);
    }

    searchProducts(query: string): Product[] {
        return this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.type.toLowerCase().includes(query.toLowerCase()) ||
            product.supplier.toLowerCase().includes(query.toLowerCase())
        );
    }

    private saveProducts(): void {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    private loadProducts(): void {
        const products = localStorage.getItem('products');
        if (products) {
            this.products = JSON.parse(products);
            this.renderProducts(this.products);
        }
    }

    // renderProducts funksiyasini public qilib o'zgartiramiz
    public renderProducts(products: Product[]): void {
        const productList = document.getElementById('productList') as HTMLUListElement;
        
        if (!productList) {
            console.error('Element with ID "productList" not found.');
            return;
        }

        productList.innerHTML = '';
        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.price} so'm - ${product.type} - ${product.unit} - ${product.arrivalDate} - ${product.supplier}`;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Oʻchirish ';
            deleteButton.className = 'delete-button ' ;
            deleteButton.onclick = () =>  this.deleteProduct(index) ;
            
            li.appendChild(deleteButton);
            productList.appendChild(li);
        });
    }
}

const productManager = new ProductManager();

const productForm = document.getElementById('productForm') as HTMLFormElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
    const type = (document.getElementById('type') as HTMLInputElement).value;
    const unit = (document.getElementById('unit') as HTMLInputElement).value;
    const arrivalDate = (document.getElementById('arrivalDate') as HTMLInputElement).value;
    const supplier = (document.getElementById('supplier') as HTMLInputElement).value;

    const product: Product = { name, price, type, unit, arrivalDate, supplier };
    productManager.addProduct(product);

    productForm.reset();
});

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    const filteredProducts = productManager.searchProducts(query);
    productManager.renderProducts(filteredProducts);
});
