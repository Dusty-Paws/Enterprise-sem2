
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'
// import { upload } from 'https://cdn.deno.land/oak_upload_middleware/versions/v2/raw/mod.ts'
// import { parse } from 'https://deno.land/std/flags/mod.ts'

import { login, register, findUserId, UserIdWProfile_Pic, updateCustomer } from './modules/accounts.js'
import {getAllAnimals, getAnimalDetails, reserveAnimal} from './modules/animals.js'
import {blogReviews, blogAddition} from './modules/reviews.js'
import {getAllItems, getAllBundles, addToBasket, groupingOrder } from './modules/store.js'
import {DataToMd} from './modules/text2md.js'
import { gettingAllIds, gettingAllUsers,  gettingAllBlogs} from './modules/Id_2_user.js'
import { getAllAdopted} from './modules/adoption.js'
// import { showSlides} from './modules/slideshow.js'
const handle = new Handlebars({ defaultLayout: '' })

const router = new Router()

// the routes defined here
// ========================================== HOME ===================================
//Mahima rearranged the home - default (to get landing to appear first)
//Default route that loads in the landing page
router.get('/', async context => {
	const authorised = context.cookies.get('authorised')
	const data = { authorised }
	const body = await handle.renderView('LandingPage', data)
	context.response.body = body
})
//The route for the home page -> added (was default before)
router.get('/home', async context => {
	const authorised = context.cookies.get('authorised')
	const data = { authorised }
	const body = await handle.renderView('home', data)
	context.response.body = body
})

// ========================================== LOGIN ===================================
router.get('/logout', context => {
  // context.cookies.set('authorised', null) // this does the same
  context.cookies.delete('authorised')
  context.response.redirect('/')
})

router.get('/login', async context => {
	const body = await handle.renderView('login')
	context.response.body = body
})

router.post('/login', async context => {
	console.log('POST /login')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	try {
		const username = await login(obj)
		context.cookies.set('authorised', username)
		context.response.redirect('/customerProfile')
	} catch(err) {
		console.log(err)
		context.response.redirect('/login')
	}
})
// ========================================== REGISTER ===================================
router.get('/register', async context => {
	const body = await handle.renderView('register')
	context.response.body = body
})

// router.post('/register', async context => {
// 	console.log('POST /register')
// 	const body = context.request.body({ type: 'form' })
// 	const value = await body.value
// 	const obj = Object.fromEntries(value)
// 	console.log(obj)
// 	await register(obj)
// 	context.response.redirect('/login')
// })

// router.post('/register', async context => {
// 	console.log('POST /register')
// 	const body = await context.request.body({ type: 'form-data' })
// 	const value = await body.value.read()
	
// 	let title_Cleaned = "userPic.png"
// 	//Getting image name!!!!  --need to see if file uploaded
// 	console.log(value.file)
// 	console.log((!value.file[0]))
// 	if ((value.file)== false){
// 		const title_Cleaned = await "userPic.png"
// 		console.log(title_Cleaned)
// 	} 
// 	else {
// 			const file = value.files[0]
// 			const{ originalName, filename} = file
// 			const title_Cleaned = await originalName.replace(/\s/g, '')
// 			const newFileName = Deno.rename(filename, `/home/codio/workspace/public/uploads/${title_Cleaned}`)
// 			console.log(title_Cleaned)
// 	}

// 	should pass all data to register function
// 	const obj = Object.fromEntries(value)
// 	console.log(obj)

//   const art = JSON.stringify(value)//,null,2)
//   const jsobj = JSON.parse(art)
// 	const fields = await jsobj
// 	const data = await {value, title_Cleaned}
// 	console.log(data)
// 	await register(data)
// 	context.response.redirect('/login')
// });

