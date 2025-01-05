import { regions } from './regions.js';

let gameInterval;
let timerInterval;
let timeLeft = 20; // Початковий час (20 секунд)
let score = 0;
let isGameStarted = false; // Флаг, чи почалася гра
let activeRegionName = ""; // Збереження поточного регіону
let activeRegionId = ""; // Збереження ID активного регіону

function setupGame() {
    const startButton = document.getElementById('start-game');
    const randomRegionNameElement = document.getElementById('random-region-name');
    const timerElement = document.querySelector('.timer');
    const scoreElement = document.querySelector('.score');
    const map = document.getElementById('ukraine-map');

    // Завантаження SVG-контенту
    map.addEventListener('load', () => {
        const svgDoc = map.contentDocument;
        const regionPaths = svgDoc.querySelectorAll('path');

        // Додаємо обробник натискання кнопки "Початок гри"
        startButton.addEventListener('click', () => {
            if (!isGameStarted) {
                // Скидаємо таймер та рахунок
                timeLeft = 20;
                score = 0;
                isGameStarted = true;
                randomRegionNameElement.style.display = 'none';
                scoreElement.textContent = `Рахунок: ${score}`;
                timerElement.textContent = `Час: ${timeLeft} сек`;

                // Запускаємо таймер
                if (timerInterval) clearInterval(timerInterval);
                timerInterval = setInterval(updateTimer, 1000);

                // Початок гри
                showRandomRegion(randomRegionNameElement, regionPaths);
            }
        });

        // Додаємо єдиний обробник для всіх регіонів
        regionPaths.forEach((path) => {
            path.addEventListener('click', () => handleRegionClick(path));
            path.addEventListener('mouseover', () => {
                path.style.fill = '#FFD700'; // Зміна кольору при наведенні
            });
            path.addEventListener('mouseout', () => {
                path.style.fill = ''; // Скидання кольору
            });
        });
    });
}

function updateTimer() {
    const timerElement = document.querySelector('.timer');
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = `Час: ${timeLeft} сек`;
    } else {
        clearInterval(timerInterval);
        alert('Гра завершена! Ваш рахунок: ' + score);
        isGameStarted = false; // Скидаємо стан гри
    }
}

function showRandomRegion(element, regionPaths) {
    const randomRegionIndex = Math.floor(Math.random() * Object.keys(regions).length);
    activeRegionName = Object.values(regions)[randomRegionIndex]; // Зберігаємо активний регіон
    activeRegionId = Object.keys(regions)[randomRegionIndex]; // Зберігаємо ID активного регіону
    element.textContent = activeRegionName;
    element.style.display = 'block';
}

function handleRegionClick(path) {
    const regionId = path.getAttribute('id');
    if (regionId === activeRegionId) {
        score++;
        document.querySelector('.score').textContent = `Рахунок: ${score}`;
        document.getElementById('random-region-name').style.display = 'none'; // Сховати випадковий регіон після правильного вибору
        const regionPaths = path.ownerDocument.querySelectorAll('path');
        showRandomRegion(document.getElementById('random-region-name'), regionPaths); // Показуємо наступний випадковий регіон
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setupGame();
});
