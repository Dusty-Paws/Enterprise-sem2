
/* accounts.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'

import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

/**
 * Checks user credentials.
 * @param {string} username
 * @param {string} password
 * @returns {string} the username for the valid account
 */
export async function login(data) {
	console.log(data)
	let sql = `SELECT count(User_ID) AS count FROM Customers WHERE User_Name="${data.username}";`
	let records = await db.query(sql)
	if(!records[0].count) throw new Error(`username "${data.username}" not found`)
	sql = `SELECT User_Pass FROM Customers WHERE User_Name = "${data.username}";`
	records = await db.query(sql)
	const valid = await compare(data.password, records[0].User_Pass)
	if(valid === false) throw new Error(`invalid password for account "${data.username}"`)
	return data.username
}

/**
 * Adds x and y.
 * @param {number} x
 * @param {number} y
 * @returns {number} Sum of x and y
 */

// export async function register(data) {
// 	const password = await hash(data.password, salt)
// 	const sql = `INSERT INTO Customers(User_Name, User_Pass) VALUES("${data.username}", "${password}")`
// 	console.log(sql)
// 	await db.query(sql)
// 	return true
// }

export async function register(data) {
	const password = await hash(data.value.fields.password, salt)
	const sql = `INSERT INTO Customers(User_Name, User_Pass, Profile_Pic) VALUES("${data.value.fields.username}", "${password}","${data.title_Cleaned}")`
	console.log(sql)
	await db.query(sql)
	return true
}

export async function findUserId (data) {
	//need a function that returns usersID based on Username
	let sql = `select User_ID from Customers WHERE User_Name = "${data.authorised}"`;  
    //console.log(ID)     
    const records = await db.query(sql)
    console.log(records)
    return records
}


export async function UserId2Username (data) {
	//need a function that returns usersname based on User_ID
	let sql = `select User_Name from Customers WHERE User_ID = "${data}"`;  
    //console.log(ID)     
    const records = await db.query(sql)
    console.log(records)
    return records

}


export async function UserIdWProfile_Pic (data) {
	//need a function that returns usersname based on User_ID
	//console.log(data)  3-2-1-4
	let listToAddProfile =[]
	for (let i=0; i< data.length; ++i){
			let changer = data[i]
			let sql = `select Profile_Pic from Customers WHERE User_ID = "${changer}"`;  
			//console.log(ID)     
			let records = await db.query(sql)
			listToAddProfile.push(records)
	}
    console.log(listToAddProfile)
    return listToAddProfile

}

// Tobi's update Password - My Profile_Pic

export async function updatePassword(data, id ) {
	let sql = ` UPDATE Customers SET User_Pass = "${data.User_Pass}" WHERE User_ID = "${id.User_Pass}"; `
	const records = await db.query(sql)
	console.log(records)
	return records
	console.log("Password updated successfully")
}


//Dorna Customer Profile updates//

export async function updateCustomer(data, id) {
	console.log(data)
	let sql = `UPDATE Customers SET User_Name = "${data.User_Name}", User_Email = "${data.User_Email}", User_Postcode = "${data.User_Postcode}" WHERE User_ID = "${id.User_ID}";`
	const records = await db.query(sql)
	console.log(records)
	return records
}