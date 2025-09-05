// Archive page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeArchivePage();
});

function initializeArchivePage() {
    initializeArchiveNavigation();
    initializeAnimations();
    loadArchiveState();
}

// Archive navigation functions
function toggleYear(year) {
    const yearContent = document.getElementById(`year-${year}`);
    const yearIcon = document.querySelector(`[data-year="${year}"] .year-icon`);
    
    if (yearContent.classList.contains('collapsed')) {
        expandYear(year);
    } else {
        collapseYear(year);
    }
    
    saveArchiveState();
}

function expandYear(year) {
    const yearContent = document.getElementById(`year-${year}`);
    const yearIcon = document.querySelector(`[data-year="${year}"] .year-icon`);
    
    yearContent.classList.remove('collapsed');
    yearIcon.classList.remove('fa-chevron-right');
    yearIcon.classList.add('fa-chevron-down');
    
    // Animate the expansion
    yearContent.style.maxHeight = 'none';
    const height = yearContent.scrollHeight;
    yearContent.style.maxHeight = '0';
    yearContent.offsetHeight; // Force reflow
    yearContent.style.maxHeight = height + 'px';
    
    setTimeout(() => {
        yearContent.style.maxHeight = 'none';
    }, 300);
}

function collapseYear(year) {
    const yearContent = document.getElementById(`year-${year}`);
    const yearIcon = document.querySelector(`[data-year="${year}"] .year-icon`);
    
    yearContent.classList.add('collapsed');
    yearIcon.classList.remove('fa-chevron-down');
    yearIcon.classList.add('fa-chevron-right');
    
    // Animate the collapse
    const height = yearContent.scrollHeight;
    yearContent.style.maxHeight = height + 'px';
    yearContent.offsetHeight; // Force reflow
    yearContent.style.maxHeight = '0';
    
    // Also collapse all months and weeks within this year
    const months = yearContent.querySelectorAll('.month-content');
    const weeks = yearContent.querySelectorAll('.week-content');
    
    months.forEach(month => {
        month.classList.add('collapsed');
        month.style.maxHeight = '0';
    });
    
    weeks.forEach(week => {
        week.classList.add('collapsed');
        week.style.maxHeight = '0';
    });
    
    // Update icons
    yearContent.querySelectorAll('.month-icon, .week-icon').forEach(icon => {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-right');
    });
}

function toggleMonth(year, month) {
    const monthContent = document.getElementById(`month-${year}-${month}`);
    const monthIcon = document.querySelector(`[data-month="${month}"] .month-icon`);
    
    if (monthContent.classList.contains('collapsed')) {
        expandMonth(year, month);
    } else {
        collapseMonth(year, month);
    }
    
    saveArchiveState();
}

function expandMonth(year, month) {
    const monthContent = document.getElementById(`month-${year}-${month}`);
    const monthIcon = document.querySelector(`[data-month="${month}"] .month-icon`);
    
    monthContent.classList.remove('collapsed');
    monthIcon.classList.remove('fa-chevron-right');
    monthIcon.classList.add('fa-chevron-down');
    
    // Animate the expansion
    monthContent.style.maxHeight = 'none';
    const height = monthContent.scrollHeight;
    monthContent.style.maxHeight = '0';
    monthContent.offsetHeight; // Force reflow
    monthContent.style.maxHeight = height + 'px';
    
    setTimeout(() => {
        monthContent.style.maxHeight = 'none';
    }, 300);
}

function collapseMonth(year, month) {
    const monthContent = document.getElementById(`month-${year}-${month}`);
    const monthIcon = document.querySelector(`[data-month="${month}"] .month-icon`);
    
    monthContent.classList.add('collapsed');
    monthIcon.classList.remove('fa-chevron-down');
    monthIcon.classList.add('fa-chevron-right');
    
    // Animate the collapse
    const height = monthContent.scrollHeight;
    monthContent.style.maxHeight = height + 'px';
    monthContent.offsetHeight; // Force reflow
    monthContent.style.maxHeight = '0';
    
    // Also collapse all weeks within this month
    const weeks = monthContent.querySelectorAll('.week-content');
    weeks.forEach(week => {
        week.classList.add('collapsed');
        week.style.maxHeight = '0';
    });
    
    // Update week icons
    monthContent.querySelectorAll('.week-icon').forEach(icon => {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-right');
    });
}

