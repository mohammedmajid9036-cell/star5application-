class VideoViewCounter {
    constructor(videoElement, viewCountElement) {
        this.video = videoElement;
        this.viewCountElement = viewCountElement;
        this.views = 0;
        this.init();
    }

    init() {
        this.video.addEventListener('play', () => this.updateViewCount());
    }

    updateViewCount() {
        this.views++;
        this.viewCountElement.textContent = {thisviews};
    }
}

function initializeViewCounters() {
    document.querySelectorAll('.video-item').forEach(item => {
        const video = item.querySelector('video');
        const viewCountElement = item.querySelector('.view-count');
        new VideoViewCounter(video, viewCountElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeViewCounters();
});
