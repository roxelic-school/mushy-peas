import { loadDays, ChangeMonthLeft, ChangeMonthRight } from "./lib/calander";

// ONLY IMPORT THIS IN THE CALANDER
const searchParams = new URLSearchParams(window.location.search);

document.getElementById("calander-left").addEventListener("click", ChangeMonthLeft);
document.getElementById("calander-right").addEventListener("click", ChangeMonthRight);

if (searchParams.has('date')) loadDays(new Date(searchParams.get('date')));
else loadDays(new Date());