function clickOK(event) {
    event.preventDefault();
    let f = document.getElementsByName("field");
    let r = document.getElementById("result");
    let s = document.getElementsByName("select");
    if (f[0].value.match(/^\d+$/) && f[0].value >= 0) {
        r.innerHTML = "Цена (за голову): " + s[0].value + "\nитоговая сумма: "
        + f[0].value * s[0].value;
    } else {
        alert("Убедитесь в правильности ввода");
        r.innerHTML = "";
    }
}

window.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is Ready");
    let b = document.getElementById("end");
    b.addEventListener("click", clickOK);
});