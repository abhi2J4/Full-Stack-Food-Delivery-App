package in.abhishek.foodiesApi.repository;

import in.abhishek.foodiesApi.entity.FoodEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository  extends MongoRepository <FoodEntity,String>{
}
