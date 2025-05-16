package in.abhishek.foodiesApi.service;


import com.razorpay.RazorpayException;
import in.abhishek.foodiesApi.io.OrderRequest;
import in.abhishek.foodiesApi.io.OrderResponse;

import java.util.List;
import java.util.Map;

public interface OrderService {
    OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException;

    void verifyPayment(Map<String,String> paymentData,String status);

    List<OrderResponse> getUserOrders();

    void removeOrder(String orderId);

    List<OrderResponse>getOrdersOfAllUsers();


    void  updateOrderStatus(String orderId, String status);
}

