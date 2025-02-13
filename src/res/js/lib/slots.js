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