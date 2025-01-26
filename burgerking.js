let orderCounter = 1000;

document.getElementById('order-btn').addEventListener('click', handleOrder);

function handleOrder() {
    const selectedItems = getSelectedItems();
    
    if (selectedItems.length === 0) {
        alert('Please select at least one item!');
        return;
    }

    const orderBtn = document.getElementById('order-btn');
    orderBtn.disabled = true;
    
    document.getElementById('loading-animation').classList.remove('hidden');
    document.getElementById('order-complete').classList.add('hidden');

    const preparationTime = Math.floor(Math.random() * 4000) + 2000;

    processOrder(selectedItems, preparationTime)
        .then(displayOrder)
        .catch(error => {
            console.error('Order failed:', error);
            alert('Sorry, there was an error processing your order.');
        })
        .finally(() => {
            orderBtn.disabled = false;
        });
}

function getSelectedItems() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function processOrder(items, preparationTime) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const orderDetails = {
                id: `BK${++orderCounter}`,
                items: items,
                image: getRandomFoodImage(items)
            };
            resolve(orderDetails);
        }, preparationTime);
    });
}

function getRandomFoodImage(items) {
    if (items.includes('Whopper')) {
        return 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Hamburger:1-3-product-tile-desktop';
    }
    if (items.includes('Chicken Royale')) {
        return 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Chicken-McNuggets-4pc:1-3-product-tile-desktop';
    }
    return 'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-fries-small:1-3-product-tile-desktop';
}

function displayOrder(orderDetails) {

    const orderNumberElement = document.getElementById('order-number');
    orderNumberElement.textContent = `Order #${orderDetails.id}`;

    document.getElementById('loading-animation').classList.add('hidden');

    const orderComplete = document.getElementById('order-complete');
    orderComplete.classList.remove('hidden');

    document.getElementById('order-image').src = orderDetails.image;
    document.getElementById('completion-message').textContent = 
        `Your order is ready! You ordered: ${orderDetails.items.join(', ')}`;

    const audio = document.getElementById('order-sound');
    audio.play().catch(e => console.log('Audio play failed:', e));

    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
}

document.getElementById('order-btn').addEventListener('mouseenter', () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio play failed:', e));
});