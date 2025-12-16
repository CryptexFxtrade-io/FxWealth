const API_URL = "https://fxwealth-backend.onrender.com";
let token = null;

async function register() {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      name:document.getElementById('name').value,
      email:document.getElementById('email').value,
      password:document.getElementById('password').value
    })
  });
  alert((await res.json()).message);
}

async function login() {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      email:document.getElementById('email').value,
      password:document.getElementById('password').value
    })
  });
  const data = await res.json();
  if(data.token){
    token=data.token;
    document.getElementById('login-register').style.display='none';
    document.getElementById('dashboard').style.display='block';
    document.getElementById('user-name').innerText=document.getElementById('name').value;
    getBalance();
  }else alert(data.message);
}

async function invest(){
  const amount=document.getElementById('invest-amount').value;
  const res = await fetch(`${API_URL}/api/investment/create`,{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
    body:JSON.stringify({amount})
  });
  alert((await res.json()).message);
  getBalance();
}

async function withdraw(){
  const amount=document.getElementById('withdraw-amount').value;
  const res = await fetch(`${API_URL}/api/investment/withdraw`,{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
    body:JSON.stringify({amount})
  });
  alert((await res.json()).message);
  getBalance();
}

async function getBalance(){
  const res = await fetch(`${API_URL}/api/investment/balance`,{headers:{'Authorization':'Bearer '+token}});
  const data=await res.json();
  document.getElementById('balance').innerText=data.balance;
}
