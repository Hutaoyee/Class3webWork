// 购物车数据结构
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 添加商品到购物车
function addToCart(gameName, price) {
    const game = {
        name: gameName,
        price: parseFloat(price.replace('￥', '')),
        quantity: 1
    };

    // 检查商品是否已在购物车中
    const existingGame = cart.find(item => item.name === game.name);
    if (existingGame) {
        existingGame.quantity++;
    } else {
        cart.push(game);
    }

    // 保存到本地存储
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 更新购物车显示
    updateCartDisplay();
    
    // 显示添加成功提示
    alert('已添加到购物车！');
}

// 更新购物车显示
function updateCartDisplay() {
    const cartBody = document.querySelector('.offcanvas-body');
    cartBody.innerHTML = '';

    cart.forEach(item => {
        const gameElement = document.createElement('div');
        gameElement.className = 'cart-item';
        gameElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.name}</span>
                <span>￥${item.price} × ${item.quantity}</span>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name}')">删除</button>
            </div>
        `;
        cartBody.appendChild(gameElement);
    });
}

// 从购物车中移除商品
function removeFromCart(gameName) {
    cart = cart.filter(item => item.name !== gameName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// 页面加载时更新购物车显示
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});
