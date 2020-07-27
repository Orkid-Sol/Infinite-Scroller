const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



//  Unsplash API
const count = 30;
const apiKey = 'RC4mM-Ioa3GmIkwfK4zNOnN15GZjyW2oIbFm0OADGaA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count};`

//  Check if all images were laoded
function imageLoaded(){
 
    console.log('image loaded');imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
     
    }
}
// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}




// Creat Elements For Links & Photos, Add to DOM

function displayPhotos(){
    imagesLoaded = 0;
        totalImages = photosArray.length;

        photosArray.forEach((photo) => {
        //  Creat <a> to link Unsplash
            const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
            setAttributes(item,{
              href: photo.links.html,
              target: '_blank',
        });
        // Creat <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //  Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);


        // Put <img> inside <a>, then put both inside imagContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Get photos from Unspalsh API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray); to make sure works good
        displayPhotos();

    } catch (error) {
        //  Catch error here

    }
}

// check to see if scrolling near bottom of page, load more photos 
window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
  
        
    }
});



//  On load
getPhotos();