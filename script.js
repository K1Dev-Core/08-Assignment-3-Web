class FoodItem {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }

    getHTML() {
        return `
            <div class="border rounded-lg p-4 flex flex-col items-center">
                <div class="w-24 h-24 bg-gray-200 rounded overflow-hidden mb-2">
                    <img src="${this.image}" alt="${this.name}" class="w-full h-full object-cover">
                </div>
                <h3 class="font-medium mb-2">${this.name}</h3>
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onclick="app.addToCart('${this.name}', ${this.price}, '${this.image}')">
                    + เพิ่มลงตะกร้า
                </button>
            </div>
        `;
    }
}

class CartItem {
    constructor(name, price, image, quantity = 1) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }

    increaseQuantity() {
        this.quantity += 1;
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity -= 1;
        }
    }

    getTotal() {
        return this.price * this.quantity;
    }

    getHTML(index) {
        return `
            <div class="border rounded-lg p-4">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                        <img src="${this.image}" alt="${this.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <h3 class="font-medium">${this.name}</h3>
                        <p class="text-sm text-gray-600">${this.price} x ${this.quantity}</p>
                        <p class="font-semibold">${this.getTotal()} บาท</p>
                    </div>
                </div>
                <div class="flex gap-2 mt-3">
                    <button class="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400" onclick="app.decreaseQuantity(${index})">
                        –
                    </button>
                    <button class="bg-red-300 text-red-700 px-3 py-1 rounded hover:bg-red-400 flex items-center gap-1" onclick="app.removeItem(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(name, price, image) {
        const existingItem = this.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.increaseQuantity();
        } else {
            this.items.push(new CartItem(name, price, image));
        }
    }

    removeItem(index) {
        this.items.splice(index, 1);
    }

    decreaseQuantity(index) {
        if (this.items[index].quantity > 1) {
            this.items[index].decreaseQuantity();
        } else {
            this.removeItem(index);
        }
    }

    clear() {
        this.items = [];
    }

    getItemCount() {
        return this.items.length;
    }

    getProductCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
    }

    getTotal() {
        return this.getSubtotal();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

class FoodMenu {
    constructor() {
        this.items = [
            new FoodItem('ข้าวผัด', 60, 'https://img.wongnai.com/p/1920x0/2019/12/19/d5537700a7274ac09964b6a51dd0a9f6.jpg'),
            new FoodItem('ผัดกะเพรา', 50, 'https://www.maggi.co.th/sites/default/files/srh_recipes/c07747088f182ba6cfabe8be6724229e.jpg'),
            new FoodItem('ต้มย่ากุ้ง', 120, 'http://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/04/24/5608757681874e1ea5df1aa41d5b2e3d_How_To_Make_Tom_Yam_Kung_The_Epitome_Of_Delicious_And_Nutritious_Thai_Cuisine3.jpg'),
            new FoodItem('แกงเขียวหวาน', 100, 'https://recipe.sgethai.com/wp-content/uploads/2019/03/26022025-chicken-green-curry-2.webp'),
            new FoodItem('ส้มตำ', 80, 'https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/SEA/calcmenu/recipes/TH-recipes/salads/%E0%B8%AA%E0%B9%89%E0%B8%A1%E0%B8%95%E0%B8%B3%E0%B9%84%E0%B8%97%E0%B8%A2/%E0%B8%AA%E0%B9%89%E0%B8%A1%E0%B8%95%E0%B8%B3%E0%B9%84%E0%B8%97%E0%B8%A2_header.jpg')
        ];
    }

    render() {
        const foodListDiv = document.getElementById('foodList');
        foodListDiv.innerHTML = this.items.map(item => item.getHTML()).join('');
    }
}

class App {
    constructor() {
        this.cart = new ShoppingCart();
        this.menu = new FoodMenu();
    }

    init() {
        this.menu.render();
        this.renderCart();
    }

    addToCart(name, price, image) {
        this.cart.addItem(name, price, image);
        this.renderCart();
    }

    decreaseQuantity(index) {
        this.cart.decreaseQuantity(index);
        this.renderCart();
    }

    removeItem(index) {
        this.cart.removeItem(index);
        this.renderCart();
    }

    clearCart() {
        this.cart.clear();
        this.renderCart();
    }

    checkout() {
        if (this.cart.isEmpty()) {
            alert('ตะกร้าว่างเปล่า');
            return;
        }
        alert('ขอบคุณสำหรับการสั่งซื้อ!');
        this.clearCart();
    }

    renderCart() {
        const cartItemsDiv = document.getElementById('cartItems');
        const itemCountSpan = document.getElementById('itemCount');
        const productCountSpan = document.getElementById('productCount');
        const subtotalSpan = document.getElementById('subtotal');
        const totalSpan = document.getElementById('total');

        if (this.cart.isEmpty()) {
            cartItemsDiv.innerHTML = '<p class="text-gray-500 text-center py-8">ตะกร้าว่างเปล่า</p>';
            itemCountSpan.textContent = '0';
            productCountSpan.textContent = '0';
            subtotalSpan.textContent = '0 บาท';
            totalSpan.textContent = '0 บาท';
            return;
        }

        cartItemsDiv.innerHTML = this.cart.items.map((item, index) => item.getHTML(index)).join('');

        itemCountSpan.textContent = this.cart.getItemCount();
        productCountSpan.textContent = this.cart.getProductCount();
        subtotalSpan.textContent = `${this.cart.getSubtotal()} บาท`;
        totalSpan.textContent = `${this.cart.getTotal()} บาท`;
    }
}

const app = new App();

document.addEventListener('DOMContentLoaded', function () {
    app.init();
});
