@echo off
echo ========================================
echo    MindEducation - Локальный запуск
echo ========================================
echo.

echo Проверка Java...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ОШИБКА: Java не установлена!
    echo Пожалуйста, установите Java 21 или выше.
    pause
    exit /b 1
)

echo Java найдена. Проверка Maven...
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ОШИБКА: Maven не установлен!
    echo Пожалуйста, установите Apache Maven.
    pause
    exit /b 1
)

echo Maven найден. Запуск приложения...
echo.

echo Сборка проекта...
mvn clean package -DskipTests

if %errorlevel% neq 0 (
    echo.
    echo ОШИБКА при сборке проекта!
    pause
    exit /b 1
)

echo.
echo Запуск приложения...
echo Игра будет доступна по адресу: http://localhost:8080
echo.

java -jar target/*.jar

pause
