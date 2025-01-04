import { regions } from './regions.js';

function setupTrainingCheckbox(map) {
    const trainingCheckbox = document.getElementById('toggle-training');

    trainingCheckbox.addEventListener('change', () => {
        const svgDoc = map.contentDocument;
        const cityNamesGroup = svgDoc.getElementById('city-names');

        if (trainingCheckbox.checked) {
            cityNamesGroup.style.display = 'block'; // Показати назви міст
        } else {
            cityNamesGroup.style.display = 'none'; // Приховати назви міст
        }
    });
}

function setupKeepLabelsCheckbox() {
    const keepLabelsCheckbox = document.getElementById('toggle-keep-labels');

    // Додаємо функціонал, якщо буде потрібний (наприклад, для подальшої інтеграції)
    console.log(
        'Чекбокс "Не видаляти підписи областей" підключений, стан:',
        keepLabelsCheckbox.checked
    );
}

window.addEventListener('DOMContentLoaded', () => {
    const map = document.getElementById('ukraine-map');

    map.addEventListener('load', function () {
        const svgDoc = map.contentDocument; // Доступ до вмісту SVG
        const paths = svgDoc.querySelectorAll('path'); // Усі <path>

        paths.forEach(path => {
            const regionCode = path.getAttribute('id'); // Отримуємо код області
            const regionName = regions[regionCode] || "Невідома область"; // Перетворюємо код в назву

            // Додаємо стиль для курсора
            path.style.cursor = 'pointer';

            // Подія наведення миші
            path.addEventListener('mouseover', function () {
                path.style.fill = 'blue'; // Колір при наведенні
            });

            // Подія відведення миші
            path.addEventListener('mouseout', function () {
                path.style.fill = ''; // Повернення до початкового кольору
            });

            // Подія натискання
            path.addEventListener('click', function (event) {
                const mouseX = event.pageX;
                const mouseY = event.pageY;

                // Створюємо прямокутник для назви
                const rect = document.createElement('div');
                rect.style.position = 'absolute';
                rect.style.left = `${mouseX + 10}px`;
                rect.style.top = `${mouseY + 10}px`;
                rect.style.padding = '8px';
                rect.style.backgroundColor = '#fff';
                rect.style.border = '1px solid #000';
                rect.style.borderRadius = '4px';
                rect.style.fontSize = '14px';
                rect.style.boxShadow = '2px 2px 6px rgba(0, 0, 0, 0.2)';
                rect.textContent = regionName; // Виводимо назву області
                rect.classList.add('region-label');

                document.body.appendChild(rect);

                // Видалення через 2 секунди, якщо "Не видаляти підписи" не увімкнено
                const keepLabelsCheckbox = document.getElementById('toggle-keep-labels');
                if (!keepLabelsCheckbox.checked) {
                    setTimeout(() => {
                        rect.remove();
                    }, 2000);
                }
            });
        });

        // Налаштовуємо чекбокси
        setupTrainingCheckbox(map);
        setupKeepLabelsCheckbox();
    });
});
