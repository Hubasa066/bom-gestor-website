// Articles page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeArticlesPage();
});

function initializeArticlesPage() {
    initializeSearch();
    initializeFilters();
    initializeLoadMore();
    initializeTimeFilters();
}

// Enhanced search functionality for articles
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const articles = document.querySelectorAll('.article-item');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (query.length > 0) {
                    filterArticlesBySearch(query, articles);
                    if (query.length > 2) {
                        showSearchSuggestions(query, searchResults);
                    }
                } else {
                    resetArticleFilters();
                    hideSearchSuggestions(searchResults);
                }
            }, 300);
        });

        // Hide search suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                hideSearchSuggestions(searchResults);
            }
        });
    }
}

function filterArticlesBySearch(query, articles) {
    let visibleCount = 0;
    
    articles.forEach(article => {
        const title = article.querySelector('.article-title').textContent.toLowerCase();
        const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
        const tag = article.querySelector('.article-tag').textContent.toLowerCase();
        
        const matches = title.includes(query) || excerpt.includes(query) || tag.includes(query);
        
        if (matches) {
            article.style.display = 'block';
            article.classList.add('fade-in-up');
            visibleCount++;
        } else {
            article.style.display = 'none';
        }
    });

    // Show no results message if needed
    updateNoResultsMessage(visibleCount);
}

function showSearchSuggestions(query, container) {
    const suggestions = generateSearchSuggestions(query);
    
    if (suggestions.length > 0) {
        container.innerHTML = suggestions.map(suggestion => `
            <div class="search-suggestion" data-query="${suggestion}">
                <i class="fas fa-search"></i>
                <span>${suggestion}</span>
            </div>
        `).join('');
        
        container.style.display = 'block';
        
        // Add click handlers for suggestions
        container.querySelectorAll('.search-suggestion').forEach(item => {
            item.addEventListener('click', function() {
                const suggestedQuery = this.dataset.query;
                document.getElementById('search-input').value = suggestedQuery;
                filterArticlesBySearch(suggestedQuery.toLowerCase(), document.querySelectorAll('.article-item'));
                hideSearchSuggestions(container);
            });
        });
    } else {
        hideSearchSuggestions(container);
    }
}

function generateSearchSuggestions(query) {
    const commonTerms = [
        'leadership', 'remote work', 'team management', 'company culture',
        'data analytics', 'strategic planning', 'employee engagement',
        'feedback', 'psychological safety', 'hybrid work'
    ];
    
    return commonTerms.filter(term => 
        term.toLowerCase().includes(query.toLowerCase()) && 
        term.toLowerCase() !== query.toLowerCase()
    ).slice(0, 5);
}

function hideSearchSuggestions(container) {
    container.style.display = 'none';
    container.innerHTML = '';
}

// Enhanced filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button with smooth transition
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.style.transform = 'scale(1)';
            });
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Filter articles with animation
            filterArticlesWithAnimation(filter, articles);
        });
    });
}

function filterArticlesWithAnimation(filter, articles) {
    let visibleCount = 0;
    
    // First, fade out all articles
    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
        articles.forEach((article, index) => {
            const shouldShow = filter === 'all' || article.dataset.category === filter;
            
            if (shouldShow) {
                article.style.display = 'block';
                visibleCount++;
                
                // Stagger the fade-in animation
                setTimeout(() => {
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                article.style.display = 'none';
            }
        });
        
        updateNoResultsMessage(visibleCount);
    }, 200);
}

// Time-based filters
function initializeTimeFilters() {
    const yearFilter = document.getElementById('year-filter');
    const monthFilter = document.getElementById('month-filter');
    const weekFilter = document.getElementById('week-filter');
    
    [yearFilter, monthFilter, weekFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', function() {
                applyTimeFilters();
            });
        }
    });
}

