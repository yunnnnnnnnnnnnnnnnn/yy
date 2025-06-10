// 頁面加載時檢查 DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('頁面加載完成，準備檢查元素');
    const elements = {
        tableSection: document.getElementById('table-section'),
        menuIntroSection: document.getElementById('menu-intro-section'),
        gallerySection: document.getElementById('gallery-section'),
        preferenceSection: document.getElementById('preference-section'),
        headerText: document.getElementById('header-text'),
        tableSelect: document.getElementById('table')
    };
    for (let id in elements) {
        if (!elements[id]) {
            console.error(`未找到 ${id} 元素`);
        }
    }
    if (Object.values(elements).every(el => el !== null)) {
        console.log('所有主要元素加載成功');
    }
});

// 桌號選擇導航（單頁面切換）
function selectTable() {
    const table = document.getElementById('table').value;
    console.log('選取桌號:', table); // 調試日誌
    if (table) {
        // 更新標頭
        const headerText = document.getElementById('header-text');
        if (headerText) {
            headerText.textContent = `桌號 ${table} 號，歡迎點餐！`;
        } else {
            console.error('未找到 header-text 元素');
            return;
        }
        // 手動切換顯示
        const tableSection = document.getElementById('table-section');
        const menuIntroSection = document.getElementById('menu-intro-section');
        const gallerySection = document.getElementById('gallery-section');
        const preferenceSection = document.getElementById('preference-section');
        if (tableSection && menuIntroSection && gallerySection && preferenceSection) {
            tableSection.style.display = 'none';
            menuIntroSection.style.display = 'block';
            gallerySection.style.display = 'block';
            preferenceSection.style.display = 'block';
            window.selectedTable = table;
            console.log('切換到點餐頁面成功');
        } else {
            console.error('未找到一個或多個區塊元素:', { tableSection, menuIntroSection, gallerySection, preferenceSection });
        }
    } else {
        alert('請選擇桌號！');
    }
}

// 點餐選擇顯示
function showSelection() {
    const meal = document.getElementById('meal').value;
    const rice = document.getElementById('rice').value;
    const sauce = document.getElementById('sauce').value;
    const meat = document.getElementById('meat').value;
    const addon = document.getElementById('addon').value;
    const result = document.getElementById('result');

    const mealPrices = {
        'beef_don': 150,
        'chicken_don': 140,
        'seafood_don': 180,
        'tempura': 160,
        'sushi': 200,
        'udon': 130,
        'ramen': 150,
        'soba': 140,
        'katsu': 160,
        'curry': 140
    };
    const basePrice = mealPrices[meal] || 150;
    let addonText = '', addonPrice = 0;

    if (addon === '50') { addonText = '加購：+50元 (味噌湯、茶碗蒸)'; addonPrice = 50; }
    else if (addon === '100') { addonText = '加購：+100元 (可樂餅、綠茶、味噌湯、茶碗蒸)'; addonPrice = 100; }
    else { addonText = '加購：無'; addonPrice = 0; }

    const total = basePrice + addonPrice;
    const table = window.selectedTable || '未知';
    if (result) {
        result.innerHTML = `桌號：${table}號桌<br>您的選擇：<br>主餐：${meal.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} (${basePrice}元)<br>飯量：${rice}<br>醬汁量：${sauce}<br>配料量：${meat}<br>${addonText}<br>價格明細：主餐 ${basePrice}元 + 加購 ${addonPrice}元 = <strong>${total}元</strong>`;
    } else {
        console.error('未找到 result 元素');
    }
}