function toggleWeek(year, month, week) {
    const weekContent = document.getElementById(`week-${year}-${month}-${week}`);
    const weekIcon = document.querySelector(`[data-week="${week}"] .week-icon`);
    
    if (weekContent.classList.contains('collapsed')) {
        expandWeek(year, month, week);
    } else {
        collapseWeek(year, month, week);
    }
    
    saveArchiveState();
}

function expandWeek(year, month, week) {
    const weekContent = document.getElementById(`week-${year}-${month}-${week}`);
    const weekIcon = weekContent.parentElement.querySelector('.week-icon');
    
    weekContent.classList.remove('collapsed');
    weekIcon.classList.remove('fa-chevron-right');
    weekIcon.classList.add('fa-chevron-down');
    
    // Animate the expansion
    weekContent.style.maxHeight = 'none';
    const height = weekContent.scrollHeight;
    weekContent.style.maxHeight = '0';
    weekContent.offsetHeight; // Force reflow
    weekContent.style.maxHeight = height + 'px';
    
    setTimeout(() => {
        weekContent.style.maxHeight = 'none';
    }, 300);
    
    // Animate article cards
    const articles = weekContent.querySelectorAll('.archive-article-card');
    articles.forEach((article, index) => {
        setTimeout(() => {
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function collapseWeek(year, month, week) {
    const weekContent = document.getElementById(`week-${year}-${month}-${week}`);
    const weekIcon = weekContent.parentElement.querySelector('.week-icon');
    
    weekContent.classList.add('collapsed');
    weekIcon.classList.remove('fa-chevron-down');
    weekIcon.classList.add('fa-chevron-right');
    
    // Animate the collapse
    const height = weekContent.scrollHeight;
    weekContent.style.maxHeight = height + 'px';
    weekContent.offsetHeight; // Force reflow
    weekContent.style.maxHeight = '0';
}

// Utility functions for expand/collapse all
function expandAll() {
    const years = document.querySelectorAll('.archive-year');
    years.forEach(year => {
        const yearId = year.dataset.year;
        expandYear(yearId);
        
        // Expand all months in this year
        const months = year.querySelectorAll('.archive-month');
        months.forEach(month => {
            const monthId = month.dataset.month;
            setTimeout(() => expandMonth(yearId, monthId), 100);
            
            // Expand all weeks in this month
            const weeks = month.querySelectorAll('.archive-week');
            weeks.forEach(week => {
                const weekId = week.dataset.week;
                setTimeout(() => expandWeek(yearId, monthId, weekId), 200);
            });
        });
    });
    
    saveArchiveState();
    window.BlogUtils.showNotification('All sections expanded', 'success');
}

function collapseAll() {
    const years = document.querySelectorAll('.archive-year');
    years.forEach(year => {
        const yearId = year.dataset.year;
        collapseYear(yearId);
    });
    
    saveArchiveState();
    window.BlogUtils.showNotification('All sections collapsed', 'success');
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// State management
function saveArchiveState() {
    const state = {
        expandedYears: [],
        expandedMonths: [],
        expandedWeeks: []
    };
    
    // Save expanded years
    document.querySelectorAll('.year-content:not(.collapsed)').forEach(year => {
        const yearId = year.id.replace('year-', '');
        state.expandedYears.push(yearId);
    });
    
    // Save expanded months
    document.querySelectorAll('.month-content:not(.collapsed)').forEach(month => {
        const monthId = month.id.replace('month-', '');
        state.expandedMonths.push(monthId);
    });
    
    // Save expanded weeks
    document.querySelectorAll('.week-content:not(.collapsed)').forEach(week => {
        const weekId = week.id.replace('week-', '');
        state.expandedWeeks.push(weekId);
    });
    
    localStorage.setItem('archiveState', JSON.stringify(state));
}

function loadArchiveState() {
    const savedState = localStorage.getItem('archiveState');
    if (!savedState) return;
    
    try {
        const state = JSON.parse(savedState);
        
        // Restore expanded years
        state.expandedYears?.forEach(yearId => {
            setTimeout(() => expandYear(yearId), 100);
        });
        
        // Restore expanded months
        state.expandedMonths?.forEach(monthId => {
            const [year, month] = monthId.split('-');
            setTimeout(() => expandMonth(year, month), 200);
        });
        
        // Restore expanded weeks
        state.expandedWeeks?.forEach(weekId => {
            const [year, month, week] = weekId.split('-');
            setTimeout(() => expandWeek(year, month, week), 300);
        });
        
    } catch (error) {
        console.error('Error loading archive state:', error);
    }
}

// Initialize animations for archive elements
function initializeAnimations() {
    // Add initial styles for week content articles
    const articles = document.querySelectorAll('.archive-article-card');
    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        article.style.transition = 'all 0.3s ease-out';
    });
    
    // Initialize hover effects
    const hoverCards = document.querySelectorAll('.archive-article-card');
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        });
    });
}

