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

    async getAllProducts(cb) {
        Product.find({}, (err, products) => {
            if (err) {
                return cb({ Status: "err", Msg: "While getting product", data: err });
            } else {
                return cb({ Status: "scc", Msg: "got all products", data: products });
            }
        });
    }

    async getProductById(id, cb) {
        Product.findById({ _id: id }, (err, Product) => {
            if (err) {
                return cb({ Status: "err", Msg: "Whle geting  blog by id", data: err });
            } else {
                return cb({ Status: "scc", Msg: "goot all blog", data: Product });
            }
        });
    }
}

module.exports = ProductData