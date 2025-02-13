import { grabSlots } from "./lib/slots";

// console.log(grabSlots());

async function submit() {
    let users = document.getElementById("names").value.replace(" ","").split(",");
    let reason = document.getElementById("reason").value;
    let slots = grabSlots();
    let date = document.getElementById("selected_date").textContent;

    const formattedData = {
        users: users,
        slots,
        reason,
        date
    };

    console.log(formattedData.users);

    if (confirm(`would you like the following to be requested:
            date = ${date}
            users = ${users.join(" | ")}
            reason = ${reason}
            slots = ${slots.join(",")}
        `)) try {
        const response = await fetch("/api/v1/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: formattedData })
        });

        const result = await response.json();
        let message = ""
        if (result.one == false) message = `${message}\n a user has already requested all of their slots`
        if (result.two == false) message = `${message}\n a requested slot has already been taken`
        
        if (message == "") message = "succefully requested the slots\n" + JSON.stringify(result);
        alert(message);
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending the request.");
    }
}

document.getElementById("submitPost").addEventListener("click", submit);