/**
 * blog controller
 */

import { factories } from '@strapi/strapi'
import { permission } from 'process';

export default factories.createCoreController('api::blog.blog',{
     // get all blogs（分页、过滤、排序等由 Strapi 内置）
     async getBlogs(ctx) {
        try {
          const blogService = strapi.service('api::blog.blog');
  
          // console.log(filters)
          const blogs = await strapi.documents('api::blog.blog').findMany( {
            //filter if require
            filters:await blogService.filterCondition(ctx),
            fields:['id','title','author','date','content','price','createdAt','updatedAt'],
            populate: {
              likes:{fields:['createdAt'],populate:{users_permissions_user:{fields:['id']}}},
              comments:{fields:['id','body','createdAt','updatedAt']},
              views:{fields:['createdAt'],populate:{users_permissions_user:{fields:['id']}}},
              Image:{fields:['url']},
              category:{
                fields:['name']
              },
            },
            sort: { createdAt: 'desc' },
            // limit: 10, // 根据需求调整
          })as any;
          // console.log(blogs)
      
          // const blogWithCountsAndSaveStatus = blogService.getBlogWithLikeAndComment(blogs)
  
          return {data:blogs};
          
        } catch (error) {
          strapi.log.error('Get All Blog Failed:', error);
          return ctx.internalServerError('Get All Blog Failed');
        }
      },
      // get save blogs（分页、过滤、排序等由 Strapi 内置）
    //  async getSaveBlogs(ctx) {
    //   try {
    //     const user = ctx.state.user;
  
    //     if (!user) {
    //       return ctx.unauthorized('User not Authorized');
    //     }

    //     // console.log(filters)
    //     const blogs = await strapi.documents('api::blog.blog').findMany( {
    //       //filter if require
    //       filters:{users_permissions_user:user.id},
    //       fields:['id','title','author','date','content','price','createdAt','updatedAt'],
    //       populate: {
    //         likes:{fields:['createdAt'],populate:{users_permissions_user:{fields:['id']}}},
    //         comments:{fields:['id','body','createdAt','updatedAt']},
    //         views:{fields:['createdAt'],populate:{users_permissions_user:{fields:['id']}}},
    //         Image:{fields:['url']},
    //         category:{
    //           fields:['name']
    //         },
    //       },
    //       sort: { createdAt: 'desc' },
    //       // limit: 10, // 根据需求调整
    //     })as any;
    //     // console.log(blogs)
    
    //     // const blogWithCountsAndSaveStatus = blogService.getBlogWithLikeAndComment(blogs)

    //     return {data:blogs};
        
    //   } catch (error) {
    //     strapi.log.error('Get All Blog Failed:', error);
    //     return ctx.internalServerError('Get All Blog Failed');
    //   }
    // },
      async getBlogDetails(ctx){
        try {
            const blogService = strapi.service('api::blog.blog');
            const { id } = ctx.params;
            // console.log(id)
            const blog = await strapi.documents('api::blog.blog').findOne( {
                documentId:id,
                populate: {
                    likes:{populate:{users_permissions_user:{fields:['id']}}},
                    comments:true,
                    Image:{fields:['url']},
                    category:{
                    fields:['name']
                    },
                },
                sort: { createdAt: 'desc' },
                // limit: 10, // 根据需求调整
            })as any;
            // console.log(blogs)
        
            const likeCount = await strapi.entityService.count('api::like.like', {
                filters: {
                  blog: {
                    id: {
                      $eq: blog.id,  // 明确指定 $eq 来匹配 ID
                    },
                  },
                },
              });
      
              // get the current blog comment count
              const commentCount = await strapi.documents('api::comment.comment').count( {
                filters: {
                  blog: {
                    id: {
                      $eq: blog.id,  // 明确指定 $eq 来匹配 ID
                    },
                  },
                },
              });
            return {
                data:[
                  blog,
                  likeCount,
                  commentCount,
                ],
              };
          } catch (error) {
            strapi.log.error('Get All Blog Failed:', error);
            return ctx.internalServerError('Get All Blog Failed');
          }
      },
      // Save Blog
    // async saveBlog(ctx) {
    //   const { id } = ctx.params;
    //   const user = ctx.state.user;

    //   if (!user) {
    //     return ctx.unauthorized('User not authorized');
    //   }

    //   // 查找博客是否存在
    //   const blog = await strapi.documents('api::blog.blog').findOne({documentId:id});
    //   if (!blog) {
    //     return ctx.notFound('Blog not found');
    //   }

    //   // 获取用户的完整信息，包括已保存的博客
    //   const userWithSavedBlogs = await strapi.documents('plugin::users-permissions.user').findOne({
    //     documentId:user.documentId,
    //     populate: ['saveBlog']
    //   }) as any;

    //   // 检查博客是否已经被保存
    //   const isAlreadySaved = userWithSavedBlogs.saveBlog.some(savedBlog => savedBlog.id === blog.id);

    //   if (isAlreadySaved) {
    //     return ctx.badRequest('Blog has already save');
    //   }


    //   const arrr=[...userWithSavedBlogs.saveBlog.map(b=>b.id), blog.id]as any;
      
    //   console.log(arrr)

    //   const updatedUser = await strapi.documents('plugin::users-permissions.user').update({
    //     documentId: user.documentId, 
    //     data:{
    //       saveBlog: arrr
    //     },
    //       // saveBlog:blog.id
    //     populate: ['saveBlog'],
    //   })as any;
    //   // console.log(updatedUser)
    //   return ctx.send({
    //     message: 'Blog saved',
    //     // saveBlog: updatedUser.saveBlog,
    //   });
    // },

    // // unsave Blog
    // async unsaveBlog(ctx) {
    //   const { id } = ctx.params;
    //   const user = ctx.state.user;

    //   if (!user) {
    //     return ctx.unauthorized('User not register');
    //   }

    //   // 查找博客是否存在
    //   const blog = await strapi.documents('api::blog.blog').findOne({documentId:id});
    //   if (!blog) {
    //     return ctx.notFound('Blog not found');
    //   }

    //   // 获取用户的完整信息，包括已保存的博客
    //   const userWithSavedBlogs = await strapi.documents('plugin::users-permissions.user').findOne({
    //     documentId:user.documentId,
    //     populate: ['saveBlog'],
    //   })as any;

    //   // 检查博客是否已经被保存
    //   const isSaved = userWithSavedBlogs.saveBlog.some(savedBlog => savedBlog.id === blog.id);
    //   if (!isSaved) {
    //     return ctx.badRequest('博客尚未被保存');
    //   }

    //   // 过滤掉要取消保存的博客
    //   const updatedSavedBlogs = userWithSavedBlogs.saveBlog.filter(savedBlog => savedBlog.id !== blog.id).map(b => b.id);

    //   // 更新用户的 savedBlogs 关系
    //   const updatedUser = await strapi.documents('plugin::users-permissions.user').update({
    //     documentId: user.id, 
    //     data: {
    //       saveBlog: updatedSavedBlogs,
    //     },
    //     populate: ['saveBlog'],
    //   })as any;

    //   return ctx.send({
    //     message: 'Blog unsave',
    //     saved_by: updatedUser.saveBlog,
    //   });
    // },
  });

