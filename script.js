// Access code
// const SECRET_CODE = "1234"; 

// function checkAccess() {
//   const input = document.getElementById("access-code").value;
//   const errorMsg = document.getElementById("error-msg");
//   if (input === SECRET_CODE) {
//     document.getElementById("login-section").style.display = "none";
//     document.getElementById("gallery-section").style.display = "block";
//   } else {
//     errorMsg.innerText = "Incorrect access code!";
//   }
// }
// Access code with allowed names
const ALLOWED_NAMES = [
  "abikarthick", "arun", "vijay", "karthick", "gokul",
  "manoj", "sathish", "keerthi", "swetha", "raj",
  "vimal", "deepak", "naveen", "santhosh", "kavin",
  "harish", "bharath", "dinesh", "surya", "nithya"
];
function checkAccess() {
  const input = document.getElementById("access-code").value.trim().toLowerCase();
  const errorMsg = document.getElementById("error-msg");

  if (ALLOWED_NAMES.includes(input)) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("gallery-section").style.display = "block";
  } else {
    errorMsg.innerText = "Incorrect access name!";
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
// //FUNCTION TO SHOW NESTED FOLDERS

function showNestedFolder(folderId) {
  // Hide all nested folders first
  const nested = document.querySelectorAll('.nested-folder');
  nested.forEach(f => f.style.display = 'none');

  // Also hide nested-nested folders
  const nestedNested = document.querySelectorAll('.nested-nested-folder');
  nestedNested.forEach(f => f.style.display = 'none');

  // Show the selected folder
  const target = document.getElementById(folderId);
  if (target) {
    target.style.display = 'grid';  // Changed from 'block' to 'grid'
    
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




