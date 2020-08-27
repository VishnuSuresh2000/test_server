import PDFkit from "pdfkit";
import { Response } from "express";
import { image } from "pdfkit/js/mixins/images";
import path from "path";
import pdf from "html-pdf";



export default function createInvoice(res: Response) {
    var data=pdf.create('<h1 align="center">haii<\h1>')
    data.toStream((error,stream)=>{
        stream.pipe(res)

    })

}

// let doc = new PDFkit({ margin: 50 });
//     const invoice = {
//         shipping: {
//             name: "John Doe",
//             address: "1234 Main Street",
//             city: "San Francisco",
//             state: "CA",
//             country: "US",
//             postal_code: 94111
//         },
//         items: [
//             {
//                 item: "TC 100",
//                 description: "Toner Cartridge",
//                 quantity: 2,
//                 amount: 6000
//             },
//             {
//                 item: "USB_EXT",
//                 description: "USB Cable Extender",
//                 quantity: 1,
//                 amount: 2000
//             }
//         ],
//         subtotal: 8000,
//         paid: 0,
//         invoice_nr: 1234
//     };


//     // generateHeader(doc);
//     addSallesAddress(doc)
//     // generateCustomerInformation(doc, invoice);
//     // generateInvoiceTable(doc, invoice);

//     // res.setHeader('Content-disposition', 'attachment; filename="' + "Invoice.pdf" + '"')
//     // res.setHeader('Content-type', 'application/pdf')
//     doc.end();
//     doc.pipe(res);

function generateHeader(doc: PDFKit.PDFDocument) {
    var logo = path.join(path.dirname(path.dirname(__filename)), '/assets/images/logo.png')
    doc.image(logo, undefined, 50, {
        height: 80,
        width: 80,

    }).moveTo(50,0 )
    .fontSize(20)
        .text("Beru", undefined, 80,)
        .fontSize(12)
        
        .text("address\naddres\naddress",0,60,{
            align:"right",

        })
        .moveDown()
}

function addSallesAddress(doc: PDFKit.PDFDocument){
    doc.fontSize(10)
    doc.text("Product Name",{
        width:100,
        align:"center",
        continued:true
    })
    doc.x+=50
    doc.text("Qunatity",{
        width:100,
        align:"center",
        continued:true
    })
    doc.x+=50
    doc.text("Amount",{
        align:"center",
        width:100,
        continued:true,
    })
}

function generateFooter(doc: PDFKit.PDFDocument) {
    doc
        .fontSize(10)
        .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            780,
            { align: "center", width: 500 }
        );
}

function generateCustomerInformation(doc: PDFKit.PDFDocument, invoice: any) {
    const shipping = invoice.shipping;

    doc
        .text(`Invoice Number: ${invoice.invoice_nr}`, 50, 200)
        .text(`Invoice Date: ${new Date()}`, 50, 215)
        .text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 130)

        .text(shipping.name, 300, 200)
        .text(shipping.address, 300, 215)
        .text(`${shipping.city}, ${shipping.state}, ${shipping.country}`, 300, 130)
        .moveDown();
}
function generateTableRow(doc: PDFKit.PDFDocument, y: number, c1: string, c2: string, c3: number, c4: string, c5: string) {
    doc
        .fontSize(10)
        .text(c1, 50, y)
        .text(c2, 150, y)
        .text(String(c3), 280, y, { width: 90, align: "right" })
        .text(c4, 370, y, { width: 90, align: "right" })
        .text(c5, 0, y, { align: "right" });
}
function generateInvoiceTable(doc: PDFKit.PDFDocument, invoice: any) {
    let i,
        invoiceTableTop = 330;

    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.item,
            item.description,
            item.amount / item.quantity,
            item.quantity,
            item.amount
        );
    }
}

// `Total Bill Amount is ₹3,950\n
//     Receipt: HG-4\n
//     Date: 05 Apr 2020  09:04\n
//     --------------------------
//     Bitter Gourd - Kg   x 10.0      ₹400\n
    
//     Dantu - Piece       x 10        ₹150\n
    
//     Lemon - Piece       x 20        ₹100\n
    
//     Gauva - Kg          x 50.0      ₹3,000\n
    
//     Coriander - Piece   x 10        ₹150\n
    
//     Pudina - Piece\t
//     x 10                  ₹150\n
    
//     Subtotal            ₹3,950\n
    
//     --------------------------\n
//     TOTAL               ₹3,950\n
//     --------------------------\n
//     Payment Type:         Cash\n
//     `