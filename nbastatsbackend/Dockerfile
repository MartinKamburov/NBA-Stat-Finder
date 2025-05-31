# ─── Stage 1: build with JDK 24 and your Maven Wrapper ─────────────────────────
FROM eclipse-temurin:24-jdk AS builder
WORKDIR /app

# copy wrapper + pom, download dependencies
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# copy source and build
COPY src src
RUN ./mvnw clean package -DskipTests

# ─── Stage 2: run on JRE 24 ───────────────────────────────────────────────────
FROM eclipse-temurin:24-jre
WORKDIR /app

# copy only the built jar
COPY --from=builder /app/target/*-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]