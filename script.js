// JavaScript for Weather and News App

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city.trim()) {
    getWeather(city);
    fetchNews(); // Fetch news on search

    // Make the content visible
    document.getElementById('content').style.display = 'block';
  } else {
    alert("Please enter a valid city name.");
  }
});

// Function to fetch weather data
function getWeather(city) {
  const apiKey = '80ec9c67ee07297f34e7ad312b98748f'; // Replace with your actual API key
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
        updateWeatherMedia(data.weather[0].main.toLowerCase());
      } else {
        alert("City not found. Please try again.");
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Function to display weather data
function displayWeather(data) {
  document.getElementById('weather-condition').textContent = data.weather[0].main;
  document.getElementById('temp').textContent = data.main.temp;
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('wind-speed').textContent = data.wind.speed;
}

// Function to update background video and audio
function updateWeatherMedia(condition) {
  const video = document.getElementById('weather-video');
  const mediaMap = {
    clear: { video: "assets/videos/sunny.mp4" },
    fog: { video: "assets/videos/foggy.mp4" },
    rain: { video: "assets/videos/rain.mp4" },
    snow: { video: "assets/videos/snow.mp4" },
    clouds: { video: "assets/videos/cloudy.mp4" },
    thunderstorm: { video: "assets/videos/thunderstorm.mp4" },
    wind: { video: "assets/videos/wind.mp4" },
  };

  const selectedMedia = mediaMap[condition] || mediaMap["clear"];

  // Log paths to ensure they are being selected
  console.log("Selected video:", selectedMedia.video);

  // Update video source
  if (selectedMedia.video) {
    video.querySelector('source').src = selectedMedia.video;
    video.load();
    video.play();
    video.style.display = 'block'; // Ensure video is visible
    video.volume = 0.3;
  } else {
    video.style.display = 'none'; // Hide video if no source
  }

  // Ensure video continues to play if it has built-in audio (no external audio)
  if (!selectedMedia.audio && video.paused) {
    video.play(); // Resume the video with built-in audio if applicable
  }
}



// Function to fetch latest news
function fetchNews() {
  const apiKey = '4307224e0c4d448e8c51695300834c96'; // Replace with your actual NewsAPI key
  const apiURL = `https://newsapi.org/v2/top-headlines?category=general&language=en&pageSize=5&apiKey=${apiKey}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if (data.status === "ok" && data.articles.length > 0) {
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = ""; // Clear previous news

        data.articles.forEach(article => {
          const newsItem = document.createElement('li');
          newsItem.innerHTML = `
            <strong>${article.title}</strong>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          `;
          newsList.appendChild(newsItem);
        });
      } else {
        alert("No news articles found.");
      }
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
}

// Function to toggle copyright section
function toggleCopyright() {
  const copyright = document.getElementById('copyright-text');
  copyright.style.display = (copyright.style.display === 'none' || copyright.style.display === '')
    ? 'block' : 'none';
}
