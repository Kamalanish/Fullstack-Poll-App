# Use a base image with JDK
FROM amazoncorretto:21.0.5-alpine3.17
# Set the working directory in the container
WORKDIR /app
COPY target/Polling-App-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
