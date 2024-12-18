// 获取DOM元素
const gameTypeCheckboxes = document.querySelectorAll('.form-check-input');
const gamesContainer = document.querySelector('.games-container');

// 分页配置
const GAMES_PER_PAGE = 12;
let currentPage = 1;

// 游戏数据
const allGames = [
    // ... 游戏数据 ...
];

// 类型复选框变化时过滤
gameTypeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterGames);
});

// 过滤游戏的主函数
function filterGames() {
    const selectedTypes = Array.from(gameTypeCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.id);

    const filteredGames = allGames.filter(game => {
        return selectedTypes.length === 0 || 
            game.types.some(type => selectedTypes.includes(type));
    });

    displayGames(filteredGames);
}

// 修改显示游戏列表函数
function displayGames(games) {
    const startIndex = (currentPage - 1) * GAMES_PER_PAGE;
    const endIndex = startIndex + GAMES_PER_PAGE;
    const pageGames = games.slice(startIndex, endIndex);
    
    // 显示当前页的游戏
    gamesContainer.innerHTML = pageGames.map(game => `
        <div class="game-card">
            <img src="../Img/placeholder.jpg" alt="${game.title}">
            <div class="game-info">
                <div class="game-title">${game.title}</div>
                <div class="game-price">¥${game.price}</div>
            </div>
        </div>
    `).join('');

    // 更新分页控件
    updatePagination(games.length);
}

// 修改分页控件更新函数
function updatePagination(totalGames) {
    const totalPages = Math.ceil(totalGames / GAMES_PER_PAGE);
    const pagination = document.getElementById('pagination');
    
    let paginationHTML = `
        <li class="page-item">
            <button class="page-link" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
                <span aria-hidden="true">&laquo;</span>
            </button>
        </li>
        <li class="page-item">
            <span class="page-info">第 <span>${currentPage}</span> 页，共 <span>${totalPages}</span> 页</span>
        </li>
        <li class="page-item">
            <button class="page-link" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>
                <span aria-hidden="true">&raquo;</span>
            </button>
        </li>
    `;
    
    pagination.innerHTML = paginationHTML;
    
    // 添加分页点击事件
    pagination.querySelectorAll('.page-link').forEach(link => {
        if (!link.disabled) {
            link.addEventListener('click', (e) => {
                const newPage = parseInt(e.target.closest('.page-link').dataset.page);
                if (newPage && newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
                    currentPage = newPage;
                    filterGames();
                }
            });
        }
    });
}

// 初始化显示
filterGames();
