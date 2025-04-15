const form = document.getElementById("form");
const user = document.getElementById("username");
const pass = document.getElementById("password");
const email = document.getElementById("email");
const select = document.getElementById("semester");
const comp102 = document.getElementById("c102");
const comp106 = document.getElementById("c206");
const math101 = document.getElementById("m101");
const outputcontainer = document.getElementById("outputcontainer");
const uL = document.querySelector('label[for="username"]');
const pL = document.querySelector('label[for="password"]');
const eL = document.querySelector('label[for="email"]');
const sL = document.querySelector('label[for="semester"]');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validatesubmit()) {
        display();
    }
});
user.addEventListener("input", () => {
    uL.style.color = checkUser() ? "black" : "red";
});
pass.addEventListener("input", () => {
    pL.style.color = checkPass() ? "black" : "red";
});
email.addEventListener("input", () => {
    eL.style.color = checkEmail() ? "black" : "red";
});
select.addEventListener("change", () => {
    sL.style.color = checkSems() ? "black" : "red";
    comp106.disabled = select.value === "" ? true : false;
});
function checkUser() {
    return user.value.trim() !== "" && user.value.length >= 6 && user.value.length <= 12;
}
function checkPass() {
    return pass.value.length >= 6 && /[a-z]/.test(pass.value) && /[A-Z]/.test(pass.value);
}
function checkEmail() {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value);
}
function checkSems() {
    return select.value !== "";
}
function validatesubmit() {
    return checkUser() && checkPass() && checkEmail() && checkSems();
}
function display() {
    const textarea = document.createElement("textarea");
    const u = user.value;
    const s = select.options[select.selectedIndex].text;
    let arr = [];
    if (comp102.checked)
        arr.push("Comp 102");
    if (comp106.checked)
        arr.push("Comp 206");
    if (math101.checked)
        arr.push("Math 101");
    textarea.value = `Username: ${u}\nSemester: ${s}\nCourses Taken: ${arr.join(", ")}`;
    textarea.id = "text";
    outputcontainer.innerHTML = "";
    outputcontainer.appendChild(textarea);
    textarea.addEventListener("click", confirmForm);
    textarea.addEventListener("mouseover", confirmForm);
}
function confirmForm() {
    const confirmed = confirm("Are you sure you want to submit the form?");
    if (confirmed) {
        const Newindow = window.open("", "_blank", "height=400,width=600");
        if (Newindow) {
            Newindow.document.body.innerHTML = '<h1 id="thankyou">Thank you for registration</h1>';
            const message = Newindow.document.getElementById("thankyou");
            let isRed = true;
            let size = 20;
            setInterval(() => {
                if (message) {
                    message.style.color = isRed ? "red" : "blue";
                    message.style.fontSize = `${size}px`;
                }
                isRed = !isRed;
                size = size === 20 ? 24 : 20;
            }, 500);
        }
    }
}
