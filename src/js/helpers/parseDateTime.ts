const parseDateTime = (dateTimeString: string) => {
    // Проверяем, что входная строка существует и является строкой
    if (!dateTimeString || typeof dateTimeString !== 'string') {
        return null;
    }

    // Регулярное выражение для парсинга формата "YYYY-MM-DD HH:MM"
    const regex = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/;
    const match = dateTimeString.trim().match(regex);

    if (!match) {
        return null;
    }

    const [, yearStr, monthStr, dayStr, hoursStr, minutesStr] = match;

    // Парсим значения
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Валидация значений
    let validYear = null;
    let validMonth = null;
    let validDay = null;
    let validTime = null;

    // Проверяем год (разумный диапазон)
    if (year >= 1900 && year <= 2100) {
        validYear = year;
    }

    // Проверяем месяц
    if (month >= 1 && month <= 12) {
        validMonth = month;
    }

    // Проверяем день (упрощенная проверка)
    if (day >= 1 && day <= 31) {
        // Дополнительная проверка для корректности дня в месяце
        if (validMonth && validYear) {
            const daysInMonth = new Date(validYear, validMonth, 0).getDate();
            if (day <= daysInMonth) {
                validDay = day;
            }
        } else {
            // Если месяц или год некорректны, проверяем только базовый диапазон
            validDay = day;
        }
    }

    // Проверяем время
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        validTime = `${hoursStr}:${minutesStr}`;
    }

    return {
        day: validDay,
        month: validMonth,
        year: validYear,
        time: validTime
    };
}

export {
    parseDateTime,
}
