document.addEventListener("DOMContentLoaded", async () => {
  const cardsContainer = document.getElementById("cards-container");

  try {
    const response = await fetch("http://localhost:3000/api/v1/rooms");
    const rooms = await response.json();

    rooms.forEach((room) => {
      const card = createCardElement(room);
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
});

function createCardElement(room) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-4");
  card.style.width = "18rem";
  card.innerHTML = `
    <img src="${room.room_image}" class="room-image" />
    <div class="card-body text-center">
      <h6 class="room-number">${room.number}</h6>
      <h6 class="room-capacity">Capacity: ${room.capacity}</h6>
      <h6 class="room-wifi">Wifi: ${room.wifi}</h6>
      <h6 class="room-parking">Parking: ${room.parking}</h6>
      <button class="btn btn-primary more-info-btn">More info</button>
    </div>
  `;
  const moreInfoButton = card.querySelector(".more-info-btn");
  moreInfoButton.addEventListener("click", () => showRoom(room));

  return card;
}

function showRoom(room) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-4");
  card.style.width = "18rem";
  card.innerHTML = `
    <img src="${room.room_image}" class="room-image" />
    <div class="card-body text-center">
      <h6 class="room-number">${room.number}</h6>
      <h6 class="room-capacity">Capacity: ${room.capacity}</h6>
      <h6 class="room-wifi">Wifi: ${room.wifi}</h6>
      <h6 class="room-parking">Parking: ${room.parking}</h6>
      <h6 class="room-price" style="color: green; font-weight: bolder;" >Price: ${room.price}</h6>
      <h6 class="room-availability" style="color: green; font-weight: bolder;">Availability: ${room.availability}</h6>
      <button class="btn btn-primary reserve-btn" data-room-id="${room.id}">Reserve</button>
    </div>
  `;

  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  cardsContainer.appendChild(card);
}
