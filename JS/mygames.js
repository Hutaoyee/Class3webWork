// 游戏库配置
const GAMES_PER_PAGE = 12;
let currentPage = 1;

// 获取DOM元素
const gamesContainer = document.querySelector('.games-container');
const gameTypeCheckboxes = document.querySelectorAll('.form-check-input');
const gameSearchInput = document.querySelector('#gameSearchInput');

// 从数据库获取数据的函数
async function fetchUserGames() {
    // TODO: 替换为实际的数据库请求

}

// 过滤游戏
function filterGames(games) {
    const selectedTypes = Array.from(gameTypeCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.id);
    
    const searchTerm = gameSearchInput.value.toLowerCase().trim();
    
    return games.filter(game => {
        const matchesType = selectedTypes.length === 0 || 
            game.types.some(type => selectedTypes.includes(type));
        const matchesSearch = searchTerm === '' || 
            game.title.toLowerCase().includes(searchTerm);
        
        return matchesType && matchesSearch;
    });
}

// 显示游戏
function displayGames(games) {
    const startIndex = (currentPage - 1) * GAMES_PER_PAGE;
    const endIndex = startIndex + GAMES_PER_PAGE;
    const pageGames = games.slice(startIndex, endIndex);
    
    gamesContainer.innerHTML = pageGames.map(game => `
        <div class="game-card">
            <img src="${game.imageUrl}" alt="${game.title}">
            <div class="game-info">
                <div class="game-title">${game.title}</div>
            </div>
        </div>
    `).join('');

    updatePagination(games.length);
}

// 更新分页
function updatePagination(totalGames) {
    // ... 与之前的分页代码相似 ...
}

// 初始化
async function initialize() {
    const games = await fetchUserGames();
    
    // 添加事件监听器
    gameTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            displayGames(filterGames(games));
        });
    });

    // 添加搜索框事件监听
    gameSearchInput.addEventListener('input', () => {
        displayGames(filterGames(games));
    });

    // 初始显示
    displayGames(games);
}

initialize();
