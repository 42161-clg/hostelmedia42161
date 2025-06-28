// DOM elements
const loginSection = document.getElementById('login-section');
const gallerySection = document.getElementById('gallery-section');
const loginBtn = document.getElementById('login-btn');
const galleryTitle = document.getElementById('gallery-title');
const accessCodeInput = document.getElementById('access-code');
const errorMsg = document.getElementById('error-msg');

// Access code
const SECRET_CODE = "1"; 

// Event listeners
loginBtn.addEventListener('click', checkAccess);
galleryTitle.addEventListener('click', resetView);
accessCodeInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') checkAccess();
});

// Add event delegation for folder navigation
document.addEventListener('click', function(e) {
  // Top-level folders
  if (e.target.matches('[data-folder]')) {
    const folderId = e.target.getAttribute('data-folder');
    showFolder(folderId);
  }
  
  // Subfolders
  if (e.target.matches('[data-subfolder]')) {
    const folderId = e.target.getAttribute('data-subfolder');
    const parentId = e.target.getAttribute('data-parent');
    showSubfolder(folderId, parentId);
  }
  
  // Nested folders
  if (e.target.matches('[data-nested]')) {
    const folderId = e.target.getAttribute('data-nested');
    showNestedFolder(folderId);
  }
  
  // Video thumbnails
  if (e.target.matches('.video-thumb')) {
    const videoId = e.target.dataset.videoId;
    showVideoPlayer(e.target, videoId);
  }
});

function checkAccess() {
  const input = accessCodeInput.value;
  
  if (input === SECRET_CODE) {
    loginSection.style.display = "none";
    gallerySection.style.display = "block";
    errorMsg.textContent = "";
  } else {
    errorMsg.textContent = "Incorrect access code!";
    accessCodeInput.focus();
  }
}

// Show top-level folder (images or videos)
function showFolder(folderId) {
  document.getElementById("images").classList.remove('active');
  document.getElementById("videos").classList.remove('active');
  
  // Hide all subfolders
  const allSubfolders = document.querySelectorAll(".subfolder");
  allSubfolders.forEach(folder => folder.classList.remove('active'));
  
  // Hide all nested folders
  const allNestedFolders = document.querySelectorAll(".nested-folder");
  allNestedFolders.forEach(folder => folder.classList.remove('active'));
  
  // Show selected folder
  document.getElementById(folderId).classList.add('active');
}

// Show a specific subfolder
function showSubfolder(folderId, parent) {
  // Hide all subfolders in the same parent
  const subfolders = document.querySelectorAll(`#${parent} .subfolder`);
  subfolders.forEach(folder => folder.classList.remove('active'));
  
  // Hide nested folders in the same parent
  const nested = document.querySelectorAll(`#${parent} .nested-folder`);
  nested.forEach(folder => folder.classList.remove('active'));
  
  // Show selected subfolder
  const target = document.getElementById(folderId);
  if (target) {
    target.classList.add('active');
    loadFolderContent(folderId);
  }
}

// Show a nested folder
function showNestedFolder(folderId) {
  // Hide all nested folders in the same section
  const parentContainer = document.getElementById(folderId).parentElement;
  const nested = parentContainer.querySelectorAll('.nested-folder');
  nested.forEach(folder => folder.classList.remove('active'));
  
  // Show selected nested folder
  const target = document.getElementById(folderId);
  if (target) {
    target.classList.add('active');
    loadFolderContent(folderId);
  }
}

// Load content for a folder
function loadFolderContent(folderId) {
  const galleryContainer = document.getElementById(`gallery-${folderId}`);
  
  // Only load if we haven't loaded this folder before
  if (galleryContainer.getAttribute('data-loaded') !== 'true') {
    const loadingMsg = galleryContainer.querySelector('.loading-msg');
    if (loadingMsg) loadingMsg.style.display = 'none';
    
    const mediaItems = MEDIA_DATA[folderId] || [];
    
    mediaItems.forEach(item => {
      const mediaElement = createMediaElement(item);
      galleryContainer.appendChild(mediaElement);
    });
    
    // Mark folder as loaded
    galleryContainer.setAttribute('data-loaded', 'true');
  }
}

// Create media element based on type
function createMediaElement(item) {
  const mediaItem = document.createElement('div');
  mediaItem.className = 'media-item';
  
  if (item.type === 'image') {
    // Use smaller thumbnail for faster loading
    const img = document.createElement('img');
    img.src = `https://drive.google.com/thumbnail?id=${item.id}&sz=w300`;
    img.alt = item.title || 'Image preview';
    img.className = 'gallery-image';
    img.loading = 'lazy';
    mediaItem.appendChild(img);
  } 
  else if (item.type === 'video') {
    // Use thumbnail instead of iframe for initial load
    const thumb = document.createElement('img');
    thumb.src = `https://drive.google.com/thumbnail?id=${item.id}&sz=w300`;
    thumb.alt = `Video: ${item.title || 'Preview'}`;
    thumb.className = 'video-thumb';
    thumb.dataset.videoId = item.id;
    mediaItem.appendChild(thumb);
  }
  
  // Title
  const title = document.createElement('div');
  title.className = 'media-title';
  title.textContent = item.title || '';
  mediaItem.appendChild(title);
  
  // Download link
  const downloadLink = document.createElement('a');
  downloadLink.href = `https://drive.google.com/uc?export=download&id=${item.id}`;
  downloadLink.textContent = 'Download';
  downloadLink.download = item.title || 'download';
  mediaItem.appendChild(downloadLink);
  
  return mediaItem;
}

// Show video player when thumbnail is clicked
function showVideoPlayer(thumbElement, videoId) {
  const mediaItem = thumbElement.parentElement;
  
  // Replace thumbnail with iframe
  const iframe = document.createElement('iframe');
  iframe.src = `https://drive.google.com/file/d/${videoId}/preview`;
  iframe.width = "100%";
  iframe.height = "300";
  iframe.frameBorder = "0";
  iframe.allowFullscreen = true;
  
  mediaItem.replaceChild(iframe, thumbElement);
}

// Hide everything on Media Gallery title click
function resetView() {
  document.getElementById("images").classList.remove('active');
  document.getElementById("videos").classList.remove('active');
  
  const allSubfolders = document.querySelectorAll(".subfolder");
  allSubfolders.forEach(folder => folder.classList.remove('active'));
  
  const allNestedFolders = document.querySelectorAll(".nested-folder");
  allNestedFolders.forEach(folder => folder.classList.remove('active'));
  
  // Scroll to top
  window.scrollTo(0, 0);
}