function applyTimeFilters() {
    const yearFilter = document.getElementById('year-filter').value;
    const monthFilter = document.getElementById('month-filter').value;
    const weekFilter = document.getElementById('week-filter').value;
    const articles = document.querySelectorAll('.article-item');
    
    let visibleCount = 0;
    
    articles.forEach(article => {
        let shouldShow = true;
        
        if (yearFilter && article.dataset.year !== yearFilter) {
            shouldShow = false;
        }
        
        if (monthFilter && article.dataset.month !== monthFilter) {
            shouldShow = false;
        }
        
        if (weekFilter && article.dataset.week !== weekFilter) {
            shouldShow = false;
        }
        
        if (shouldShow) {
            article.style.display = 'block';
            article.classList.add('fade-in-up');
            visibleCount++;
        } else {
            article.style.display = 'none';
        }
    });
    
    updateNoResultsMessage(visibleCount);
}

// Load more functionality
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreArticles();
        });
    }
}

function loadMoreArticles() {
    const loadMoreBtn = document.getElementById('load-more');
    const articlesGrid = document.getElementById('articles-grid');
    
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading delay
    setTimeout(() => {
        const newArticles = generateMoreArticles();
        
        newArticles.forEach((articleHTML, index) => {
            const articleElement = document.createElement('div');
            articleElement.innerHTML = articleHTML;
            const article = articleElement.firstElementChild;
            
            article.style.opacity = '0';
            article.style.transform = 'translateY(30px)';
            articlesGrid.appendChild(article);
            
            // Animate in with delay
            setTimeout(() => {
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
                article.style.transition = 'all 0.5s ease-out';
            }, index * 100);
        });
        
        // Reset button or hide if no more articles
        if (document.querySelectorAll('.article-item').length >= 16) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.innerHTML = 'Load More Articles <i class="fas fa-chevron-down"></i>';
            loadMoreBtn.disabled = false;
        }
        
        // Re-initialize hover effects for new articles
        initializeHoverEffects();
        
    }, 1000);
}

function generateMoreArticles() {
    const additionalArticles = [
        {
            image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            date: 'August 15, 2024',
            tag: 'Strategy',
            category: 'strategy',
            year: '2024',
            month: '8',
            week: 'week2',
            title: 'Innovation Management in Large Organizations',
            excerpt: 'How to foster innovation while maintaining operational efficiency in established companies.'
        },
        {
            image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            date: 'August 1, 2024',
            tag: 'Leadership',
            category: 'leadership',
            year: '2024',
            month: '8',
            week: 'week1',
            title: 'Emotional Intelligence for Modern Managers',
            excerpt: 'Developing emotional intelligence skills to better understand and motivate your team.'
        }
    ];
    
    return additionalArticles.map((article, index) => `
        <article class="article-card hover-card article-item" data-category="${article.category}" data-year="${article.year}" data-month="${article.month}" data-week="${article.week}">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-date">${article.date}</span>
                    <span class="article-tag">${article.tag}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <a href="article-detail.html?id=${9 + index}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>
    `);
}

// Reset all filters
function resetArticleFilters() {
    const articles = document.querySelectorAll('.article-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timeFilters = document.querySelectorAll('.filter-select');
    
    // Reset filter buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    
    // Reset time filters
    timeFilters.forEach(filter => filter.value = '');
    
    // Show all articles
    articles.forEach(article => {
        article.style.display = 'block';
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';
    });
    
    updateNoResultsMessage(articles.length);
}

// No results message
function updateNoResultsMessage(visibleCount) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (visibleCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
                <div class="no-results-content">
                    <i class="fas fa-search"></i>
                    <h3>No articles found</h3>
                    <p>Try adjusting your filters or search terms</p>
                    <button class="btn btn-primary" onclick="resetArticleFilters()">Reset Filters</button>
                </div>
            `;
            document.getElementById('articles-grid').appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
}

// Enhanced hover effects for new articles
function initializeHoverEffects() {
    const hoverCards = document.querySelectorAll('.hover-card:not(.hover-initialized)');
    
    hoverCards.forEach(card => {
        card.classList.add('hover-initialized');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Export for global use
window.ArticlesPage = {
    resetArticleFilters,
    filterArticlesBySearch,
    applyTimeFilters
};
