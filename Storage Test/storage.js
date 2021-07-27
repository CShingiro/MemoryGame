"use strict"

const $ = selector => document.querySelector(selector);
var current_data;

document.addEventListener("DOMContentLoaded", () => {
$("#save").addEventListener("click", saveData);
$("#restore").addEventListener("click", loadData);
$("#clear").addEventListener("click", resetForms);
});

function saveData() {
	current_data = $("#input").value;
	sessionStorage.testData = current_data;
}

function loadData() {
	current_data = sessionStorage.getItem("testData");
	$("#output").value = current_data;
}
function resetForms() {
	$("#output").value = "";
	$("#input").value = "";
	$("#input").focus;
}