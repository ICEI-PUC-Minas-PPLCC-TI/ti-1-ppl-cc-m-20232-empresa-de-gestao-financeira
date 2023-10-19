$(function(){
    $("#header").load("/webapp/assets/header/header.html");
});

//calcular valor final de um rendimento

function calcular(){
    let valorInicial = document.getElementById("valorInicial").value;
    let rendimento = document.getElementById("rendimento").value;
    let meses = document.getElementById("meses").value;
    let valorFinal = valorInicial * Math.pow((1 + rendimento/100), meses);
    
    for (let i = 1; i <= meses; i++) {
        let valorMes = valorInicial * Math.pow((1 + rendimento/100), i);
        let mes = i;

        // adicionar esse dados no calculadora.json
        // {
        //     "mes": 1,
        //     "valor": 1000
        // }






    return document.getElementById("valorFinal").value = valorFinal.toFixed(2);

}

//usar a funcao calcular ao clicar botao

document.getElementById("calcular").onclick = function(){
    calcular();
}
