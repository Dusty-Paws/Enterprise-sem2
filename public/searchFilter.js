

//gets all pet details
import * as animals from './allAnimals.json' assert { type: "json" };

//so could get what people are searching on the fly - and work on display later
const charactersList = document.querySelector('ul');
const searchBar = document.querySelector('input');
let AllAnimals = [];

//so when a user types after a keypress -> it will filter through AllAnimals list and return the pet name/ breed / species
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredAnimals =  AllAnimals.filter((animal) => {
        return (
            animal.Pet_Name.toLowerCase().includes(searchString) ||
            animal.Species.toLowerCase().includes(searchString) ||
            animal.Breed.toLowerCase().includes(searchString)
            /*animal.name.toLowerCase().includes(searchString) ||
            animal.house.toLowerCase().includes(searchString)*/
        );
    });

    if (filteredAnimals.length == 0 ){
      //call function to diplay empty paragraph
      notFound()
    }else {
    displayCharacters(filteredAnimals);
    }
});

//loads the animals into AllAnimals array
const loadAnimals = async () => {
    try {
         const res1 = await (animals)//have function that gets data from pets table;
        
        const ani = await JSON.stringify(res1);
        const anim = await JSON.parse(ani)
        AllAnimals = (anim.default.Animals)
        displayCharacters(AllAnimals);


    } catch (err) {
        console.error(err);
    }
};

//displays the list from the startpoint, as it is being filtered
const displayCharacters = async (animal) => {
    console.log(animal)
  
    const htmlString = animal.map(animals => {return `<li> <h2>${animals.Pet_Name}</h2> <p>Species: ${animals.Species}</p> <p>Breed: ${animals.Breed}</p> <a href="/article_details/${animals.Pet_ID}">For More Details</a> <img src="${animals.Pet_Pic}"></img></li>`;})
        .join('');

    charactersList.innerHTML = htmlString;
    
};

const notFound = async () => {
  const htmlString = `<li> <p>No Animals Found</p></li>`
  charactersList.innerHTML = htmlString
}

//so list of animal is there from the start
loadAnimals();

