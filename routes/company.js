
const express = require("express");
const router = express.Router();
router.use(express.json());

const company = require("../models/company");
const productList = require("../models/product")

//fetching company detail based on product name
router.get("/get_company",(req,res) => {

    const name = req.body.product_name;
    
    const productt = productList.filter((p)=> (p.title === name));
    if(productt.length === 1)
    {
        const companyid = productt[0].companyId;
        const comp = company.filter((c)=> c.companyId === companyid);

        if(comp.length === 1)
        {
            return res.json({ data:"company details",product_item:name,Company_id:companyid,Company_name:comp[0].name,Product_id:comp[0].productids});
        }

    }
    else
    {
        return res.json({ data:"No Such Company"});
    }
    });
    

//adding
router.post("/add_company",(req,res) => {
    const companyid = req.body.companyid;
    const name = req.body.name;
    const productid = req.body.productids;
    
    const result = company.filter((comp)=> comp.name === name);
    // checking if company name already exists or not
    if(result.length === 0)

    {
        
        return res.json({ data:"Added Company details succesfully",
        company_id:companyid,Name:name,Productid:productid});

    }
    else
    {
        return res.json({ data:"Company name already taken"});
    }
});


//updating
router.put("/update_company/add",(req,res) => {
    const cid = req.body.cid;
    const pid = req.body.pids;
    
    const cname = company.filter((c)=> c.companyId === cid);
    if(cname.length === 1)

    {
        cname[0].productId.push(pid);
        return res.json(cname);
    }
    else
    {
        return res.json({ data:"Couldn't Update"});
    }
});

router.put("/update_company/remove",(req,res) => {
    const cid = req.body.cid;
    const pid = req.body.pids;
    
    const cname = company.filter((c)=> c.companyId === cid);
    if(cname.length === 1)

    {
        delete cname[0].productId[cname[0].productId.indexOf(pid)];
        return res.json(cname);
    }
    else
    {
        return res.json({ data:"Couldn't Update"});
    }
});

//deleting
router.delete("/delete_company",(req,res) => {
    const cid = req.body.cid;
    
    const cname = company.filter((c)=> c.companyId === cid);
    if(cname.length === 1)
       
    { 
        delete cname[0]
        return res.json({message :"company successfully deleted "});
    }
    else
    {
        return res.json({ message:"Couldn't Delete"});
    }
});

module.exports=router;