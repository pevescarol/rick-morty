const temp = document.createElement('template');
        temp.innerHTML = `
        <link rel="stylesheet" href="./style.css">

        <section class="flex">
            <div class="box">
                <img src="./img/ricknmorty.png" width="200px">
                <div class="search"><input placeholder="Escribe el id del personaje"> <button>Buscar</button></div>
            </div>
            
            <article class="card">
                <img src="./img/header.jpg" class="card-header">
                <div class="card-body">
                    <div id="image-container" class=card-body-img></div>
                    <h2 id="name" class="card-body-title"></h2>
                    <span class="card-body-text">
                        <h3>Estado</h3>
                        <p id="status"></p>
                    </span>
                </div>
                
                <div class="card-footer">
                    <div class="card-footer-social">
                        <h3>Origen</h3>
                        <p id="origin"></p>
                    </div>
                    <div class="card-footer-social">
                        <h3>Especie</h3>
                        <p id="species"></p>
                    </div>
                    <div class="card-footer-social">
                        <h3>Género</h3>
                        <p id="gender"></p>
                    </div>
                </div>
            </article>
            <button id="stop">Pausar</button>
        </section>
        `;

        class NeoTag extends HTMLElement{
            constructor(){
                super();
                this._shadowRoot= this.attachShadow({'mode': 'open'});
                this._shadowRoot.appendChild(temp.content.cloneNode(true));
            }

            connectedCallback(){
                
                this.name = this._shadowRoot.querySelector('#name');
                this.status = this._shadowRoot.querySelector('#status');
                this.species = this._shadowRoot.querySelector('#species');
                this.gender = this._shadowRoot.querySelector('#gender');
                this.origin = this._shadowRoot.querySelector('#origin');
                this.image = this._shadowRoot.querySelector('#image-container');
                this.input = this._shadowRoot.querySelector('input');
                this.boton = this._shadowRoot.querySelector('button');
                this.stop = this._shadowRoot.querySelector('#stop');

                this.boton.addEventListener('click', ()=>{
                    fetch('https://rickandmortyapi.com/api/character/'+this.input.value +'/')
                    .then(resp => resp.json())
                    .then(data => {

                        this.name.innerHTML=data.name;
                        this.status.innerHTML=data.status;
                        this.species.innerHTML=data.species;
                        this.gender.innerHTML=data.gender;
                        this.origin.innerHTML=data.origin.name;
                        this.image.innerHTML= `
                            <img src=${data.image}>
                        `
                    });
                })
            
                
                var intervalo = setInterval(() => {
                        
                    var total = 671;
                    var index = Math.floor((Math.random()*total))
                    console.log(index);

                    fetch('https://rickandmortyapi.com/api/character/'+index+'/')
                    .then(resp => resp.json())
                    .then(data => {
                        this.name.innerHTML=data.name;
                        this.status.innerHTML=data.status;
                        this.species.innerHTML=data.species;
                        this.gender.innerHTML=data.gender;
                        this.origin.innerHTML=data.origin.name;
                        this.image.innerHTML= `
                            <img src=${data.image}>
                        `
                    });
                }, 3000);

                this.stop.addEventListener('click', ()=>{
                    clearInterval(intervalo);
                })    
            }
            
            attributeChangedCallback(name, oldValue, newValue){
                console.log(name + "  " + oldValue + " " + newValue);


                fetch('https://rickandmortyapi.com/api/character/'+ newValue +'/')
                    .then(resp => resp.json())
                    .then(data => {
                        this.name.innerHTML=data.name;
                        this.status.innerHTML=data.status;
                        this.species.innerHTML=data.species;
                        this.gender.innerHTML=data.gender;
                        this.origin.innerHTML=data.origin.name;
                        this.image.innerHTML+= `
                            <img src=${data.image}>
                        ` 
                    });
                    
            }

            static get observedAttributes(){
                return  ['id'];
            }
            
        }

        window.customElements.define('neo-personaje', NeoTag);