const form = document.querySelector('.contact-form');
const resultDiv = document.getElementById('form-result');
const localStorageKey = 'mainFormBackup';

// Загружаем данные из localStorage
function loadFormData() {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
        const { name, email, phone, message } = JSON.parse(savedData);
        form.name.value = name || '';
        form.email.value = email || '';
        form.phone.value = phone || '';
        form.message.value = message || '';
    }
}

// Сохраняем данные в localStorage
function saveFormData() {
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

// Удаляем данные из localStorage
function clearFormData() {
    localStorage.removeItem(localStorageKey);
}

// Обработчик отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault();
    resultDiv.textContent = 'Отправка...';

    // Отправка данных
    const formData = new FormData(form);
    fetch('https://formcarry.com/s/g7ga5yAahTs', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                resultDiv.textContent = 'Форма успешно отправлена!';
                clearFormData();
                form.reset();
            } else {
                resultDiv.textContent = 'Ошибка сервера. Попробуйте позже.';
            }
        })
        .catch(() => {
            resultDiv.textContent = 'Ошибка сети. Попробуйте позже.';
        });
});

// Сохраняем данные на ввод
form.addEventListener('input', saveFormData);

// Загружаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', loadFormData);
