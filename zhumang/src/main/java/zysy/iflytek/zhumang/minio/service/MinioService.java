package zysy.iflytek.zhumang.minio.service;

import org.springframework.web.multipart.MultipartFile;
import zysy.iflytek.zhumang.minio.dto.MinioUploadDto;

public interface MinioService {
    /**
     * 上传文件
     * @param file 要上传的文件
     * @return 上传结果
     */
    MinioUploadDto uploadFile(MultipartFile file);
} 