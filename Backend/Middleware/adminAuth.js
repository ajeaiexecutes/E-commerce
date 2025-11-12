
import bcrypt from 'bcrypt';


export async function hashpassword(password) {
        console.log("in haspassword");
        
    return await bcrypt.hash(password, 10);
}

export async function verifypassword(password, hashpassword) {
    return await bcrypt.compare(password, hashpassword)
}


export async function adminAuth(req, res, next) {
    try {
        
        
        if (req.session) {
            next();
        }
        else {
            res.status(403).json({
                message: 'denied'
            })
        }
    } catch (error) {
        console.log(error);

    }
}

