const dropArea = document.querySelector('.uploadFilesForm');
const input = document.querySelector('input');

input.addEventListener("change", function () {
    uploadImages(this.files)
});

function uploadImages(files) {
    for (let i = 0; i < files.length; i++) {
        if (files[i]) {
            let fr = new FileReader();
            fr.addEventListener("load", function () {
                let image = new Image();
                image.src = fr.result;
                localStorage.setItem(`im${i}`, image.src);
            }, false);
            fr.readAsDataURL(files[i]);
        }
    }
    localStorage.setItem('picturesAmount', files.length);
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.style.borderColor = 'var(--hover-grey)';
    }, false)
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.style.borderColor = 'var(--background-grey)';
    }, false)
});

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files
    handleFiles(files)
}

function handleFiles(files) {
    uploadImages(files)
}

document.querySelector("#gameStartButton").addEventListener("click", () => {
    window.location.href = '/game';
});

document.querySelector("#backButton").addEventListener("click", () => {
    window.location.href = '/';
});
