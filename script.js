
const dataBase = [
    {name:'LukasDev'},
    {name:'CauaDev'},
    {name:'Fezinho'}
]

class BankOperations {
    constructor(){
        this.valorSaldo = 0;
        this.loginBtn = document.querySelector('.loginBtn');
        this.username = document.querySelector('.usernameInput');
        this.navUsername = document.querySelector('.username');
        this.loginPage = document.querySelector('.fake-login')
        this.operationsPage = document.querySelector('.bank-operations')
        this.operationPageSelected = document.querySelector('.operation-selected')
    }

    login(){
        this.loginBtn.addEventListener('click', (e)=>{
            this.username.value != '' ? this.logarUser() : alert('Campo usuario vazio');
        });
    };

    logarUser(){
        const userFiltrado = dataBase.find((user)=> user.name == this.username.value)

        if(userFiltrado==undefined){
            alert('Usuario Inexistente')
        }else{
            this.navUsername.textContent = userFiltrado.name
            this.loginPage.style.display = 'none'
            this.operationsPage.style.display = 'flex'
            document.querySelector('.logout').style.display = 'block'
            this.saldo = document.createElement('span')
            this.saldo.classList.add('saldo')
            this.saldo.textContent = `Saldo: R$:${this.valorSaldo}`
            document.querySelector('.nav-itens').appendChild(this.saldo)
        }
    };

    fazerSaque(){
        console.log('saquei')
        document.querySelector('.operations-options').style.display = 'none'
        this.operationsPage.style.display = 'none'
        document.querySelector('.operation-selected').style.display = 'flex'
        document.querySelector('.operation-selected').innerHTML=`
            <div class="preview-div-btn">
                <Button class="previewBtn"><<< Selecionar</Button>
            </div>
            <span class="opName">Saque</span>
            <input placeholder="Digite o Valor"  class="valueInput" type="text">
            <button class="bankOpBtn">Sacar</button>
        `
        this.opPreview()
        jQuery(function(){
            jQuery(".valueInput").maskMoney({
                prefix:'R$',
                thousands:'.',
                decimal:','
            });
        });
        document.querySelector('.bankOpBtn').addEventListener('click', ()=>{
        const valorDoInput = document.querySelector('.valueInput').value
        const valorFormatado = valorDoInput.replace('R$', '').replace(/\./g,'').replace(',','.')
        this.saque(Number(valorFormatado))
        })
    }

    saque(valorSaque){
        if(valorSaque <= this.valorSaldo){
            this.valorSaldo -= valorSaque
            document.querySelector('.saldo').textContent = `Saldo: R$:${this.valorSaldo.toLocaleString('pt-BR', {minimumFractionDigits:2})}`
        }else{
            console.log(valorSaque)
            console.log(this.valorSaldo)
            alert('Saldo Insuficiente para o Saque!')
        }
    }

    fazerDeposito(){
        console.log('depositei')
        document.querySelector('.operations-options').style.display = 'none'
        this.operationsPage.style.display = 'none'
        document.querySelector('.operation-selected').style.display = 'flex'
        document.querySelector('.operation-selected').innerHTML=`
            <div class="preview-div-btn">
                <Button class="previewBtn"><<< Selecionar</Button>
            </div>
            <span class="opName">Deposito</span>
            <input placeholder="Digite o Valor"  class="valueInput" type="text">
            <button class="bankOpBtn">Depositar</button>
        `
        this.opPreview()
        jQuery(function(){
            jQuery(".valueInput").maskMoney({
                prefix:'R$',
                thousands:'.',
                decimal:','
            });
        });
        document.querySelector('.bankOpBtn').addEventListener('click', ()=>{
            const valorDoInput = document.querySelector('.valueInput').value
            const valorFormatado = valorDoInput.replace('R$', '').replace(/\./g,'').replace(',','.')
            console.log((Number(valorFormatado)))
            this.deposito(Number(valorFormatado))
        })
    }

    deposito(valorDeposito){
            this.valorSaldo = this.valorSaldo + valorDeposito
            document.querySelector('.saldo').textContent = `Saldo: R$:${this.valorSaldo.toLocaleString('pt-BR',{minimumFractionDigits:2})}`
    }

    opPreview(){
        document.querySelector('.previewBtn').addEventListener('click',()=>{
            document.querySelector('.bank-operations').style.display = 'flex'
            document.querySelector('.operations-options').style.display = 'flex'
            document.querySelector('.operation-selected').style.display = 'none'
        })
    };

    opSelect(operation){
        operation.forEach((btn)=>{
            btn.addEventListener('click',()=>{
                btn.textContent == 'Sacar' ? this.fazerSaque() : this.fazerDeposito()
            })
        })
    }
};

const bankApp = new BankOperations
bankApp.login()
bankApp.opSelect(document.querySelectorAll('.opBtn'))

