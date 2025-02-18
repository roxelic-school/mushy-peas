import { changeView, spawnNameRow, removeLastRow, submit, fetchVisit } from './lib/page.js';
import { search } from './lib/calander.js';
import { adminCheck, delete_date, delete_slot, force_slot, reset, restore, view_admin_tokens, remove_token, genAdminLink } from './lib/admin.js';

// build the website, execute
console.log("executing");


// fetch values
fetchVisit();

// event listeners
let elements = {
    "subjectView1": document.getElementById("subjectView1"),
    "subjectView2": document.getElementById("subjectView2"),
    "subjectView3": document.getElementById("subjectView3"),
    "subjectView4": document.getElementById("subjectView4")
}

async function  build(params) {
    switch (window.location.pathname){
        case "/frontends/":
            elements.subjectView1.addEventListener("click", function(){ changeView(0); });
            elements.subjectView2.addEventListener("click", function(){ changeView(1); });
            elements.subjectView3.addEventListener("click", function(){ changeView(2); });
            elements.subjectView4.addEventListener("click", function(){ changeView(3); });
    
    
            document.getElementById("spawnRow").addEventListener("click", spawnNameRow);
            document.getElementById("removeRow").addEventListener("click", removeLastRow);
    
            document.getElementById("submit").addEventListener("click", submit);
    
            // params
            const searchParams = new URLSearchParams(window.location.search);
    
            if (searchParams.has('page')) changeView(searchParams.get('page'));
            else changeView(0);
    
            break;
        case "/frontends/calander/":
            document.getElementById("search").addEventListener("click", search);
    
            break;
    
        case "/frontends/admin/":
            if (await adminCheck()){
                document.getElementById("spawnRow").addEventListener("click", spawnNameRow);
                document.getElementById("removeRow").addEventListener("click", removeLastRow);

                // functions
                document.getElementById("Delete_date_button").addEventListener("click", delete_date);
                document.getElementById("Delete_slot_button").addEventListener("click", delete_slot);
                document.getElementById("Force_slot_button").addEventListener("click", force_slot);
                document.getElementById("Reset_button").addEventListener("click", reset);
                document.getElementById("restore_button").addEventListener("click", restore);
                document.getElementById("list_all_tokens_button").addEventListener("click", view_admin_tokens);
                document.getElementById("Token_remove_button").addEventListener("click", remove_token);
                document.getElementById("gen_admin_button").addEventListener("click", genAdminLink);

            } else {
                document.getElementById("admin_main").innerHTML = "this resource is unavailable to you";
            }
    
            break;
    }   
}

build();