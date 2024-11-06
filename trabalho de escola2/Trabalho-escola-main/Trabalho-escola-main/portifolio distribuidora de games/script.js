document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

   
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

   
    const videoSearchButton = document.getElementById('video-search-button');
    const keywordInput = document.getElementById('keyword');
    const videoContainer = document.getElementById('video-container');

    videoSearchButton.addEventListener('click', async () => {
        const keyword = keywordInput.value.trim();
        if (keyword) {
            const apiKey = 'SUA_API_KEY'; 
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(keyword)}&key=${apiKey}`);
            const data = await response.json();
            videoContainer.innerHTML = '';

            if (data.items && data.items.length > 0) {
                videoContainer.style.display = 'block';
                data.items.forEach(item => {
                    const videoId = item.id.videoId;
                    const videoElement = document.createElement('iframe');
                    videoElement.src = `https://www.youtube.com/embed/${videoId}`;
                    videoElement.width = '560';
                    videoElement.height = '315';
                    videoElement.allowFullscreen = true;
                    videoContainer.appendChild(videoElement);
                });
            } else {
                videoContainer.innerHTML = '<p>Nenhum vídeo encontrado.</p>';
                videoContainer.style.display = 'block';
            }
        }
    });
});
