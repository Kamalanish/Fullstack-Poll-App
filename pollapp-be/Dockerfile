# Stage 1: Build the JAR with Maven
FROM maven:3.9.4-amazoncorretto-21 AS build

# Set the working directory in the container for the build stage
WORKDIR /app

# Copy the pom.xml and source code into the build directory
COPY pom.xml /app
COPY src /app/src

# Run the Maven package command to build the JAR
RUN mvn clean package -DskipTests

# Stage 2: Run the application with JDK runtime
FROM amazoncorretto:21.0.5-alpine3.17

# Set the working directory in the container for the runtime stage
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/Polling-App-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the application port
EXPOSE 8080

# Set the entrypoint to run the JAR file
ENTRYPOINT ["java", "-jar", "/app/app.jar"]