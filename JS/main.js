// 购物车关闭功能:当点击购物车外的区域时自动关闭
const offcanvasElement = document.getElementById('offcanvasRight'); // 获取购物车元素
const closeButton = offcanvasElement.querySelector('.btn-close'); // 获取关闭按钮

// 监听整个文档的点击事件
document.addEventListener('click', function(event) {
    const isClickInside = offcanvasElement.contains(event.target); // 检查点击是否在购物车内
    const isOffcanvasOpen = offcanvasElement.classList.contains('show'); // 检查购物车是否打开

    // 如果点击在购物车外且购物车是打开状态,则触发关闭按钮
    if (!isClickInside && isOffcanvasOpen) {
        closeButton.click();
    }
});

// 当DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 处理轮播图设置
    const carouselSettings = JSON.parse(localStorage.getItem('carouselSettings') || '{"carousel":[]}'); // 获取保存的轮播图设置,如果没有则使用空数组
    const carouselInner = document.querySelector('.carousel-inner'); // 获取轮播图容器
    
    // 如果有保存的轮播图设置
    if (carouselSettings.carousel.length > 0) {
        carouselInner.innerHTML = ''; // 清空原有的轮播图内容
        
        // 遍历设置中的每个轮播图
        carouselSettings.carousel.forEach((item, index) => {
            const div = document.createElement('div'); // 创建新的轮播图项
            div.className = `carousel-item${index === 0 ? ' active' : ''}`; // 设置类名,第一个项添加active类
            // 设置轮播图HTML内容
            div.innerHTML = `
                <a href="${item.link}">
                    <img src="${item.img}" class="d-block img-fluid">
                </a>
            `;
            carouselInner.appendChild(div); // 将轮播图项添加到容器中
        });
    }

    // 处理精选游戏设置
    const featuredSettings = JSON.parse(localStorage.getItem('featuredSettings') || '{"featured":[]}'); // 获取保存的精选游戏设置
    const featuredContainer = document.querySelector('.show-4'); // 获取精选游戏容器
    
    // 如果有保存的精选游戏设置
    if (featuredSettings.featured.length > 0) {
        featuredContainer.innerHTML = ''; // 清空原有的精选游戏内容
        // 遍历设置中的每个精选游戏
        featuredSettings.featured.forEach(item => {
            // 添加新的精选游戏HTML内容
            featuredContainer.innerHTML += `
                <a href="${item.link}"><img class="rounded-pill" src="${item.img}" alt=""></a>
            `;
        });
    }

    // 处理折扣游戏设置
    const discountSettings = JSON.parse(localStorage.getItem('discountSettings') || '{"discount":[]}');
    const discountContainer = document.querySelector('.discount > .d-flex');
    
    if (discountSettings.discount.length > 0) {
        discountContainer.innerHTML = '';
        discountSettings.discount.forEach(item => {
            discountContainer.innerHTML += `
                <a class="d-flex flex-column img-fluid" href="${item.link}">
                    <img src="${item.img}" alt="">${item.title}
                </a>
            `;
        });
    }

    // 处理免费游戏设置
    const freeSettings = JSON.parse(localStorage.getItem('freeSettings') || '{"free":[]}');
    const freeContainer = document.querySelector('.freegame > .d-flex');
    
    if (freeSettings.free.length > 0) {
        freeContainer.innerHTML = '';
        freeSettings.free.forEach(item => {
            freeContainer.innerHTML += `
                <a class="d-flex flex-column img-fluid" href="${item.link}">
                    <img src="${item.img}" alt="">${item.title}
                </a>
            `;
        });
    }
});