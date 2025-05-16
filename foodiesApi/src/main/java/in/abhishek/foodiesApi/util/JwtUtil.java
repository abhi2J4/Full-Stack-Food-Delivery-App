package in.abhishek.foodiesApi.util;



import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

@Component
public class JwtUtil {
    @Value("${jwt.secret.key}")
    private  String SECRET_KEY;

    public String generateToken(UserDetails userDetails){
      Map<String,Objects>claiams = new HashMap<>();
      return createToken(claiams,userDetails.getUsername());
    }

    private String createToken(Map<String, Objects> claiams, String subject) {
       return Jwts.builder()
                .setClaims(claiams)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() +1000 * 60 * 60 *24 * 7))// 10 hours ex[licaton
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .compact();
    }

    public  String extractUsername(String token){
        return  extractClaim(token, Claims::getSubject);
    }
    public  Date extractExpiration (String token){
        return extractClaim(token,Claims::getExpiration);

    }
    public <T> T extractClaim(String token, Function<Claims,T>ClaimsResolver){
        final  Claims claims = extractAllClaims(token);
        return  ClaimsResolver.apply(claims);
    }

//    private Claims extractAllClaims(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8))
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }



    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
//private Claims extractAllClaims(String token) {
//    return Jwts
//            .parser()
//            .setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8)) // or use Keys.hmacShaKeyFor(...)
//            .build()
//            .parseClaimsJws(token)
//            .getBody();
//}


    private  Boolean isTokenExpired(String token){
        return  extractExpiration(token).before(new Date());
    }
    public  Boolean  validateToken(String token,UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
