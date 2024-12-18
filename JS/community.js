// 示例评论数据
const commentsData = [
    {
        id: 1,
        username: "用户1",
        date: "2024-03-15",
        gameTag: "game1",
        gameName: "只狼：影逝二度",
        content: "这是一条关于只狼的评论"
    },
    {
        id: 2,
        username: "用户2",
        date: "2024-03-16",
        gameTag: "game2",
        gameName: "艾尔登法环",
        content: "这是一条关于艾尔登法环的评论"
    }
    // 可以添加更多示例数据
];

// 分页配置
const ITEMS_PER_PAGE = 10; // 每页显示5条评论
let currentPage = 1;
let currentComments = commentsData; // 当前筛选后的评论数据

// 从数据库获取游戏标签
async function fetchGameTags() {
    try {
        const response = await fetch('/api/game-tags'); // 替换为实际的API端点
        const tags = await response.json();
        return tags;
    } catch (error) {
        console.error('获取游戏标签失败:', error);
        return [];
    }
}

// 渲染标签筛选器
function renderTagFilters(tags) {
    const tagContainer = document.querySelector('.game-tags-filter');
    tagContainer.innerHTML = `
        <button class="tag-filter active" data-game="all">全部</button>
        ${tags.map(tag => `
            <button class="tag-filter" data-game="${tag.id}">${tag.name}</button>
        `).join('')}
    `;
}

// 获取评论数据
async function fetchComments(page = 1, tagId = null) {
    try {
        const url = new URL('/api/comments', window.location.origin);
        url.searchParams.append('page', page);
        if (tagId && tagId !== 'all') {
            url.searchParams.append('tagId', tagId);
        }
        
        const response = await fetch(url);
        const data = await response.json();
        return {
            comments: data.comments,
            total: data.total,
            totalPages: data.totalPages
        };
    } catch (error) {
        console.error('获取评论失败:', error);
        return { comments: [], total: 0, totalPages: 1 };
    }
}

// 修改DOMContentLoaded事件处理
document.addEventListener('DOMContentLoaded', async function() {
    // 获取并渲染游戏标签
    const tags = await fetchGameTags();
    renderTagFilters(tags);
    
    const tagButtons = document.querySelectorAll('.tag-filter');
    const tagSearch = document.querySelector('.tag-search');
    const selectedTagSpan = document.querySelector('.selected-tag');
    
    // 标签搜索功能
    tagSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        tagButtons.forEach(button => {
            const tagText = button.textContent.toLowerCase();
            const shouldShow = tagText.includes(searchTerm);
            button.style.display = shouldShow ? 'inline-block' : 'none';
        });
    });
    
    // 修改标签点击处理
    document.querySelector('.game-tags-filter').addEventListener('click', async function(e) {
        if (!e.target.matches('.tag-filter')) return;
        
        const buttons = this.querySelectorAll('.tag-filter');
        buttons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        const selectedGame = e.target.getAttribute('data-game');
        selectedTagSpan.textContent = selectedGame === 'all' ? '' : e.target.textContent;
        
        // 关闭折叠面板
        bootstrap.Collapse.getInstance(document.getElementById('tagFilterCollapse')).hide();
        
        // 重置页码并获取筛选后的评论
        currentPage = 1;
        const { comments, totalPages } = await fetchComments(currentPage, selectedGame);
        renderComments(comments, totalPages);
    });

    // 添加分页按钮事件监听
    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderComments(currentComments);
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        const totalPages = Math.ceil(currentComments.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            renderComments(currentComments);
        }
    });

    // 初始加载评论
    const { comments, totalPages } = await fetchComments(1);
    renderComments(comments, totalPages);
});

// 修改评论渲染函数
function renderComments(comments, totalPages) {
    // 更新页码显示
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;
    
    // 启用/禁用分页按钮
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage >= totalPages;
    
    // 渲染评论
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <div class="comment-info">
                <div class="comment-user">${comment.username}</div>
                <div class="comment-meta">
                    <span class="comment-time">${comment.date}</span>
                    <span class="game-tag">${comment.gameName}</span>
                </div>
            </div>
            <div class="comment-content">${comment.content}</div>
        </div>
    `).join('');
}
