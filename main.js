//https://teachablemachine.withgoogle.com/models/4SUhD0AJz/
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera")

function modelLoaded(){
console.log('Model Loaded!');
}

function take_snapshot(){
Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '"/>';

});
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4SUhD0AJz/model.json', modelLoaded);

function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        max_score = 0;
        current_label = "";
        for (i = 0; i < results.length; i++) {
            if (results[i].confidence > max_score) {
                max_score = results[i].confidence;
                current_label = results[i].label;
            }
        }
        if (current_label == "Thumbs Up") {
            document.getElementById("update_gesture").innerHTML = '&#128077';
        } else if(current_label == "Peace"){
            document.getElementById("update_gesture").innerHTML = '&#9996';
        } else if(current_label == "Point"){
            document.getElementById("update_gesture").innerHTML = '&#128070';
        } else if(current_label == "Ok"){
            document.getElementById("update_gesture").innerHTML = '&#128076';
        } else if(current_label == "Split"){
            document.getElementById("update_gesture").innerHTML = '&#128400';
        } 
    }
}