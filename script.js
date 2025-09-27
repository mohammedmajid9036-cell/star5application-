document.addEventListener('DOMContentLoaded', function() {
    // Handle splash screen fade-out
    var splashScreen = document.querySelector('.splash-screen');
    
    // Show splash screen for 5 seconds
    setTimeout(function() {
    splashScreen.style.opacity = '0'; // Start fade out
    setTimeout(function() {
    splashScreen.style.display = 'none'; // Hide splash screen
    }, 500); // Wait for fade out to complete
    }, 5000); // Display the splash screen for 5 seconds
    
    // Add button functionality
    const addButton = document.querySelector('.add-button');
    const popupBox = document.getElementById('popupBox');
    const closeButton = document.getElementById('closeButton');
    const uploadButton = document.getElementById('uploadButton');
    const videoInput = document.getElementById('videoInput');
    
    // Show popup box when Add button is clicked
    addButton.addEventListener('click', function() {
    popupBox.style.display = 'block'; // Show the popup
    });
    
    // Hide popup box when Close button is clicked
    closeButton.addEventListener('click', function() {
    popupBox.style.display = 'none'; // Hide the popup
    });
    
    uploadButton.addEventListener('click', function() {
        if (videoInput.files.length > 0) {
            const file = videoInput.files[0];
            const url = URL.createObjectURL(file);
    
            // Create a new video element to display the uploaded video
            const videoElement = document.createElement('div');
            videoElement.className = 'video-item';
            videoElement.innerHTML = `
                <video controls>
                    <source src="${url}" type="${file.type}">
                    Your browser does not support the video tag.
                </video>
                <h3>${file.name}</h3>
                <p>This is a user-uploaded video.</p>
                <div class="view-counter">
                    <img src="https://pplx-res.cloudinary.com/image/upload/v1742017204/user_uploads/NCEbnenCGWvlpEs/image.jpg" alt="Eye Icon" class="eye-icon">
                    <span class="view-count">0 views</span>
                </div>
            `;
    
            // Append the new video element to the video gallery
            const galleryContainer = document.querySelector('.video-gallery');
            if (galleryContainer) {
                galleryContainer.appendChild(videoElement);
                // Initialize view counters after adding the new video
                initializeViewCounters();
            } else {
                console.error("Video gallery container not found.");
            }
    
            videoInput.value = ''; // Clear the input after uploading
            popupBox.style.display = 'none'; // Hide the popup after uploading
        } else {
            alert("Please select a video file."); // Alert if no file is selected
        }
    });
    
    // Handle search button click on main page
    var searchButton = document.querySelector('.search-button');
    if (searchButton) { // Ensure the search button exists
    searchButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    
    // Show splash effect and navigate to search.html
    var splashEffect = document.getElementById('splashEffect');
    if (splashEffect) {
    splashEffect.style.display = 'block';
    splashEffect.style.backgroundColor = 'rgba(238,178,67,0.9)';
    
    setTimeout(function() {
    splashEffect.style.display = 'none';
    window.location.href = "search.html";
    }, 500);
    }
    });
    }
    
    // Event listener for search input (if applicable)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
    searchInput.addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase();
    
    // Only filter and display videos if there is a query
    if (query.length === 0) {
    document.getElementById('result-container').innerHTML = ''; // Clear results when input is empty
    return; // Exit early if no query
    }
    
    // Filter videos based on title (assuming you have a videoData array)
    const filteredVideos = videoData.filter(video => video.title.toLowerCase().includes(query));
    updateResultContainer(filteredVideos);
    });
    }
    
    // Sample video data (for demonstration purposes)
    const videoData = [
    {
    title: "Sample Video 1",
    thumbnail: "path/to/thumbnail1.jpg", // Replace with a valid image URL
    description: "This is a sample video description.",
    source: "path/to/sample-video1.mp4"
    },
    {
    title: "Sample Video 2",
    thumbnail: "path/to/thumbnail2.jpg", // Replace with a valid image URL
    description: "This is another sample video description.",
    source: "path/to/sample-video2.mp4"
    },
    {
    title: "Sample Video 3",
    thumbnail: "path/to/thumbnail3.jpg", // Replace with a valid image URL
    description: "Yet another sample video description.",
    source: "path/to/sample-video3.mp4"
    }
    ];
    
    // Function to update the result container based on search input
    function updateResultContainer(videos) {
    const container = document.getElementById('result-container');
    container.innerHTML = ''; // Clear previous results
    
    if (videos.length === 0) {
    container.innerHTML = '<p class="no-results">No results found.</p>';
    return;
    }
    
    videos.forEach(video => {
    const videoItem = document.createElement('div');
    videoItem.classList.add('video-item');
    videoItem.innerHTML = `
    <video controls>
    <source src="${video.source}" type="video/mp4">
    Your browser does not support the video tag.
    </video>
    <h3>${video.title}</h3>
    <p>${video.description}</p>
    `;
    container.appendChild(videoItem);
    });}
    
    // Function to handle voice recognition (if applicable)
    const recordButton = document.getElementById('recordButton');
    if (recordButton && 'webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recordButton.addEventListener('click', () => {
    console.log("Microphone button clicked");
    recognition.start();
    });
    
    recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    searchInput.dispatchEvent(new Event('input'));
    };
    
    recognition.onerror = (event) => {
    console.error('Error occurred in recognition:', event.error);
    };
    } else {
    console.warn('Speech recognition not supported in this browser.');
    }
    });
    
    // Function to go back to the previous page
    function goBack() {
    window.history.back();
    }
    
    function goToHistory() {
    window.location.href = 'history.html'; // Navigate to history page
    }
    
    function goToMainPage() {
    window.location.href = 'main.html'; // Redirect to main page
    }
    
    // Global array to store uploaded videos (if needed)
    let uploadedVideos = [];
    
    // Function to render videos on the home page (optional)
    function renderVideoGallery() {
    const galleryContainer = document.querySelector('.video-gallery');
    galleryContainer.innerHTML = '';
    
    uploadedVideos.forEach(video => {
    const videoItem = document.createElement('div');
    videoItem.classList.add('video-item');
    videoItem.innerHTML = `
    <video controls>
    <source src="${video.source}" type="video/mp4">
    Your browser does not support the video tag.
    </video>
    <h3>${video.title}</h3>
    <p>${video.description}</p>
    `;
    galleryContainer.appendChild(videoItem);
    });
    }
    document.addEventListener('DOMContentLoaded', function() {
    
    // Get references to buttons and popup
    const addButton = document.querySelector('.add-button');
    const popupBox = document.getElementById('popupBox');
    const closeButton = document.getElementById('closeButton');
    
    // Show popup box when Add button is clicked
    addButton.addEventListener('click', function() {
    popupBox.style.display = 'block'; // Show the popup
    });
    
    // Hide popup box when Close button is clicked
    closeButton.addEventListener('click', function() {
    popupBox.style.display = 'none'; // Hide the popup
    });
    });
    
    // Global array to store watched videos
    let watchedVideos = [];
    
    // Function to track watched videos
    function trackVideo(videoTitle) {
    if (!watchedVideos.includes(videoTitle)) {
    watchedVideos.push(videoTitle); // Add to history if not already present
    localStorage.setItem('watchedVideos', JSON.stringify(watchedVideos)); // Store in local storage
    }
    }
    
    // Assuming you have a way to play the video, add this line where appropriate
    const videoElements = document.querySelectorAll('video'); // Select all video elements
    videoElements.forEach(videoElement => {
    videoElement.addEventListener('play', function() {
    const fileName = this.querySelector('source').src.split('/').pop(); // Extract file name from source URL
    trackVideo(fileName); // Track the video being played
    });
    });
    // Add this inside your DOMContentLoaded event listener
    const cancelButton = document.getElementById('cancelButton');
    
    if (cancelButton) {
    cancelButton.addEventListener('click', function() {
    popupBox.style.display = 'none'; // Hide the popup
    });
    }
    // Show file input dialog when "Implement Video" is clicked
    document.getElementById('implementVideo').addEventListener('click', function() {
    videoInput.click(); // Trigger the hidden file input click
    });
    
    // Handle video selection
    videoInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
    const url = URL.createObjectURL(file); // Create a URL for the video
    
    // Create a new video element to display the uploaded video
    const videoElement = document.createElement('div');
    videoElement.className = 'video-item';
    videoElement.innerHTML = `
    <video controls>
    <source src="${url}" type="${file.type}">
    Your browser does not support the video tag.
    </video>
    <h3>${file.name}</h3>
    <p>This is a user-uploaded video.</p>
    <div class="view-counter">
        <img src="https://static.thenounproject.com/png/3219961-200.png" alt="Eye Icon" class="eye-icon">
        <span class="view-count">0 views</span>
    </div>
</div>
    `;
    document.addEventListener('DOMContentLoaded', () => {
        const videos = document.querySelectorAll('.video-item');
    
        videos.forEach(videoItem => {
            const video = videoItem.querySelector('video');
            const viewCountElement = videoItem.querySelector('.view-count');
    
            let views = 0;
    
            video.addEventListener('play', () => {
                views++;
                viewCountElement.textContent = {views} ;
            });
        });
    });
    
    // Append the new video element to the video gallery
    const galleryContainer = document.querySelector('.video-gallery'); // Ensure this exists in your HTML
    if (galleryContainer) {
    galleryContainer.appendChild(videoElement);
    } else {
    console.error("Video gallery container not found.");
    }
    
    videoInput.value = ''; // Clear the input after uploading
    popupBox.style.display = 'none'; // Hide the popup after uploading
    } else {
    alert("Please select a video file."); // Alert if no file is selected
    }
    });
    document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button'); // Button to show popup
    const popupBox = document.getElementById('popupBox'); // Your popup box
    const videoInput = document.getElementById('videoInput'); // Hidden file input
    const uploadButton = document.getElementById('uploadButton'); // Button to upload video
    
    // Show popup box when Add button is clicked
    addButton.addEventListener('click', function() {
    popupBox.style.display = 'block'; // Show the popup
    });
    
    // Handle video upload when the upload button is clicked
    uploadButton.addEventListener('click', function() {
    if (videoInput.files.length > 0) {
    const file = videoInput.files[0];
    const url = URL.createObjectURL(file); // Create URL for uploaded video
    
    // Create a new styled video element
    const videoElement = createVideoElement(file.name, url);
    
    // Append the new video element to the video gallery (make sure .video-gallery exists)
    const galleryContainer = document.querySelector('.video-gallery');
    if (galleryContainer) {
    galleryContainer.appendChild(videoElement);
    } else {
    console.error("Video gallery container not found.");
    }
    
    videoInput.value = ''; // Clear input after uploading
    popupBox.style.display = 'none'; // Hide the popup after uploading
    } else {
    alert("Please select a video file."); // Alert if no file is selected
    }
    });
    });
    // Append the new video element to the video gallery
    const galleryContainer = document.querySelector('.video-gallery');
    if (galleryContainer) {
    galleryContainer.appendChild(videoElement);
    } else {
    console.error("Video gallery container not found.");
    }
    
    // Clear the input after uploading
    videoInput.value = '';
    popupBox.style.display = 'none'; // Hide the popup after uploading
    {
    alert("Please select a video file."); // Alert if no file is selected
    }
    ;
    videoInput.addEventListener('change', function(event) {
    console.log("File input changed:", event.target.files); // Log files array
    const file = event.target.files[0]; // Get the selected file
    if (file) {
    console.log("Selected file:", file.name); // Log selected file name
    const url = URL.createObjectURL(file); // Create a URL for the video
    // ... (rest of your code)
    } else {
    alert("Please select a video file."); // Alert if no file is selected
    }
    });document.getElementById('implementVideo').addEventListener('click', function() {
    videoInput.click(); // Trigger the hidden file input click
    });
    uploadButton.addEventListener('click', function() {
    if (videoInput.files.length > 0) {
    const file = videoInput.files[0];
    const url = URL.createObjectURL(file);
    
    // Create a new video element to display the uploaded video
   const videoElement = document.createElement('div');
   videoElement.className = 'video-item';
   videoElement.innerHTML = `
               <video controls class="video-player">
                   <source src="${url}" type="${file.type}">
                   Your browser does not support the video tag.
               </video>
               <h3>${file.name}</h3>
               <p>This is a user-uploaded video.</p>
                <div class="view-counter">
        <img src="https://static.thenounproject.com/png/3219961-200.png" alt="Eye Icon" class="eye-icon">
        <span class="view-count">0 views</span>
    </div>
</div>
           `;
           document.addEventListener('DOMContentLoaded', () => {
            const videos = document.querySelectorAll('.video-item');
        
            videos.forEach(videoItem => {
                const video = videoItem.querySelector('video');
                const viewCountElement = videoItem.querySelector('.view-count');
        
                let views = 0;
        
                video.addEventListener('play', () => {
                    views++;
                    viewCountElement.textContent = {views};
                });
            });
        });

    // Append the new video element to the video gallery
    const galleryContainer = document.querySelector('.video-gallery');
    if (galleryContainer) {
    galleryContainer.appendChild(videoElement);
    } else {
    console.error("Video gallery container not found.");
    }
    
    // Add event listener for the like button
    const likeButton = videoElement.querySelector('.like-button');
    const likeCountDisplay = videoElement.querySelector('.like-count');
    let likeCount = 0;
    
    likeButton.addEventListener('click', function() {
    likeCount++;
    likeCountDisplay.textContent = likeCount;
    });
    
    videoInput.value = ''; // Clear the input after uploading
    popupBox.style.display = 'none'; // Hide the popup after uploading
    } else {
    alert("Please select a video file."); // Alert if no file is selected
    }
    });
    addButton.addEventListener('click', () => {
    popupBox.style.display = 'block'; // Show the popup
    });
    // Hide popup box when Close button is clicked
    closeButton.addEventListener('click', () => {
    popupBox.style.display = 'none'; // Hide the popup
    });
    console.log("Add button clicked");
    console.log("File selected:", file);
    
    // Show popup box when Add button is clicked
    addButton.addEventListener('click', function() {
    popupBox.style.display = 'block'; // Show the popup
    });
    
    // Hide popup box when Close button is clicked
    closeButton.addEventListener('click', function() {
    popupBox.style.display = 'none'; // Hide the popup
    });
    
    document.addEventListener('DOMContentLoaded', function() {
    const loginIcon = document.getElementById('loginIcon'); // User icon
    const photoInput = document.getElementById('photoInput'); // Hidden file input for photo
    const uploadedImage = document.getElementById('uploadedImage'); // Image element to show uploaded photo
    
    // Trigger file input click when user clicks on the login icon
    loginIcon.addEventListener('click', function() {
    photoInput.click(); // Trigger hidden file input click
    });
    
    // Handle photo selection
    photoInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
    const url = URL.createObjectURL(file); // Create a URL for the uploaded image
    uploadedImage.src = url; // Set src to show uploaded image
    uploadedImage.style.display = 'block'; // Make it visible
    } else {
    alert("Please select an image file."); // Alert if no file is selected
    }
    });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button');
    const popupBox = document.getElementById('popupBox');
    const closeButton = document.getElementById('closeButton');
    const videoInput = document.getElementById('videoInput');
    const uploadButton = document.getElementById('uploadButton');
    
    // Show popup box when Add button is clicked
    addButton.addEventListener('click', function() {
    popupBox.style.display = 'block'; // Show the popup
    })
    
    // Hide popup box when Close button is clicked
    closeButton.addEventListener('click', function() {
    popupBox.style.display = 'none'; // Hide the popup
    });
    
    // Handle video upload when the upload button is clicked
    uploadButton.addEventListener('click', function() {
    if (videoInput.files.length > 0) {
    const file = videoInput.files[0];
    const url = URL.createObjectURL(file); // Create URL for uploaded video
    
    // Create a new video element to display the uploaded video
    const videoElement = createVideoElement(file.name, url);
    
    // Append to video gallery
    const galleryContainer = document.querySelector('.video-gallery');
    if (galleryContainer) {
    galleryContainer.appendChild(videoElement);
    } else {
    console.error("Video gallery container not found.");
    }
    
    videoInput.value = ''; // Clear input after uploading
    popupBox.style.display = 'none'; // Hide the popup after uploading
    } else {
    alert("Please select a video file."); // Alert if no file is selected
    }
    });
    });
    document.querySelector('.submit-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Gather input values
    const accountName = document.querySelector('input[placeholder="Account Name"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const accountNumber = document.querySelector('input[placeholder="Account Number For Monetary Transaction"]').value;
    
    // Basic validation
    if (accountName && password && accountNumber) {
    // Store registration status and account details in local storage
    localStorage.setItem('accountName', accountName);
    localStorage.setItem('password', password); // Note: Storing passwords in plain text is not secure.
    localStorage.setItem('accountNumber', accountNumber);
    
    // Redirect to the developer's page or user dashboard
    window.location.href = 'userdashboard.html';
    } else {
    alert("Please fill out all fields.");
    }
    });
    // Function to register a new user
    async function registerUser() {
    const accountName = document.querySelector('input[placeholder="Account Name"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value; // Hash this in a real app
    const accountNumber = document.querySelector('input[placeholder="Account Number For Monetary Transaction"]').value;
    
    if (accountName && password && accountNumber) {
    // Store user details in local storage (for demo purposes)
    localStorage.setItem('accountName', accountName);
    localStorage.setItem('password', password); // Note: Storing passwords in plain text is not secure.
    localStorage.setItem('accountNumber', accountNumber);
    
    alert("Registration successful! You can now log in.");
    window.location.href = 'login.html'; // Redirect to login page
    } else {
    alert("Please fill out all fields.");
    }
    }
    
    // Function to log in an existing user
    function loginUser() {
    const accountName = document.querySelector('input[placeholder="Account Name"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    
    // Retrieve stored credentials
    const storedAccountName = localStorage.getItem('accountName');
    const storedPassword = localStorage.getItem('password');
    
    if (accountName === storedAccountName && password === storedPassword) {
    alert("Login successful!");
    window.location.href = 'developers-dashboard.html'; // Redirect to developer's dashboard
    } else {
    alert("Invalid account name or password. Please try again.");
    }
    }
    
    // Event listeners for registration and login buttons
    document.querySelector('.register-button').addEventListener('click', registerUser);
    document.querySelector('.login-button').addEventListener('click', loginUser);
    
    document.addEventListener('DOMContentLoaded', function() {
        // Existing Code (Splash Screen, Add Button, Search, etc.) ...
    
        // Initialize Ad View Counter (localStorage)
        function initializeAdViewCounter() {
            if (localStorage.getItem('adViews') === null) {
                localStorage.setItem('adViews', '0');
            }
        }
    
        // Increment Ad View Counter
        function incrementAdViewCounter() {
            let adViews = parseInt(localStorage.getItem('adViews')) || 0;
            adViews++;
            localStorage.setItem('adViews', adViews.toString());
        }
    
        // Function to Display Ad (Simulated) - Important: Replace with your actual ad display logic
        function displayAd() {
            // * Replace this with your actual ad display code *
            console.log("Simulated ad displayed!");
            incrementAdViewCounter(); // Increment counter when the ad is "displayed"
            // * Add code to show the ad on your page *
        }
    
        // Call this function wherever you display an ad on your page
        // For example, you might call it after loading a video, or when the page loads
        displayAd();
    
        // Function to update ad views on the user dashboard (user-dashboard.html)
        function updateAdViewsOnDashboard() {
            if (window.location.pathname.includes('user-dashboard.html')) {
                const totalAdViewsElement = document.getElementById('totalAdViews');
                if (totalAdViewsElement) {
                    totalAdViewsElement.textContent = localStorage.getItem('adViews') || '0';
                }
            }
        }
    
        // Call initializeAdViewCounter when the page loads
        initializeAdViewCounter();
    
        // Update ad views on the user dashboard, if the user is on that page
        updateAdViewsOnDashboard();
    
            // Function to register a new user
        async function registerUser() {
        const accountName = document.querySelector('input[placeholder="Account Name"]').value;
        const password = document.querySelector('input[placeholder="Password"]').value; // Hash this in a real app
        const accountNumber = document.querySelector('input[placeholder="Account Number For Monetary Transaction"]').value;
        
        if (accountName && password && accountNumber) {
        // Store user details in local storage (for demo purposes)
        localStorage.setItem('accountName', accountName);
        localStorage.setItem('password', password); // Note: Storing passwords in plain text is not secure.
        localStorage.setItem('accountNumber', accountNumber);
        
        alert("Registration successful! You can now log in.");
        window.location.href = 'login.html'; // Redirect to login page
        } else {
        alert("Please fill out all fields.");
        }
        }
        // Function to log in an existing user
        function loginUser() {
        const accountName = document.querySelector('input[placeholder="Account Name"]').value;
        const password = document.querySelector('input[placeholder="Password"]').value;
        
        // Retrieve stored credentials
        const storedAccountName = localStorage.getItem('accountName');
        const storedPassword = localStorage.getItem('password');
        
        if (accountName === storedAccountName && password === storedPassword) {
        alert("Login successful!");
        window.location.href = 'developers-dashboard.html'; // Redirect to developer's dashboard
        } else {
        alert("Invalid account name or password. Please try again.");
        }
        }
        
        // Event listeners for registration and login buttons
        document.querySelector('.register-button').addEventListener('click', registerUser);
        document.querySelector('.login-button').addEventListener('click', loginUser);
    
    });
    