router.post('/register', async context => {
 	console.log('POST /register')
 	const body = await context.request.body({ type: 'form-data' })
 	const value = await body.value.read()
	const art = JSON.stringify(value)//,null,2)
  const jsobj = await JSON.parse(art)
	//console.log(jsobj)
 	
	 
	 let title_Cleaned = ""
   //checks if file was uploaded
	 const fileChecker = (jsobj.files[0].contentType)
 	 if(fileChecker == "application/octet-stream"){
 		title_Cleaned = await "pawlogo.png"
 		console.log(title_Cleaned)
 	} 
 	else {
 			const file = value.files[0]
 			const{ originalName, filename} = file
 			title_Cleaned = await originalName.replace(/\s/g, '')
 			const newFileName = Deno.rename(filename, `/home/codio/workspace/public/uploads/${title_Cleaned}`)
 			console.log(title_Cleaned)
 	}


  	const data = await {value, title_Cleaned}
  	console.log(data)
   	await register(data)
 	  context.response.redirect('/login')
 });



// ========================================== USER HOME =====================================

// ============================================= DORNA ==============================================================
// ============ CUSTOMER PROFILE =====================
//this is going to be every users homepage, i dont mind doing this - Dorna//
router.get('/customerProfile', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/LandingPage')
	const user = {authorised}
  const user_identify = await findUserId(user)
  const user_identifier = user_identify[0]
	const adopted = await getAllAdopted(user_identifier)
	const data = { authorised, adopted }
	console.log(adopted)
	console.log("DONE")
	const body = await handle.renderView('customerProfile', data)
	context.response.body = body
})
//Dorna customer profile update//
router.post('/customerProfile', async context => {
  const authorised = context.cookies.get('authorised')
  console.log('POST /customerProfile')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)

  const user = {authorised}
  const user_identify = await findUserId(user)
  const user_identifier = user_identify[0]
 
  await updateCustomer(obj,user_identifier)
  context.response.redirect('/customerProfile')
	
});

// ============ CONFIRMATION =====================

router.post('/confirmation', async context => {

  //const body1 = await context.request.body({ type: 'form-data' })
	const body = await handle.renderView('confirmation')
	context.response.body = body
})

// ============================================ DORNA + SANJANA =====================================================
// ============ ADOPTION =====================
router.get('/adoption', async context => {
	const authorised = context.cookies.get('authorised')
	const animals = await getAllAnimals()
    console.log(animals)
    const data = {animals, authorised}
  	const body = await handle.renderView('adoption', data)
	context.response.body = body
})

router.get('/article_details', async context => {
	const authorised = context.cookies.get('authorised')
	const bundles = await getAllBundles()
    console.log(bundles)
    const data = {bundles, authorised}
  	const body = await handle.renderView('article_details', data)
	context.response.body = body
})

router.get('/article_details/:Pet_ID', async context => {
	const authorised = context.cookies.get('authorised')
  const pet_ID = await {Pet_ID: context.params.Pet_ID}
	const details = await getAnimalDetails(pet_ID)

  const bundles = await getAllBundles(pet_ID.Pet_ID)

	var data = {authorised}
  if (bundles[0] != undefined){
		const bundle_price = bundles[0].Bundle_Price
		console.log(bundle_price)
		data = {details, bundles, bundle_price, authorised}
	}
	else
	{
		data = {details, authorised}
	}
  	
	const body = await handle.renderView('article_details', data)
	context.response.body = body

})

router.post('/article_details/:Pet_ID', async context => {
    console.log('POST /article_details/:Pet_ID')
		const body = await context.request.body ({ type: 'form-data'})
    const authorised = context.cookies.get('authorised')

		const reserve = await reserveAnimal(authorised)
		const data = { reserve, authorised}
		const body1 = await handle.renderView('article_details/:Pet_ID', data)
		context.response.body = body1
})


//This post function will return the search of species to the page 
//it's species btw (same word for singular and plural) :)
/*router.post('/SpecieSearch', async context => {
	const authorised = context.cookies.get('authorised')
	const body = await context.request.body({type:'form-data'})
  const data = await body.value.read()

	//data = data.charAt(0).toUpperCase() + word.slice(1)
	console.log(data)
	//Should call a function that checks the species

	//then return back to adoption page
	context.response.redirect('/adoption')

})*/



