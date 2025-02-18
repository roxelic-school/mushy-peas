export function changeView(selected, element){
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", selected);
    window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);

    let elements = [
        document.getElementById("subjectView1"),
        document.getElementById("subjectView2"),
        document.getElementById("subjectView3"),
        document.getElementById("subjectView4")
    ]

    let pageView = [
        document.getElementById("page1"),
        document.getElementById("page2"),
        document.getElementById("page3"),
        document.getElementById("page4")
    ]

    pageView.forEach((item, index) => {
        if (selected != index) {
            item.style.display = "none";
            elements[index].style.backgroundColor = "";
        }
        else {
            item.style.display = "block";
            elements[index].style.backgroundColor = "var(--tri-color)";
        }
    });
}

export async function fetchVisit() {
    try {
        let result = await fetch('/api/v1');
        let data = await result.json();
        let visit = document.getElementById("visit-count")
        visit.innerHTML += data.hi;
    } catch (e) {
        console.log(e);
    }
}

export function spawnNameRow(){
    let rows = document.getElementById("rows");

    let newInput = document.createElement("input");
    rows.appendChild(newInput);
}

export function removeLastRow(){
    let rows = document.getElementById("rows");

    rows.lastChild.remove();
}

// submit

function getDay(){
    let selectedDate = document.getElementById("selected_date");

    return selectedDate.textContent;
}

export function grabSlots(){
    let slots = {
        "1": document.getElementById("slot-1"),
        "2": document.getElementById("slot-2"),
        "3": document.getElementById("slot-3"),
        "4": document.getElementById("slot-4"),
        "5": document.getElementById("slot-5"),
        "6": document.getElementById("slot-6"),
        "7": document.getElementById("slot-7")
    }

    let slotCount = [];

    for (const key in slots){
        slotCount.push(slots[key].checked ? 1: 0);
    }

    return slotCount;
}

function getReason(){
    return document.getElementById("reason").value;
}

function GetUsers(){
    let rows = document.getElementById("rows");
    let users = [];

    for (const child of rows.children) {
        let value = child.value;
        users.push(value.toLowerCase().replace(" ", ""));
    }
    
    return users
}

export async function submit() {
    let warning = document.getElementById("warning");

    let compressedData = {
        "users": GetUsers(),
        "slots": grabSlots(),
        "reason": getReason(),
        "date": getDay()
    }

    try {
        const response = await fetch("/api/v1/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: compressedData })
        });

        const result = await response.json();
        let message = ""
        if (result.one == false) message = `${message}\n a user has already requested all of their slots`
        if (result.two == false) message = `${message}\n a requested slot has already been taken`
        
        if (message == "") message = "succefully requested the slots";
        warning.textContent = message;
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending the request.");
    }
}