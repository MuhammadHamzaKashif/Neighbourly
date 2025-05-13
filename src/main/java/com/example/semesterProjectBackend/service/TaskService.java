package com.example.semesterProjectBackend.service;

import com.example.semesterProjectBackend.model.Tasks;
import com.example.semesterProjectBackend.model.Users;
import com.example.semesterProjectBackend.repository.RequestRepository;
import com.example.semesterProjectBackend.repository.TaskRepository;
import com.example.semesterProjectBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@Service
public class TaskService {
    @Autowired
    TaskRepository repo;
    @Autowired
    UserRepository userRepo;
    @Autowired
    RequestRepository requestRepo;
    public ResponseEntity<?> getAllTasks() {

        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);

    }

    public ResponseEntity<?> createTask(Tasks task, MultipartFile imageFile,Principal principal) throws IOException {
        String email=principal.getName();
        Users poster = userRepo.findByEmail(email).orElseThrow();
        task.setPosters(poster);
        task.setImageName(imageFile.getOriginalFilename());
        task.setImageType(imageFile.getContentType());
        task.setImageData(imageFile.getBytes());
        return new ResponseEntity<>(repo.save(task),HttpStatus.OK);

    }

    public ResponseEntity<?> assignVolunteer(int id, Principal principal) {
        Tasks task = new Tasks();
        task.setCategory(requestRepo.findById(id).get().getCategory());
        task.setDescription(requestRepo.findById(id).get().getDescription());
        task.setStatus("Assigned");
        task.setTitle(requestRepo.findById(id).get().getTitle());
        task.setPosters(requestRepo.findById(id).get().getRequester());
        task.setRequest(requestRepo.findById(id).get());
        String email= principal.getName();
        Users volunteer = userRepo.findByEmail(email).orElseThrow();
        task.setVolunteer(volunteer);
        return new ResponseEntity<>(repo.save(task),HttpStatus.OK);
    }

    public ResponseEntity<?> updateTask(int id) {
        Tasks task = repo.findById(id).orElseThrow();
        if(task.getVolunteer()!=null){
            task.setStatus("completed");
            repo.save(task);
            return new ResponseEntity<>(task,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Task does not have a volunteer yet",HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> getMyTasks(Principal principal) {

        String email= principal.getName();
        Users poster=userRepo.findByEmail(email).orElseThrow();

        return new ResponseEntity<>(repo.findByPosters(poster),HttpStatus.OK);
    }

    public ResponseEntity<?> getVolunteeredTasks(Principal principal) {
        String email= principal.getName();
        Users volunteer=userRepo.findByEmail(email).orElseThrow();
        return new ResponseEntity<>(repo.findByVolunteer(volunteer),HttpStatus.OK);
    }

    public ResponseEntity<?> deleteTask(int id) {
        repo.deleteById(id);
        return new ResponseEntity<>("Task with ID:" + id + " deleted succesfully",HttpStatus.OK);
    }

    public ResponseEntity<?> searchTasks(String keyword) {
     return new ResponseEntity<>(repo.findByDescriptionContainingIgnoreCase(keyword),HttpStatus.OK);
    }

    public ResponseEntity<?> getImage(int id) {
        Tasks tasks = repo.findById(id).orElseThrow();
        byte[] imageFile = tasks.getImageData();
        return new ResponseEntity<>(imageFile,HttpStatus.OK);
    }

    public ResponseEntity<?> getTask(int id) {
        Tasks tasks = repo.findById(id).orElseThrow();
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }
    public Tasks getTaskById(int id) {
        return repo.findById(id).orElseThrow();
    }
}
