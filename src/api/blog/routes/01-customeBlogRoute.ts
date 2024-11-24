export default {
    routes: [
      {
          //get all blogs
        method: 'GET',
        path: '/blogs/all',
        handler: 'blog.getBlogs',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    //   {
    //     //get save Blogs
    //   method: 'GET',
    //   path: '/blogs/saved',
    //   handler: 'blog.getSaveBlogs',
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
      {
        //get blog details
        method: 'GET',
        path: '/blogs/:id',
        handler: 'blog.getBlogDetails',
        config: {
            policies: [],
            middlewares: [],
        },
        },
        // {
        //   //save a blog
        //   method: 'PUT',
        //   path: '/blogs/:id/save',
        //   handler: 'blog.saveBlog',
        //   config: {
        //     policies: [],
        //     middlewares: [],
        //   },
        // },
        // {
        //   //unsave a blog
        //   method: 'PUT',
        //   path: '/blogs/:id/unsave',
        //   handler: 'blog.unsaveBlog',
        //   config: {
        //     policies: [],
        //     middlewares: [],
        //   },
        // },
    ]
}