const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");


const getProducts = async () =>{
    const response = await fetch("productos.json");
    const data = await response.json();

    data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>


    `;
    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click",() =>{
        Toastify({
            text: " Se agrego al carrito",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #641E16, #B03A2E)",
              borderRadius: "2rem",
              textTransform: "uppercase",
              fontSize: "0.75rem"
            },
            onClick: function(){} // Callback after click
          }).showToast();

        const repeat = carrito.some ((repeatProduct) => repeatProduct.id === product.id);

        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++;
                };
            });

        } else {
        carrito.push({
            id : product.id,
            img : product.img,
            nombre : product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        });
    };
        console.log(carrito);
        guardar();
    });
});

};
getProducts();

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];










const pintarCarrito = () => {
    modalContainer.innerHTML ="";
    modalContainer.style.display = "flex";   
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
     <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);
    
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";
   
    modalbutton.addEventListener("click", () =>{
       modalContainer.style.display = "none";
   
    });
   
    modalHeader.append(modalbutton);
   
    carrito.forEach((product) =>{
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `
      
     <img src="${product.img}"</img>
     <h3> ${product.nombre}</h3>
     <p>${product.precio} $</p>
     <p>Cantidad: ${product.cantidad}</p>
     <p>Total: ${product.cantidad * product.precio}</p>
    
    `; 
   
    modalContainer.append(carritoContent);


    let eliminar = document.createElement("span");
    eliminar.innerText = "❌";
    eliminar.className = "delete-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);
    });


   
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML =  `Total a pagar: ${total}$`;
    modalContainer.append(totalBuying);

};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    Toastify({
        text: " Se quito del carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #641E16, #B03A2E)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: "0.75rem"
        },
        onClick: function(){} // Callback after click
      }).showToast();


  const foundId = carrito.find((element) => element.id);  

  carrito = carrito.filter((carritoId) =>{
    return carritoId !== foundId;

  });
  pintarCarrito();
  guardar();
};

//local storage
const guardar = () => {
    localStorage.setItem("carrito",JSON.stringify(carrito));


};

