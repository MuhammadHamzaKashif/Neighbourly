package com.example.semesterProjectBackend.controller;

import com.example.semesterProjectBackend.model.Tasks;
import com.example.semesterProjectBackend.model.Users;
import com.example.semesterProjectBackend.service.TaskService;
import lombok.Getter;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskService service;

    @GetMapping("/tasks")
    public ResponseEntity<?> getAllTasks(Principal principal){
        System.out.println("Authenticated user: " + principal.getName());
        return service.getAllTasks();
    }
    @PostMapping("/tasks")
    public ResponseEntity<?> createTask(@ModelAttribute Tasks task, @RequestPart(value = "imageFile") MultipartFile imageFile, Principal principal) throws IOException {
        return service.createTask(task,imageFile,principal);

    }
    @GetMapping("/tasks/{id}")
    public ResponseEntity<?> getTask(@PathVariable int id){
        return service.getTask(id);
    }

    @PostMapping("/tasks/{id}")
    public ResponseEntity<?> assignVolunteer(@PathVariable int id, Principal principal){

        return service.assignVolunteer(id,principal);
    }
    @PutMapping("/taskUpdate/{id}")
    public ResponseEntity<?> updateTask(@PathVariable int id){
        return service.updateTask(id);
    }
    @GetMapping("/myTasks")
    public ResponseEntity<?> getMyTasks(Principal principal){
        return service.getMyTasks(principal);
    }
    @GetMapping("/task/{id}/image")
    public ResponseEntity<?> getImage(@PathVariable int id){
        return service.getImage(id);

    }
    @GetMapping("/volunteeredTasks")
    public ResponseEntity<?> getVolunteeredTasks(Principal principal)
    {
        return service.getVolunteeredTasks(principal);
    }
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable int id){
        return service.deleteTask(id);
    }
    @GetMapping("/task/{keyword}")
    public ResponseEntity<?> searchTasks(@PathVariable String keyword){
        return service.searchTasks(keyword);
    }
    @GetMapping("/task/{id}/volunteerName") 
    public ResponseEntity<?> getVolunteerName(@PathVariable int id){
        return new ResponseEntity<>(service.getTaskById(id).getVolunteer().getUsername(), HttpStatus.OK);
    }
    @GetMapping("/task/{id}/volunteer")
    public ResponseEntity<?> getVolunteer(@PathVariable int id){
        return new ResponseEntity<>(service.getTaskById(id).getVolunteer(), HttpStatus.OK);
    }

}
