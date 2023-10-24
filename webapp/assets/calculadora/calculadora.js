$(function(){
    $("#header").load("/webapp/assets/header/header.html");
});

function calcular() {


    let valorInicial = parseFloat(document.getElementById("valorInicial").value);
    let rendimento = parseFloat(document.getElementById("rendimento").value);
    let meses = parseInt(document.getElementById("meses").value);
    let valorFinal = valorInicial;
    let data;  // Declare data variable here

    fetch('https://api.jsonbin.io/v3/b/6532b95f54105e766fc4dfa9')
        .then(response => response.json())
        .then(db => {
            data = [];  // Assign value to the data variable

            for (let i = 1; i <= meses; i++) {
                valorFinal = valorFinal * (1 + rendimento / 100);
                let a = {
                    mes: i,
                    valor: parseFloat(valorFinal.toFixed(2))
                };
                data.push(a);
            }
            document.getElementById("valorFinal").value = valorFinal.toFixed(2);
            return data;
        })
        .then(() => {
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    console.log(req.responseText);
                }
            };

            req.open("PUT", "https://api.jsonbin.io/v3/b/6532b95f54105e766fc4dfa9", true);
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("X-Master-Key", "$2a$10$jyAfBTwo2U6.TwQfTEaUGebvDvlG8w0eBEect7I9cea8YAAK.Tzdy");
            req.send(JSON.stringify({ data }));  // Use the data variable here

        })



        // .then(response => response.json())
        // .then(updatedData => {
        //     console.log("Update successful:", updatedData);
        // })
        // .catch(error => {
        //     console.error("Error updating data:", error);
        // });

        fetch('https://api.jsonbin.io/v3/b/6532b95f54105e766fc4dfa9')
        .then(response => response.json())
        .then(db => {
            data = db.record.data;  // Assign value to the data variable

            let textoHTML = ''
            for (i=0; i < data.length; i++) {
                let a = data[i]
                textoHTML += `<tr><td>${a.mes}</td><td>${a.valor}</td></tr>`
            }
            document.getElementById('tabelaValores').innerHTML = textoHTML
        })
}




//usar a funcao calcular ao clicar botao

document.getElementById("calcular").onclick = function(){
    limparTabela();
    calcular();
}


// limpar innerHTML da tabela

function limparTabela() {
    document.getElementById('tabelaValores').innerHTML = ''
}