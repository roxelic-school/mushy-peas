import { changeView, spawnNameRow, removeLastRow, submit, fetchVisit } from './lib/page.js';
import { search } from './lib/calander.js';
// build the website, execute

// fetch values
fetchVisit();

// event listeners
let elements = {
    "subjectView1": document.getElementById("subjectView1"),
    "subjectView2": document.getElementById("subjectView2"),
    "subjectView3": document.getElementById("subjectView3"),
    "subjectView4": document.getElementById("subjectView4")
}

switch (window.location.pathname){
    case "/":
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
    case "/calander":
        document.getElementById("search").addEventListener("click", search);

        break;
}