// =============================================== SAJIDHA =====================================================
// ============ STORE =====================
router.get('/store', async context => {
	const authorised = context.cookies.get('authorised') //thats why sharon is repeated every other line
	const item = await getAllItems()
  const data = {item, authorised}
	const body = await handle.renderView('store', data)
	context.response.body = body
})


router.post('/submitItem', async context => {
	const authorised = context.cookies.get('authorised')
	
	const body = await context.request.body ( {type: 'form'} )
	const data2 = await body.value
  const obj = Object.fromEntries(data2)
	console.log(obj)
	
	const Item_ID1 = parseInt(obj.Item_ID)
	console.log(Item_ID1)

	const Item_ID = {Item_ID: Item_ID1}
  console.log(Item_ID)

  const data3 = {authorised, Item_ID}
	await addToBasket(data3)
	// context.response.redirect('/store')
  context.response.redirect('/checkout')
})

router.get('/checkout', async context => {
	const authorised = context.cookies.get('authorised')
  //const order = await groupingOrder()
  // const data = {authorised, order}
	const data = {authorised}
	const order = await groupingOrder(data)
	const data2 = {authorised, order}
	const body = await handle.renderView('checkout', data2)
	context.response.body = body
})

router.get('/payment', async context => {
	const authorised = context.cookies.get('authorised')
    const data = {authorised}
	const body = await handle.renderView('payment', data)
	context.response.body = body
})

// ============ ABOUT US =====================
router.get('/aboutUs', async context => {
	const authorised = context.cookies.get('authorised')
	const body = await handle.renderView('aboutUs', authorised)
	context.response.body = body
})

// ============ CONTACT US ====================
router.get('/contact', async context => {
	const authorised = context.cookies.get('authorised')
	const body = await handle.renderView('contact', authorised)
	context.response.body = body
})


// ========================================== FORUM ===================================
/*router.get('/forum', async context => {
	const body = await handle.renderView('forum')
	context.response.body = body
})*/

// =============================================== MAHIMA =====================================================
// ============ BLOG =====================
router.get('/blog', async context => {
  const authorised = context.cookies.get('authorised')
  //if(authorised === undefined) context.response.redirect('/home')

  const blogReview = await blogReviews()
	
	//this collects all user ID -> which then changes to user names
	const ListOfIDs =  await gettingAllIds(blogReview)
	const ListOfUsers = await gettingAllUsers(ListOfIDs)
	const ListOfProfilePics = await UserIdWProfile_Pic(ListOfIDs)
	//console.log(ListOfProfilePics)
	//const dat = ListOfProfilePics[0]
	
	//This matches the blog reviews with the users who made them
	const blogReviewer = await gettingAllBlogs(blogReview,ListOfUsers, ListOfProfilePics)
	console.log(blogReviewer)

	//passes to handlbars
  const data = await {blogReviewer, authorised}
	const body = await handle.renderView('blog',data)
	context.response.body = body
})

router.post('/add_review', async context => {
  //form data  
  const body = await context.request.body({type: 'form-data'})
  const da1ta = await body.value.read()

  //get Blog_Desc/ title
	const title = da1ta["fields"].Blog_Title 
  const description = da1ta["fields"].Blog_Desc

	//need to change title so it has no spaces
	const title_Cleaned = title.replace(/\s/g, '')
  
  //move Blog_Desc to md file
	await DataToMd(title_Cleaned,description)

  //This way you would know the user:  --> would need to find User_ID
  const authorised = context.cookies.get('authorised')
	const user = { authorised }

  //should find users i	
  const user_identify = await findUserId(user)
  const user_identifier = user_identify[0]


	//add data to db - Blog     -----------------------Adds a blog post!!-------------------------  
  const data = {title , title_Cleaned}
	await blogAddition(data, user_identifier)


  //would eventually redirect to blog - which should have the added review
  context.response.redirect('/blog')

})

//details page routes

// ============ SEARCH ENGINE =====================
router.get('/Search', async context => {
	const authorised = context.cookies.get('authorised')
	const body = await handle.renderView('search', authorised)
	context.response.body = body
})


export default router

