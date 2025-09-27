FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Устанавливаем Maven
RUN apk add --no-cache maven

# Копируем pom.xml и загружаем зависимости
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Делаем mvnw исполняемым
RUN chmod +x mvnw

# Загружаем зависимости
RUN ./mvnw dependency:go-offline -B

# Копируем исходный код
COPY src ./src

# Собираем приложение
RUN ./mvnw clean package -DskipTests

# Создаем финальный образ
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Копируем собранный jar файл
COPY --from=0 /app/target/*.jar app.jar

# Открываем порт
EXPOSE 8080

# Запускаем приложение
ENTRYPOINT ["java", "-jar", "app.jar"]
