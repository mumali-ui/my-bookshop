module.exports = (srv) => {
    const {Books} = cds.entities ('my.bookshop')

    //reduce stock of ordered books
    srv.before ('CREATE', 'Orders', async (req) => {
        const order = req.data
        if (!order.amount || order.amount <= 0) return req.error (400, 'Order at least 1 SAP book')
        const tx = cds.transaction(req)
        const affectedRows = await tx.run (
            UPDATE (Books)
            .set ({stock: {'-=': order.amount}})
            .where ({stock: {'>=': order.amount},/*and*/ ID: order.book_ID})
        )
        if (affectedRows === 0) req.error (409, "SAP books sold out, sorry")
    })
    // Add some discount for overstocked books
    srv.after ('READ', 'Books', each => {
        if (each.stock > 111) each.title += ' -- 11% discount'
    })
}




/*
module.exports = (srv) => {

    // Reply mock data for Books...
    srv.on ('READ', 'Books', ()=> [
        { ID:101, title: 'ABAP Development for SAP S/4HANA', author_ID:201, stock:15 },
        { ID:102, title: 'SAPUIF The Comprehensive Guide', author_ID:202, stock:100 },
        { ID:103, title: 'SQLScript for SAP HANA', author_ID: 203, stock: 150 },
        { ID:104, title: 'ABAP to the Future', author_ID:204, stock: 500 }
    ]) 

    // Reply mock data for Authors...
    srv.on ('READ', 'Authors', ()=> [
        { ID:201, name: 'Stefan Haas'},
        { ID:202, name: 'Modderman Goebels'},
        { ID:203, name: 'Jorg Brandeis'},
        { ID:204, name: 'Paul Hardy'} 
    ])
}
*/