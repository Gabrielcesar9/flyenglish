function checkCPF(strCPF){
  //const baseurl = 'http://localhost:3000'
  const baseurl = 'api-register-students.vercel.app'
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  }
async function Login(){
  cpf = document.getElementById('cpf_').value;
  document.getElementById('login_').innerHTML = 'AGUARDE...'
  if(checkCPF(cpf)){
    await fetch(`${baseurl}/check?payload=${cpf}`, {
    method:'GET',
    headers:{
      'Content-Type': 'application/json',
    },
  }).then(response =>{
    if(!response.ok){
      throw new Error('Network response was not ok')
    }
    return response.json()
  }).then(response =>{
    console.log('resp',response)
    if(response.message=='not-registered'){
      window.location = 'matricula.html'
    }
    else{
      alert('Esse CPF já está cadastrado')
    }
  })
  }else{alert('Insira um CPF válido')}
  document.getElementById('login_').innerHTML = ' Pré-matrícula'
}

