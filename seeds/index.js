const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }  

const ranIndex = array => array[Math.floor(Math.random() * array.length)]

const imgsArray = [
    {
      url: 'https://res.cloudinary.com/dfvayulpy/image/upload/v1685992462/YelpCamp/rb0swvldwfdz96isjimr.jpg',
      filename: 'YelpCamp/rb0swvldwfdz96isjimr',
    },
    {
      url: 'https://res.cloudinary.com/dfvayulpy/image/upload/v1686701273/YelpCamp/iwiiohh8cdweaqsffpqn.png',
      filename: 'YelpCamp/iwiiohh8cdweaqsffpqn',
    },
    {
      url: 'https://res.cloudinary.com/dfvayulpy/image/upload/v1686075009/YelpCamp/jzxwq6tbwkdikzxneawf.jpg',
      filename: 'YelpCamp/jzxwq6tbwkdikzxneawf',
    },
    {
      url: 'https://res.cloudinary.com/dfvayulpy/image/upload/v1686067805/YelpCamp/xlk3zcemojyiqjovixow.jpg',
      filename: 'YelpCamp/xlk3zcemojyiqjovixow',
    },
    {
      url: 'https://res.cloudinary.com/dfvayulpy/image/upload/v1695167623/YelpCamp/slocan-lake-valhalla-provincial-park-camping-1000x750_kyepfa.jpg',
      filename: 'YelpCamp/slocan-lake-valhalla-provincial-park-camping-1000x750_kyepfa',
    },
    {
      url: 'https://res.cloudinary.com/dfvayulpy/image/upload/v1695167621/YelpCamp/camping3_zpk6uo.jpg',
      filename: 'YelpCamp/camping3_zpk6uo',
    },
    {
      url: 'https://res.cloudinary.com/dfvayulpy/image/upload/v1695167620/YelpCamp/camping2_vpoyza.jpg',
      filename: 'YelpCamp/camping2_vpoyza',
    },
    {
      url: 'https://res.cloudinary.com/dfvayulpy/image/upload/v1695167548/YelpCamp/camping1_smqpdo.jpg',
      filename: 'YelpCamp/camping1_smqpdo',
    },
]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i ++) {
        const random1000 = Math.floor((Math.random() * 1000))
        const price = Math.floor(Math.random() * 20) + 10 
        const camp = new Campground ({
            // YOUR USER ID
            author: '648b7c605a48b10a127940d6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${ranIndex(descriptors)} ${ranIndex(places)}`,
            images: shuffle(imgsArray),
            geometry: { 
                type: 'Point', 
                coordinates: [ cities[random1000].longitude, cities[random1000].latitude ] 
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit officia error unde suscipit animi maiores molestias quia nisi possimus. Repellendus officiis autem at, doloribus qui id hic consectetur nesciunt. Voluptatum?',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})