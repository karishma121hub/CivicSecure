const product = [
    {
      id: 0,
      image: 'maja.jpg',
      title: 'Mazaa Mango  Drink',
      price: 10,
    },
    {
      id: 1,
      image: 'realMixedjuice.jpg',
      title: 'Real Mixed Fruit Juice',
      price: 15,
    },
    {
      id: 2,
      image: 'frooti.jpg',
      title: 'Frooti Juice',
      price: 10,
    },
    {
      id: 3,
      image: 'maja.jpg',
      title: ' Mazza Juice ',
      price: 10,
    },
    {
      id: 4,
      image: 'chips.jpg',
      title: 'Kurkure Chips',
      price: 10,
    },
    {
      id: 5,
      image: 'Lays.jpg',
      title: 'Lays Sizzling',
      price: 10,
    },
    {
      id: 6,
      image: 'tooyumm.jpg',
      title: 'Too Yumm Chips',
      price: 10,
    },
    {
      id: 7,
      image: 'bingo.jpg',
      title: 'Bingo Chips',
      price: 10,
    },
    {
      id: 8,
      image: 'bourbon.jpg',
      title: 'Bourbon Choco Biscuit ',
      price: 15,
    },
    {
      id: 9,
      image: 'parleG.jpg',
      title: 'Parle-G Biscuit ',
      price: 10,
    },
    {
      id: 9,
      image: 'oreo.jpg',
      title: 'Oreo Biscuit ',
      price: 10,
    },
    {
      id: 10,
      image: 'top.jpg',
      title: 'Top Butter Biscuit ',
      price: 15,
    },
    {
      id: 11,
      image: 'bourbon.jpg',
      title: 'Bourbon Choco Biscuit ',
      price: 15,
    },
  ];
  const categories = [...new Set(product.map((item) => { return item }))]
  let i = 0;
  document.getElementById('root').innerHTML = categories.map((item) => {
    var { image, title, price } = item;
    return (
      `<div class='box'>
        <div class='img-box'>
          <img class='images' src=${image}></img>
        </div>
        <div class='bottom'>
          <p>${title}</p>
          <h2>$ ${price}.00</h2>` +
          "<button onclick='addtocart(" + (i++) + ")'>Add to cart</button>" +
        `</div>
      </div>`
    )
  }).join('')
  
  var cart = [];
  
  function addtocart(a) {
    cart.push({ ...categories[a] });
    displaycart();
  }
  function delElement(a) {
    cart.splice(a, 1);
    displaycart();
  }
  
  function displaycart() {
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
      document.getElementById('cartItem').innerHTML = "Your cart is empty";
      document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    }
    else {
      document.getElementById("cartItem").innerHTML = cart.map((items) => {
        var { image, title, price } = items;
        total = total + price;
        document.getElementById("total").innerHTML = "$ " + total + ".00";
        return (
          `<div class='cart-item'>
            <div class='row-img'>
              <img class='rowimg' src=${image}>
            </div>
            <p style='font-size:12px;'>${title}</p>
            <h2 style='font-size: 15px;'>$ ${price}.00</h2>` +
          "<i class='fa-solid fa-trash'  onclick='delElement(" + (j++) + ")'></i></div>"
        );
      }).join('');
    }
  }
  document.getElementById("cart-icon").addEventListener("click", function () {
    const cart = document.getElementById("my-cart");
    if (cart.style.display === "none" || cart.style.display === "") {
        cart.style.display = "block"; // Show the cart
    } else {
        cart.style.display = "none"; // Hide the cart
    }
});