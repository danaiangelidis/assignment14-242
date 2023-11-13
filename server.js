const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images" });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

/* Animal information from https://finalvictoryrescue.com/ may be slightly altered for display purposes :) */

let animals = [{
        _id: 1,
        animal: "dog",
        name: "Alma",
        img: "images/alma.jpeg",
        description: "Meet Alma, the sweetest 3-year-old shepherd! This pretty girl came from a local shelter with her litter of 8 puppies. Though she can be a bit shy when meeting new people, she is super dog friendly and LOVES to play with other pups! She hasn't had the easiest life so far, but we can not wait to see her in a loving, patient home where she can finally relax and live the good life. This girl has amazing potential, and we just know she is going to make an amazing family girl.",
        breed: "Shepherd Mix",
        age: "25 - 144 Months",
        weight: 65,
        qualifications: [
            "I Am Feaful of Male Humans",
            "I Like All Kids",
            "I Like All Dogs",
            "I Don't Mind Cats",
            "Not Tested With Small Animals",
            "Not Tested with Farm Animals"
        ],
    },
    {
        _id: 2,
        animal: "dog",
        name: "Carla",
        img: "images/carla.jpeg",
        description: "This beautiful pup is Carla, a 2.5 year old husky/shepherd mix who was surrendered to us from a local family due to no fault of her own! Carla is a high energy, playful girl who definitely needs some TLC and training to become the best girl we know she can be. She is currently working with a trainer in her foster home to get her active, high energy tendencies a bit more controlled, as she can be a bit much when excited and playing, especially around children (she would do best in a home with older children)! We told Carla there's nothing wrong with a little crazy, in fact we embrace it! And we know her future family will too.",
        breed: "Husky & Sheperd",
        age: "25 - 144 Months",
        weight: 45,
        qualifications: [
            "I Like All Humans",
            "I Like Kids Over 10",
            "I Like All Dogs",
            "Not Tested With Cats",
            "Not Tested With Small Animals",
            "Not Tested with Farm Animals"
        ],
    },
    {
        _id: 3,
        animal: "dog",
        name: "Sand",
        img: "images/sand.jpg",
        description: "This adorable puppy is Sand, an 8 week old mixed breed baby who was found with her siblings and brought straight to us! They are SO precious, chunky, playful, and snuggly babies who are to die for!! They are all thriving in foster homes, learning all their manners and tricks so they can become the best family pups they can be. These babies still have a little growing to do, but they are growing and learning quickly!",
        breed: "Mix",
        age: "2-7 Months",
        weight: 10,
        qualifications: [
            "I Like All Humans",
            "I Like All Kids",
            "I Like All Dogs",
            "I Like All Cats",
            "Not Tested With Small Animals",
            "Not Tested with Farm Animals",
        ],
    },
    {
        _id: 4,
        animal: "cat",
        name: "Angel",
        img: "images/angel.jpg",
        description: "Meet Angel, the 2-month-old kitten who's stolen our hearts with her cuteness and cuddliness. Discovered alongside her equally adorable littermates, Angel is thriving in her foster home, where she's cozying up for endless snuggles. This tiny furball is the purr-fect companion.",
        breed: "Domestic Long Hair",
        age: "0-2 Months",
        weight: 5,
        qualifications: [
            "I Like All Humans",
            "I Like All Kids",
            "Not Tested With Dogs",
            "I Like All Cats",
            "Not Tested With Small Animals",
            "Not Tested with Farm Animals",
        ],
    },
    {
        _id: 5,
        animal: "cat",
        name: "Birdie",
        img: "images/birdie.jpg",
        description: "While I may start off a little reserved, patience and love will help me come out of my shell. In a quiet and cozy environment, I'll gradually unveil my playful side. I enjoy chasing feather toys and pouncing on string, and I have a love for cozy hideaways where I can feel safe and secure.",
        breed: "Tabby",
        age: "8-24 Months",
        weight: 20,
        qualifications: [
            "I Like All Humans",
            "I Like Kids Over 10",
            "Not Tested With Dogs",
            "I Like All Cats",
            "Not Tested With Small Animals",
            "Not Tested with Farm Animals",
        ],
    },
    {
        _id: 6,
        animal: "cat",
        name: "Prince",
        img: "images/prince.jpg",
        description: "Hello, feline friends! My name is Prince, and I'm on a mission to find my forever cuddle partner. Are you the one I've been waiting for?",
        breed: "Tuxedo",
        age: "8-24 Months",
        weight: 27,
        qualifications: [
            "I Like All Humans",
            "I Like All Kids",
            "Not Tested With Dogs",
            "I Like All Cats",
            "Not Tested With Small Animals",
            "Not Tested with Farm Animals",
        ],
    },
];

app.get("/api/animals", (req, res) => {
    res.send(animals);
});

app.post("/api/animals", upload.single("img"), (req, res) => {
    const result = validateAnimal(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const animal = {
        _id: animals.length + 1,
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        qualifications: req.body.qualifications.split(",")
    }

    animals.push(animal);
    res.send(animals);
});

const validateAnimal = (animal) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        qualifications: Joi.allow(""),
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required()
    });

    return schema.validate(animal);
};

app.listen(3000, () => {
    console.log("I'm listening");
});
