package zysy.iflytek.zhumang.minio.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import zysy.iflytek.zhumang.utils.ResponseResult;
import zysy.iflytek.zhumang.minio.dto.MinioUploadDto;
import zysy.iflytek.zhumang.minio.service.MinioService;

/**
 * MinIO对象存储管理Controller
 * Created by yx on 2019/12/25.
 */
@RestController
@Api(tags = "MinioController")
@Tag(name = "MinioController", description = "MinIO对象存储管理")
@RequestMapping("/minio")
public class MinioController {

    @Autowired
    private MinioService minioService;

    @ApiOperation("文件上传")
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseResult upload(@RequestPart("file") MultipartFile file) {
        try {
            MinioUploadDto minioUploadDto = minioService.uploadFile(file);
            return ResponseResult.success(minioUploadDto);
        } catch (Exception e) {
            return ResponseResult.fail();
        }
    }

//    @ApiOperation("文件删除")
//    @RequestMapping(value = "/delete", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseResult delete(@RequestParam("objectName") String objectName) {
//        try {
//            MinioClient minioClient = MinioClient.builder()
//                    .endpoint(ENDPOINT)
//                    .credentials(ACCESS_KEY,SECRET_KEY)
//                    .build();
//            minioClient.removeObject(RemoveObjectArgs.builder().bucket(BUCKET_NAME).object(objectName).build());
//            return ResponseResult.success((HttpStatusEnum) null);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return ResponseResult.fail();
//    }
}