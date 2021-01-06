var modal = document.getElementById("my__popup");
var btn = document.getElementById("btn_modal_window");
var span = document.getElementsByClassName("popup__inner_close")[0];


btn.onclick = function () {
	modal.style.margin = "0px", modal.style.transition = "all .9s";
}

span.onclick = function () {
	modal.style.margin = "4000px 0 0 0", modal.style.transition = ".3s";
}

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.margin = "-4000px 0 0 0", modal.style.transition = ".3s";
	}
}
