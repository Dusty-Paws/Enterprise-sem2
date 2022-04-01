


import {db} from'./db.js'

export async function blogReviews() {
    const sql = `select * from Blog ORDER BY Post_Time DESC;`
    const records = await db.query(sql)
    console.log(records)
    return records
}


export async function blogAddition(data, user_identifier) {
  //console.log(data)  --> so we can see if correct data passed to function 
  //console.log(user_identifier.User_ID)   --> so we could check user id ws correctly displayed
 // console.log(`${data.title_Cleaned}.md`)   --> so we could see how to format data name

    const sql = `INSERT INTO Blog(User_ID,Blog_Title,Blog_Desc)     
                   VALUES("${user_identifier.User_ID}","${data.title}","${data.title_Cleaned}.md")`
                    
    const records = await db.query(sql)
    console.log(records)
    return records
}