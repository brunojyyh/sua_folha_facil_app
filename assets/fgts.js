const calculaFgts = () => {
let salario = document.getElementById("salario").value
var resultado = document.querySelector("[data-resultado]");

if(salario > 0 ) {
    resultado.innerHTML = `<table class="table table-bordered fw-normal fs-5 fonte_personalizada mt-3 table-sm mb-0">
    <thead class="table-light">
    <tr>
        <th  scope="col">Valor FGTS Mensal</th>
    </tr>
    </thead>
    <tbody>
        <tr>
        <td class="d-flex justify-content-center">R$ ${(salario*0.08).toFixed(2).replace('.',',')}</td>
        </tr>
    </tbody>`

}

}

const botao = document.querySelector('[data-botao]')
botao.addEventListener('click',calculaFgts )