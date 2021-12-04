
const express = require("express");
const router = express.Router();
router.use(express.json());

const seller = require("../models/seller");
const productList = require("../models/product")

//fetching seller detail based on product name
router.get("/get_seller", (req, res) => {

    const name = req.body.product_name;

    const productt = productList.filter((p) => (p.title === name));
    if (productt.length === 1) {
        const sellerids = productt[0].sellerId;
        let sellerlist = [];

        for (var i = 0; i < sellerids.length; i++) {
            const seler = seller.filter((s) => s.sellerId === sellerids[i]);

            if (seler.length === 1) {
                sellerlist.push(seler);  
            }

        }
    if (sellerlist.length <1){

        return res.json({ data: "No Such Seller" });
    }
    else
        {
            return res.json({ sellerlist });
        }
    }
    });

//Adding seller
router.post("/add_seller", (req, res) => {
    const sid = req.body.sid;
    const name = req.body.name;
    const pid = req.body.pids;

    const result = seller.filter((s) => s.name === name);
    const new_seller = { sellerId:sid,name:name,productId:pid}
    // checking if company name already exists or not
    if (result.length === 0) {
        seller.push(new_seller)
        return res.json({ data: "Added Seller details succesfully", new_seller});

    }
    else {
        return res.json({ data: "Seller name already taken" });
    }
});

//updating
router.put("/update_seller/add", (req, res) => {
    const sid = req.body.sid;
    const pid = req.body.pids;

    const sname = seller.filter((c) => c.sellerId === sid);
    if (sname.length === 1) {
        sname[0].productId.push(pid);
        delete sname;
        return res.json(sname);
    }
    else {
        return res.json({ data: "Couldn't Update" });
    }
});

router.put("/update_seller/remove",(req,res) => {
    const sid = req.body.sid;
    const pid = req.body.pids;
    
    const sname = company.filter((s)=> s.companyId === sid);
    if(sname.length === 1)

    {
        delete sname[0].productId[sname[0].productId.indexOf(pid)];
        return res.json(sname);
    }
    else
    {
        return res.json({ data:"Couldn't Update"});
    }
});

//deleting
router.delete("/delete_seller",(req,res)=>{
    const slrid = req.body.sid; 
    const sname = seller.filter((slr)=>slr.sellerId === slrid);
    if(sname.length === 1)
    {
        return res.json({data:"seller deleted successfully",Deleted:sname[0].name});
    }
    else{
        return res.json({ data:"Couldn't Delete"});

  
    }
});

module.exports = router;