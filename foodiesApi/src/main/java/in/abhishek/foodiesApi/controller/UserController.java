package in.abhishek.foodiesApi.controller;

import in.abhishek.foodiesApi.io.UserRequest;
import in.abhishek.foodiesApi.io.UserResponse;
import in.abhishek.foodiesApi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {
    private  final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request){
       return  userService.registerUser(request);
    }
}
