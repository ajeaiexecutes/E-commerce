import bcrypt from 'bcrypt'

export async function hashedpassword(password) {
    
    return  await bcrypt.hash(password, 10);
}

export async function verifypassword(password,hashpassword) {
    return await bcrypt.compare(password, hashpassword)
    
   
}

export async function userAuth(req, res, next) {
    
    try {
        console.log("middlewaare seesion",req.session)
        if (req.session) {
            next();
        }

        else {
            res.json({msg:'error'})
        }
    } catch (error) {
        res.status(error)
    }
}



