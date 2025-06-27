// Access code
const SECRET_CODE = "1234"; // Change this to your preferred code

function checkAccess() {
  const input = document.getElementById("access-code").value;
  const errorMsg = document.getElementById("error-msg");
  if (input === SECRET_CODE) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("gallery-section").style.display = "block";
  } else {
    errorMsg.innerText = "Incorrect access code!";
  }
}

// Show top-level folder (images or videos)
function showFolder(folderId) {
  document.getElementById("images").style.display = "none";
  document.getElementById("videos").style.display = "none";

  // Hide all subfolders within both sections
  const allSubfolders = document.querySelectorAll(".subfolder");
  allSubfolders.forEach(folder => folder.style.display = "none");

  document.getElementById(folderId).style.display = "block";
}

// Show a specific subfolder inside images or videos
function showSubfolder(folderId, parent) {
  const subfolders = document.querySelectorAll(`#${parent} .subfolder`);
  subfolders.forEach(folder => folder.style.display = "none");

  // Also hide any open nested folders inside subfolders
  

  const target = document.getElementById(folderId);
  if (target) target.style.display = "grid";
}
// //FUNCTION TO SHOW NESTED FOLDERS
// function showNestedFolder(folderId) {
//  const nested = document.querySelectorAll('.nested-folder');
//   nested.forEach(f => f.style.display = 'none');


//   const target = document.getElementById(folderId);
//   if (target) target.style.display = 'grid';
//  }
// Update the showNestedFolder function
function showNestedFolder(folderId) {
  // Hide all nested folders first
  const nested = document.querySelectorAll('.nested-folder');
  nested.forEach(f => f.style.display = 'none');
  
  // Show the selected folder
  const target = document.getElementById(folderId);
  if (target) {
    target.style.display = 'grid';
    
    // Scroll to the folder content
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}



// Hide everything on Media Gallery title click
function resetView() {
  document.getElementById("images").style.display = "none";
  document.getElementById("videos").style.display = "none";

  const allSubfolders = document.querySelectorAll(".subfolder");
  allSubfolders.forEach(folder => folder.style.display = "none");

  const allNestedFolders = document.querySelectorAll(".nested-folder");
allNestedFolders.forEach(folder => folder.style.display = "none");

  // Scroll to top
  window.scrollTo(0, 0);

}
// scroll to top on page load
// document.querySelectorAll('.media-item iframe').forEach(iframe => {
//   iframe.setAttribute('data-clicked', 'false');
//   iframe.style.pointerEvents = 'none';

//   iframe.addEventListener('touchstart', function () {
//     if (iframe.getAttribute('data-clicked') === 'false') {
//       iframe.setAttribute('data-clicked', 'true');
//       iframe.style.pointerEvents = 'auto';

//       // Reset after 5 seconds
//       setTimeout(() => {
//         iframe.setAttribute('data-clicked', 'false');
//         iframe.style.pointerEvents = 'none';
//       }, 5000);
//     }
//   });
// }
//);
// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const closeBtn = document.querySelector('.close-btn');
const loader = document.querySelector('.lightbox-loader');

document.querySelectorAll('.gallery-image').forEach(img => {
  img.addEventListener('click', function() {
    const fullImageUrl = this.dataset.full;
    
    // Show loading state
    lightbox.classList.add('active', 'loading');
    lightbox.classList.remove('loaded');
    
    // Preload image
    const tempImg = new Image();
    tempImg.src = fullImageUrl;
    
    tempImg.onload = () => {
      lightboxImg.src = fullImageUrl;
      lightbox.classList.remove('loading');
      lightbox.classList.add('loaded');
    };
    
    tempImg.onerror = () => {
      lightbox.classList.remove('loading');
      alert('Failed to load image');
      lightbox.classList.remove('active');
    };
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active', 'loaded');
});

// Close when clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active', 'loaded');
  }
});

// Close with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active', 'loaded');
  }
});

