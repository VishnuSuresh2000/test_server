import { AllProductsAreSeled, CountMustDefine, LessAmountOfProduct, ProductIsNotInSalles } from '../../CustomExceptions/CartExceptions';
import { NoProductFound, ProfileNotFoundOrUnverified } from '../../CustomExceptions/CustomExceptionForSalles';
import { AlredyExist, NoRecordFound } from '../../CustomExceptions/Custom_Exception';
import cart from '../../Schemas/cart';
import { paymentProgress } from '../../Schemas/CustomEnum/CartProgress';
import customer from '../../Schemas/customer';
import product from '../../Schemas/product';
import Icart from '../../Schemas/Schema Interface/Icart';
import IProduct from '../../Schemas/Schema Interface/IProduct';
import IProgressNote from '../../Schemas/Schema Interface/IProgressNotes';
import ISalles from '../../Schemas/Schema Interface/ISalles';


export async function readCart(customerid: string) {
    try {
        let temp = await cart.find({
            customer_id: customerid,
            cancel: false, completed: false,
        })
            .populate({
                path: 'product_id',
                select: "name amount inKg"
            })
        let fun = async (value: Icart) => {
            var temp = value.toJSON()
            let produ = await product.findOne({ "salles._id": value.salles_id })
                .select("salles.farmer_id salles.seller_id salles._id") as IProduct

            temp.salles_id = produ.salles[0] as ISalles

            return await temp
        }
        let data = await Promise.all(temp.map(async (value) => {
            return await fun(value)
        }))
        if (data.length == 0) {
            throw new NoRecordFound()
        }
        return data;
    } catch (error) {
        console.log(error);
        throw error
    }
}


export async function sellerCart(sellerid: string) {
    try {
        var listSallesid: string[] = []
        var temp = await product.find({
            "salles.seller_id": sellerid
        }).select("salles._id")

        temp.forEach((value) => {
            value.salles.forEach((salles) => {
                listSallesid.push(salles._id)
            })
        })

        var carts: Icart[] = []
        for (var i in listSallesid) {
            var tem = await cart.find({
                salles_id: listSallesid[i],
                paymentComplete: true,
                cancel: false,
                completed: false
            }).populate({
                path: "product_id",
                select: "name"
            })
            tem.forEach((value) => carts.push(value))
        }
        let fun = async (value: Icart) => {
            var temp = value.toJSON()
            let produ = await product.findOne({ "salles._id": value.salles_id })
                .select("salles.farmer_id salles._id") as IProduct
            let user = await customer.findOne({ _id: value.customer_id }).select("firstName lastName")
            temp.salles_id = produ.salles[0] as ISalles
            temp.customer_id = user


            return await temp
        }
        let data = await Promise.all(carts.map(async (value) => {
            return await fun(value)
        }))
        if (data.length == 0) {
            throw new NoRecordFound()
        }
        return data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

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
            let productl = await product.findOne({ "salles._id": data.salles_id, }) as IProduct
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
                data.totalAmount = productl.amount * data.count;
                let temp = new cart(data)
                await temp.save()
                return "Added Product to Cart"
            }
        } else {
            throw new AlredyExist()
        }
    } catch (error) {
        console.log("Error from createCart", error)
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
                    paymentComplete: true,
                    dataOfPayment: new Date()
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

export async function removeOrder(id: string) {
    try {
        if (await isExistid(id)) {
            await addTosallesFromCart(id)
            await cart.findByIdAndRemove(id)
            return "Product Is removed from cart"
        } else {
            throw new NoRecordFound()
        }
    } catch (error) {
        console.log("Error from cancelOrder", error);
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
        console.log("Error from cancelPayment", error);
        throw error
    }
}

export async function cancelOrder(id: string) {
    try {
        if (await isExistid(id)) {
            await addTosallesFromCart(id)
            await cart.findByIdAndUpdate(id, { paymentComplete: false, cancel: true })
            return "Payment Canceled"
        } else {
            throw new NoRecordFound()
        }
    } catch (error) {
        console.log("Error from cancelPayment", error);
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
        console.log("Error from addTosallesFromCart", error);
        throw error
    }
}

export async function addProgress(id: string, data: IProgressNote) {
    data.data = new Date()
    try {
        if (await isExistid(id)) {
            await cart.findOneAndUpdate({ _id: id }, {
                $push: {
                    progressNotes: data
                }
            })
            return "Add THe progress"
        } else {
            throw new NoRecordFound()
        }
    } catch (error) {
        console.log("Error from addTosallesFromCart", error);
        throw error
    }
}

export async function addDelivaryDate(id: string, date: string) {
    console.log("Input date ", date)
    try {
        if (await isExistid(id)) {
            await cart.findOneAndUpdate({ _id: id }, {
                dataOfDalivary: new Date(date)
            })
            console.log("Date after parse ", new Date(date).toUTCString())
            return "Add Delivary Date"
        } else {
            throw new NoRecordFound()
        }
    } catch (error) {
        console.log("Error from addTosallesFromCart", error);
        throw error
    }
}
export async function delivaryCompleted(id: string) {

    try {
        if (await isExistid(id)) {
            var note: any = {
                massage: "Complted Delivary",
                progress: paymentProgress.deliverd,
                data: new Date()
            }
            await cart.findOneAndUpdate({ _id: id }, {
                dataOfCreation: new Date(),
                completed: true,
                $push: {
                    progressNotes: note
                }
            })

            return "Add Delivary Date"
        } else {
            throw new NoRecordFound()
        }
    } catch (error) {
        console.log("Error from addTosallesFromCart", error);
        throw error
    }
}


