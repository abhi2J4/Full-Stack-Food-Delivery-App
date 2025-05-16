package in.abhishek.foodiesApi.service;

import in.abhishek.foodiesApi.io.UserRequest;
import in.abhishek.foodiesApi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
