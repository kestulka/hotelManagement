document.addEventListener("DOMContentLoaded", async () => {
  const filterButton = document.getElementById("clearFilterBtn");

  filterButton.addEventListener("click", () => {
    const checkInInput = document.getElementById("checkIn");
    const checkOutInput = document.getElementById("checkOut");

    checkInInput.value = "";
    checkOutInput.value = "";
  });
});
