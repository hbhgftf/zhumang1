package zysy.iflytek.zhumang.common.interceptor;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import zysy.iflytek.zhumang.common.exception.BusinessException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(JwtInterceptor.class);
    private static final String BEARER_PREFIX = "Bearer ";
    private static final PathMatcher pathMatcher = new AntPathMatcher();

    @Value("${jwt.secret}")
    private String secret;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String requestURI = request.getRequestURI();
        logger.debug("[*] JwtInterceptor: Entering preHandle for URI: {}", requestURI);

        // === 新增：多种token来源兼容 ===
        String token = null;
        String authHeader = request.getHeader("Authorization");
        if (StringUtils.hasText(authHeader)) {
            if (authHeader.startsWith(BEARER_PREFIX)) {
                token = authHeader.substring(BEARER_PREFIX.length());
            } else {
                // 兼容直接传token的情况
                token = authHeader;
            }
        }
        if (!StringUtils.hasText(token)) {
            token = request.getHeader("token");
        }
        if (!StringUtils.hasText(token)) {
            token = request.getParameter("token");
        }
        // === 兼容结束 ===

        if (!StringUtils.hasText(token)) {
            logger.warn("Missing token for request: {}", requestURI);
            throw new BusinessException("请先登录");
        }

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            Long userId = Long.parseLong(claims.getSubject());
            logger.info("Successfully authenticated user {} for request: {}", userId, requestURI);
            
            request.setAttribute("userId", userId);
            return true;
        } catch (ExpiredJwtException e) {
            logger.warn("Token expired for request: {}", requestURI);
            throw new BusinessException("登录已过期，请重新登录");
        } catch (SignatureException e) {
            logger.warn("Invalid token signature for request: {}", requestURI);
            throw new BusinessException("无效的认证信息");
        } catch (MalformedJwtException e) {
            logger.warn("Malformed token for request: {}", requestURI);
            throw new BusinessException("无效的认证信息");
        } catch (Exception e) {
            logger.error("Token validation failed for request: " + requestURI, e);
            throw new BusinessException("认证失败");
        }
    }
} 