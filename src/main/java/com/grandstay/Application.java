package com.grandstay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * This class replaces the need for a web.xml or Servlet Container.
 * Running this main method starts the Grand Stay backend.
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        // This line launches the embedded Tomcat server and connects Hibernate
        SpringApplication.run(Application.class, args);
        
        System.out.println("--------------------------------------");
        System.out.println("Grand Stay Backend is Running!");
        System.out.println("Access the site at: http://localhost:8080/login.html");
        System.out.println("--------------------------------------");
    }
}