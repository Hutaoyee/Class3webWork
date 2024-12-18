// 获取搜索相关元素
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// 搜索处理函数
function handleSearch(searchTerm) {
    // 清空当前结果
    searchResults.innerHTML = '';
    
    if (!searchTerm) return;
    
    // 过滤匹配的游戏
    const matchedGames = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 添加搜索结果到datalist
    matchedGames.forEach(game => {
        const option = document.createElement('option');
        option.value = game.title;
        option.dataset.link = game.link;
        searchResults.appendChild(option);
    });
}

// 使用防抖处理搜索输入
const debouncedSearch = debounce(handleSearch, 300);

// 监听输入事件
searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});

// 处理选择搜索结果
searchInput.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    const matchedGame = games.find(game => game.title === selectedValue);
    
    if (matchedGame) {
        window.location.href = matchedGame.link;
    }
});
