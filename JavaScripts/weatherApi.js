var reciever = await fetch("https://api.data.gov.sg/v1/environment/air-temperature").then(Response => {
    if(!Response.ok){throw new Error("'Network response was not ok'")
    } return Response.json().then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = `<p><strong>Title:</strong> ${data.title}</p>
                             <p><strong>Body:</strong> ${data.body}</p>`;
    })
    .catch(error => console.error('Error:', error));
})

console.log(reciever)