export async function adminCheck() {
    try {
        let response = await fetch('/api/v1/admin/check');
        let data = await response.json();

        return data.status;
    } catch (e) {
        return false;
    }
}

export async function delete_date() {
    let Delete_date_text = document.getElementById("Delete_date_text");

    let data = parseData("delete_date", Delete_date_text.value);

    postData(data);
}

export async function delete_slot() {
    let Delete_slot_date_text = document.getElementById("Delete_slot_date_text");
    let Delete_slot_index_text = document.getElementById("Delete_slot_index_text");
    
    let data = parseData("delete_slot", Delete_slot_date_text.value, Delete_slot_index_text.value);

    postData(data);
}

export async function force_slot() {
    let rows = document.getElementById("rows");
    let users = [];
    
    for (const child of rows.children) {
        let value = child.value;
        users.push(value.toLowerCase().replace(" ", ""));
    }

    let Force_slot_date_text = document.getElementById("Force_slot_date_text");
    let Force_slot_index_text = document.getElementById("Force_slot_index_text");
    let Force_slot_reason = document.getElementById("Force_slot_reason");

    let data = parseData("force_slot", Force_slot_date_text.value, Force_slot_index_text.value, [[users, Force_slot_reason.value]]);

    postData(data);
}

export async function reset() {
    let data = parseData("reset");

    postData(data);
}

export async function restore() {
    let data = parseData("restore");

    postData(data);
}

export async function remove_token() {
    let Token_remove_text = document.getElementById("Token_remove_text");

    let data = parseData("remove_token", null, null, Token_remove_text.value);

    postData(data);
}

export async function view_admin_tokens() {
    let token_list = document.getElementById("Token_list");
    token_list.textContent = "";
    
    let data = parseData("view_admin_tokens");

    try {
        let response = await fetch("/api/v1/admin/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = (await response.json()).tokens;

        for (const key in result){
            if (result[key]){
                token_list.innerHTML += `<br> ${key}`;
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }

}

function parseData(option=null, date=null, index=null, content=null){
    let text = {};

    if (option != null) text.option = option;
    if (date != null) text.date = date;
    if (index != null) text.index = index;
    if (content != null) text.content = content;

    return text;
}

async function postData(data){
    try {
        let response = await fetch("/api/v1/admin/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        document.getElementById("result").textContent = (await response.json()).message;
    } catch (error) {
        console.error("Error:", error);
    }
}