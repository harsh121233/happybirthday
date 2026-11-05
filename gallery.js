const mediaGrid = document.getElementById("mediaGrid");
const gridStyles = getComputedStyle(mediaGrid);
const gridRowHeight = parseFloat(gridStyles.gridAutoRows);

const backgroundMusic = document.getElementById("backgroundMusic");

function resumeBackgroundMusic() {
    const savedTime = Number(sessionStorage.getItem("backgroundMusicTime")) || 0;
    if (Number.isFinite(backgroundMusic.duration) && backgroundMusic.duration > 0) {
        backgroundMusic.currentTime = savedTime % backgroundMusic.duration;
    }

    backgroundMusic.play().catch((error) => {
        console.error("Background music could not be resumed:", error);
    });
}

backgroundMusic.addEventListener("timeupdate", () => {
    sessionStorage.setItem("backgroundMusicTime", String(backgroundMusic.currentTime));
});
backgroundMusic.addEventListener("loadedmetadata", resumeBackgroundMusic, { once: true });
if (backgroundMusic.readyState >= 1) {
    resumeBackgroundMusic();
}

function sizeGalleryCards() {
    const styles = getComputedStyle(mediaGrid);
    const rowGap = parseFloat(styles.rowGap);

    mediaGrid.querySelectorAll(".media-card").forEach((card) => {
        const media = card.querySelector("img, video");
        const mediaWidth = media.tagName === "IMG"
            ? media.naturalWidth
            : media.videoWidth || Number(media.getAttribute("width"));
        const mediaHeight = media.tagName === "IMG"
            ? media.naturalHeight
            : media.videoHeight || Number(media.getAttribute("height"));

        if (!mediaWidth || !mediaHeight || !card.clientWidth) {
            return;
        }

        const renderedHeight = card.clientWidth * mediaHeight / mediaWidth;
        const rowSpan = Math.ceil((renderedHeight + rowGap) / (gridRowHeight + rowGap));
        card.style.gridRowEnd = `span ${rowSpan}`;
    });
}

mediaGrid.querySelectorAll("img, video").forEach((media) => {
    const eventName = media.tagName === "IMG" ? "load" : "loadedmetadata";
    media.addEventListener(eventName, sizeGalleryCards);
});

let resizeTimeout;
window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(sizeGalleryCards, 100);
});

sizeGalleryCards();
