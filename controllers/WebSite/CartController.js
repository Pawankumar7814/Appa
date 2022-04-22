var Cart = require('../../module/Cart');
var Product = require("../../controllers/Admin/ProductController");
var product = new Product();
var connectDBDev = require('../../config/connection');
var uuid = require("uuid");
const e = require('connect-flash');
var JWT = require('../../controllers/Website/jwt');
var jwt = new JWT();
var usermiddleware = require("../../middleware/userverification")(jwt);

class CartData {

    async addProductsInCart(userid, pid, pData, cb) {
        //UserInfo is user id and pData is req.body
        let Pdata = {};
        await product.getProductById(pid, (CbData) => {
            if (CbData.Status == "err") {} else {
                Pdata.productId = CbData.data.Pid;
                Pdata.quantity = pData.Qty;
                Pdata.pprice = CbData.data.SalePrice;
                Pdata.pname = CbData.data.Title;
            }
        });
        const userId = userid.UD;
        //     return cb({ Status: "err", Msg: "Error checking  Cart", data: null });
        try {
            let cart = await Cart.findOne({ userId });
            if (cart) {
                //cart exists for user
                let itemIndex = cart.products.findIndex(p => p.productId == Pdata.productId);
                if (itemIndex > -1) {
                    //product exists in the cart, update the quantity
                    let productItem = cart.products[itemIndex];
                    productItem.quantity = Pdata.quantity;
                    cart.products[itemIndex] = productItem;
                } else {
                    //product does not exists in cart, add new item
                    cart.products.push(Pdata);
                }
                cart = await cart.save();
                return cb({ Status: "suc", Msg: "Error checking  Cart", data: cart });
                // return cb({ data: cart });
            } else {
                //no cart for user, create new cart
                const newCart = await Cart.create({
                    userId,
                    products: Pdata
                });
                return cb({ Status: "suc", Msg: "Error checking  Cart", data: cart });
            }
        } catch (err) {
            return cb({ Status: "err", Msg: "Error checking  Cart", data: err });
        }
    }

    async findAllProductsInCart(UserInfo, cb) {
        let UserId = UserInfo.UD;
        Cart.findOne({ userId: UserInfo.UD }, (err, cart) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Cart", data: err });
            } else if (cart == null) {
                return cb({ Status: "err", Msg: "Cart Does not Exist", data: err });
            } else {
                return cb({ Status: "suc", Msg: "Cart  found", data: cart });
            }
        });
    }

    async deleteProductInCart(UserInfo, pID, cb) {
        let UserId = UserInfo.UD;

        Cart.find({ UserId }, (err, cart) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Cart", data: err });
            } else if (cart == null) {
                return cb({ Status: "err", Msg: "Cart Does not Exist", data: err });
            } else {
                return cb({ Status: "suc", Msg: "Cart  found", data: cart });
            }
        });
    }

}

module.exports = CartData