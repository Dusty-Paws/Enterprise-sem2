/* Id_2_user.js */

import { UserId2Username } from '/home/codio/workspace/modules/accounts.js'

export async function gettingAllIds(blogReview) {
  const lenOfBlog = (blogReview.length)
    const ids = []
    for (let i=0; i < lenOfBlog; ++i)
    {
        const currentReview = blogReview[i]
        const id= currentReview.User_ID
        ids.push(id)
    }
    return(ids)
}


export async function gettingAllUsers(allIds) {
  const lenOfIDS = (allIds.length)
  const usernames = []
  for (let i=0; i < lenOfIDS; ++i)
    {
        const currentId = allIds[i]
        const user= await UserId2Username(currentId)
        //console.log(user)
        if (user.User_ID === null) {
          user = {User_ID: 'Not mentioned'}
          usernames.push(user)
        } else {
        usernames.push(user) }
    }
    
  var merged = [].concat.apply([], usernames);
  //console.log(merged);
  //console.log (usernames)
  return merged
}

/*export async function gettingAllBlogs(blogReview, ListOfUsers) {
  const lenOfUsers = (ListOfUsers.length)
  const listOfBlog = [blogReview]
  for (let i=0; i < lenOfUsers; ++i)
    {
        const currentUser = ListOfUsers[i]
        listOfBlog[i].push(currentUser) 
    }
  //console.log(blogReview)
  return listOfBlog
}*/


//need to merge profile picture
export async function gettingAllBlogs(blogReview, ListOfUsers, ListOfProfilePics) {
  const blogs = {blogReview}
	//console.log(blogs.blogReview[0])
  const profilepic = ListOfProfilePics
  const profilepic1 = profilepic.flat()
  //console.log(profilepic)
	const blogReviewer =  []
  const lenOfUsers = (ListOfUsers.length)

  for (let i=0; i < lenOfUsers; ++i)
    {
        const currentUser = ListOfUsers[i]
        const currentProfilePic = profilepic1[i]
        //console.log(currentProfilePic)
				let singBlog = blogs.blogReview[i]
				singBlog['User_Name'] = `${currentUser.User_Name}`
        singBlog['Profile_Pic'] = `${currentProfilePic.Profile_Pic}`
				blogReviewer.push(singBlog)
				
    }
  return blogReviewer
}