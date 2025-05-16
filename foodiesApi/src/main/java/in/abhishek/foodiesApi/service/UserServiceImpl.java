package in.abhishek.foodiesApi.service;

//import in.abhishek.foodiesApi.entity.UserEntity;
//import in.abhishek.foodiesApi.io.UserRequest;
import in.abhishek.foodiesApi.entity.UserEntity;
import in.abhishek.foodiesApi.io.UserRequest;
import in.abhishek.foodiesApi.io.UserResponse;
import in.abhishek.foodiesApi.repository.UserRepository;
import in.abhishek.foodiesApi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
private final UserRepository userRepository;
private  final PasswordEncoder passwordEncoder;
private  final  AutthenticationFacade autthenticationFacade;
@Override
    public UserResponse registerUser(UserRequest request){
    UserEntity newUser = convertToEntity(request);
    newUser = userRepository.save(newUser);
     return convertToResponse(newUser);
}

    @Override
    public String findByUserId() {
        String loggedInUserEmail =  autthenticationFacade.getAuthentication().getName();
      UserEntity loggedInUser = userRepository.findByEmail(loggedInUserEmail).orElseThrow(() -> new UsernameNotFoundException("user not found"));
      return  loggedInUser.getId();
    }

    private UserEntity convertToEntity(UserRequest request){
return UserEntity.builder()
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()) )
        .name(request.getName())
        .build();
}
private UserResponse convertToResponse(UserEntity registeredUser){
return  UserResponse.builder()
        .id(registeredUser.getId())
        .name(registeredUser.getName())
        .email(registeredUser.getEmail())
        .build();
}
}
