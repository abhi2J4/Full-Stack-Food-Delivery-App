package in.abhishek.foodiesApi.service;

import in.abhishek.foodiesApi.io.CartRequest;
import in.abhishek.foodiesApi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
