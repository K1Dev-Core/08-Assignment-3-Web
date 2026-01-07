class FoodItem {
    constructor(name, price, image, category = '', isPopular = false, description = '') {
        this.name = name;
        this.price = price;
        this.image = image;
        this.category = category;
        this.isPopular = isPopular;
        this.description = description;
    }

    getHTML() {
        const categoryBadge = this.category ? `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">${this.category}</span>` : '';
        const popularBadge = this.isPopular ? `<span class="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1"><i class="fas fa-fire"></i> ยอดฮิต</span>` : '';
        const descriptionText = this.description ? `<p class="text-xs text-gray-500 mt-1">${this.description}</p>` : '';

        return `
            <div class="border rounded-lg p-4 flex flex-col items-center relative">
                ${this.isPopular ? '<div class="absolute top-2 right-2"><span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">HOT</span></div>' : ''}
            <div class="w-24 h-24 bg-gray-200 rounded overflow-hidden mb-2">
                    <img src="${this.image}" alt="${this.name}" class="w-full h-full object-cover">
                </div>
                <h3 class="font-medium mb-1">${this.name}</h3>
                <div class="flex gap-2 mb-1 flex-wrap justify-center">
                    ${categoryBadge}
                    ${popularBadge}
            </div>
                ${descriptionText}
                <p class="text-lg font-bold text-green-600 mt-2 mb-2">${this.price} บาท</p>
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onclick="app.addToCart('${this.name.replace(/'/g, "\\'")}', ${this.price}, '${this.image}', '${this.category.replace(/'/g, "\\'")}', ${this.isPopular}, '${this.description.replace(/'/g, "\\'")}')">
                    + เพิ่มลงตะกร้า
                </button>
        </div>
        `;
    }
}

