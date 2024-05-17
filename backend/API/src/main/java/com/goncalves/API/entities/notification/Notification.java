package com.goncalves.API.entities.notification;

import com.goncalves.API.entities.user.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "notifications")
public class Notification {
    @Id
    private String idNotification;

    private String title;
    private String message;
    private String body;

    @DBRef
    private Users users;
    private LocalDateTime expirationDate;

    public Notification(String title, String message, String body, Users users) {
        this.title = title;
        this.message = message;
        this.body = body;
        this.users = users;
        this.expirationDate = LocalDateTime.now();
    }

}
