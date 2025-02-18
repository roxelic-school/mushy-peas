export async function search() {
    const params = new URLSearchParams();
    params.append("person", document.getElementById("person").value);
    params.append("date", document.getElementById("day").value);

    let url = `http://localhost:3000/api/v1/view?${params.toString()}`

    try {
        let response = await fetch(url);
        let data = await response.json();

        document.getElementById('view-slots').innerHTML = "";

        Object.keys(data.fullContent).forEach(key => {
            buildresult(data.fullContent[key], key);
        });
    } catch (e) {
        console.log(e);
    }
}

function buildresult(data, key){
    let view_slots = document.getElementById('view-slots');

    let newItem = document.createElement("div");
    newItem.className = "wrapper";

    let newResult = document.createElement("div");
    newResult.className = "result"
    newResult.innerText = key;

    let newExpand = document.createElement("div");
    newExpand.className = "expand";
    newExpand.innerText = "+";
    newExpand.addEventListener("click", expand);

    let result_hidden = document.createElement("div");
    result_hidden.className = "result-hidden";

    let hr = document.createElement("hr");
    hr.style.gridColumn = "span 2";
    hr.style.width = "70%";

    data.forEach((item, index) => {
        let hr = document.createElement("hr");
        hr.style.gridColumn = "span 2";
        hr.style.width = "80%";

        let newSlot = document.createElement("div");
        newSlot.textContent = `slot ${index}`;

        if (item[0] != null){
            let hr = document.createElement("hr");
            hr.style.gridColumn = "span 2";
            hr.style.width = "50%";

            let names = document.createElement("div");
            names.textContent = item[0][0].join(", ");
            console.log(item[0]);

            let reason = document.createElement("div");
            reason.textContent = item[0][1];

            names.appendChild(hr);
            names.appendChild(reason);
            newSlot.appendChild(names);
        }

        newSlot.appendChild(hr);
        
        result_hidden.appendChild(newSlot);
    });

    newItem.appendChild(newResult);
    newItem.appendChild(newExpand);
    newItem.appendChild(result_hidden);
    newItem.appendChild(hr);

    view_slots.appendChild(newItem);
}

function expand(event){
    let wrapper = event.currentTarget.parentElement.getElementsByClassName("result-hidden")[0];

    if (event.currentTarget.textContent == "+"){
        event.currentTarget.textContent = "-";
        wrapper.style.height = `${wrapper.scrollHeight}px`;
    } else {
        event.currentTarget.textContent = "+";
        wrapper.style.height = "0px"
    }
}