import route_category from '../Section/Category/route'
import customer from "../Section/Profiles/Customer/route"
import seller from "../Section/Profiles/Seller/route";
import product from "../Section/Product/route"
import farmer from "../Section/Profiles/Farmer/route";
import { Application } from "express";
import { router } from '../Section/Salles/route';
export default function allRoutesBeru(app: Application) {
    app.use('/customer', customer)
    app.use('/category', route_category)
    app.use('/seller', seller)
    app.use('/product', product)
    app.use('/farmer', farmer)
    app.use('/salles', router)
}