#!/bin/bash

echo "========================================"
echo "   MindEducation - Образовательная игра"
echo "========================================"
echo

# Проверка Docker
if ! command -v docker &> /dev/null; then
    echo "ОШИБКА: Docker не установлен!"
    echo "Пожалуйста, установите Docker и запустите его."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "ОШИБКА: Docker Compose не установлен!"
    echo "Пожалуйста, установите Docker Compose."
    exit 1
fi

echo "Docker найден. Запуск приложения..."
echo

echo "Остановка предыдущих контейнеров (если есть)..."
docker-compose down

echo
echo "Сборка и запуск контейнеров..."
docker-compose up --build -d

echo
echo "Ожидание запуска базы данных..."
sleep 10

echo
echo "Проверка статуса контейнеров..."
docker-compose ps

echo
echo "========================================"
echo "   Приложение запущено!"
echo "========================================"
echo
echo "Игра доступна по адресу: http://localhost:8080"
echo "Админ панель: http://localhost:8080/admin"
echo
echo "Для остановки приложения выполните: docker-compose down"
echo

# Попытка открыть браузер (работает на macOS и Linux)
if command -v open &> /dev/null; then
    open http://localhost:8080
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8080
fi

echo "Нажмите Enter для выхода..."
read
