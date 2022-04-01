
import {db} from'./db.js'

// ==================================================== DORNA =======================================================
//Dorna get all bundle data joined with items table
export async function getAllBundles(pet_ID) {
    console.log(pet_ID)
    const sql = `SELECT Items.Item_Name, Items.Item_Price, Bundles.Bundle_Price 
    FROM Bundles 
    INNER JOIN Items 
    ON Bundles.Item_ID = Items.Item_ID 
    INNER JOIN Pet_Bundle 
    ON Bundles.Bundle_ID = Pet_Bundle.Bundle_ID 
    WHERE Pet_Bundle.Pet_ID = ${pet_ID};`
    const records = await db.query(sql)
    return records
}

// ==================================================== SAJIDHA =======================================================
export async function getAllItems() {
    const sql = `select * from Items;`
    const records = await db.query(sql)
    //console.log(records)
    return records
}

export async function addToBasket(data3){  
    console.log(data3)
    let sql = `SELECT User_ID FROM Customers where User_Name = "${data3.authorised}"` 
    let records = await db.query(sql)
    const UserIdentification = (records[0])
    console.log(UserIdentification)
  
    const now = new Date().toISOString().split('T', 1)[0]
    console.log(now)

// for some reason, the first entry cannot include the FUNCTION FOR TOTAL PRICE 
    // sql = `SELECT 
    // OrderSummary.Item_Qty * Items.Item_Price 
    // AS Total_Price
    // FROM OrderSummary, Items
    // WHERE Items.Item_ID = OrderSummary.Item_ID`

    sql = `SELECT Items.Item_Price AS Total_Price 
    FROM Items`
    records = await db.query(sql)
    console.log(records)
    let TOTAL = 0 
    if(data3.Item_ID.Item_ID == 1) {
        TOTAL = (records[0])
    }
    else if (data3.Item_ID.Item_ID == 2){
        TOTAL = (records[1])
    }
    else{
        TOTAL = (records[2])
    }
    
    console.log(TOTAL)

    sql = `INSERT INTO OrderSummary(User_ID, Item_ID, Item_Qty, Order_Date, Total_Price)
    VALUES("${UserIdentification.User_ID}","${data3.Item_ID.Item_ID}", 1, "${now}", "${TOTAL.Total_Price}")`
    records = await db.query(sql)
    console.log(records)
    return records
}
 
export async function groupingOrder(data) {
    let sql = `SELECT User_ID FROM Customers where User_Name = "${data.authorised}"` 
    let records = await db.query(sql)
    const UserIdentification = (records[0])
    console.log(UserIdentification)

    const now = new Date().toISOString().split('T', 1)[0]
    console.log(now)

    sql = `SELECT Items.Item_Name, OrderSummary.Item_Qty, OrderSummary.Total_Price, OrderSummary.User_ID
    FROM Items, OrderSummary
    WHERE Items.Item_ID = OrderSummary.Item_ID AND "${UserIdentification.User_ID}" = OrderSummary.User_ID 
    AND "${now}" = OrderSummary.Order_Date`
    records = await db.query(sql)

    console.log(records)
    return records
  }

export async function totalPrice() {
    
}

//WHERE Customers.User_ID = OrderSummary.User_ID

// export async function groupingOrder() {
//     const sql = `SELECT 
//     Items.Item_Name, OrderSummary.Item_ID,
//     OrderSummary.Item_Qty, OrderSummary.Total_Price, 
//     OrderSummary.Order_Date, OrderSummary.User_ID
//       FROM Items, OrderSummary
//       WHERE Items.Item_ID = OrderSummary.Item_ID`
//     const records = await db.query(sql)
//     console.log(records)
//     return records
//   }

//GROUP BY Items.Item_Name, OrderSummary.Item_ID, OrderSummary.Item_Qty, OrderSummary.Total_Price, OrderSummary.Order_Date, OrderSummary.User_ID


// ============================================================================================================== //

/* Getting Item details for Orders - Dorna */
/* Note sql query is ready but I need to know where you want it, e.g if its for the checkout page or basic counter */
export async function getItemDetails(item_ID) {
    console.log(item_ID)
    const sql = `SELECT Items.Item_Name, Items.Item_Price 
    FROM Sales 
    INNER JOIN Items 
    ON Sales.Item_ID = Items.Item_ID 
    WHERE Items.Item_ID = ${item_ID};`
    const records = await db.query(sql)
    console.log(records)
    return records
}


