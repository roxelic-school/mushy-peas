async function grab() {
    let date = document.getElementById("date").value;
    let name = document.getElementById("name").value;

    try {
        let response = await fetch(`/api/v1/view?day=${date}&person=${name}`);
        let data = await response.json();

        buildCalander(data);
    } catch (e) {
        console.log(e);
    }
}

function buildCalander(data){
    let hub = document.getElementById("hub");
    hub.innerHTML = "";
    let newdata = data.fullContent;
    for (const key in newdata){
        let hr = document.createElement("hr");
        hub.appendChild(hr);

        let dateDiv = document.createElement("div");
        let dateText = document.createElement("p");

        dateText.textContent = `${key}:`;
        dateDiv.appendChild(dateText);

        hub.appendChild(dateDiv);
        newdata[key].forEach(item => {
            if (item[0] != null){
                let nameDiv = document.createElement("div");
                let nameText = document.createElement("p");
                nameText.textContent = item[0][0].join(",");

                nameDiv.appendChild(nameText);
                hub.appendChild(nameDiv);
            } else {
                let nameDiv = document.createElement("div");
                let nameText = document.createElement("p");
                nameText.textContent = "free";

                nameDiv.appendChild(nameText);
                hub.appendChild(nameDiv);
            }
        });
        // document.createElement("div")
    }
}

document.getElementById("search").addEventListener("click", grab);