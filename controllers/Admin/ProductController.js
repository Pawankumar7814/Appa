var Product = require('../../module/Product');
var connectDBDev = require('../../config/connection');
var uuid = require("uuid");
var fs = require('fs');

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

    async getProductById(ProInfo, cb) {
        Product.findOne({ Pid: ProInfo }, (err, product) => {
            console.log(err);
            if (err) {
                return cb({ Status: "err", Msg: "error on searching", data: err });
            } else if (product == null) {
                return cb({ Status: "scc", Msg: "no data", data: product });
            } else {
                return cb({ Status: "scc", Msg: "get data", data: product });
            }
        });
    }

    async deleteProductImageById(ProInfo, filename, cb) {
        Product.findOneAndUpdate({ Pid: ProInfo }, { $pull: { Images: filename } }, (err, product) => {
            console.log(filename);
            if (err) {
                return cb({ Status: "err", Msg: "error on searching", data: err });
            } else if (product == null) {
                return cb({ Status: "scc", Msg: "no data", data: product });
            } else {
                var path = require('path');

                var jsonPath = path.join(__dirname, '..', '..', 'Public', 'uploads', filename);
                fs.unlinkSync(jsonPath);
                return cb({ Status: "scc", Msg: "get data", data: product });
            }
        });
    }

    async addProductImageById(ProInfo, filename, cb) {
        Product.findOneAndUpdate({ Pid: ProInfo }, { $push: { Images: filename } }, (err, product) => {
            if (err) {
                return cb({ Status: "err", Msg: "error on searching", data: err });
            } else if (product == null) {
                return cb({ Status: "scc", Msg: "no data", data: product });
            } else {
                return cb({ Status: "scc", Msg: " Images updated", data: product });
            }
        });
    }

    async updateProductById(ProInfo, pdara, cb) {
        let data = {};
        data.Title = pdara.ptitle;
        data.Description = pdara.pds;
        data.CostPrice = pdara.pcp;
        data.SalePrice = pdara.psp;
        data.Qty = pdara.pqty;
        data.ItemInPack = pdara.piip;
        data.Color = pdara.pcolor;
        data.GST = pdara.pgst;
        data.Rating = pdara.pr;
        data.HowToUse = pdara.phow;
        Product.findOneAndUpdate({ Pid: ProInfo }, data, (err, product) => {
            console.log(err);
            if (err) {
                return cb({ Status: "err", Msg: "error on searching", data: err });
            } else if (product == null) {
                return cb({ Status: "scc", Msg: "no data", data: product });
            } else {
                return cb({ Status: "scc", Msg: "get data", data: product });
            }
        });
    }

    async deleteProductById(ProInfo, cb) {
        Product.findOneAndDelete({ Pid: ProInfo }, (err, product) => {
            console.log(err);
            if (err) {
                return cb({ Status: "err", Msg: "error on deleting", data: err });
            } else if (product == null) {
                return cb({ Status: "scc", Msg: "no data", data: product });
            } else {
                return cb({ Status: "scc", Msg: "data deleted", data: product });
            }
        });
    }
}

module.exports = ProductData