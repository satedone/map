const regions = {
    "UA-40": "Місто Севастополь",
    "UA-43": "АР Крим",
    "UA-71": "Черкаська область",
    "UA-74": "Чернігівська область",
    "UA-77": "Чернівецька область",
    "UA-12": "Дніпропетровська область (м. Дніпро)",
    "UA-14": "Донецька область",
    "UA-26": "Івано-Франківська область",
    "UA-63": "Харківська область",
    "UA-65": "Херсонська область",
    "UA-68": "Хмельницька область",
    "UA-30": "Київ (місто)",
    "UA-32": "Київська область",
    "UA-35": "Кіровоградська область (м. Кропивницький)",
    "UA-09": "Луганська область",
    "UA-46": "Львівська область",
    "UA-48": "Миколаївська область",
    "UA-51": "Одеська область",
    "UA-53": "Полтавська область",
    "UA-56": "Рівненська область",
    "UA-59": "Сумська область",
    "UA-61": "Тернопільська область",
    "UA-21": "Закарпатська область (м. Ужгород)",
    "UA-05": "Вінницька область",
    "UA-07": "Волинська область",
    "UA-23": "Запорізька область",
    "UA-18": "Житомирська область"
};

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
                if (path.getAttribute('id') === activeRegionId && isGameStarted) {
                    path.style.fill = '#FFD700'; // Highlight for active region
                } else {
                    path.style.fill = '#FFD700'; // Default highlight
                }
            });
            path.addEventListener('mouseout', () => {
                if (path.getAttribute('id') === activeRegionId && isGameStarted) {
                    path.style.fill = ''; // Keep default color for active region
                } else {
                    path.style.fill = ''; // Reset color
                }
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
        path.style.fill = '#4CAF50'; // Зелене заповнення для правильної відповіді
        score++;
        document.querySelector('.score').textContent = `Рахунок: ${score}`;
        document.getElementById('random-region-name').style.display = 'none'; // Сховати випадковий регіон після правильного вибору
        const regionPaths = path.ownerDocument.querySelectorAll('path');
        showRandomRegion(document.getElementById('random-region-name'), regionPaths); // Показуємо наступний випадковий регіон
    } else {
        path.style.fill = '#FF5733'; // Червоне заповнення для неправильної відповіді
        setTimeout(() => {
            path.style.fill = ''; // Скидання кольору
        }, 500);
    }
}

function toggleCityNamesVisibility(mapId, checkboxId) {
    const learningModeCheckbox = document.getElementById(checkboxId);
    const map = document.getElementById(mapId);

    // Обробник зміни стану чекбоксу
    learningModeCheckbox.addEventListener('change', () => {
        const svgDoc = map.contentDocument;
        const cityNamesGroup = svgDoc.getElementById('city-names');

        if (learningModeCheckbox.checked) {
            cityNamesGroup.style.display = 'block'; // Показати назви
        } else {
            cityNamesGroup.style.display = 'none'; // Сховати назви
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    setupGame();
    toggleCityNamesVisibility('ukraine-map', 'learning-mode');
});

map.addEventListener('load', () => {
    const svgDoc = map.contentDocument;
    const regionPaths = svgDoc.querySelectorAll('path');

    regionPaths.forEach((path) => {
        path.addEventListener('mouseover', () => {
            path.style.cursor = 'pointer'; // При наведенні на path, змінюємо курсор
        });
        path.addEventListener('mouseout', () => {
            path.style.cursor = ''; // Відновлюємо стандартний курсор
        });
    });
});