const dialogRef = document.getElementById("photo-dialog");
const photoIndex = document.getElementById("photo-album");

//*Img Array
const photos = [
    "01snowmountain.jpg",
    "02animecity.jpg",
    "03stormclouds.jpg",
    "04birdontree.jpg",
    "05huricane.jpg",
    "06alsosnowemountain.jpg",
    "07duck.jpg",
    "08standingguy.jpg",
    "09birdontherocks.jpg",
    "10cutiwildcats.jpg",
    "11bluesky.jpg",
    "12snowtree.jpg",
];

let total = photos.length;

//*get imgs
function open_album() {
    for (let i = 0; i < photos.length; i++) {
        photoIndex.innerHTML += get_photo_template(i);
    }
}

//* innerHTML for Photo Preview
function get_photo_template(index) {
    let photoNumber = String(index + 1).padStart(2, "0");
    let name = get_photo_name(photos[index]);
    return `
        <button class="photo_button"
            onclick="photo_view_dialog(${index + 1})"
            aria-label="Foto öffnen: ${name}">
            <img 
                id="chosen_photo${photoNumber}"
                src="./assets/img/${photos[index]}"
                alt="${name}">
        </button>
    `;
}

//*  Get Photo Name from file
function get_photo_name(fileName) {
    let name = fileName
        .replace(".jpg", "")
        .replace(/_/g, " ")
        .replace(/ae/g, "ä")
        .replace(/oe/g, "ö")
        .replace(/ue/g, "ü")
        .slice(2, 43);
    return name;
}

//* Update Dialog Content
function show_photo(photo_number) {
    let photoId = String(photo_number).padStart(2, "0");
    let img = document.getElementById("chosen_photo" + photoId);
    document.getElementById("chosen-photo").src = img.src;
    document.getElementById("img-number").innerHTML = photoId + "/" + total;
    document.getElementById("photo-name").innerText = get_photo_name(photos[photo_number - 1]);
}

//* open Dialog
function photo_view_dialog(clicked) {
    dialogRef.showModal();
    dialogRef.classList.add("main-dialog_opened");
    document.body.classList.add("no_scroll");
    show_photo(clicked);
}

//* close Dialog
function close_dialog() {
    dialogRef.classList.remove("main-dialog_opened");
    document.body.classList.remove("no_scroll");
    dialogRef.close();
}

//* next one
function next_photo() {
    let current = document.getElementById("img-number").innerHTML.slice(0, 2);
    let next = parseInt(current) + 1;
    if (next > total) {
        next = 1;
    }
    show_photo(next);
}

//* previous Photo
function previous_photo() {
    let current = document.getElementById("img-number").innerHTML.slice(0, 2);
    let previous = parseInt(current) - 1;
    if (previous < 1) {
        previous = total;
    }
    show_photo(previous);
}

//* ESC Exit
dialogRef.addEventListener("close", () => {
    document.body.classList.remove("no_scroll");
});