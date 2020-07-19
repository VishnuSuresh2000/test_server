import { Response } from "express"
import productlist from "../../Schemas/productlist"
import IProductList from "../../Schemas/Schema Interface/IProductList";
import product from "../../Schemas/product";
import seller from "../../Schemas/seller";
import farmer from "../../Schemas/farmer";
export async function streamAllData(res: Response) {
    try {
        productlist.find().populate({
            path: 'product_id',
            populate: {
                path: 'category'
            }
        }).populate('seller_id').populate('farmer_id').cursor({ transform: JSON.stringify }).pipe(res.type('json'))
    } catch (error) {
        console.log(error);
        res.status(400).send(`${error} Error on StreamAllData`)
    }
}


export async function readProductList() {
    try {
        let temp = await productlist.find().populate({
            path: 'product_id',
            populate: {
                path: 'category'
            }
        }).populate('seller_id').populate('farmer_id')

        if (temp.length == 0) {
            throw new Error('No Records Found')
        }
        return temp;
    } catch (error) {
        console.log(error);
        throw error
    }
}



export async function readProductListDoc() {
    try {
        let temp = await productlist.find()
        if (temp == null) {
            throw new Error('No Records Found')
        }
        return temp;
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function isExist(data: IProductList) {
    try {
        var temp = await productlist.findOne({ product_id: data.product_id, seller_id: data.seller_id, farmer_id: data.farmer_id })

        if (temp == null) {
            return false
        }
        return true
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function isExistWithId(data: string) {
    try {
        let temp = await productlist.findOne({ _id: data })
        if (temp == null) {
            return false
        }
        return true
    } catch (error) {
        console.log(error)
        throw error
    }
}



export async function addToProductList(data: IProductList) {
    try {
        if (! await isExist(data)) {
            let pr = await product.findOne({ _id: data.product_id })
            let sell = await seller.findOne({ _id: data.seller_id })
            let far = await farmer.findOne({ _id: data.farmer_id })
            if (pr == null) {
                throw new Error('Product Not Exist')
            } else if (sell == null) {
                throw new Error('Seller Not Exist')
            } else if (far == null) {
                throw new Error('Farmer Not Exist')
            } else {
                data.dateOfUpdate = new Date()
                let temp = new productlist(data)
                await temp.save()
                return "added Data"
            }
        } else {
            throw new Error('Already Exist')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getSingleProduct(id: string) {
    try {
        if (await isExistWithId(id)) {
            return (await productlist.findOne({ _id: id }))?.toJSON()
        } else {
            throw new Error('Record Not Exist ')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function notEmpty(id: string) {
    try {
        let temp = await productlist.findOne({ _id: id })
        if (temp?.count == 0) {
            return false
        }
        return true
    } catch (error) {
        console.log(error)
        throw error
    }

}



export async function toShowProduct(id: string, show: boolean) {
    try {
        if (await isExistWithId(id) && await notEmpty(id)) {

            await productlist.findByIdAndUpdate(id, { toShow: show, dateOfUpdate: new Date() })

            return `Set ${show}`
        } else {
            throw new Error('Record Not Exist')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function deleteProductFromList(id: string) {
    try {
        if (await isExistWithId(id)) {

            await productlist.findByIdAndRemove(id)

            return `Record Deleted`
        } else {
            throw new Error('Record Not Exist')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function readSingleProductFromList(id: string) {
    try {
        if (await isExistWithId(id)) {

            let tem = await productlist.find({ _id: id })

            return tem
        } else {
            throw new Error('Record Not Exist')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function addCount(id: string, count: number) {
    try {
        if (await isExistWithId(id)) {
            let temp = await productlist.findOne({ _id: id })
            await productlist.findByIdAndUpdate(id, { count: temp?.count as number + count, dateOfUpdate: new Date() })
            return `Added count in the product`
        } else {
            throw new Error('Record Not Exist')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function verifyProductOnList(id: string, show: boolean) {
    try {
        if (await isExistWithId(id)) {

            await productlist.findByIdAndUpdate(id, { isVerified: show, dateOfUpdate: new Date() })

            return `${show ? 'Verified' : 'UnVerified'}`
        } else {
            throw new Error('Record Not Exist')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function customerView() {
    try {
        let temp = await productlist.find({ toShow: true, isVerified: true }).populate({
            path: 'product_id',
            populate: {
                path: 'category'
            }
        }).populate('seller_id').populate('farmer_id')
        if (temp.length == 0) {
            throw new Error('No Records Found')
        }
        return temp;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function productWithCategory(category: string) {
    try {
        let temp = await productlist.find({ toShow: true, isVerified: true, }).populate({
            path: 'product_id',
            populate: {
                path: 'category',
            }
        }).populate('seller_id').populate('farmer_id')

        temp=temp.filter((value) => {
            var temp = value.toJSON()
            return temp.product_id.category.name == category
        })
        if (temp.length == 0) {
            throw new Error('No Records Found')
        }
        return temp;
    } catch (error) {
        console.log(error);
        throw error
    }
}