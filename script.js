var api_key = "at_ZK89x7V16ZmKS0A0Kz41qO0eRPhv7";
var map = L.map("maparea", {
  zoomControl: false,
  setView: true,
  watch: true,
  zoom: 12,
}).fitWorld();
document.querySelector("form").addEventListener("submit", GetLocation);

function GetLocation() {
  var ip = document.querySelector("#ip").value;

  try {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ip}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong.");
        }
      })
      .then((data) => {
        console.log(data);
        const IP = document.querySelector(".ipaddress");
        const Location = document.querySelector(".location");
        const Timezone = document.querySelector(".timezone");
        const isp = document.querySelector(".isp");
        IP.innerHTML = data.ip;
        Location.innerHTML =
          data.location.region +
          ", " +
          data.location.country +
          "<br> " +
          data.location.postalCode;
        Timezone.textContent = data.location.timezone;
        isp.innerHTML = data.isp;
        const lat = data.location.lat;
        const long = data.location.lng;
     
        map.setView([lat, long], 16)
        L.marker([lat, long])
          .addTo(map)
          .bindPopup("<h2>Right Here.</h2>")
          .openPopup();
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 13,
          attribution: "© OpenStreetMap",
        }).addTo(map);
      })
      .catch((err) => {
        document.querySelector(".container").innerHTML =
          "<h2>" + err.message + "</h2>";
        console.log(err.message);
      });
  } catch {
    console.log(error);
  }
  document.querySelector("input").value = "";
}

GetLocation();
