function click(event) {
    event.preventDefault();
    let f1 = document.getElementsByName("field");
    let f2 = document.getElementsByName("select");
    let r = document.getElementById("result");
    let p = document.getElementById("price");
    if (f1[0].value.match(/^\d+$/) && f1[0].value >= 0) {
      r.innerHTML = "Итоговая сумма: " + f1[0].value * f2[0].value;
      p.innerHTML = "Цена (за голову): " + f2[0].value;
    }
    else {
      alert("Убедитесь в правильности ввода!");
      r.innerHTML = "";
      p.innerHTML = "";
    }
  }

  window.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is Ready");
    let b = document.getElementById("end");
    b.addEventListener("click", click);
  });