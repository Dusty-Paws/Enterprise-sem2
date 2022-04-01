
/*form_appearance*/


//Mahimas blog form to appear - for blog page
function addForm() {
        
        //document.querySelector('form').style.display = 'block';
        console.log(document.querySelector('form').style.display)
        if (document.querySelector('form').style.display == "none") {
              document.querySelector('form').style.display = "block";
            } else {
              document.querySelector('form').style.display = "none";
            }
      }