const calcula = () => {

    var salario = document.getElementById("salario");
    let descontos = Number(document.getElementById("descontos").value);
    let dependentes = document.querySelector("#sel2").value;
    let descontoDependente
    let salarioValor = Number(salario.value);
    let base = 0;
    let faixa1 =  1212 * 0.075;
    let faixa2 =  0;
    let faixa3 = 0;
    let faixa4 = 0;
    let inss = 0;
    let valeTransporte = 0;
    let aliquota = 0;
    let salarioLiquido = 0;
    var resultado = document.querySelector("[data-resultado]");
    if(salario.value.length > 3) {
        if (salarioValor <= 1212) {
            aliquota = 0.075 * 100;
            inss = (salarioValor * (aliquota / 100));
            base = (salarioValor - (salarioValor * 0.075));
        } else if (salarioValor >= 1212.01 && salarioValor <= 2427.35) {
            faixa1 = 1212 * 0.075;
            faixa2 = (salarioValor - 1212) * 0.09; 
            aliquota = ((faixa1 + faixa2) / salarioValor) * 100;
            inss = (salarioValor * (aliquota / 100));
            base = (salarioValor - (faixa1 + faixa2));
        } else if (salarioValor >= 2427.36 && salarioValor <= 3641.03) {
            faixa1 = 1212 * 0.075;
            faixa2 = (2427.35 - 1212) * 0.09; 
            faixa3 = (salarioValor - 2427.35) * 0.12;
            aliquota = ((faixa1 + faixa2 + faixa3) / salarioValor) * 100;
            inss = (salarioValor * (aliquota / 100));
            base = salarioValor - (faixa1 + faixa2 + faixa3);
        } else if (salarioValor >= 3641.04 && salarioValor <= 7087.22) {
            faixa1 = 1212 * 0.075;
            faixa2 = (2427.35 - 1212) * 0.09; 
            faixa3 = (3641.03 - 2427.35) * 0.12;
            faixa4 = (salarioValor - 3641.03) * 0.14; 
            aliquota = ((faixa1 + faixa2 + faixa3 + faixa4) / salarioValor) * 100;
            inss = (salarioValor * (aliquota / 100));
            base = salarioValor - (faixa1 + faixa2 + faixa3 + faixa4);
        } else {
            aliquota = 8.03;
            inss = ((aliquota * 7087.22) / 100);
            base = salarioValor - 642.34
        }
         
    }else {
        window.alert('Salario não informado/Valor invalido')
    }

    //regra dos dependentes
    if (dependentes > 0) {
        descontoDependente = dependentes * 189.59
    } else descontoDependente = 0


    //IRRF
    let baseIrrf = base - descontoDependente;
    let aliquotaIrrf = 0;
    let deducao = 0;
    if (baseIrrf <= 1903.98) {
        aliquotaIrrf = 0;
    } else if (baseIrrf >= 1903.99  && baseIrrf <= 2826.65) { 
        aliquotaIrrf = 0.075;
        deducao = 142.80
    } else if (baseIrrf >= 2826.66 && baseIrrf <= 3751.05) {
        aliquotaIrrf = 0.15;
        deducao = 354.80
    } else if (baseIrrf >= 3751.06 && baseIrrf <= 4664.68 ) {
        aliquotaIrrf = 0.225;
        deducao = 636.13
    } else {
        aliquotaIrrf = 0.275
        deducao = 869.36
    }
    
    let irrf = ((baseIrrf * aliquotaIrrf) - deducao);
    base = base - ((baseIrrf * aliquotaIrrf) - deducao) 

    
    //calculo vale transporte
    if(document.getElementById('flexSwitchCheckDefault').checked) {
        if((base * 0.06) >= 406.56){
            valeTransporte = 406.56
        } else {
            valeTransporte = base * 0.06
        }
    } else {
        valeTransporte = 0
    }

    //imprime resultado final
    salarioLiquido = Number(base  - valeTransporte - descontos).toFixed(2).replace('.',',')
    TotalDescontos = parseFloat(inss + irrf + descontos).toFixed(2).replace('.',',')
    if(salario.value.length > 3) {
        resultado.innerHTML = ` <table class="table table-bordered fw-normal fs-5 fonte_personalizada mt-3 table-sm mb-0">
    <thead class="table-light">
      <tr>
        <th  scope="col">Registros</th>
        <th  scope="col">Alíquota Efetiva</th>
        <th  scope="col">Proventos</th>
        <th  scope="col">Descontos</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="fw-normal" scope="row">Salário Bruto</th>
        <td></td>
        <td>R$ ${salarioValor.toFixed(2).replace('.',',')}</td>
        <td>-</td>
      </tr>
      <tr>
        <th class="fw-normal" scope="row">INSS</th>
        <td>${aliquota.toFixed(2).replace('.',',')}%</td>
        <td>-</td>
        <td>R$ ${Number(inss).toFixed(2).replace('.',',')}</td>
      </tr>
      <tr>
        <th class="fw-normal" scope="row">IRRF</th>
        <td>-</td>
        <td>-</td>
        <td>R$ ${Number(irrf).toFixed(2).replace('.',',')}</td>


      </tr>
      <tr>
        <th class="fw-normal" scope="row">Descontos</th>
        <td></td>
        <td>-</td>
        <td>R$ ${Number(descontos).toFixed(2).replace('.',',')}</td>
      </tr>
      <tr>
      <th class="fw-normal" colspan="2">Totais</th>
      <td>R$ ${salarioValor.toFixed(2).replace('.',',')}</td>
      <td>R$ ${TotalDescontos}</td>
      </tr>
      <tr>
      <th colspan="2">Salário Líquido</th>
      <td class="fw-bold"  colspan="2">${salarioLiquido}</td>
      </tr>
    </tbody>
  </table>
  <div class="d-flex justify-content-center fs-5 fonte_personalizada fw-bold">
     <p class="mt-2 fs-5 fw-normal">Quer aprender a fazer o calculo?
        <a class="text-decoration-none text-reset fw-bold" data-bs-toggle="modal" data-bs-target="#modal-contato" href="#"> Clique aqui</a>
     </p>
  </div>`
    }
   
} 
    //cria variavel para "ouvir" o click no html
    const botao = document.querySelector('[data-botao]')
    botao.addEventListener('click', calcula)



    
