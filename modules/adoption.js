/* Details to see adoption history and their owners - Dorna*/
import {db} from'./db.js'

export async function getAllAdopted(user_identifier) {
    console.log(user_identifier)
    const sql = `SELECT Pets.Pet_Pic, Pets.Pet_Name, Pets.Species, Pets.Breed, Pets.Sex, Pets.Age, Pets.Fee FROM Adoption INNER JOIN Pets ON Adoption.Pet_ID = Pets.Pet_ID WHERE Adoption.User_ID = ${user_identifier.User_ID};`
    const records = await db.query(sql)
    console.log(records)
    return records
}



