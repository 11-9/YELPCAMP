const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // your user id
            author: "6293650dd4e86eea2d43f1d0",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quam consequuntur perferendis aperiam ipsam quod, nisi cumque laboriosam rerum. Quas, incidunt asperiores. Laborum, molestias! Quia fuga inventore esse ducimus aliquam.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                
                      {
                        url: 'https://res.cloudinary.com/dkb7pksnt/image/upload/v1654271714/YelpCamp/illx1nz4ynr8zotuywo6.jpg',
                        filename: 'YelpCamp/illx1nz4ynr8zotuywo6',
                        
                      },
                      {
                        url: 'https://res.cloudinary.com/dkb7pksnt/image/upload/v1654271714/YelpCamp/zlzfn4uwyddeddbkkvz2.jpg',
                        filename: 'YelpCamp/zlzfn4uwyddeddbkkvz2',
                        
                      } 
            ]
        });
        await camp.save();
    }

}
seedDB().then(() => {
    mongoose.connection.close();
});
