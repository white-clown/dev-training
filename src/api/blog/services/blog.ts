/**
 * blog service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::blog.blog',({ strapi }) =>  ({

    async filterCondition(ctx){
         //filter if need
         const { categories, keyword } = ctx.query;
         // construct filter
         const filters: { [key: string]: any } = {} = {};
         if (categories) {
           filters.categories = { name:{$contains: categories }};  // filter category
         }
         if (keyword) {
           filters.title = { $contains: keyword };  // filter keyword
           // filters.content = { $contains: keyword };
         }
         return filters;
    },
    async getBlogWithLikeAndComment(blogs){
        const blogWithCountsAndSaveStatus = await Promise.all(
            blogs.map(async (blog) => {
  
              return {
                data:[
                  blog
                ],
              };
            })
          );
        return blogWithCountsAndSaveStatus;
    }
}));
