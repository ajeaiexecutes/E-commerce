import Product from "../Models/productsSchema.js";
import Category from "../Models/categorySchema.js";
import User from "../Models/userSchema.js";
import Order from "../Models/orderSchema.js";

// add product  POST
export async function addProducts(req, res) {

    try {
        console.log(req.body);
        
        const { category, name,title, description, price } = req.body;
        console.log(req.file);
        
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        console.log(imagePath);

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
                return res.status(404).json({msg:"category not found"})
            }
        // const found=await Product.findOne({name:name})
        // if (found) {
        //     return res.status(400).json({
        //         message:"product already exists"
        //     })
        // }
        if (!category || !name || !description || !price || !title) {
            return res.status(401).json({msg:"invalid"})
            
        }

        const newProduct = await Product.create({
            name: name,
            title:title,
            description: description,
            price: price,
            category: category,
            image: imagePath
        });

        console.log(newProduct);
        

        res.status(201).json ({msg:'added'})
        
    }
    catch (error) {
        console.log(error);
        
    }
   
}


// Get products GET
export async function getProducts(req,res) {
    try {
        
        
        const list = await Product.find().populate('category');
        return res.status(200).json({ msg: 'ok', list: list });
    } catch (error) {
        console.log(error);
        
    }
}

export async function getProductById(req,res) {
    try {
        const id = req.params.id;
        
        const product = await Product.findById(id).populate('category');
        return res.status(200).json({ msg: 'ok', product: product });
    } catch (error) {
        console.log(error);
        
    }
}

//edit products PUT

// export async function updateProducts(req,res) {
//     try {

//         const p = await Product.findByIdAndUpdate(req.params.id, req.body);
//         return res.status(200).json({
//             mesg: 'updTed',
//             updated: p
//         })
//     } catch (error) {
//         console.log(error);
        
//     }
// }

// controllers/productController.js

export async function updateProducts(req, res) {
  try {
    const id = req.params.id;

    // Prepare updated fields
    const updatedData = {
      name: req.body.name,
      title:req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      size: req.body.size,
    };

      // ✅ If new image uploaded via Multer
      
    if (req.file) {
      updatedData.img = `/uploads/${req.file.filename}`;
    } else if (req.body.img) {
      // ✅ Keep old image if none uploaded
      updatedData.img = req.body.img;
    }

    // ✅ Update in MongoDB
    const updated = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (updated) {
      return res.status(200).json({
        msg: `${updated.name} updated successfully`,
        updated,
      });
    } else {
      return res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ msg: "Server error" });
  }
}


//delete product DELETE
export async function deleteProduct(req,res) {
    try {
        const p = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            deleted:p
        })
    } catch (error) {
        console.log(error);
        
    }
}



//categories

//create  category
export async function createCategory(req,res) {
    try {
        const name = req.body;
        const newCategory = await Category.create(name);

        return res.status(200).json({added:newCategory})
    } catch (error) {
        console.log(error);
        
    }
}

//get categories GET
export async function getCategories(req,res) {
    try {
        const c = await Category.find();
        return res.status(200).json({
            categories:c
        })
    } catch (error) {
        console.log(error);
        
    }
} 

//update categories PUT
export async function updateCategory(req,res) {
    try {
        const c = await Category.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({
            updated:c
        })
    } catch (error) {
        console.log(error);
        
    }
}

//delete category DELETE
export async function deleteCategory(req,res) {
    try {
        const c = await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            deleted:c
        })
    } catch (error) {
        
    }
}

//====================users==========

//get users

export async function getUsers(req, res) {
  try {
    const users = await User.find({ role: "user" });
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "serber errror" });
  }
}


export async function updateUser(req, res) {
    const { status } = req.body
    try {
        const response = await User.findByIdAndUpdate(req.params.id, { status })
        return res.status(200).json({ message: "updated"})
    } catch (error) {
        console.log(error);
        res.status(401).json({message:error})
    }   
}


//====================================orders===========================

//get orders

export async function vieworders(req,res) {
    try {
        const result = await Order.find()
            .populate("user", "email")  
            .populate("items.productId","name price");
        console.log(result);

        return res.status(200).json({
            message: "okey",
            view:result
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function updateOrderStatus(req,res) {
    const id  = req.params.id
    const {status}=req.body
    try {
        const result = await Order.findByIdAndUpdate(id, { status })
            .populate("user", "email")  
            .populate("items.productId","name price");
        
        console.log(result);
        return res.status(200).json({
            message:"updated"
        })
    } catch (error) {
        console.log(error);
        
    }
}



