const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

const productos = [
    {id: 1, nombre: "harina", precio: 50, img:"https://cdn.newgarden.com.ar/media/catalog/product/cache/dda7253a1a2f6711745de410175d10f8/h/a/harina-de-avena-x-1-kg.jpg", cantidad: 1,
},
    {id: 2, nombre: "gaseosa",  precio: 150, img:"https://www.espaciovino.com.ar/media/default/0001/68/thumb_67604_default_medium.jpeg", cantidad: 1,
},
    {id: 3, nombre: "cerveza",  precio: 250, img:"https://us.123rf.com/450wm/hannaklkv/hannaklkv2303/hannaklkv230301672/200881870-vaso-de-cerveza-sobre-fondo-blanco-ilustraci%C3%B3n-acuarela-de-una-bebida-alcoh%C3%B3lica-fr%C3%ADa.jpg?ver=6", cantidad: 1,
},
    {id: 4, nombre: "leche", precio: 350, img:"https://thefoodtech.com/wp-content/uploads/2020/05/leche-3.jpg", cantidad: 1,
},
    
];


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
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

