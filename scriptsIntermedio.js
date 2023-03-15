/**
 * API: https://striveschool-api.herokuapp.com/books
 * -----------------------------------------------------------------------------
 */


/**
 * VRIABILI GLOBALI
 * -----------------------------------------------------------------------------
 */
let cart = document.querySelector('#cart ul');
let counter = localStorage.length; //inizializzo il counter con il numero di elementi di localStorage

// let arr = [
//    {1: 'title'},
//    {2: 'title'},
//    {3: 'title'},
//    {4: 'title'}
// ]

// localStorage.setItem("cart", JSON.stringify(arr));


/**
 * Fn che crea un list item contenente il valore appena salvato nel localStorage
 * -----------------------------------------------------------------------------
 */
const createListItem = function (book) {

   // creo l'elemento li e assegno le classi bootstrap
   let li = document.createElement('li');
   li.dataset.asin = book.asin;
   li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center')

   // creo l'elemento span e salvo il contenuto testuale al suo interno
   let span = document.createElement('span');
   let textSpan = document.createTextNode(book.title);

   // creo l'elemento button che mi permette di eliminare il libro dal carrello e assegno le classi bootstrap
   let btnRemoveCart = document.createElement('button');
   btnRemoveCart.setAttribute('class', 'btn btn-danger')
   btnRemoveCart.textContent = 'Remove';

   span.appendChild(textSpan);
   li.appendChild(span);
   li.appendChild(btnRemoveCart);
   cart.appendChild(li);
}


/**
 * Fn che crea una card
 * -----------------------------------------------------------------------------
 */
const createCard = function (book) {
   // creo l'elemento .col
   const col = document.createElement('div');
   col.classList.add('col');

   // creo l'elemento .card
   const card = document.createElement('div');
   card.classList.add('card');

   // creo l'elemento .card
   const cardImg = document.createElement('div');
   cardImg.classList.add('card-img');

   // creo l'elemento img e gli assegno la src
   const img = document.createElement('img');
   img.classList.add('card-img-top');
   img.src = book.img;

   // creo l'elemento .card-body
   const cardBody = document.createElement('div');
   cardBody.classList.add('card-body');

   // creo l'elemento h5
   const title = document.createElement('h5');
   title.classList.add('card-title');
   title.innerText = book.title;

   // creo l'elemento p
   const price = document.createElement('p');
   price.classList.add('card-text');
   price.innerText = book.price

   // creo l'elemento button (Scarta)
   const btn = document.createElement('button');
   btn.classList.add('btn', 'btn-danger', 'me-2');
   btn.setAttribute('id', 'btn');
   btn.innerText = 'Scarta';

   // creo l'elemento button (Compra)
   const btnBuy = document.createElement('a');
   btnBuy.classList.add('btn', 'btn-success');
   btnBuy.setAttribute('href', '#');
   btnBuy.innerText = 'Compra ora';

   cardBody.appendChild(title);
   cardBody.appendChild(price);
   cardBody.appendChild(btn);
   cardBody.appendChild(btnBuy);

   cardImg.appendChild(img)
   card.appendChild(cardImg);
   card.appendChild(cardBody);

   col.appendChild(card);

   // rimuovo la colonna che corrisponde al button cliccato
   col.querySelector('#btn').onclick = () => {
      col.remove();
   }

   // add book in cart/localStorage
   col.querySelector('.btn-success').onclick = () => {
      let arr = [
         {1: 'title'},
         {2: 'title'},
         {3: 'title'},
         {4: 'title'}
      ]

      // salvo chiave/valore in localStorage
      localStorage.setItem(book.asin, book.title);

      // richiamo Fn che crea un list item del libro appena aggiunto al carrello
      createListItem(book);

      // incremento il counter
   }

   return col;
}

// let obj = [
//    {asin1: title1},
//    {asin2: title2},
//    {asin3: title3},
//    {asin4: title4}
// ]


/**
 * Fn che elimina il libro dal carrello e dal localStorage
 * -----------------------------------------------------------------------------
 */
// const deleteBookCart = function(btnDeleteBook, index){

// }


/**
 * FETCH
 * -----------------------------------------------------------------------------
 */
fetch("https://striveschool-api.herokuapp.com/books")
   .then(response => response.json())
   .then(library => {
      console.log(library)
      let books = document.querySelector('#library');

      // se localStorage ha elementi li aggiungo subito al carrello
      if (localStorage.length) {
         for (let i = 0; i < localStorage.length; i++) {
            createListItem(i);
         }
      }

      library.forEach(book => {
         books.appendChild(createCard(book))
      });

      let buttonsDeleteBookCart = document.querySelectorAll('#cart ul li .btn');

      buttonsDeleteBookCart.forEach((btnDeleteBook, index) => {
         btnDeleteBook.onclick = () => {
            localStorage.removeItem(index);
            btnDeleteBook.closest('li').remove();
         }
      })

   })
   .catch(error => console.log("CATCH", error));