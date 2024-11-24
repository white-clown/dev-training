export default{
    routes:[
        {
            method:"POST",
            path:"/auth/register",
            handler:"controller.register",
            config:{
                policies:[]
            }
        },
        // {
        //     method:"GET",
        //     path:"/user/me",
        //     handler:"controller.getMe",
        //     config:{
        //         policies:[]
        //     }
        // }
    ]
}