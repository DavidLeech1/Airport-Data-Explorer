// Get the modal for login
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




// Get the screenshot image modal
// This is for expanding the screenshot on the landing page
var screenshotmodal = document.getElementById('screenshotModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('screenshot');
var modalImg = document.getElementById("screenshot1");
var captionText = document.getElementById("caption");
img.onclick = function(){
    screenshotmodal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    screenshotmodal.style.display = "none";
}