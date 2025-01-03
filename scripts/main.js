window.addEventListener('DOMContentLoaded', () => {
    const map = document.getElementById('ukraine-map');

    map.addEventListener('load', function () {
        const svgDoc = map.contentDocument; // Доступ до вмісту SVG
        const paths = svgDoc.querySelectorAll('path'); // Усі <path>

        paths.forEach(path => {
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
        });
    });
});
