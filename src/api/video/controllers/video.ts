/**
 * video controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::video.video',{
    async getVideoDetail(ctx){
        try {
            // const videoService = strapi.service('api::video.video');
            // const { id } = ctx.params;
            // console.log(filters)
            const video = await strapi.documents('api::video.video').findMany( {
                
              //filter if require
            //   filters:await videoService.filterCondition(ctx),
              fields:['id','title','author','description','price','createdAt','updatedAt'],
              populate: {
                courseInclude:true,
                trailerUrl:{fields:['url']},
                thumbNailImg:{fields:['url']},
                enrollments:{fields:['id','username']},
                category:{
                  fields:['name']
                },
                sm_videos:{
                      fields:['id','title','description','is_watched', 'createdAt','updatedAt'],
                      populate:{
                        video:{fields:['url']},
                        likes:{fields:['createdAt'],populate:{users_permissions_user:{fields:['id']}}},
                        comments:{fields:['id','body','createdAt','updatedAt'],populate:{users_permissions_user:{fields:['id','username'],populate:{profileImg:{fields:['url']}}}}},
                        views:{fields:['createdAt'],populate:{users_permissions_user:{fields:['id']}}}
                    },
                  
                },
              },
              sort: { createdAt: 'desc' },
              // limit: 10, // 根据需求调整
            })as any;
            // console.log(videos)
            // console.log(video)
            // const videoWithCountsAndSaveStatus = videoService.getvideoWithLikeAndComment(videos)
            // console.log(video.sm_video.id)
            
            return {data:video};
          } catch (error) {
            strapi.log.error('Get video Failed:', error);
            return ctx.internalServerError('Get video Failed');
          }
    },
    // async enroll(ctx) {
    //   const userId = ctx.state.user?.documentId; // 获取当前用户ID
    //   const videoId = ctx.params.id;    // 获取视频ID
  
    //   if (!userId) {
    //     return ctx.badRequest("User not authenticated");
    //   }
  
    //   if (!videoId) {
    //     return ctx.badRequest("Video ID is required");
    //   }
  
    //   try {
    //     // 获取当前用户和视频
    //     const user = await strapi.documents('plugin::users-permissions.user').findOne({
    //       documentId:userId,
    //       populate: ['enrolled_videos'],
    //     });
    //     const video = await strapi.documents('api::video.video').findOne({
    //       documentId:videoId,
    //       populate: ['enrollments'],
    //     });
    //     // console.log(userId)
    //     // console.log(videoId)
    //     // console.log(user)
    //     // console.log(video)
    //     if (!user || !video) {
    //       return ctx.notFound("User or Video not found");
    //     }
  
    //     // 检查用户是否已经注册
    //     const alreadyEnrolled = user.enrolled_videos.some((enrolledVideo) => enrolledVideo.id === video.id);
  
    //     if (alreadyEnrolled) {
    //       return ctx.badRequest("User already enrolled in this video");
    //     }
  
    //     // 更新关系
    //     await strapi.documents('plugin::users-permissions.user').update ({
    //       documentId:userId,
    //       data: {
    //         enrolled_videos: [...user.enrolled_videos.map(v => v.id), video.id],
    //       },
    //     });
  
    //     ctx.send({ message: "Enrollment successful" });
    //   } catch (error) {
    //     strapi.log.error("Enrollment error", error);
    //     ctx.internalServerError("An error occurred during enrollment");
    //   }
    // },
});
