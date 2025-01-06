import { regions } from './regions.js';
import { toggleCityNamesVisibility } from './learningMode.js';

let gameInterval;
let timerInterval;
let timeLeft = 20;
let score = 0;
let isGameStarted = false;
let activeRegionName = "";
let activeRegionId = "";

function setupGame() {
    const startButton = document.getElementById('start-game');
    const randomRegionNameElement = document.getElementById('random-region-name');
    const timerElement = document.querySelector('.timer');
    const scoreElement = document.querySelector('.score');
    const map = document.getElementById('ukraine-map');

    map.addEventListener('load', () => {
        const svgDoc = map.contentDocument;
        const regionPaths = svgDoc.querySelectorAll('path');

        startButton.addEventListener('click', () => {
            if (!isGameStarted) {
                timeLeft = 20;
                score = 0;
                isGameStarted = true;
                randomRegionNameElement.style.display = 'none';
                scoreElement.textContent = `Рахунок: ${score}`;
                timerElement.textContent = `Час: ${timeLeft} сек`;

                if (timerInterval) clearInterval(timerInterval);
                timerInterval = setInterval(updateTimer, 1000);

                showRandomRegion(randomRegionNameElement, regionPaths);
            }
        });

        regionPaths.forEach((path) => {
            path.addEventListener('click', () => handleRegionClick(path));
            path.addEventListener('mouseover', () => {
                path.style.fill = '#FFD700';
            });
            path.addEventListener('mouseout', () => {
                path.style.fill = '';
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
        isGameStarted = false;
    }
}

function showRandomRegion(element, regionPaths) {
    const randomRegionIndex = Math.floor(Math.random() * Object.keys(regions).length);
    activeRegionName = Object.values(regions)[randomRegionIndex];
    activeRegionId = Object.keys(regions)[randomRegionIndex];
    element.textContent = activeRegionName;
    element.style.display = 'block';
}

function handleRegionClick(path) {
    const regionId = path.getAttribute('id');
    if (regionId === activeRegionId) {
        if (!isGameStarted) return; // Якщо гра завершилась, нічого не робимо для рахунку
        score++;
        document.querySelector('.score').textContent = `Рахунок: ${score}`;
        document.getElementById('random-region-name').style.display = 'none'; // Сховати випадковий регіон після правильного вибору
        const regionPaths = path.ownerDocument.querySelectorAll('path');
        showRandomRegion(document.getElementById('random-region-name'), regionPaths); // Показуємо наступний випадковий регіон
    }
}


window.addEventListener('DOMContentLoaded', () => {
    setupGame();
    toggleCityNamesVisibility('ukraine-map', 'learning-mode');
});
