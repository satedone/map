// checkbox.js
export function createCheckbox() {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.position = 'absolute';
    checkboxContainer.style.top = '10px';
    checkboxContainer.style.right = '10px';
    checkboxContainer.style.backgroundColor = '#f9f9f9';
    checkboxContainer.style.padding = '10px';
    checkboxContainer.style.border = '1px solid #ccc';
    checkboxContainer.style.borderRadius = '5px';
    checkboxContainer.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.1)';
    checkboxContainer.style.fontSize = '14px';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'keep-labels';
    checkbox.style.marginRight = '5px';

    const label = document.createElement('label');
    label.htmlFor = 'keep-labels';
    label.textContent = 'Не видаляти підписи областей';

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    document.body.appendChild(checkboxContainer);

    return checkbox;
}
