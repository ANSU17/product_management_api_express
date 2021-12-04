const express = require("express");
const router = express.Router();

router.use(express.json());

// fetching product list from models
const productList = require("../models/product")

//fetching all products of a company 
router.get("/company", (req, res) => {
    const companyID = req.body.id;
    const products = productList.filter((prd) => (prd.CompanyId === companyID));

    res.json({ data: products });
});
 
//fetching all products of a seller 
router.get("/seller", (req, res) => {
    const sellerID = req.body.id;
    console.log(sellerID);
    console.log(productList[0].sellerId.includes(sellerID));
    const products = productList.filter((prd) => (prd.sellerId.includes(sellerID)));

    res.json({ data: products });
});

//adding
router.post("/addProduct", (req, res) => {

    const title = req.body.title;
    const price = req.body.price;
    const category = req.body.cat;
    const companyid = req.body.cid;
    const productid = req.body.pid;
    const sellerid = req.body.sid;

    const pname = productList.filter((prod) => prod.title === title);
    const newProduct = { productId: productid, title: title, price: price, category: category, compantId: companyid, sellerId: sellerid }
    //checking if product name exists or not 
    if (pname.length === 0) {
        productList.push(newProduct)
        return res.json({ data: "Added product details succesfully", newProduct });

    }
    else {
        return res.json({ data: "Product name already taken" });
    }

});

//updating products
router.put("/updateProduct/add", (req, res) => {
    const pid = req.body.pid;
    const category = req.body.category;
    
    const newCategory = productList.filter((p) => p.productId === pid);
    
    if(newCategory.length === 1)
    {
        newCategory[0].category.push(category);
        return res.json(newCategory);
    }
    else{
        return res.json({ data:"Couldn't Update"});
        
    }
    
});

router.put("/update_product/remove",(req,res) => {
        const pid = req.body.pid;
        const category = req.body.category;
        
        const newCategory = productList.filter((p) => p.productId === pid);
                
        if(newCategory.length === 1)
        
        {
            delete newCategory[0].category[newCategory[0].category.indexOf(category)];            
            return res.json(newCategory);
        }
        else{
            return res.json({ data:"Couldn't Update"});
    
        }
    
        });
    

router.delete("/delete_product",(req,res) => {
    const productid = req.body.pid;
    
    const pname = productList.filter((s)=> s.productId === productid);
    if(pname.length === 1)
    {
        return res.json({ data:"Deleted Products succesfully",Deleted:pname[0].title});

    }
    else
    {
        return res.json({ data:"Couldn't Delete"});
    }
});
module.exports = router;