// Archive navigation initialization
function initializeArchiveNavigation() {
    // Set initial states
    const yearContents = document.querySelectorAll('.year-content');
    const monthContents = document.querySelectorAll('.month-content');
    const weekContents = document.querySelectorAll('.week-content');
    
    // Collapse all by default except current year
    const currentYear = new Date().getFullYear().toString();
    
    yearContents.forEach(content => {
        const year = content.id.replace('year-', '');
        if (year !== currentYear) {
            content.classList.add('collapsed');
            content.style.maxHeight = '0';
        }
    });
    
    monthContents.forEach(content => {
        content.classList.add('collapsed');
        content.style.maxHeight = '0';
    });
    
    weekContents.forEach(content => {
        content.classList.add('collapsed');
        content.style.maxHeight = '0';
    });
    
    // Update icons
    document.querySelectorAll('.year-icon').forEach(icon => {
        const year = icon.closest('.archive-year').dataset.year;
        if (year === currentYear) {
            icon.classList.add('fa-chevron-down');
            icon.classList.remove('fa-chevron-right');
        } else {
            icon.classList.add('fa-chevron-right');
            icon.classList.remove('fa-chevron-down');
        }
    });
    
    document.querySelectorAll('.month-icon, .week-icon').forEach(icon => {
        icon.classList.add('fa-chevron-right');
        icon.classList.remove('fa-chevron-down');
    });
}

// Search functionality for archive
function searchArchive(query) {
    const articles = document.querySelectorAll('.archive-article-card');
    let foundCount = 0;
    
    articles.forEach(article => {
        const title = article.querySelector('.article-title').textContent.toLowerCase();
        const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
        const tag = article.querySelector('.article-tag').textContent.toLowerCase();
        
        const matches = title.includes(query.toLowerCase()) || 
                       excerpt.includes(query.toLowerCase()) || 
                       tag.includes(query.toLowerCase());
        
        if (matches) {
            article.style.display = 'block';
            article.classList.add('search-highlight');
            foundCount++;
            
            // Expand parent containers
            const week = article.closest('.week-content');
            const month = article.closest('.month-content');
            const year = article.closest('.year-content');
            
            if (week) {
                const weekId = week.id.replace('week-', '').split('-');
                expandWeek(weekId[0], weekId[1], weekId[2]);
            }
            if (month) {
                const monthId = month.id.replace('month-', '').split('-');
                expandMonth(monthId[0], monthId[1]);
            }
            if (year) {
                const yearId = year.id.replace('year-', '');
                expandYear(yearId);
            }
        } else {
            article.style.display = 'none';
            article.classList.remove('search-highlight');
        }
    });
    
    return foundCount;
}

function clearArchiveSearch() {
    const articles = document.querySelectorAll('.archive-article-card');
    articles.forEach(article => {
        article.style.display = 'block';
        article.classList.remove('search-highlight');
    });
}

// Filter by tag
function filterByTag(tag) {
    const articles = document.querySelectorAll('.archive-article-card');
    
    articles.forEach(article => {
        const articleTag = article.querySelector('.article-tag').textContent.toLowerCase();
        
        if (tag === 'all' || articleTag === tag.toLowerCase()) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// Export functions for global use
window.ArchivePage = {
    toggleYear,
    toggleMonth,
    toggleWeek,
    expandAll,
    collapseAll,
    scrollToTop,
    searchArchive,
    clearArchiveSearch,
    filterByTag
};
