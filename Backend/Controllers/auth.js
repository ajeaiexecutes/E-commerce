//updated

import User from '../Models/userSchema.js';
import * as adminhelper from '../Middleware/adminAuth.js';


export async function register(req, res) {
    try {
        
        const { name, email, password,confirmpassword, role, status } = req.body;
        console.log("res",confirmpassword);
        
        if (!name||!email || !password || !confirmpassword) {
            return res.status(400).json({msg:'missing fields'})
        }
        if (password !== confirmpassword) {
            return res.status(401).json({mess:"passwords not matches"})
        }

        const hash = await adminhelper.hashpassword(password);
        const user = new User({ name, email, password:hash, role ,status    });
        console.log(user);
        
        await user.save();

        

        //create session 

        req.session.user = user._id;
        req.session.role = user.role;

        return res.status(201).json({
            msg: 'registerd'
        })
    }
    catch (error) {
        console.log(error);
    }

}

export async function userLogin(req,res) {
    // console.log("reeqc");
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({msg:'missing error'})
        }

        //find for user in databaase with email
        const user = await User.findOne({ email });
        
        

        if (!user) {
            return res.status(401).json({msg:' user invlaid'})
        }
        
        //   console.log(password,user.password);
        const ok = await adminhelper.verifypassword(password,user.password);
        if (!ok) { 
            return res.status(401).json({msg:'password invalid'})
        }

        if (user.status === "Deactive") {
            return res.status(401).json({messgage:"Your account is disabled"})
        }

        if (user.role === "admin") {
            return res.status(401).json({
                message:'admin are not allowed'
            })
        }




        //if login sucess create a session
        req.session.user = user.email;
        req.session.role = user.role;
        req.session._id = user._id;

        console.log("login session",req.session);

        req.session.save()

        //after session creation respond 
        return res.json({msg:'logged in'})

    } catch (error) {
        return console.log(error);   
    }
}

export async function adminLogin(req,res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({msg:'missing error'})
        }

        //find for user in databaase with email
        const user = await User.findOne({ email});

        if (!user) {
            return res.status(401).json({msg:' user invlaid'})
        }
        
        //   console.log(password,user.password);
        const ok = await adminhelper.verifypassword(password,user.password);
        if (!ok) { 
            return res.status(401).json({msg:'password invalid'})
        }
        if (user.role === "user") {
            return res.status(401).json({
                message:'user are not allowed'
            })
        }
    
        //if login sucess create a session
        req.session.user = user.email;
        req.session.role = user.role;

        
        // if(user.status)

        //after session creation respond 
        return res.json({msg:'logged in'})

    } catch (error) {
        return console.log(error);   
    }
}

export async function logout(req, res) {
    try {
        console.log("session - ",req.session)
        const des= req.session.destroy();
        console.log("destroyed sesion",des)
       return  res.status(200).json({msg:'logout'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg:error
        })
    }
    
}
