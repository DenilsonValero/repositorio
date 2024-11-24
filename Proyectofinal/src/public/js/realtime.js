const socket = io();

socket.on('updateProducts', (product) => {
    const productList = document.getElementById('productList');
    const newProduct = document.createElement('li');
    newProduct.textContent = `${product.name} - $${product.price}`;
    newProduct.dataset.id = product.id;  // Agregamos el ID para la eliminación
    productList.appendChild(newProduct);
});

socket.on('removeProduct', (productId) => {
    const productList = document.getElementById('productList');
    const productItems = productList.getElementsByTagName('li');
    for (let item of productItems) {
        if (item.dataset.id == productId) {
            productList.removeChild(item);
            break;
        }
    }
});

function addProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    socket.emit('newProduct', { name, price });
}

function deleteProduct() {
    const productId = document.getElementById('productId').value;
    socket.emit('deleteProduct', productId);
}

