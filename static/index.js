// Sticky Navbar 

let navBar = document.getElementById('navBar');
let sticky = navBar.offsetTop;


window.onscroll = function () {
    if (window.pageYOffset >= sticky) {
        navBar.classList.add("sticky")
    } else {
        navBar.classList.remove("sticky");
    }
}

// Blog Collapse with heading 

let blogHeading = document.querySelectorAll(".blog>h4");
blogHeading.forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        let clickedHeading = e.target;
        
        e.target.nextElementSibling.classList.toggle("show");
        blogHeading.forEach(item => {
            if (item !== clickedHeading) {
                item.nextElementSibling.classList.remove("show");
            }
            if (item !== clickedHeading) {
                item.firstElementChild.innerHTML = '<i class="fa fa-caret-right"></i>'
            }
            if (item.nextElementSibling.classList.contains('show')) {
                item.style.color = "#00BCD1";
                item.firstElementChild.innerHTML = '<i class="fa fa-caret-down"></i>';


            }
            else {
                item.style.color = "black";
                item.firstElementChild.innerHTML = '<i class="fa fa-caret-right"></i>';
            }

        })


    })
});

// Appointment details in local storage 

// let makeApp = document.getElementById("makeAppointment");
// makeApp.addEventListener('click', (e) => {
//     e.preventDefault();
//     let name = document.getElementById("inputName").value;
//     let phone = document.getElementById("inputPhone").value;
//     let msg = document.getElementById("message").value;
//     let time = document.getElementById("time").value;
//     let date = document.getElementById("date").value;


//     let appointments = localStorage.getItem("Appointments");
//     if (appointments == null) {
//         Appointments = [];
//     }
//     else {
//         Appointments = JSON.parse(appointments);
//     }
//     var myObj = {
//         name: name,
//         mob: phone,
//         message: msg,
//         date: date,
//         time: time
//     }
//     Appointments.push(myObj);
//     localStorage.setItem('Appointments', JSON.stringify(Appointments));
//     // name = "";
//     // phone = "";
//     // msg = "";
//     // time = "";
//     // date = "";

// })

// let showAllAppointmnents = document.getElementById("showAllAppointments");
// showAllAppointmnents.addEventListener("click", (e) => {
//     e.preventDefault();   
//     document.getElementById("modal").style.display = "block";
//     showAppointment();
// });

// function showAppointment() {
//     let str = ``;
//     let appoint = localStorage.getItem("Appointments");
//     let appointArr = JSON.parse(appoint);
//     let tableBody = document.getElementById("tableBody");
//     appointArr.forEach(element => {
//         str = `
//                <tr>
//                     <td>${element.name}</td>
//                     <td>${element.mob}</td>
//                     <td>${element.message}</td>
//                     <td>${element.time}</td>
//                     <td>${element.date}</td>
//                 </tr>`
//         tableBody.innerHTML += str;
//     });
    
// }



// let close = document.getElementById("close");
// close.addEventListener("click",() => {
//     document.getElementById("modal").style.display = "none";
// })

function success(){
    return alert('Your appointment is scheduled for the day. Please be on time');
}

function occupied(){
    return alert('This slot is already appointed to someone else. Try an hour later on the same date or make it work for some another day. Sorry for the misconvenience. Have a Good Day!');
}

function query(){
    return alert("You've successfully submitted your query. Thankyou")
}

function stepout(){
    return alert("You'll be logged out from this session")

}

function unameexists(){
    return alert("This username already exists! Try another username")
}

function loggedin(){
    return alert("You've logged in successfully")
}

function invalidcredentials(){
    return alert("Invalid username and password credentials")
}










