document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    const url = 'https://formcarry.com/s/g7ga5yAahTs'; // Замените YOUR_FORM_ID на ID вашей формы

    // Восстановление данных из LocalStorage
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.name);
        if (savedValue) {
            input.value = savedValue;
        }
    });

    // Сохранение данных в LocalStorage при вводе
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            localStorage.setItem(input.name, input.value);
        });
    });

    // Отправка формы
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Сбор данных формы
        const formData = {};
        inputs.forEach(input => {
            formData[input.name] = input.value;
        });

        try {
            // Отправка данных на сервер
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Форма успешно отправлена!');
                form.reset(); // Очистка формы
                inputs.forEach(input => localStorage.removeItem(input.name)); // Удаление из LocalStorage
            } else {
                alert('Ошибка при отправке формы. Попробуйте еще раз.');
            }
        } catch (error) {
            alert('Произошла ошибка: ' + error.message);
        }
    });
});
