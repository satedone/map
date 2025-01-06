export function toggleCityNamesVisibility(mapId, checkboxId) {
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
