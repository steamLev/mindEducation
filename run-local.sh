#!/bin/bash

echo "========================================"
echo "   MindEducation - Локальный запуск"
echo "========================================"
echo

# Проверка Java
if ! command -v java &> /dev/null; then
    echo "ОШИБКА: Java не установлена!"
    echo "Пожалуйста, установите Java 21 или выше."
    exit 1
fi

echo "Java найдена. Проверка Maven..."
if ! command -v mvn &> /dev/null; then
    echo "ОШИБКА: Maven не установлен!"
    echo "Пожалуйста, установите Apache Maven."
    exit 1
fi

echo "Maven найден. Запуск приложения..."
echo

echo "Сборка проекта..."
mvn clean package -DskipTests

if [ $? -ne 0 ]; then
    echo
    echo "ОШИБКА при сборке проекта!"
    exit 1
fi

echo
echo "Запуск приложения..."
echo "Игра будет доступна по адресу: http://localhost:8080"
echo

java -jar target/*.jar
