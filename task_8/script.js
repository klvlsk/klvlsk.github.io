const openFormBtn = document.getElementById('open-form-btn');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('feedback-form');
const resultDiv = document.getElementById('feedback-result');

const localStorageKey = 'feedbackFormValues';

// Показать форму
function openPopup() {
    popup.style.display = 'flex';
    window.history.pushState({ popup: true }, '', '#feedback-form');
    loadFormData();
}

// Скрыть форму
function closePopup() {
    popup.style.display = 'none';
    resultDiv.textContent = '';
    window.history.back();
}

// Сохранить данные формы в LocalStorage
function saveFormData() {
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        organization: form.organization.value,
        message: form.message.value,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

// Загрузить данные формы из LocalStorage
function loadFormData() {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
        const { name, email, phone, organization, message } = JSON.parse(savedData);
        form.name.value = name || '';
        form.email.value = email || '';
        form.phone.value = phone || '';
        form.organization.value = organization || '';
        form.message.value = message || '';
    }
}

// Очистить данные формы
function clearFormData() {
    localStorage.removeItem(localStorageKey);
}

// Обработчик отправки формы
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultDiv.textContent = 'Отправка...';
    const formData = new FormData(form);

    try {
        const response = await fetch('https://formcarry.com/s/g7ga5yAahTs', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            resultDiv.textContent = 'Форма успешно отправлена!';
            clearFormData();
            form.reset();
        } else {
            resultDiv.textContent = 'Ошибка отправки формы. Попробуйте позже.';
        }
    } catch (error) {
        resultDiv.textContent = 'Ошибка сети. Попробуйте позже.';
    }
});

// События открытия/закрытия попапа
openFormBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);

// Закрытие формы при нажатии "Назад" в браузере
window.addEventListener('popstate', (event) => {
    if (!event.state?.popup) {
        closePopup();
    }
});

// Сохранение данных формы при изменении
form.addEventListener('input', saveFormData);
