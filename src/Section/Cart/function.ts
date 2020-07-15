import cart from '../../Schemas/cart'
import Icart from '../../Schemas/Schema Interface/Icart';
import productlist from '../../Schemas/productlist';
import customer from '../../Schemas/customer';
import { addCartLog } from '../CartLog/function';

export async function readCart(customerid: string) {
    try {
        let temp = await cart.find({ customer_id: customerid }).populate({
            path: 'productlist_id',
            populate: {
                path: 'product_id',
                select: 'name'
            },
            select: "product_id amount"
        })
        if (temp.length == 0) {
            throw Error("No iteams Found")
        }
        return temp;
    } catch (error) {
        console.log(error);
        throw error
    }
}


export async function sellerCart(sellerid: string) {
    try {
        let temp = await cart.find({ paymentComplete: true }).populate({
            path: 'productlist_id',
            populate: {
                path: 'product_id',
                select: 'name'
            },
            select: "product_id amount seller_id"
        })
        temp = temp.filter((value) => {
            var temp = value.toJSON()
            return temp.productlist_id.seller_id == sellerid

        })
        if (temp.length == 0) {
            throw Error("No iteams Found")
        }
        return temp;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function isExist(data: Icart) {
    try {
        let temp = await cart.findOne({ customer_id: data.customer_id, productlist_id: data.productlist_id })
        if (temp == null) {
            return false
        }
        return true
    } catch (error) {
        console.log(error);
        throw error
    }

}


export async function createCart(data: Icart) {
    try {
        if (! await isExist(data)) {
            let productl = await productlist.findOne({ _id: data.productlist_id })
            let custom = await customer.findOne({ _id: data.customer_id })
            if (productl == null) {
                throw new Error('Product is Not listed For salles')
            } else if (productl.count == 0) {
                throw new Error('All Product are selled')
            } else if (productl.count as number < data.count) {
                throw new Error('The product need is higher than the list')
            } else if (custom == null) {
                throw new Error('Invalid Customer')
            } else if (!custom.verified) {
                throw new Error('Account is Not Verified')
            } else if (data.count == null || data.count == 0) {
                throw new Error('Count of the Product Must Define')
            } else {
                let temp = new cart(data)
                await temp.save()
                return "Added Product to Cart"
            }

        } else {
            throw new Error('Already Exist')
        }
    } catch (error) {
        console.log(error)
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
        console.log(error);
        throw error
    }
}

export async function payment(id: string) {
    try {
        if (await isExistid(id)) {
            let temp = await cart.findByIdAndUpdate(id, { dataOfPayment: new Date(), paymentComplete: true }) as Icart
            let count = (await productlist.findOne({ _id: temp.productlist_id }))?.count as number
            await productlist.findByIdAndUpdate(temp.productlist_id, { count: count - temp.count })
            return "Payment Complted"
        } else {
            throw new Error('Not Exist')
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function cancelOrder(id: string) {
    try {
        if (await isExistid(id)) {
            let temp = await cart.findOne({ _id: id }) as Icart
            if (temp.paymentComplete) {
                let count = (await productlist.findOne({ _id: temp.productlist_id }))?.count as number
                await productlist.findByIdAndUpdate(temp.productlist_id, { count: count + temp.count })
            }
            await cart.findByIdAndRemove(id)
            return "Product Is removed from cart"
        } else {
            throw new Error('Not Exist')
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function cancelPayment(id: string) {
    try {
        if (await isExistid(id)) {
            let temp = await cart.findOne({ _id: id }) as Icart
            let count = (await productlist.findOne({ _id: temp.productlist_id }))?.count as number
            await productlist.findByIdAndUpdate(temp.productlist_id, { count: count + temp.count })
            await cart.findByIdAndUpdate(id, { paymentComplete: false })
            return "Payment Canceled"
        } else {
            throw new Error('Not Exist')
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function compltedDelivary(id: string) {
    try {
        if (await isExistid(id)) {
            let temp = await cart.findOne({ _id: id }).populate({
                path: 'productlist_id',
                populate: {
                    path: 'product_id farmer_id seller_id',

                },
            }).populate('customer_id')
            let temp2 = temp?.toJSON()
            let cartLog = {
                product_name: temp2.productlist_id.product_id.name,
                seller_name: temp2.productlist_id.seller_id.name,
                seller_addres: temp2.productlist_id.seller_id.address,
                seller_number: temp2.productlist_id.seller_id.phoneNumber,
                farmer_name: temp2.productlist_id.farmer_id.name,
                farmer_address: temp2.productlist_id.farmer_id.address,
                farmer_number: temp2.productlist_id.farmer_id.phoneNumber,
                customer_name: temp2.customer_id.name,
                customer_addres: temp2.customer_id.address,
                customer_number: temp2.customer_id.phoneNumber,
                count: temp2.count,
                date: new Date(),
                amount: (temp2.count * temp2.productlist_id.amount),
                productlist_id:temp2.productlist_id._id
            }
            await addCartLog(cartLog)
            await cart.findByIdAndRemove(id)
            return "Order Is complted"
        } else {
            throw new Error('Not Exist')
        }

    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function adminView() {
    try {
        let temp = await cart.find({ paymentComplete: true }).populate({
            path: 'productlist_id',
            populate: {
                path: 'product_id',
                select: 'name'
            },
        }).populate('customer_id')
        if (temp.length == 0) {
            throw Error("No iteams Found")
        }
        return temp;
    } catch (error) {
        console.log(error);
        throw error
    }
}
