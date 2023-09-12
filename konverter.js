let map; // Declare map as a global variable
let marker;
function konversi() {
    var longD = parseFloat(document.getElementById("longdegree").value);
    var longM = parseFloat(document.getElementById("longminutes").value);
    var longS = parseFloat(document.getElementById("longseconds").value);
    var latD = parseFloat(document.getElementById("latdegree").value);
    var latM = parseFloat(document.getElementById("latminutes").value);
    var latS = parseFloat(document.getElementById("latseconds").value);
    var longRegion = document.querySelector('input[name="input_east_west"]:checked').value;
    var latRegion = document.querySelector('input[name="input_north_south"]:checked').value;
  
    if (longRegion == "E") {
      if (longD >= 0) {
        document.getElementById('long').value = longD + ((longM + (longS / 60)) / 60);
        document.getElementById('notes-long').className = "";
        document.getElementById('notes-long').innerHTML = "";
      } else {
        document.getElementById('long').value = ((longD * -1) + ((longM + (longS / 60)) / 60));
        document.getElementById('notes-long').className = "text-danger font-italic mt-2";
        document.getElementById('notes-long').innerHTML = "Bujur timur tidak mungkin bernilai negatif";
      }
    } else if (longRegion == "W") {
      if (longD >= 0) {
        document.getElementById('long').value = (longD + ((longM + (longS / 60)) / 60)) * -1;
        document.getElementById('notes-long').className = "text-danger font-italic mt-2";
        document.getElementById('notes-long').innerHTML = "Bujur barat tidak mungkin bernilai positif";
      } else {
        document.getElementById('long').value = ((longD * -1) + ((longM + (longS / 60)) / 60)) * -1;
        document.getElementById('notes-long').className = "";
        document.getElementById('notes-long').innerHTML = "";
      }
    }
  
    if (latRegion == "N") {
      if (latD >= 0) {
        document.getElementById('lat').value = latD + ((latM + (latS / 60)) / 60);
        document.getElementById('notes-lat').className = "";
        document.getElementById('notes-lat').innerHTML = "";
      } else {
        document.getElementById('lat').value = (latD * -1) + ((latM + (latS / 60)) / 60);
        document.getElementById('notes-lat').className = "text-danger font-italic mt-2";
        document.getElementById('notes-lat').innerHTML = "Lintang utara tidak mungkin bernilai negatif";
      }
    } else if (latRegion == "S") {
      if (latD >= 0) {
        document.getElementById('lat').value = (latD + ((latM + (latS / 60)) / 60)) * -1;
        document.getElementById('notes-lat').className = "text-danger font-italic mt-2";
        document.getElementById('notes-lat').innerHTML = "Lintang selatan tidak mungkin bernilai positif";
      } else if (latD < 0) {
        document.getElementById('lat').value = ((latD * -1) + ((latM + (latS / 60)) / 60)) * -1;
        document.getElementById('notes-lat').className = "";
        document.getElementById('notes-lat').innerHTML = "";
      }
    }

    
    const lat = parseFloat(document.getElementById('lat').value);
    const lon = parseFloat(document.getElementById('long').value);

    if (!isNaN(lat) && !isNaN(lon)) {
        if (!map) {
            map = L.map('map').setView([lat, lon], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);
        }

        // Update marker's position
        if (marker) {
            marker.setLatLng([lat, lon]);
        } else {
            marker = L.marker([lat, lon]).addTo(map);
        }
    }
  }