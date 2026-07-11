const timeField = document.getElementById("timeField");

if (timeField) {
  timeField.value = new Date().toISOString();
}
