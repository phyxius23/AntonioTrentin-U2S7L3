/**
 * API: https://striveschool-api.herokuapp.com/books
 * -----------------------------------------------------------------------------
 */


/**
 * VARIABILI GLOBALI
 * -----------------------------------------------------------------------------
 */
let cart = document.querySelector('#cart ul');
let cartArray = localStorage.length ? JSON.parse(localStorage.getItem("cart")) : []
console.log(cartArray);
// let counter = localStorage.length; //inizializzo il counter con il numero di elementi di localStorage (firse da eliminare)


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
   col.querySelector('.btn-danger').onclick = () => {
      col.remove();
   }

   // aggiungo il titolo al carrello e al localStorage
   col.querySelector('.btn-success').onclick = () => {

      // ho impostato il necessario (forse pure di più) per aggiungere un oggetto all'array che andrò a salvare nel localStorage
      let bookObj = {
         asin: book.asin,
         title: book.title
      }
      cartArray.push(bookObj);
      localStorage.setItem("cart", JSON.stringify(cartArray));

      createListItem(book);
   }


   return col;
}


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
   btnRemoveCart.setAttribute('id', 'btnRemove')
   btnRemoveCart.setAttribute('class', 'btn btn-danger')
   btnRemoveCart.textContent = 'Remove';

   span.appendChild(textSpan);
   li.appendChild(span);
   li.appendChild(btnRemoveCart);
   cart.appendChild(li);
}


/**
 * Fn che elimina il libro dal carrello e dal localStorage
 * -----------------------------------------------------------------------------
 */



/**
 * FETCH
 * -----------------------------------------------------------------------------
 */
fetch("https://striveschool-api.herokuapp.com/books")
   .then(response => response.json())
   .then(library => {

      // creo gli elementi li che al refresh della pagina si cancellano
      if (cartArray.length) {
         for (const singleBook of cartArray) {
            createListItem(singleBook);
         }
      }

      let books = document.querySelector('#library');

      // itero il corpo ricevuto dall'API e creo le card
      library.forEach(book => {
         books.appendChild(createCard(book))
      });

      // rimuovo il titolo dal carrello e dal localStorage
      let buttonsRemoveCart = document.querySelectorAll('#btnRemove');
      buttonsRemoveCart.forEach(button => {
         button.onclick = () => {
            let btnAsin = button.closest('li').dataset.asin; // recupero il valore dato da asin 
            let arrayRemove = JSON.parse(localStorage.getItem("cart")); // recupero il json dal localStorage e lo converto in obj
            let index = arrayRemove.findIndex(e => e.asin === btnAsin); // cerco il valore dato da asin all'interno dell'obj e ritorno l'index
            
            arrayRemove.splice(index, 1); // elimino l'obj con indice === index
            localStorage.setItem("cart", JSON.stringify(arrayRemove)); // salvo in localStorage il nuovo json privo dell'obj rimosso
            
            // rimuovo l'elemento li
            button.closest('li').remove();

            if (!JSON.parse(localStorage.getItem("cart")).length) {
               localStorage.removeItem("cart");
            }
      
         }
      })

      // if (!JSON.parse(localStorage.getItem("cart")).length) {
      //    localStorage.removeItem("cart");
      // }

   })
   .catch(error => console.log("CATCH", error));