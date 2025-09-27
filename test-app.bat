@echo off
echo ========================================
echo    Тестирование MindEducation
echo ========================================
echo.

echo Проверка структуры проекта...
if not exist "src\main\java\com\mindeducation\MindEducationApplication.java" (
    echo ОШИБКА: Основной класс приложения не найден!
    exit /b 1
)

if not exist "src\main\resources\application.yml" (
    echo ОШИБКА: Файл конфигурации не найден!
    exit /b 1
)

if not exist "pom.xml" (
    echo ОШИБКА: Файл pom.xml не найден!
    exit /b 1
)

echo Структура проекта корректна.
echo.

echo Проверка Docker файлов...
if not exist "Dockerfile" (
    echo ОШИБКА: Dockerfile не найден!
    exit /b 1
)

if not exist "docker-compose.yml" (
    echo ОШИБКА: docker-compose.yml не найден!
    exit /b 1
)

echo Docker файлы найдены.
echo.

echo Проверка шаблонов...
if not exist "src\main\resources\templates\game\home.html" (
    echo ОШИБКА: Главная страница игры не найдена!
    exit /b 1
)

if not exist "src\main\resources\templates\admin\home.html" (
    echo ОШИБКА: Админ панель не найдена!
    exit /b 1
)

echo Шаблоны найдены.
echo.

echo Проверка JavaScript файлов...
if not exist "src\main\resources\static\js\game-animations.js" (
    echo ОШИБКА: JavaScript анимации не найдены!
    exit /b 1
)

echo JavaScript файлы найдены.
echo.

echo ========================================
echo    Все проверки пройдены успешно!
echo ========================================
echo.
echo Проект готов к запуску.
echo Выполните: docker-compose up --build -d
echo.

pause
