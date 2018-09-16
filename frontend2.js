"use strict";

window.addEventListener("DOMContentLoaded", initFrontend);

function initFrontend() {
    console.log("Frontend is running");

    // register buttons for sort
    document.querySelector("button#sort_first").addEventListener("click", clickedSortFirstname);
    document.querySelector("button#sort_last").addEventListener("click", clickedSortLastname);
    //document.querySelector("button#sort_house").addEventListener("click", clickedSortHouse);

    // register buttons for filters
    //    document.querySelectorAll("#filters a").forEach( function(element) { element.addEventListener("click", clickedFilter); } );
    //document.querySelectorAll("#filters a").forEach(element => element.addEventListener("click", clickedFilter));

    // register table clicks
    document.querySelector("section.studentlist").addEventListener("click", clickedTable);
}

function clickedTable(event) {
    //    console.log("clicked table");
    //    console.log(event.target);

    const clicked = event.target;
    //    console.log(clicked.tagName);
    if (clicked.tagName.toLowerCase() === "button") {
        // NOTE: When we have more buttons, check which kind was clicked (on class or something)
        clickedDelete(clicked);
    }
}

function clickedDelete(deleteButton) {
    //    console.log(deleteButton);
    // find the parent <tr> that has this deleteButton inside it
    let div = deleteButton.parentElement;
    while (div.tagName !== "DIV") {
        div = div.parentElement;
    }

    // find the studentId
    const studentId = div.dataset.studentId;
    console.log(studentId);

    deleteStudent(studentId);

    // animate the <tr> out
    animateDelete(div);
    // remove that <tr>
    //tr.remove();
}

function animateDelete(div) {
    div.style.transform = "translateX(-105%)";
    div.style.transition = "transform 1s";

    // tr.classList.add("fly-out");
    const rect = div.getBoundingClientRect();

    div.addEventListener("transitionend", function () {

        // find the nextSibling (the tr below this)
        let nextSibling = div.nextElementSibling;

        if (nextSibling !== null) {

            nextSibling.addEventListener("transitionend", function () {
                console.log("transition end");

                // reset all the translateY!
                let nextDiv = div.nextElementSibling;
                while (nextDiv !== null) {
                    nextDiv.style.transform = "translateY(0)";
                    nextDiv.style.transition = "transform 0s";

                    nextDiv = nextDiv.nextElementSibling;
                }

                // remove that <tr>
                div.remove();

            });

            while (nextSibling !== null) {
                nextSibling.style.transform = "translateY(-" + rect.height + "px)";
                nextSibling.style.transition = "transform 0.5s";

                nextSibling = nextSibling.nextElementSibling;
            }
        } else {
            // no next sibling - just remove!
            div.remove();
        }
    });

}

function clickedSortFirstname() {
    console.log("clickedSortFirstname");
    sortByFirstName();
    displayList(currentStudents);
}

function clickedSortLastname() {
    console.log("clickedSortLastname");
    sortByLastName();
    displayList(currentStudents);
}

function displayList(listOfStudents) {
    console.log("Display list");
    // clear the table
    document.querySelector("section.studentlist").innerHTML = "";

    // foreach student in listOfStudents
    listOfStudents.forEach(function (student) {
        // clone a table-row for student
        const clone = document.querySelector("#student_template").content.cloneNode(true);

        // fill in the clone with data
        clone.querySelector("[data-fullname]").textContent = student.firstName + student.middleName + student.lastName;
        //clone.querySelector("[data-details]").textContent = student.lastName;

        // add the studentId to the <tr>
        clone.querySelector("div").dataset.studentId = student.id;

        // append clone to table
        document.querySelector("section.studentlist").appendChild(clone);
    })

}
