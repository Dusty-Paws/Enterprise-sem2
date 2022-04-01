
/*md2html*/

 


//MAHIMA - made for blogs use
const converter = await new showdown.Converter({'tables': true, 'tasklists': true, 'strikethrough': true})
    
//gets the markdown file
const art = await document.querySelector('embed').value
const options = converter.getOptions()
    console.log(options)

//makes it HTML - and places it in the article but also gets rid of the link once done so it does not appear on the screen
	  const html = converter.makeHtml(art)
    await document.querySelector('article1').innerHTML = html
    document.querySelector('embed').style.display = 'none'
    console.log('CONTENT LOADED')


//SAJIDHA - used for store items
//makes it HTML - and places it in the article but also gets rid of the link once done so it does not appear on the screen
	  const html = converter.makeHtml(art)
    await document.querySelector('article2').innerHTML = html
    document.querySelector('embed').style.display = 'none'
    console.log('CONTENT LOADED')
