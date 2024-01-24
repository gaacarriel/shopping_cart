function state(initialValue) {
    let value = initialValue;

    function getValue() {
        return value;
    }

    function setValue(newValue) {
        value = newValue;
    }

    return [getValue, setValue];
}

const [database, setDatabase] = state([
    {
        id: 1,
        name: "Cama Box",
        price: 850,
    },
    {
        id: 2,
        name: "Climatizador",
        price: 600,
    },
    {
        id: 3,
        name: "Playstation 5",
        price: 4600,
    },
    {
        id: 4,
        name: "Mouse Gamer",
        price: 1200,
    },
]);
const [cart, setCart] = state([]);

function showProducts(products = database()) {
    const container = document.querySelector("#products");

    products.forEach((product) => {
        container.insertAdjacentHTML(
            "beforeend",
            `
            <li>
                ${product.name}
                R$ ${product.price}
                <button onClick={addToCart(${product.id})} id={${product.id}}>
                    Adicionar ao carrinho
                </button>
            </li>
            `
        );
    });

    return container;
}

function addToCart(id, products = database()) {
    const productBuyed = products.find((product) => product.id === id);

    setCart([...cart(), productBuyed]);

    return showProductsInCart();
}

function showProductsInCart(products = cart()) {
    const container = document.querySelector("#cart");

    container.innerHTML = "";

    products.forEach((product) => {
        container.insertAdjacentHTML(
            "beforeend",
            `
            <li>
                ${product.name}
                R$ ${product.price}
                <button onClick={removeToCart(${product.id})} id={${product.id}}>
                    Remover do carrinho
                </button>
            </li>
            `
        );
    });
}

function removeToCart(id, products = cart()) {
    const findProduct = products.findIndex((product) => product.id === id);
    const newCartProducts = [...products];

    newCartProducts.splice(findProduct, 1);

    setCart(newCartProducts);

    return showProductsInCart();
}

showProducts();
showProductsInCart();
