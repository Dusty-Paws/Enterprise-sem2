
//Adoption Cards + pet details Dorna//
import {db} from'./db.js'

export async function getAllAnimals() {
    const sql = `select * from Pets;`
    const records = await db.query(sql)
    console.log(records)
    return records
}


/*export async function getAnimalDetails(ID) {
    let sql = `select * from Pets WHERE Pet_ID = `+ ID + `;`
    const records = await db.query(sql)
    console.log(records)
    return records
}*/

export async function getAnimalDetails(ID) {
    const sql = `select * from Pets WHERE Pet_ID = "${ID.Pet_ID}"`;  
    //console.log(ID)     
    const records = await db.query(sql)
    console.log(records)
    return records
}


export async function reserveAnimal(data) {
    let sql = `SELECT User_ID FROM Customers WHERE User_Name = "${data.username}"`;//check user or username(initially username)
    console.log(sql)
    let result = await db.query(sql)
    data.id = result[0].id
    console.log(data)

    sql = `UPDATE Pets SET Status_Pet = "Reserved" WHERE Pet_Name = "Cheshire"`;
}
