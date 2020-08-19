import { AllProductsAreSeled, CountMustDefine, LessAmountOfProduct, ProductIsNotInSalles } from '../../CustomExceptions/CartExceptions';
import { NoProductFound, ProfileNotFoundOrUnverified } from '../../CustomExceptions/CustomExceptionForSalles';
import { AlredyExist, NoRecordFound } from '../../CustomExceptions/Custom_Exception';
import cart from '../../Schemas/cart';
import customer from '../../Schemas/customer';
import product from '../../Schemas/product';
import Icart from '../../Schemas/Schema Interface/Icart';
import IProduct from '../../Schemas/Schema Interface/IProduct';


// export async function readCart(customerid: string) {
//     try {
//         let temp = await cart.find({ customer_id: customerid }).populate({
//             path: 'productlist_id',
//             populate: {
//                 path: 'product_id',
//                 select: 'name'
//             },
//             select: "product_id amount"
//         })
//         if (temp.length == 0) {
//             throw Error("No iteams Found")
//         }
//         return temp;
//     } catch (error) {
//         console.log(error);
//         throw error
//     }
// }


// export async function sellerCart(sellerid: string) {
//     try {
//         let temp = await cart.find({ paymentComplete: true }).populate({
//             path: 'productlist_id',
//             populate: {
//                 path: 'product_id',
//                 select: 'name'
//             },
//             select: "product_id amount seller_id"
//         })
//         temp = temp.filter((value) => {
//             var temp = value.toJSON()
//             return temp.productlist_id.seller_id == sellerid
//         })
//         if (temp.length == 0) {
//             throw Error("No iteams Found")
//         }
//         return temp;
//     } catch (error) {
//         console.log(error);
//         throw error
//     }
// }

export async function isExist(data: Icart) {
    try {
        let temp = await cart.findOne({
            customer_id: data.customer_id,
            salles_id: data.salles_id, completed: false
        })
        if (temp == null) {
            return false
        }
        return true
    } catch (error) {
        console.log("Error from isExist", error);
        throw error
    }

}


export async function createCart(data: Icart) {
    try {
        if (! await isExist(data)) {
            let productl = await product.findOne({ "salles._id": data.salles_id, _id: data.product_id }) as IProduct
            let custom = await customer.findOne({ _id: data.customer_id })
            if (productl == null) {
                throw new ProductIsNotInSalles()
            } else if (productl.salles[0].count == 0) {
                throw new AllProductsAreSeled()
            } else if (productl.salles[0].count as number < data.count) {
                throw new LessAmountOfProduct()
            } else if (custom == null) {
                throw new ProfileNotFoundOrUnverified("Customer")
            } else if (data.count == null || data.count == 0) {
                throw new CountMustDefine()
            } else {
                let temp = new cart(data)
                await temp.save()
                return "Added Product to Cart"
            }
        } else {
            throw new AlredyExist()
        }
    } catch (error) {
        console.log("Error from createCart",error)
        throw error
    }

}

export async function isExistid(id: string) {
    try {
        let temp = await cart.findOne({ _id: id })
        if (temp == null) {
            return false
        }
        return true
    } catch (error) {
        console.log("Error from isExistid", error);
        throw error
    }
}

export async function payment(id: string) {
    try {
        if (await isExistid(id)) {
            let temp = await cart.findOne({ _id: id }) as Icart
            let productWithsalles = await product.findOne({
                _id: temp.product_id,
                "salles._id": temp.salles_id
            }) as IProduct
            if (temp.count < (productWithsalles.salles[0].count as number)) {
                await product.findOneAndUpdate({
                    _id: temp.product_id,
                    "salles._id": temp.salles_id
                }, {
                    '$set': {
                        "salles.$.count": (productWithsalles.salles[0].count as number) + temp.count
                    }
                })
                await cart.findOneAndUpdate({ _id: id }, {
                    paymentComplete: true
                })
                return "Payment Complted"
            } else {
                throw new AllProductsAreSeled()
            }
        } else {
            throw new NoProductFound()
        }
    } catch (error) {
        console.log("Error from payment", error);
        throw error
    }
}

export async function cancelOrder(id: string) {
    try {
        if (await isExistid(id)) {
            await addTosallesFromCart(id)
            await cart.findByIdAndRemove(id)
            return "Product Is removed from cart"
        } else {
            throw new NoRecordFound()
        }
    } catch (error) {
        console.log("Error from cancelOrder",error);
        throw error
    }
}

export async function cancelPayment(id: string) {
    try {
        if (await isExistid(id)) {
            await addTosallesFromCart(id)
            await cart.findByIdAndUpdate(id, { paymentComplete: false })
            return "Payment Canceled"
        } else {
            throw new NoRecordFound()
        }
    } catch (error) {
        console.log("Error from cancelPayment",error);
        throw error
    }
}

async function addTosallesFromCart(id: string) {
    try {
        let temp = await cart.findOne({ _id: id }) as Icart
        let productWithsalles = await product.findOne({
            _id: temp.product_id,
            "salles._id": temp.salles_id
        }) as IProduct
        await product.findOneAndUpdate({
            _id: temp.product_id,
            "salles._id": temp.salles_id
        }, {
            '$set': {
                "salles.$.count": (productWithsalles.salles[0].count as number) + temp.count
            }
        })
    } catch (error) {
        console.log("Error from addTosallesFromCart",error);
        throw error
    }
}


// export async function compltedDelivary(id: string) {
//     try {
//         if (await isExistid(id)) {
//             let temp = await cart.findOne({ _id: id }).populate({
//                 path: 'productlist_id',
//                 populate: {
//                     path: 'product_id farmer_id seller_id',

//                 },
//             }).populate('customer_id')
//             let temp2 = temp?.toJSON()
//             let cartLog = {
//                 product_name: temp2.productlist_id.product_id.name,
//                 seller_name: temp2.productlist_id.seller_id.name,
//                 seller_addres: temp2.productlist_id.seller_id.address,
//                 seller_number: temp2.productlist_id.seller_id.phoneNumber,
//                 farmer_name: temp2.productlist_id.farmer_id.name,
//                 farmer_address: temp2.productlist_id.farmer_id.address,
//                 farmer_number: temp2.productlist_id.farmer_id.phoneNumber,
//                 customer_name: temp2.customer_id.name,
//                 customer_addres: temp2.customer_id.address,
//                 customer_number: temp2.customer_id.phoneNumber,
//                 count: temp2.count,
//                 date: new Date(),
//                 amount: (temp2.count * temp2.productlist_id.amount),
//                 productlist_id:temp2.productlist_id._id
//             }
//             await addCartLog(cartLog)
//             await cart.findByIdAndRemove(id)
//             return "Order Is complted"
//         } else {
//             throw new Error('Not Exist')
//         }

//     } catch (error) {
//         console.log(error);
//         throw error
//     }
// }

export async function adminView() {
    try {
        let temp = await cart.find({ paymentComplete: true }).populate({
            path: 'salles_id',

        }).populate('customer_id')
        if (temp.length == 0) {
            throw new NoRecordFound()
        }
        return temp;
    } catch (error) {
        console.log("Error from admin view", error);
        throw error
    }
}
