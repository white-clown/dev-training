// const {createCoreController}= require("@strapi/strapi").factories;

export default {
    async register(ctx){
        const { username, email, phone, password, confirmPassword,region ,fcmToken ,profileImg} = ctx.request.body;

        // console.log(ctx.request.body)
        // console.log(username)
        // required validation
        if (!username || !email || !phone || !password || !confirmPassword) {
        if(!username) return ctx.badRequest('User name must be enter!');
        if(!email) return ctx.badRequest('Email must be enter!');
        if(!phone) return ctx.badRequest('Phone must be enter!');
        if(!password) return ctx.badRequest('Password must be enter!');
        if(!confirmPassword) return ctx.badRequest('Confirm Password must be enter!');
        }

        //validate email format
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
        return ctx.badRequest('Invalid email format!');
        }

        //check phone number format
        const phoneRegex = /^09\d{7,9}$/; // 09开头，后接7到9个数字
        if (!phoneRegex.test(phone)) {
        return ctx.badRequest('Phone number must start with 09 and be followed by 7 to 9 digits!');
        }

        //password format
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // 至少8个字符，包含大小写字母、数字和特殊字符
        if (!passwordRegex.test(password)) {
        return ctx.badRequest('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character!');
        }

        if (password !== confirmPassword) {
        return ctx.badRequest('Password and confirm password must be the same!');
        }

        try {
        // check the user is exist
        const existingUser = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });
        if (existingUser) {
            return ctx.badRequest('Email has already registered!');
        }

        // create a new user
        const user = await strapi.documents('plugin::users-permissions.user').create({
            data:{
            username:username,
            email:email,
            phone:phone,
            password:password,
            region:region,
            fcmtoken:fcmToken,
            provider: "local",
            confirmed:true,
            profileImg :profileImg,
            role:1
            }
        });
        

        // construct JWT
        const jwt = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });
    
        return ctx.send({
            message:"Registered Success!",
            user:user,
            jwt,
        });
        } catch (error) {
        return ctx.badRequest('Register Fail!');
        }
    },
    // async getMe(ctx){
    //     const user = await strapi.documents('plugin::users-permissions.user').findOne(  {
    //         documentId:ctx.state.user.documentId,
    //         populate: {profileImg:{fields:['url']}}, // 指定要加载的关联字段,
    //       });
          
    //       if (!user) {
    //         return ctx.badRequest('User not found');
    //       }
          
    //       // 筛选需要返回的字段
    //       const { id, username, email, profileImg } = user;
          
    //       return { id, username, email, profileImg:profileImg.url };
    // }
};