@echo off
echo ========================================
echo    MindEducation - Образовательная игра
echo ========================================
echo.

echo Проверка Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ОШИБКА: Docker не установлен или не запущен!
    echo Пожалуйста, установите Docker Desktop и запустите его.
    pause
    exit /b 1
)

echo Docker найден. Проверка Docker Compose...
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ОШИБКА: Docker Compose не найден!
    echo Попробуйте использовать: docker compose вместо docker-compose
    pause
    exit /b 1
)

echo Docker Compose найден. Запуск приложения...
echo.

echo Остановка предыдущих контейнеров (если есть)...
docker-compose down

echo.
echo Сборка и запуск контейнеров...
echo Это может занять несколько минут при первом запуске...
docker-compose up --build -d

if %errorlevel% neq 0 (
    echo.
    echo ОШИБКА при сборке или запуске контейнеров!
    echo Проверьте логи: docker-compose logs
    pause
    exit /b 1
)

echo.
echo Ожидание запуска базы данных...
timeout /t 15 /nobreak >nul

echo.
echo Проверка статуса контейнеров...
docker-compose ps

echo.
echo Проверка логов приложения...
echo (Показываем последние 10 строк логов)
docker-compose logs --tail=10 app

echo.
echo ========================================
echo    Приложение запущено!
echo ========================================
echo.
echo Игра доступна по адресу: http://localhost:8080
echo Админ панель: http://localhost:8080/admin
echo.
echo Для остановки приложения выполните: docker-compose down
echo Для просмотра логов: docker-compose logs -f
echo.

echo Открытие браузера...
timeout /t 3 /nobreak >nul
start http://localhost:8080

echo.
echo Нажмите любую клавишу для выхода...
pause >nul
