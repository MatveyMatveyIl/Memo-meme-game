document.querySelector("input").addEventListener("change", function () {
    for (let i = 0; i < this.files.length; i++) {
        if (this.files[i]) {
            let fr = new FileReader();
            fr.addEventListener("load", function () {
                let image = new Image();
                image.src = fr.result;
                localStorage.setItem(`im${i}`, image.src);
            }, false);
            fr.readAsDataURL(this.files[i]);
        }
    }
});


document.querySelector("#gameStartButton").addEventListener("click", () => {
    window.location.href = '/game';
});
