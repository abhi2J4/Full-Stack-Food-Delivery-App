package in.abhishek.foodiesApi.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodRequest {

  private String id;
  private String name;
  private String description;
  private String imageUrl;
  private  double price ;
  private  String category;

}
