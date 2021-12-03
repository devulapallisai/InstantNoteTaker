shownotes();
//Here shownotes() is placed because just after reloading the page we want our added notes or if any to be appeared in the same time.
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let notesObj;
    let addtext = document.getElementById("addtext");
    let addtitle = document.getElementById("addtitle");
    let markornot = document.getElementById("flexCheckDefault");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        //JSON.parse to convert string which is in localstorage(in form of string) into objects and storing those objects in the notesObj
    }
    if (addtext.value != "" && addtitle.value != "") {
        notesObj.push(addtitle.value);
        notesObj.push(addtext.value);
        //pushing text and titles in the notesObj
        //here converting object to string and storing in localstorage because localstorage can store only those strings do we use JSON.stringify() here
        if (markornot.checked == true) {
            notesObj.push(1);
        } else {
            notesObj.push(0);
        }
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addtext.value = "";
        addtitle.value = "";
        markornot.checked=false;
    }
    else alert('Please do enter NON-EMPTY title and text so that you can search it later with that text and title.');
    shownotes();
})
// for adding notes and title using click and .value() and after clicking the addnote making it return to the same placeholder "Add your text here" and storing it in local storage (the added notes and its title)
function shownotes() {
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes == null) {
        notesObj = [];
        //If we start from scratch and we try our first note addition then we will be starting with none stored in localstorage and so notes==null so we get length of notesObj as 0
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    // html+= because we also want to store the previous added notes so we use html+= which is string method to concat the further string and we use ${} notation to make values inserted at tha place of ${} whenever required and the card is taken from the Bootstrap with image ... deleted 
    for (let i = 0; i < notesObj.length; i += 3) {
        if (notesObj[i + 2] == 0) {
            html += `<div class="card Notecard mx-2 my-2">
        <div class="card-body">
        <h5 class="card-title">${notesObj[i]}</h5>
        <pre class="card-text" style="overflow-x:hidden;">${notesObj[i + 1]}</pre>
        <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>`
        }
        else {
            html += `<div class="card Notecard mx-2 my-2" style="background-color:rgb(245, 122, 122);
            ;color:white">
        <div class="card-body">
        <h5 class="card-title">${notesObj[i]}</h5>
        <pre class="card-text" style="overflow-x:hidden;">${notesObj[i + 1]}</pre>
        <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>`
        }
        //Here we are using ${i} because we want to pass this index i of that corresponsing object's element to the function deleteNote which we call later which is responsible for deleting the note after you click the 'Delete Note'. The function actually takes this index 'i' as argument and delete corresponding note  
    };
    // Here this for loop is for giving the alternate values of text and title which we have stored alternatively in the previous and we are storing local storage value as object in the notesObj because we don't want to loose the added text file on reloading so we store them in the localstorage and then we will be storing them in notesobj as an object.
    let noteselem = document.getElementById('notes');
    if (notesObj.length != 0) {
        // If the notes is not null then we must have inserted something in it and 
        noteselem.innerHTML = html;
    }
    else noteselem.innerHTML = ` <div class="card" id="Note">
    <div class="card-body">
    <h5 class="card-title">You have no note added.</h5>
    <pre class="card-text" style="overflow:hidden;">Please click the following button to try your first note. Just add title and text you want and press the button Add note to save your first note or else click the following button to start with you first note.</pre>
    <a href="#" class="btn btn-primary">Get Started</a>
    </div>
    </div>`
}
// document.getElementById('Note').style.alignContent="center";
// for showingNotes i.e displaying newly added notes snd restoing the previously added notes at the same time in the webpage using shownotes()
function deleteNote(id) {
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // Here we are using splice(id,2) which deletes two array elements from index id.The two elements because one for the title and the other-one for the text inside the title(we have stored both in the notesObj one after the other so).
    notesObj.splice(id, 3);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}
// Delete function for deleting the text after clicking Delete Note 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value;
    //Grabbing the value of search using "input" event which fires on writing in search bar
    let str = new RegExp(inputVal, "i");
    //using regular expressions in javascript to modify search so that it works for cse-insensitive too
    let noteCards = document.getElementsByClassName('Notecard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("pre")[0].innerText;
        let cardhTxt = element.getElementsByTagName("h5")[0].innerText;
        if (str.exec(cardTxt) || str.exec(cardhTxt)) {
            element.style.display = "block";
        }
        //If we have that search value may be case insensitive too in somewhere in text or title we display it or else we just clear the visibility of them for the input event on fire
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
