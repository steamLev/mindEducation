# Устранение проблем с Docker

## Проблема 1: "openjdk:21-jre-slim: not found"
### Причина: Образ `openjdk:21-jre-slim` больше не доступен в Docker Hub.

## Проблема 2: "maven:3.9.6-openjdk-21-slim: not found"
### Причина: Образ `maven:3.9.6-openjdk-21-slim` также недоступен.

### Решения

#### 1. Используйте правильные образы:
```dockerfile
# Для Maven сборки
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Для финального образа
FROM eclipse-temurin:21-jre-alpine
```

#### 2. Альтернативные образы:
```dockerfile
# Maven с OpenJDK
FROM maven:3.9.6-openjdk-21

# Или с Amazon Corretto
FROM maven:3.9.6-amazoncorretto-21
```

## Альтернативные способы запуска

### 1. Локальная сборка (РЕКОМЕНДУЕТСЯ)
```bash
# Windows
run-local.bat

# Linux/Mac
./run-local.sh

# Или вручную
mvn clean package
java -jar target/*.jar
```

### 2. Использование исправленного Dockerfile
```bash
# Используйте Dockerfile.working
docker-compose up --build -d
```

### 3. Проверка доступных образов
```bash
# Поиск Maven образов
docker search maven | grep 21

# Поиск Eclipse Temurin образов
docker search temurin | grep 21
```

## Проверка доступных образов

```bash
# Поиск образов OpenJDK 21
docker search openjdk | grep 21

# Поиск образов Eclipse Temurin
docker search temurin | grep 21
```

## Обновленные Dockerfile

В проекте созданы несколько вариантов Dockerfile:

1. **Dockerfile.maven** - использует Maven образ (рекомендуется)
2. **Dockerfile.simple** - простой вариант
3. **Dockerfile** - оригинальный с исправлениями

## Быстрый запуск

```bash
# Используйте обновленный docker-compose.yml
docker-compose up --build -d

# Или с конкретным Dockerfile
docker-compose -f docker-compose.yml up --build -d
```

## Проверка работоспособности

```bash
# Проверка статуса контейнеров
docker-compose ps

# Просмотр логов
docker-compose logs -f app

# Проверка доступности приложения
curl http://localhost:8080
```

## Если проблемы продолжаются

1. Обновите Docker до последней версии
2. Очистите кэш Docker: `docker system prune -a`
3. Используйте локальную сборку: `mvn spring-boot:run`
