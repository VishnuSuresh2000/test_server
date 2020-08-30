import { Types } from "mongoose";
import { AllProductsAreSeled, CountMustDefine, LessAmountOfProduct, ProductIsNotInSalles } from '../../CustomExceptions/CartExceptions';
import { NoProductFound, ProfileNotFoundOrUnverified } from '../../CustomExceptions/CustomExceptionForSalles';
import { AlredyExistError, NoRecordFound } from '../../CustomExceptions/Custom_Exception';
import { changeStateSyncCart } from '../../CustomStream/CheckDataChaged';
import cart from '../../Schemas/cart';
import { paymentProgress } from '../../Schemas/CustomEnum/CartProgress';
import customer from '../../Schemas/customer';
import product from '../../Schemas/product';
import Icart from '../../Schemas/Schema Interface/Icart';
import IProduct from '../../Schemas/Schema Interface/IProduct';
import IProgressNote from '../../Schemas/Schema Interface/IProgressNotes';
import ISalles from '../../Schemas/Schema Interface/ISalles';



export async function readCart(customerid: string, paymentComplete: boolean) {
    try {
        let temp = await cart.find({
            customer_id: customerid,
            cancel: false, completed: false,
            paymentComplete: paymentComplete,
        })
            .populate({
                path: "product_id",
                populate: {
                    path: "category",
                    select: "name"
                },
                select: "name inKg category hasImg",
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

export async function readCartLog(customerid: string) {
    try {
        let temp = await cart.find({
            customer_id: customerid,

        })
            .populate({
                path: "product_id",
                populate: {
                    path: "category",
                    select: "name"
                },
                select: "name inKg category hasImg",
            })
        temp = temp.filter((value) => {
            return (value.completed == true) || (value.cancel == true)
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
                populate: {
                    path: "category",
                    select: "name"
                },
                select: "name inKg category hasImg",
            }).populate({
                path: 'customer_id',
                select: 'firstName lastName address.pinCode',

            })
            // console.log("user data ", temp)
            tem.forEach((value) => carts.push(value))
        }
        let fun = async (value: Icart) => {
            var temp = value.toJSON()
            let produ = await product.findOne({ "salles._id": value.salles_id })
                .populate({
                    path: "salles.farmer_id",
                    select: "firstName lastName"
                }).select("salles._id salles.farmer_id") as IProduct
            // let user = await customer.findOne({ _id: value.customer_id }).select("firstName lastName")
            temp.salles_id = produ.salles[0] as ISalles
            // temp.customer_id = user
            return await temp
        }
        let data = await Promise.all(carts.map(async (value) => {
            return await fun(value)
        }))
        if (data.length == 0) {
            throw new NoRecordFound()
        }
        // console.log("data : ", data)
        return data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

// export async function isExist(data: Icart) {
//     try {
//         let temp = await cart.findOne({
//             customer_id: data.customer_id,
//             salles_id: data.salles_id, completed: false
//         })
//         if (temp == null) {
//             return false
//         }
//         return true
//     } catch (error) {
//         console.log("Error from isExist", error);
//         throw error
//     }

// }

export async function isExistForCreate(data: Icart) {
    try {
        let temp = await cart.findOne({
            customer_id: data.customer_id,
            salles_id: data.salles_id, completed: false,
            cancel: false,
            paymentComplete: false,
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
        if (! await isExistForCreate(data)) {
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
                changeStateSyncCart.push("true")
                return "Added Product to Cart"
            }
        } else {
            throw new AlredyExistError()
        }
    } catch (error) {
        console.log("Error from createCart", error)
        throw error
    }

}


export async function updateCountInCart(id: string, count: number) {
    try {
        if (await isExistid(id)) {
            let tempCart = await cart.findOne({ _id: id }) as Icart
            let productl = await product.findOne({
                "salles._id": tempCart.salles_id,
                _id: tempCart.product_id
            }) as IProduct
            // console.log("product in salles", productl.salles[0])
            // console.log("total added ", (tempCart.count + count))
            // console.log("the condition ", (tempCart.count + count) > (productl.salles[0].count as number))
            if ((tempCart.count + count) <= (productl.salles[0].count as number)) {
                await cart.findOneAndUpdate({ _id: id }, {
                    count: (tempCart.count + count),
                    totalAmount: (tempCart.count + count) * productl.amount
                })
                changeStateSyncCart.push("true")
                return "Updated Count"
            } else {
                throw new LessAmountOfProduct()
            }
        } else {
            throw new NoRecordFound()
        }
    } catch (error) {
        console.log("Error from createCart", error)
        throw error
    }
}


export async function addMultiProductTobag(carts: Icart[], customerId: string) {
    var totalAdded: number = 0;
    var addflag: string = "Added Product to Cart"
    var updateFlag: string = "Updated Count"
    var totalUpdated: number = 0
    var errorlist = Array<{ cart: Icart, error: Error }>()
    try {
        for (var i in carts) {
            try {
                var data: Icart = carts[i]
                // console.log("each cart ", carts[i])
                data.customer_id = Types.ObjectId(customerId)
                if (carts[i]._id == null) {
                    let res = await createCart(data)
                    if (addflag == res) {
                        totalAdded += 1
                    }
                } else {
                    let res = await updateCountInCart(carts[i]._id, carts[i].count)
                    if (updateFlag == res) {
                        totalUpdated += 1
                    }
                }
            } catch (error) {
                // console.log("test exception ", error instanceof Error)
                // console.log("test exception ", error instanceof AlredyExistError)
                if (error instanceof AlredyExistError) {
                    console.log("checked the instance of already exist")
                    carts[i]._id = (await cart.findOne({
                        customer_id: carts[i].customer_id,
                        salles_id: carts[i].salles_id, completed: false,
                        cancel: false,
                        paymentComplete: false,
                    }))?._id
                }
                // console.log("Error on addMultiProductTobag ", error)
                errorlist.push({
                    cart: carts[i],
                    error: error
                })
            }
        }
        return {
            "added": totalAdded,
            "updated": totalUpdated,
            "error": errorlist
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
                changeStateSyncCart.push("true")
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
            changeStateSyncCart.push("true")
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
            changeStateSyncCart.push("true")
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
            changeStateSyncCart.push("true")
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
    data.date = new Date()
    // console.log("progress note ",data)
    try {
        if (await isExistid(id)) {
            await cart.findOneAndUpdate({ _id: id }, {
                $push: {
                    progressNotes: data
                }
            })
            changeStateSyncCart.push("true")
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
            changeStateSyncCart.push("true")
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
            changeStateSyncCart.push("true")
            return "Delivary Completed"
        } else {
            throw new NoRecordFound()
        }
    } catch (error) {
        console.log("Error from addTosallesFromCart", error);
        throw error
    }
}


