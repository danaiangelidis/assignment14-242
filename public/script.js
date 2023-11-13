const showDogs = () => {
    document.getElementById("dogs-hide").classList.remove("hide");
    document.getElementById("dog-tab").classList.add("underline");
    document.getElementById("cats-hide").classList.add("hide");
    document.getElementById("cat-tab").classList.remove("underline");
    document.getElementById("new-animal").classList.add("hide");
    document.getElementById("add-tab").classList.remove("underline");
};

const showCats = () => {
    document.getElementById("dogs-hide").classList.add("hide");
    document.getElementById("dog-tab").classList.remove("underline");
    document.getElementById("cats-hide").classList.remove("hide");
    document.getElementById("cat-tab").classList.add("underline");
    document.getElementById("new-animal").classList.add("hide");
    document.getElementById("add-tab").classList.remove("underline");
};

const showAdd = () => {
    document.getElementById("dogs-hide").classList.add("hide");
    document.getElementById("dog-tab").classList.remove("underline");
    document.getElementById("cats-hide").classList.add("hide");
    document.getElementById("cat-tab").classList.remove("underline");
    document.getElementById("new-animal").classList.remove("hide");
    document.getElementById("add-tab").classList.add("underline");
}

const showAnimals = async() => {
    let animals = await getAnimals();

    const dogsDiv = document.getElementById("dogs");
    const catsDiv = document.getElementById("cats");

    animals.forEach((animal) => {
        const article = document.createElement("article");
        article.classList.add("animal");

        const h2 = document.createElement("h2");
        h2.innerHTML = animal.name;
        article.append(h2);

        const img = document.createElement("img");
        img.src = `http://localhost:3000/${animal.img}`;
        article.append(img);

        const description = document.createElement("p");
        description.innerHTML = animal.description;
        article.append(description);

        const breed = document.createElement("p");
        breed.innerHTML = `Breed: ${animal.breed}`;
        article.append(breed);

        const age = document.createElement("p");
        age.innerHTML = `Age: ${animal.age}`;
        article.append(age);

        const weight = document.createElement("p");
        weight.innerHTML = `Weight: ${animal.weight}lbs`;
        article.append(weight);

        const qualifications = document.createElement("ul");
        article.append(qualifications);
        animal.qualifications.forEach((qualification) => {
            qualifications.append(getLi(qualification));
        });

        if (animal.animal == "dog") {
            dogsDiv.append(article);
        } else if (animal.animal == "cat") {
            catsDiv.append(article);
        }
    });
};

const getLi = (data) => {
    const li = document.createElement("li");
    li.textContent = data;
    return li;
};

const getAnimals = async() => {
    try {
        return (await fetch("api/animals/")).json();
    } catch (error) {
        console.log("error" + error + "retrieving json");
        return "";
    }
};

window.onload = () => {
    document.getElementById("dog-tab").onclick = showDogs;
    document.getElementById("cat-tab").onclick = showCats;
    document.getElementById("add-tab").onclick = showAdd;
    showAnimals();
};