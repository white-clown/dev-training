export default {
    routes: [
      {
          //get all blogs
        method: 'POST',
        path: '/enrolls',
        handler: 'enroll.enrolls',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ]
}