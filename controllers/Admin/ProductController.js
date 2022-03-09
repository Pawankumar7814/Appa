var Product = require('../../module/Product');
var connectDBDev = require('../../config/connection');
var uuid = require("uuid");

class ProductData {

    async saveProduct(ProInfo, imagesPath, cb) {

        let data = {};
        data.Title = ProInfo.ptitle;
        data.Description = ProInfo.pdescription;
        data.CostPrice = ProInfo.pcprice;
        data.SalePrice = ProInfo.psprice;
        data.Qty = ProInfo.pquantity;
        data.ItemInPack = ProInfo.pqtypack;
        data.Color = ProInfo.pcolor;
        data.GST = ProInfo.pgst;
        data.HowToUse = ProInfo.puse;
        data.Images = imagesPath;
        let productModle = new Product(data);
        await productModle.save((err, done) => {
            if (err) {
                return cb({ Status: "err", Msg: "Some Error while Product Save", data: err });
            } else {
                return cb({ Status: "suc", Msg: "Product Detail Saved", data: done });
            }
        });
    }

}

module.exports = ProductData