// This function will handle the retrieving of data from API
async function fetchAPI() {
  let response = await fetch('https://api.data.gov.sg/v1/environment/psi')

  // Check if able to retrieve data
  if (response.status === 200) {
    let data = await response.text() // Wait for data to be retrieve and store in date
    console.log(data)
    return data
  } else console.log(response.statusText) // Failure in retrieving data due to response error
}

// This function will handle data and render to the screen
// Using async method because we will retrieve from fetchText method
async function render() {
  let items = await fetchAPI()
  // set the json as an object
  const obj = JSON.parse(items)
  // fetch the metric object
  keys = Object.keys(obj.items[0].readings)
  // fetch the keys value
  values = obj.items[0].readings

  // Get the date time
  updateTimestamp = obj.items[0].update_timestamp;
  console.log(updateTimestamp)

  // Formate date time
  d = new Date(updateTimestamp);
  date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

  var paragraph = document.getElementById("p");
  var text = document.createTextNode("Last Sync(24h): " +date);
  paragraph.appendChild(text);

  // Generate table
  keys.forEach((key) => {
    $('tbody').append(
      '<tr><td>' +
        key +
        '</td><td>' +
        values[key].national +
        '</td><td>' +
        values[key].central +
        '</td><td>' +
        values[key].west +
        '</td><td>' +
        values[key].east +
        '</td><td>' +
        values[key].north +
        '</td><td>' +
        values[key].south +
        '</td></tr>'
    )
  })
}


render()
