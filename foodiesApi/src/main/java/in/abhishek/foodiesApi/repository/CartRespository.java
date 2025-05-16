package in.abhishek.foodiesApi.repository;

import in.abhishek.foodiesApi.entity.CartEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRespository extends MongoRepository<CartEntity,String> {

    Optional<CartEntity> findByUserId(String UserId);

    void  deleteByUserId(String userId);
}
