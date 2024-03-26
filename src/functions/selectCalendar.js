function toggleCalendar() {
  let checkInInput = document.getElementById("checkIn");
  let checkOutInput = document.getElementById("checkOut");
  if (checkInInput.type !== "date") {
    checkInInput.type = "date";
  }
  if (checkOutInput.type !== "date") {
    checkOutInput.type = "date";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("checkIn").addEventListener("click", toggleCalendar);
  document.getElementById("checkOut").addEventListener("click", toggleCalendar);
});
