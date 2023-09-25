// script.js

document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const modal = document.querySelector('.modal');
    const modalBody = document.querySelector('.modal-body');

    // Variable para almacenar los productos en formato JSON
    let products = [];

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;

        if (name && price) {
            addProduct(name, price);
            productForm.reset();
        }
    });

    productList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) {
            const productId = e.target.getAttribute('data-id');
            deleteProduct(productId);
        }
    });

    productList.addEventListener('click', function (e) {
        if (e.target.classList.contains('update')) {
            const productId = e.target.getAttribute('data-id');
            updateProductModal(productId);
        }
    });

    //Manejar el modal
    modal.addEventListener('click', function (e) {
        if (e.target.classList.contains('close')) {
            cerrarModal();
        }
    });

    modal.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal-save')) {
            const productId = e.target.getAttribute('data-id');
            updateProduct(productId);
            cerrarModal();
        }
    });

    function addProduct(name, price) {
        const newProduct = { name, price };
        products.push(newProduct);
        displayProducts();
    }

    function deleteProduct(productId) {
        products.splice(productId, 1);
        displayProducts();
    }

    function displayProducts() {
        productList.innerHTML = '';

        products.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `

            <div class="card">
                <div class="card-body">
                <ul class="list-group mb-2">
                    <li class="list-group-item">
                    Nombre: ${product.name}
                    </li>
                    <li class="list-group-item">
                    Precio: $${product.price}
                    </li>
                </ul>
                <button class="btn btn-danger delete" data-id="${index}">Eliminar</button>
                <button class="btn btn-success update" data-id="${index}">Actualizar</button>
                </div>
            </div>
            `;
            productList.appendChild(productItem);
        });
    }

    function displayProductUpdated(productId) {
        const currentProduct = products[productId]
        modalBody.innerHTML = `
        <div class="input-group mb-3">
            <span class="input-group-text">Nombre:</span>
            <input type="text" class="form-control update-name" value="${currentProduct.name}" data-id="${productId}">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Precio:</span>
            <input type="text" class="form-control update-price" value="${currentProduct.price}" data-id="${productId}">
        </div>
            `;
    }

    function updateProductModal(productId) {
        displayProductUpdated(productId);
        abrirModal(productId);
    }

    function updateProduct(productId) {
        const updateName = document.querySelector('.update-name');
        const updatePrice = document.querySelector('.update-price');
        products[productId]['name'] = updateName.value;
        products[productId]['price'] = updatePrice.value;
        displayProducts(productId);
    }

    // Función para abrir el modal
    function abrirModal(productId) {
        const modalSave = document.querySelector('.modal-save');
        modalSave.dataset.id = productId;
        modal.style.display = "block";
    }

    // Función para cerrar el modal
    function cerrarModal() {
        modal.style.display = "none"; 
    }
});