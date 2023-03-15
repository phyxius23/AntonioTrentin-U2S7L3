// https://striveschool-api.herokuapp.com/books

fetch ("https://striveschool-api.herokuapp.com/books")
   .then(response => response.json())
   .then(library => {
      // console.log(library);

      let books = document.querySelector('#library');
      let cart = document.querySelector('#cart ul');
      let counter = localStorage.length;

      if (localStorage.length) {
         for (let i = 0; i < localStorage.length; i++) {
            createListItem(i);
         }
      }

      library.forEach(book => {
         // counter++;

         // creo l'elemento .col
         const col = document.createElement('div');
         col.classList.add('col');

         // creo l'elemento .card
         const card = document.createElement('div');
         card.classList.add('card');

         // creo l'elemento img e gli assegno la src
         const img = document.createElement('img');
         img.src = book.img;
         // console.log(img)
         
         const cardBody = document.createElement('div');
         cardBody.classList.add('card-body');
         
         const title = document.createElement('h5');
         title.classList.add('card-title');
         title.innerText = book.title;
         // console.log(title)
         
         const price = document.createElement('p');
         price.classList.add('card-text');
         price.innerText = book.price
         // console.log(price)
         
         const btn = document.createElement('button');
         btn.classList.add('btn', 'btn-danger', 'me-2');
         btn.setAttribute('id', 'btn');
         btn.innerText = 'Scarta';
         // console.dir(btn)

         const btnBuy = document.createElement('a');
         btnBuy.classList.add('btn', 'btn-success');
         btnBuy.setAttribute('href', '#');
         btnBuy.innerText = 'Compra ora';

         cardBody.appendChild(title);
         cardBody.appendChild(price);
         cardBody.appendChild(btn);
         cardBody.appendChild(btnBuy);

         card.appendChild(img);
         card.appendChild(cardBody);

         col.appendChild(card);

         // discard col(card)
         // const discard = col.querySelector('#btn')
         col.querySelector('#btn').onclick = ()=> {
            col.remove();
         }

         // add book in cart/localStorage
         // const addCart = col.querySelector('.btn-success');
         col.querySelector('.btn-success').onclick = ()=> {
            localStorage.setItem(counter, book.title);
            
            createListItem(counter);

            counter++
            // let li = document.createElement('li');
            // li.innerText = book.title;
            // cart.appendChild(li);
         }
         // col.querySelector('.btn-success').onclick = saveName;

         books.appendChild(col);
      });

   })
   .catch(error => console.log("CATCH", error));

// Fn che crea un listItem contenente il valore appena salvato nel localStorage
const createListItem = function (index) {
   let li = document.createElement('li');
   let textLi = document.createTextNode(localStorage.getItem(index));

   li.appendChild(textLi);
   cart.appendChild(li);
}

// Fn che salva nel localStorage la coppia chiave/valore
// NON FUNZIONA!!!!
const saveName = function () {
   // let indexLocalStorage = localStorage.length + 1;
   localStorage.setItem(counter++, book.title); //salvo in localStorage la coppia chiave/valore name:inputName.value
   createListItem(indexLocalStorage);
}