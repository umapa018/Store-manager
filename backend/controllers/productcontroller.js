import { v2 as cloudinary } from 'cloudinary'
import productmodel from '../models/productmodel.js';

/*const restartServer = () => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Restarting server...');
        exec('npm run dev', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error restarting server: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error details: ${stderr}`);
            }
            console.log(stdout);
        });
        process.exit(0); // Gracefully exit current process
    }
};*/


// add product func
const addProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]

        const images = [image1, image2].filter((item) => item !== undefined)

        //sending img to cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                if (!item.path) throw new Error("Image path is missing");
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )
        const productData = {
            name,
            description,
            price: Number(price),
            quantity,
            category,
            image: imagesUrl,
        }
        console.log(productData);

        const product = new productmodel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })
        console.log(name, description, price, quantity, category)
        console.log(imagesUrl)

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// list product
const listProducts = async (req, res) => {

    try {
        const products = await productmodel.find({});
        res.json({ success: true, products })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//removing product
const removeProduct = async (req, res) => {
    try {
        await productmodel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productmodel.findById(productId)
        res.json({ success: true, product })
    }
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }