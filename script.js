const secretCode = "letmein";

function checkAccess() {
  const inputCode = document.getElementById("access-code").value;
  const errorMsg = document.getElementById("error-msg");

  if (inputCode === secretCode) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("gallery-section").style.display = "block";

    // Reset to default view: hide all folders
    resetView();
  } else {
    errorMsg.textContent = "Invalid access code!";
  }
}

function showFolder(folder) {
  document.getElementById("images").style.display = "none";
  document.getElementById("videos").style.display = "none";

  document.getElementById(folder).style.display = "block";
}

function resetView() {
  document.getElementById("images").style.display = "none";
  document.getElementById("videos").style.display = "none";
}
