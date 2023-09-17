import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";
import { getDatabase, set, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js";


const auth = getAuth();
const database = getDatabase();
let signUp = document.getElementById('SignUp');
let gotologin = document.getElementById('gotologin');

//  show and hide
let passwordforicon = document.getElementById('password');
let icon = document.getElementById('icon');
if (icon) {
    icon.addEventListener('click', () => {
        if (passwordforicon.type == "password") {
            passwordforicon.type = "text";
        } else {
            passwordforicon.type = "password";
        }
    });
}

// User creat
if (signUp) {
    signUp.addEventListener('click', () => {
        let fname = document.getElementById('firstname').value;
        let lname = document.getElementById('lastName').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let repeatpassword = document.getElementById('repeatpassword').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((resolve) => {

                // Signed in 
                const user = resolve.user;          //userCredential.user
                // alert('User Created!');         
                swal("Successful!", "User has created!", "success");
               const userId = auth.currentUser.uid;
                set(ref(database, 'users/' + userId + "(" + fname + ") "), {
                    fname: fname,
                    lname: lname,
                    email: email,
                    admin: true,
                    // password: password 
                })
                document.getElementById('firstname').value = "";
                document.getElementById('lastName').value = "";
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";
                document.getElementById('repeatpassword').value = "";
            })
            .catch((reject) => {
                // const errorCode = reject.code;
                const errorMessage = reject.message;
                alert(errorMessage);
                // ..
            });
    })
}

if (gotologin) {
    gotologin.addEventListener('click', () => {
        window.location.href = "index2.html";
    })
}


function dashboard() {
    window.location.href = "Crud_for_class_detail.html";
}

//  User login
let LoginToAccount = document.getElementById('LoginToAccount');
if (LoginToAccount) {
    LoginToAccount.addEventListener('click', () => {
        let l_email = document.getElementById('l-email').value;
        let l_password = document.getElementById('l-password').value;
        signInWithEmailAndPassword(auth, l_email, l_password)
            .then((resolve) => {
                let adminID;
                if (l_email === "misbahkanwal@gmail.com" || adminID === "B05C6coZmUPAldhLMei3Nc0fG9q2") {
                    // alert("hello admin");
                    alert("Hii Admin!" + "\n" + "Successfull login as an Admin!");
                    window.location.href = "admin.html";
                } else {

                    alert("Hii Student!" + "\n" + " Successfull login as a Student!");
                    dashboard();
                }

            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }
    )
}


//show alerts

let selectedrow = null;
function showalert(msg, className) {
    let div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(msg));
    let container = document.querySelector(".container");
    let main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => {
        document.querySelector(".alert").remove();
    }, 3000);
}

// Back to login button

let BackToLogin = document.getElementById('BackToLogin');
if (BackToLogin) {
    BackToLogin.addEventListener('click', () => {
        window.location.href = "index2.html";
    })
}

//Signout 
let SignOut = document.getElementById('SignOut');
if (SignOut) {
    SignOut.addEventListener('click', () => {
        signOut(auth).then(() => {
            alert('Signout!');
            window.location.href = "index.html";
        }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        })
    });
}

//Student Enrollment 
let stdformbtn = document.getElementById('stdformbtn');
if(stdformbtn) {
    stdformbtn.addEventListener('click', () => {
        let stdFname = document.getElementById('stdFname').value;
        let stdLname = document.getElementById('stdLname').value;
        let stdRoll = document.getElementById('stdRoll').value;
        let stdNo = document.getElementById('stdNo').value;
        let coursename = document.getElementById('coursename').value;

        // const user = userCredential.user;
        const uniqueId = auth.currentUser.uid;
       update(ref(database, 'Enrolled Students/' + stdRoll), {
            stdFname: stdFname,
            stdLname: stdLname,
            stdRoll: stdRoll,
            stdNo: stdNo,
            coursename: coursename
        });
        // console.log(uniqueId.rollNo);
        document.getElementById('stdFname').value = "";
        document.getElementById('stdLname').value = "";
        document.getElementById('stdRoll').value = "";
        document.getElementById('stdNo').value = "";
        document.getElementById('coursename').value = "";

        //show alerts
        function showalert(msg, className) {
            let div = document.createElement('div');
            div.className = `alert alert-${className}`;

            div.appendChild(document.createTextNode(msg));
            let container = document.querySelector("#studentformContainer");
            let main = document.querySelector(".mainContainer");
            main.insertBefore(div, container);
            setTimeout(() => {
                document.querySelector(".alert").remove();
            }, 3000);
        };
        showalert("Student has Enrolled ", "danger");
        // window.location.href = "attendence.html";

    })

}

// Admin details for enrolled students
let addDataButton = document.getElementById('addDataButton');
if (addDataButton) {
    addDataButton.addEventListener('click', () => {
        let srollNo = document.getElementById('srollNo').value;
        let batchNumber = document.getElementById('batchNumber').value;
        let courseName = document.getElementById('courseName').value;
        let sectionName = document.getElementById('sectionName').value;
        let classtiming = document.getElementById('classtiming').value;
        let schedule = document.getElementById('schedule').value;
        let teacherName = document.getElementById('teacherName').value;

        update(ref(database, 'Enrolled Students/' + srollNo), {
            batchNumber: batchNumber,
            courseName: courseName,
            sectionName: sectionName,
            classtiming: classtiming,
            schedule: schedule,
            teacherName: teacherName
        });

        //
        document.getElementById('srollNo').value = "";
        document.getElementById('batchNumber').value = "";
        document.getElementById('courseName').value = "";
        document.getElementById('sectionName').value = "";
        document.getElementById('classtiming').value = "";
        document.getElementById('schedule').value = "";
        document.getElementById('teacherName').value = "";


        // //show alerts

        // function showalert(msg, className) {
        //     let div = document.createElement('div');
        //     div.className = `alert alert-${className}`;
        //     div.appendChild(document.createTextNode(msg));
        //     let container = document.querySelector(".adminmain");
        //     let main = document.querySelector(".admincontainer");
        //     main.insertBefore(div, container);
        //     setTimeout(() => {
        //         document.querySelector(".alert").remove();
        //     }, 3000);
        // };

        // showalert("admin details has submitted", "danger");
        swal("Admin!", "Admin has successfully added information for Enrolled student!", "success");
    })
}



//attendence mark
let markedbtn = document.getElementById('markedbtn');
if (markedbtn) {
    markedbtn.addEventListener('click', () => {
        let markrollNo = document.getElementById('markrollNo').value;
        let markAttendence = document.getElementById('markAttendence').value;
        update(ref(database, 'Marked attendence/'  + "Roll No" + markrollNo), {
            markAttendence: markAttendence
        });
        // alert('Attendence has submitted');
        document.getElementById('markrollNo').value = "";
        document.getElementById('markAttendence').value = "";

        swal("Successful!", "attendence has submitted!", "success");

    });
}
