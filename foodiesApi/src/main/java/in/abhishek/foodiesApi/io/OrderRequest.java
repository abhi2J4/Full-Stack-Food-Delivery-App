package in.abhishek.foodiesApi.io;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderRequest {

    private  List<OrderItem> orderedItems;
    private  String userAddress;
    private double amount;
    private  String email;
   private  String phoneNumber;
   private  String orderStatus;

//    public List<OrderItem> getOrderedItems() {
//        return orderedItems;
//    }
}
