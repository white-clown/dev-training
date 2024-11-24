/**
 * enroll controller
 */

import { factories } from '@strapi/strapi'
const { parseMultipartData, sanitizeEntity } = require("@strapi/utils");
export default factories.createCoreController('api::enroll.enroll',{
    async  enrolls(ctx) {
        let data;
        try {
            if (ctx.is("multipart")) {
                // 解析 multipart 数据
                const { contentId, type, price, paymentType, enrollmentDate, expiryDate, enrollmentStatus } = ctx.request.body;
                const { files } = ctx.request;
                console.log(files)
                // 检查是否包含图片
                if (!files || !files.image) {
                  return ctx.badRequest("Image file is required");
                }
        
                // 上传图片
                const uploadedFile = await strapi.plugins["upload"].services.upload.upload({
                  data: {}, // 文件没有附加字段
                  files: files.image, // 上传的文件
                });
        
                // 获取上传图片的 URL
                const imageUrl = uploadedFile[0]?.url;
        
                if (!imageUrl) {
                  return ctx.internalServerError("Failed to upload image");
                }
        
                // 创建记录并将 image URL 存入 transactionUrl
                data = await strapi.entityService.create("api::enroll.enroll", {
                  data: {
                    contentId,
                    // type,
                    price,
                    paymentType,
                    enrollmentDate,
                    expiryDate,
                    enrollmentStatus,
                    transactionUrl: imageUrl,
                  },
                });
                return data;
              } else {
                return ctx.badRequest("Please upload a file with the request");
              }
        } catch (error) {
            strapi.log.error('Enroll Failed:', error);
            return ctx.internalServerError('Enroll Failed');
        }
    }

}
);
