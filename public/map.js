function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const map = new google.maps.Map(document.getElementById("map"), {
          center: userPosition,
          zoom: 15,
        });

        const marker = new google.maps.Marker({
          position: userPosition,
          map: map,
          title: "Your Location",
        });
      },
      () => {
        console.error("Error: The Geolocation service failed.");
      }
    );
  } else {
    console.error("Error: Your browser doesn't support geolocation.");
  }
}

initMap();
