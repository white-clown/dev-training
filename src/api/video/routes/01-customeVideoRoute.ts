
export default {
    routes: [
        {
                //get video details
            method: 'GET',
            path: '/videos',
            handler: 'video.getVideoDetail',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    //     {
    //         //get video details
    //     method: 'POST',
    //     path: '/videos/:id/enroll',
    //     handler: 'video.enroll',
    //     config: {
    //         policies: [],
    //         middlewares: [],
    //     },
    // },
    ]
}