class CartItem {
    constructor(name, price, image, quantity = 1, category = '', isPopular = false, description = '') {

        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
        this.category = category;
        this.isPopular = isPopular;
        this.description = description;
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
        const categoryBadge = this.category ? `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">${this.category}</span>` : '';
        const popularBadge = this.isPopular ? `<span class="bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1"><i class="fas fa-fire text-xs"></i> ยอดฮิต</span>` : '';

        return `
            <div class="border rounded-lg p-4">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img src="${this.image}" alt="${this.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <div class="flex items-start justify-between gap-2">
                            <div class="flex-1">
                                <h3 class="font-medium">${this.name}</h3>
                                <div class="flex gap-2 mt-1 flex-wrap">
                                    ${categoryBadge}
                                    ${popularBadge}
                                </div>
                                <p class="text-sm text-gray-600 mt-1">${this.price} บาท x ${this.quantity}</p>
                            </div>
                            <p class="font-semibold text-lg">${this.getTotal()} บาท</p>
                        </div>
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

    addItem(name, price, image, category = '', isPopular = false, description = '') {
        const existingItem = this.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.increaseQuantity();
        } else {

            const obj = new CartItem(name, price, image, 1, category, isPopular, description);
            this.items.push(obj);
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
            new FoodItem('ข้าวผัด', 60, 'https://img.wongnai.com/p/1920x0/2019/12/19/d5537700a7274ac09964b6a51dd0a9f6.jpg', 'อาหารจานเดียว', true, 'ข้าวผัดกรอบนอกนุ่มใน ราดด้วยไข่ดาวกรอบ'),
            new FoodItem('ผัดกะเพรา', 50, 'https://www.maggi.co.th/sites/default/files/srh_recipes/c07747088f182ba6cfabe8be6724229e.jpg', 'อาหารจานเดียว', true, 'ผัดกะเพราเนื้อนุ่ม หอมกรุ่น ไข่ดาวกรอบ'),
            new FoodItem('ต้มย่ากุ้ง', 120, 'http://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/04/24/5608757681874e1ea5df1aa41d5b2e3d_How_To_Make_Tom_Yam_Kung_The_Epitome_Of_Delicious_And_Nutritious_Thai_Cuisine3.jpg', 'อาหารจานเดียว', true, 'ต้มย่ากุ้งเผ็ดร้อน หอมกรุ่นสมุนไพร'),
            new FoodItem('แกงเขียวหวาน', 100, 'https://recipe.sgethai.com/wp-content/uploads/2019/03/26022025-chicken-green-curry-2.webp', 'อาหารจานเดียว', false, 'แกงเขียวหวานเนื้อไก่หอมสมุนไพร'),
            new FoodItem('ส้มตำ', 80, 'https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/SEA/calcmenu/recipes/TH-recipes/salads/%E0%B8%AA%E0%B9%89%E0%B8%A1%E0%B8%95%E0%B8%B3%E0%B9%84%E0%B8%97%E0%B8%A2/%E0%B8%AA%E0%B9%89%E0%B8%A1%E0%B8%95%E0%B8%B3%E0%B9%84%E0%B8%97%E0%B8%A2_header.jpg', 'อาหารจานเดียว', true, 'ส้มตำไทยแท้ เปรี้ยว หวาน เค็ม เผ็ด')
        ];
    }

    render() {
        const foodListDiv = document.getElementById('foodList');
        foodListDiv.innerHTML = this.items.map(item => item.getHTML()).join('');
    }
}

class OrderModal {
    static show(cartItems, itemCount, productCount, total) {
        const modal = document.getElementById('orderModal');
        const orderItemsDiv = document.getElementById('orderItems');
        const orderItemCountSpan = document.getElementById('orderItemCount');
        const orderProductCountSpan = document.getElementById('orderProductCount');
        const orderTotalSpan = document.getElementById('orderTotal');

        orderItemsDiv.innerHTML = cartItems.map(item => {
            const categoryBadge = item.category ? `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">${item.category}</span>` : '';
            const popularBadge = item.isPopular ? `<span class="bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1"><i class="fas fa-fire text-xs"></i> ยอดฮิต</span>` : '';

            return `
                <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div class="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <h4 class="font-semibold">${item.name}</h4>
                        <div class="flex gap-2 mt-1 flex-wrap">
                            ${categoryBadge}
                            ${popularBadge}
                        </div>
                        <p class="text-sm text-gray-600 mt-1">${item.price} บาท x ${item.quantity}</p>
                    </div>
                    <div class="font-semibold text-lg">
                        ${item.price * item.quantity} บาท
                    </div>
                </div>
            `;
        }).join('');

        orderItemCountSpan.textContent = itemCount;
        orderProductCountSpan.textContent = productCount;
        orderTotalSpan.textContent = `${total} บาท`;

        modal.classList.remove('hidden');
        modal.classList.add('flex');

        setTimeout(() => {
            const modalContent = modal.querySelector('.bg-white');
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    static close() {
        const modal = document.getElementById('orderModal');
        const modalContent = modal.querySelector('.bg-white');
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }
}

class Notification {
    static show(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');

        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };

        notification.className = `${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] transform transition-all duration-300 translate-x-full opacity-0`;
        notification.innerHTML = `
            <i class="fas ${icons[type]} text-xl"></i>
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.remove()" class="text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
            notification.classList.add('translate-x-0', 'opacity-100');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('translate-x-0', 'opacity-100');
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

class App {
    constructor() {
        this.cart = new ShoppingCart();
        this.menu = new FoodMenu();
        this.isLoading = false;
    }

    init() {
        this.menu.render();
        this.renderCart();
    }

    addToCart(name, price, image, category = '', isPopular = false, description = '') {
        const isPopularBool = typeof isPopular === 'string' ? isPopular === 'true' : isPopular;
        this.cart.addItem(name, price, image, category, isPopularBool, description);
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

    setCheckoutButtonLoading(isLoading) {
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (isLoading) {
            checkoutBtn.disabled = true;
            checkoutBtn.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>กำลังประมวลผล...</span>
            `;
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.innerHTML = `
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>ชำระเงิน</span>
            `;
        }
    }

    checkout() {
        if (this.cart.isEmpty()) {
            Notification.show('ตะกร้าว่างเปล่า', 'error');
            return;
        }

        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        this.setCheckoutButtonLoading(true);

        const orderData = {
            items: JSON.parse(JSON.stringify(this.cart.items)),
            itemCount: this.cart.getItemCount(),
            productCount: this.cart.getProductCount(),
            total: this.cart.getTotal()
        };

        setTimeout(() => {
            this.isLoading = false;
            this.setCheckoutButtonLoading(false);
            Notification.show('ขอบคุณสำหรับการสั่งซื้อ!', 'success');
            OrderModal.show(orderData.items, orderData.itemCount, orderData.productCount, orderData.total);
            this.clearCart();
        }, 2000);
    }

    closeOrderModal() {
        OrderModal.close();
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
