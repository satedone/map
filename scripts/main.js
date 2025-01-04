// main.js
import { regions } from './regions.js';
import { createCheckbox } from './checkbox.js';

window.addEventListener('DOMContentLoaded', () => {
    const map = document.getElementById('ukraine-map');

    // Створюємо чекбокс
    const checkbox = createCheckbox();

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
                // Отримуємо координати натискання миші
                const mouseX = event.pageX;
                const mouseY = event.pageY;

                // Створюємо прямокутник для назви
                const rect = document.createElement('div');
                rect.style.position = 'absolute';
                rect.style.left = `${mouseX + 10}px`; // Зміщуємо на 10px праворуч від миші
                rect.style.top = `${mouseY + 10}px`; // Зміщуємо на 10px вниз від миші
                rect.style.padding = '8px';
                rect.style.backgroundColor = '#fff';
                rect.style.border = '1px solid #000';
                rect.style.borderRadius = '4px';
                rect.style.fontSize = '14px';
                rect.style.boxShadow = '2px 2px 6px rgba(0, 0, 0, 0.2)';
                rect.textContent = regionName; // Виводимо назву області
                rect.classList.add('region-label');

                // Додаємо прямокутник на сторінку
                document.body.appendChild(rect);

                // Видалення прямокутника, якщо чекбокс не активний
                if (!checkbox.checked) {
                    setTimeout(() => {
                        rect.remove();
                    }, 2000);
                }
            });
        });
    });
});
