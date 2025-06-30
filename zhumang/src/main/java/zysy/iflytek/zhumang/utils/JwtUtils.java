package zysy.iflytek.zhumang.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    private static String secret;  // 密钥
    private static long expireSeconds;   // 过期时间（秒）
    private static long refreshExpireSeconds;   // 刷新token过期时间（秒）

    @Value("${jwt.secret}")
    public void setSecret(String secret) {
        System.out.println("JwtUtils.setSecret() 被调用，secret: " + (secret != null ? secret.substring(0, Math.min(10, secret.length())) + "..." : "null"));
        JwtUtils.secret = secret;
    }

    @Value("${jwt.expire}")
    public void setExpire(long expireSeconds) {
        System.out.println("JwtUtils.setExpire() 被调用，expireSeconds: " + expireSeconds);
        JwtUtils.expireSeconds = expireSeconds;
    }

    @Value("${jwt.refresh-expire}")
    public void setRefreshExpire(long refreshExpireSeconds) {
        System.out.println("JwtUtils.setRefreshExpire() 被调用，refreshExpireSeconds: " + refreshExpireSeconds);
        JwtUtils.refreshExpireSeconds = refreshExpireSeconds;
    }

    @PostConstruct
    public void init() {
        System.out.println("=== JwtUtils 初始化开始 ===");
        System.out.println("secret: " + (secret != null ? secret.substring(0, Math.min(10, secret.length())) + "..." : "null"));
        System.out.println("expireSeconds: " + expireSeconds);
        System.out.println("refreshExpireSeconds: " + refreshExpireSeconds);
        System.out.println("=== JwtUtils 初始化结束 ===");
    }

    /**
     * 生成 JWT 访问令牌
     */
    public static String generateToken(Long userId) {
        return generateToken(userId, expireSeconds);
    }

    /**
     * 生成 JWT 刷新令牌
     */
    public static String generateRefreshToken(Long userId) {
        return generateToken(userId, refreshExpireSeconds);
    }

    /**
     * 生成 JWT 令牌
     */
    private static String generateToken(Long userId, long expireSeconds) {
        if (secret == null || secret.isEmpty()) {
            throw new JwtException("JWT secret is not configured");
        }
        
        try {
            Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            return Jwts.builder()
                    .setSubject(userId.toString())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + expireSeconds * 1000))
                    .signWith(key, SignatureAlgorithm.HS512)
                    .compact();
        } catch (Exception e) {
            throw new JwtException("Failed to generate token: " + e.getMessage(), e);
        }
    }

    /**
     * 从 JWT 令牌中获取用户 ID
     */
    public static Long getUserIdFromToken(String token) throws JwtException {
        if (secret == null || secret.isEmpty()) {
            throw new JwtException("JWT secret is not configured");
        }
        
        try {
            Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return Long.parseLong(claims.getSubject());
        } catch (Exception e) {
            throw new JwtException("Failed to parse token: " + e.getMessage(), e);
        }
    }

    /**
     * 验证令牌是否过期
     */
    public static boolean isTokenExpired(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    /**
     * 验证令牌是否有效（未过期且签名正确）
     */
    public static boolean validateToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}