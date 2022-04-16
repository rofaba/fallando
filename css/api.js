quote = document.getElementById('quotes');

fetch("https://los-simpsons-quotes.herokuapp.com/v1/quotes")
.then((response) => response.json())
.then((data) => {
    console.log(data)
quote.innerHTML = `${data[0].quote} ", " ${data[0].author}`
;
})

