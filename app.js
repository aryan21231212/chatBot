let button = document.querySelector("#but");
let search = document.querySelector("textarea")
let chatbox = document.querySelector(".chatbox")
let dir = document.querySelector("#directory")


let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBGENOd_iLgRmOpvabGO1s0H5GXiHumgU8"






async function generateResponse(text, userMessage) {
    let RequestOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [
                {
                    "parts": [{ "text": userMessage }

                    ]
                }]
        })
    }

    let response = await fetch(url, RequestOption);
    let data = await response.json()
    let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    text.innerHTML = apiResponse;
    chatbox.scrollTo({ top: chatbox.scrollHeight, behavior: "smooth" })
}



function usertext() {
    let usertext = document.createElement('div');
    usertext.className = "usertext";
    let image = document.createElement('div');
    image.className = "img";
    usertext.appendChild(image);
    let img = document.createElement('img');
    img.setAttribute('src', "assets/user.png");
    img.setAttribute('class', "ai");
    image.appendChild(img);

    let text = document.createElement('div');
    text.className = "text";
    usertext.appendChild(text);

    let val = search.value
    if (val.trim() === '') {
        alert("Please Enter Valid Input");
        return;
    }

    text.innerHTML = val;
    chatbox.appendChild(usertext);
    let userMessage = search.value;
    search.value = "";
    bottext(userMessage);

}



function bottext(userMessage) {
    let botText = document.createElement('div');
    botText.className = "botText";
    let image = document.createElement('div');
    image.className = "img";
    botText.appendChild(image);
    let img = document.createElement('img');
    img.setAttribute('src', "assets/ai.png");
    img.setAttribute('class', "ai");
    image.appendChild(img);
    let load = document.createElement('img');
    load.setAttribute('src', "assets/caa00d98001e31771fd834fefb4c4b6f.gif")

    let text = document.createElement('div');
    text.className = "text";
    text.appendChild(load);
    botText.appendChild(text);
    chatbox.appendChild(botText);
    generateResponse(text, userMessage);


}
