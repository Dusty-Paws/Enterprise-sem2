
-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

DROP TABLE IF EXISTS accounts;

/*===================================== DORNA ==========================================*/

DROP DATABASE IF EXISTS website;
CREATE DATABASE website;
USE website;

CREATE TABLE IF NOT EXISTS Customers (
    User_ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    User_Name varchar(255),
    User_Pass varchar(255),
    User_Postcode varchar(7),
    User_Email varchar(255),
    Profile_Pic varchar(255)
);

CREATE TABLE IF NOT EXISTS Pets (
    Pet_ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Owner_ID int NOT NULL,
    Status_Pet varchar(255),
    Pet_Pic varchar(255),
    Pet_Name varchar(255),
    Species varchar(255),
    Breed varchar(255),
    Sex varchar(2),
    Age varchar(255),
    Fee int(100)
);

CREATE TABLE IF NOT EXISTS Adoption (
    Pet_ID int NOT NULL,
    User_ID int(4),
    Bundle_ID int(4),
    PRIMARY KEY(Pet_ID,User_ID)
);

CREATE TABLE IF NOT EXISTS Items (
    Item_ID int NOT NULL PRIMARY KEY,
    Item_Name varchar(255),
    Item_Desc varchar(255),
    Item_Price float(6,2)
);

CREATE TABLE IF NOT EXISTS Bundles (
    Bundle_ID int NOT NULL,
    Item_ID int(4),
    Bundle_Desc varchar(255),
    Bundle_Price VARCHAR(25),
    PRIMARY KEY (Bundle_ID, Item_ID)
);


CREATE TABLE IF NOT EXISTS Pet_Bundle (
    Bundle_ID INT NOT NULL,
    Pet_ID INT NOT NULL,
    PRIMARY KEY (Bundle_ID) 

);

CREATE TABLE IF NOT EXISTS Blog (
    Blog_ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    User_ID int(4),
    Blog_Title varchar(255),
    Blog_Desc varchar(255),
    Post_Time Timestamp NOT NULL
);

/* ================================================ SAJIDHA ===============================*/

CREATE TABLE IF NOT EXISTS OrderSummary (
    Order_ID int(4) AUTO_INCREMENT,
    User_ID int(4),
    Item_ID int(4), 
    Item_Qty int(4),
    Total_Price float(6,2),
    Order_Date date,
    PRIMARY KEY(Order_ID, User_ID)
);

-- CREATE TABLE IF NOT EXISTS Sales (
--     User_ID int(4),
--     Item_ID int(4), 
--     Item_Qty int(4),
--     Order_ID int(4),
--     PRIMARY KEY(User_ID, Item_ID)
-- );

    ALTER TABLE `OrderSummary` ADD FOREIGN KEY (Order_ID) REFERENCES `Sales` (Order_ID);
    ALTER TABLE `OrderSummary` ADD FOREIGN KEY (User_ID) REFERENCES `Customers` (User_ID);
    ALTER TABLE `OrderSummary` ADD FOREIGN KEY (Item_ID) REFERENCES `Items` (Item_ID);
    
    -- ALTER TABLE `Sales` ADD FOREIGN KEY (User_ID) REFERENCES `Customers` (User_ID);
    -- ALTER TABLE `Sales` ADD FOREIGN KEY (Item_ID) REFERENCES `Items` (Item_ID);
    -- ALTER TABLE `Sales` ADD FOREIGN KEY (Order_ID) REFERENCES `OrderSummary` (Order_ID);
    
    /*ALTER TABLE `Orders` ADD FOREIGN KEY (Bundle_ID) REFERENCES `Bundles` (Bundle_ID);*/


/* ================================================ SAJIDHA ===============================*/



/*could change Post_Time to Timestamp instead of varchar and not null -> so it auto adds when written to db*/


ALTER TABLE `Pets` ADD FOREIGN KEY (Owner_ID) REFERENCES `Customers` (User_ID);
ALTER TABLE `Adoption` ADD FOREIGN KEY (User_ID) REFERENCES `Customers`(User_ID);
ALTER TABLE `Bundles` ADD FOREIGN KEY (Item_ID) REFERENCES `Items` (Item_ID);
ALTER TABLE `Blog` ADD FOREIGN KEY (User_ID) REFERENCES `Customers` (User_ID);
ALTER TABLE `Pet_Bundle` ADD FOREIGN KEY (Pet_ID) REFERENCES `Pets` (Pets_ID);




/*Note: Passwords only set for Sharon and Gilbert to showcase different types of accounts*/
INSERT INTO Customers (User_Name, User_Pass, User_Postcode, Profile_Pic)
VALUES ("Sharon","$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO","IV3 5AG", "Profile1.jpg"),
("Gilbert","$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO","S17 4QF", "Profile2.jpg"),
("Alice","green","ML9 3HF", "Profile3.jpg"),
("Penny","blue","N11 3HL", "Profile4.jpg"),
("Marcus","pink","CV6 3BW","Profile5.jpg"),
("Angelo","purple","RM8 1XH","Profile6.jpg");
/*Note: Passwords are encrypted in the database but is: p455w0rd in the front end.*/

INSERT INTO Pets (Owner_ID,Pet_Name, Status_Pet, Pet_Pic, Species, Breed, Sex, Age, Fee)
VALUES (4,"Apollo","Available","img_dog.png","Dog","Golden retriever","M","2010-11-02",50.00),
(5,"Midnight","Sold","img_bird.png","Bird","Raven","M","2022-01-01",10.00),
(6,"Cheshire","Reserved","img_cat.png","Cat","Domestic short hair","F","2021-11-06",20.00);

INSERT INTO Adoption (Pet_ID, User_ID)
VALUES (2,2);


INSERT INTO Items (Item_ID, Item_Name, Item_Desc, Item_Price)
VALUES 
(1, "WET + DRY DOG FOOD","DogFood.md",35.00),
(2, "Square DOG BED in SAND","DogBed.md",15.00),
(3, "DOG TOY - 3 Ring Ropes","DogToy.md",7.00);

INSERT INTO Bundles (Bundle_ID,Item_ID,Bundle_Desc, Bundle_Price)
VALUES (1,1,"DogStarterPack1.md","50.00"), 
(1,2,"DogStarterPack2.md","50.00"),
(1,3,"DogStarterPack3.md","50.00");

INSERT INTO Pet_Bundle (Bundle_ID,Pet_ID)
VALUES (1,1);


/* Dog (Apollo) is our main showcase, there was no need to repeat the same process for other pets*/

INSERT INTO Blog (User_ID, Blog_Title, Blog_Desc)
VALUES ("3","My experience with Apollo the Golden Retriever","Post1.md"),
("2","My Thoughts on Dusty Paws","MythoughtsonDustyPaws.md"),
("1","Finding My Pet","Findingmypet.md"),
("4","Bringing comfort to my home","comfortReview.md");


/*Note: Dates temporarily stored as strings*/
/*Note: Change item price to str*/
/*Note: Post time changed to timestamp not null*/
