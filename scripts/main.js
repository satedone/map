window.addEventListener('DOMContentLoaded', () => {
    const map = document.getElementById('ukraine-map');
    const info = document.getElementById('info'); // Блок для відображення назви

    // Об'єкт з відповідністю кодів областей і їх назв
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

                // Додаємо прямокутник на сторінку
                document.body.appendChild(rect);

                // Через кілька секунд зникає
                // setTimeout(() => {
                //     rect.remove(); // Видаляємо прямокутник після 3 секунд
                // }, 3000);
            });
        });
    });
});
