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

  const target = document.getElementById(folderId);
  if (target) target.style.display = "grid";
}

// Hide everything on Media Gallery title click
function resetView() {
  document.getElementById("images").style.display = "none";
  document.getElementById("videos").style.display = "none";

  const allSubfolders = document.querySelectorAll(".subfolder");
  allSubfolders.forEach(folder => folder.style.display = "none");
}
