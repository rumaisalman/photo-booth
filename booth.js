// html elements

const camera =
    document.getElementById("camera");

const canvas =
    document.getElementById("canvas");

const countdown =
    document.getElementById("countdown");

const startCameraButton =
    document.getElementById("startCamera");

const takePhotoButton =
    document.getElementById("takePhoto");

const retakeButton =
    document.getElementById("retake");

const downloadButton =
    document.getElementById("download");

const filterButtons =
    document.querySelectorAll(".filter");


// variables

let stream = null;

let selectedFilter = "none";


// start cam

startCameraButton.addEventListener(
    "click",
    async () => {

        try {

            stream =
                await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                });


            camera.srcObject = stream;


            startCameraButton.disabled = true;

            takePhotoButton.disabled = false;

        }

        catch (error) {

            console.error(error);

            alert(
                "Camera access was denied. Please allow camera permission."
            );

        }

    }
);



// take the photo 
takePhotoButton.addEventListener(
    "click",
    async () => {

        takePhotoButton.disabled = true;

        await startCountdown();

        capturePhoto();

    }
);



//count down


function startCountdown() {

    return new Promise((resolve) => {

        let number = 3;


        countdown.textContent = number;


        const timer =
            setInterval(() => {

                number--;


                if (number === 0) {

                    clearInterval(timer);

                    countdown.textContent = "";

                    resolve();

                }

                else {

                    countdown.textContent =
                        number;

                }

            }, 1000);

    });

}


// capture photo

function capturePhoto() {

    const context =
        canvas.getContext("2d");

    canvas.width =
        camera.videoWidth;

    canvas.height =
        camera.videoHeight;

    context.translate(
        canvas.width,
        0
    );

    context.scale(-1, 1);


    context.filter =
        getFilter();


    context.drawImage(
        camera,
        0,
        0,
        canvas.width,
        canvas.height
    );


    context.filter = "none";


    context.setTransform(
        1,
        0,
        0,
        1,
        0,
        0
    );


//  whiet border

    context.lineWidth = 30;

    context.strokeStyle = "white";


    context.strokeRect(
        15,
        15,
        canvas.width - 30,
        canvas.height - 30
    );


 
    camera.style.display = "none";


    canvas.style.display = "block";


    retakeButton.disabled = false;

    downloadButton.disabled = false;

}


// filter func

function getFilter() {

    if (selectedFilter === "grayscale") {

        return "grayscale(100%)";

    }


    if (selectedFilter === "sepia") {

        return "sepia(100%)";

    }


    if (selectedFilter === "bright") {

        return "brightness(130%)";

    }


    if (selectedFilter === "contrast") {

        return "contrast(150%)";

    }


    return "none";

}


// filter buttons

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

        
                filterButtons.forEach(
                    (btn) => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                selectedFilter =
                    button.dataset.filter;

            }
        );

    }
);


// retake

retakeButton.addEventListener(
    "click",
    () => {

        canvas.style.display = "none";

        camera.style.display = "block";


        retakeButton.disabled = true;

        downloadButton.disabled = true;

        takePhotoButton.disabled = false;

    }
);


// download button

downloadButton.addEventListener(
    "click",
    () => {

        const image =
            canvas.toDataURL("image/png");


        const link =
            document.createElement("a");


        link.href = image;

        link.download =
            "my-photo.png";


        link.click();

    }
);