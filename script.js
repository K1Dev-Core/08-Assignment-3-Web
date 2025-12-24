let cart = [];

const foodItems = [
    {
        name: 'ข้าวผัด',
        price: 60,
        image: 'https://img.wongnai.com/p/1920x0/2019/12/19/d5537700a7274ac09964b6a51dd0a9f6.jpg'
    },
    {
        name: 'ผัดกะเพรา',
        price: 50,
        image: 'https://www.maggi.co.th/sites/default/files/srh_recipes/c07747088f182ba6cfabe8be6724229e.jpg'
    },
    {
        name: 'ต้มย่ากุ้ง',
        price: 120,
        image: 'http://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/04/24/5608757681874e1ea5df1aa41d5b2e3d_How_To_Make_Tom_Yam_Kung_The_Epitome_Of_Delicious_And_Nutritious_Thai_Cuisine3.jpg'
    },
    {
        name: 'แกงเขียวหวาน',
        price: 100,
        image: 'https://recipe.sgethai.com/wp-content/uploads/2019/03/26022025-chicken-green-curry-2.webp'
    },
    {
        name: 'ส้มตำ',
        price: 80,
        image: 'https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/SEA/calcmenu/recipes/TH-recipes/salads/%E0%B8%AA%E0%B9%89%E0%B8%A1%E0%B8%95%E0%B8%B3%E0%B9%84%E0%B8%97%E0%B8%A2/%E0%B8%AA%E0%B9%89%E0%B8%A1%E0%B8%95%E0%B8%B3%E0%B9%84%E0%B8%97%E0%B8%A2_header.jpg'
    }
];

function renderFoodList() {
    const foodListDiv = document.getElementById('foodList');
    foodListDiv.innerHTML = foodItems.map(item => `
        <div class="border rounded-lg p-4 flex flex-col items-center">
            <div class="w-24 h-24 bg-gray-200 rounded overflow-hidden mb-2">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
            </div>
            <h3 class="font-medium mb-2">${item.name}</h3>
            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">
                + เพิ่มลงตะกร้า
            </button>
        </div>
    `).join('');
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }
    renderCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('ตะกร้าว่างเปล่า');
        return;
    }
    alert('ขอบคุณสำหรับการสั่งซื้อ!');
    clearCart();
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const itemCountSpan = document.getElementById('itemCount');
    const productCountSpan = document.getElementById('productCount');
    const subtotalSpan = document.getElementById('subtotal');
    const totalSpan = document.getElementById('total');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="text-gray-500 text-center py-8">ตะกร้าว่างเปล่า</p>';
        itemCountSpan.textContent = '0';
        productCountSpan.textContent = '0';
        subtotalSpan.textContent = '0 บาท';
        totalSpan.textContent = '0 บาท';
        return;
    }

    cartItemsDiv.innerHTML = cart.map((item, index) => `
        <div class="border rounded-lg p-4">
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h3 class="font-medium">${item.name}</h3>
                    <p class="text-sm text-gray-600">${item.price} x ${item.quantity}</p>
                    <p class="font-semibold">${item.price * item.quantity} บาท</p>
                </div>
            </div>
            <div class="flex gap-2 mt-3">
                <button class="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400" onclick="decreaseQuantity(${index})">
                    –
                </button>
                <button class="bg-red-300 text-red-700 px-3 py-1 rounded hover:bg-red-400 flex items-center gap-1" onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                   
                </button>
            </div>
        </div>
    `).join('');

    const itemCount = cart.length;
    const productCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    itemCountSpan.textContent = itemCount;
    productCountSpan.textContent = productCount;
    subtotalSpan.textContent = `${subtotal} บาท`;
    totalSpan.textContent = `${subtotal} บาท`;
}

document.addEventListener('DOMContentLoaded', function () {
    renderFoodList();
});
