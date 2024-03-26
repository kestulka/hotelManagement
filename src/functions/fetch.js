// more info btn

// const API_URL = "http://localhost:3000";

// document.addEventListener("DOMContentLoaded", () => {
//   const cardsContainer = document.getElementById("cards-container");

//   fetch("http://localhost:3000/api/v1/rooms")
//     .then((response) => response.json())
//     .then((rooms) => {
//       rooms.forEach((room) => {
//         const card = document.createElement("div");
//         card.classList.add("card", "mb-4");
//         card.style.width = "18rem";
//         card.innerHTML = `
//              <img src="${room.image}" class="room-image" />
//           <div class="card-body text-center">
//             <h6 class="room-number">${room.number}</h6>
//             <h6 class="room-capacity">Capacity: ${room.capacity}</h6>
//             <h6 class="room-wifi">Wifi: ${
//               room.wifi ? "Available" : "Not Available"
//             }</h6>
//             <h6 class="room-parking">Parking: ${
//               room.parking ? "Available" : "Not Available"
//             }</h6>
//             <a href="#" class="btn btn-primary">More info</a>
//           </div>
//             `;
//         cardsContainer.appendChild(card);
//       });
//     })
//     .catch((error) => console.error("Error fetching rooms:", error));
// });
