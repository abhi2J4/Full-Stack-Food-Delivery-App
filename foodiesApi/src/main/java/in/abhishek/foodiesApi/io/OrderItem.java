//package in.abhishek.foodiesApi.io;
//
//
//import lombok.Builder;
//import lombok.Data;
//
//@Data
//@Builder
//public class OrderItem {
//    private  String foodId;
//    private  int quantity;
//    private  double category;
//    private  String imageUrl;
//    private  String price;
//    private  String description;
//    private  String name;
//}

package in.abhishek.foodiesApi.io;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItem {
    private String foodId;
    private int quantity;
    private String category;     // ✅ FIXED
    private String imageUrl;
    private double price;        // ✅ if price is numeric
    private String description;
    private String name;
}

