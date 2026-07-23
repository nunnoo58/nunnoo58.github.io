let list = []
let cart = []
$.get('../json/store.json')
    .done((data) => {
        data.products.forEach((a, i) => {
        list.push(a)
        addProduct(i)
        cart.push({
            product: a.title,
            qty: 0,
            price: a.price
        })
    });
})



function addProduct(num){
    $('.con').append(`
        <div class="card" data-index="${num}" draggable="true">
        <image src='../image/pr${num+1}.jpg'>
        <h3>${list[num].id + 1}</h3>
        <h3>${list[num].title}</h3>
        <h5>가격: ${list[num].price}</h5>
        <p>${list[num].brand}</p>
        <button class='btn btn-dark'>구매</button>
        </div>
        `)
    }
    
    $('#search-box').on('submit', (e) => {
        e.preventDefault()
    })
    
    $('#search').on('focus', (e) => {
        $(e.target).attr('placeholder', '')
    })
    
    let search = ''
$('#search').on('blur', (e) => {
    $(e.target).attr('placeholder', '이름이랑 브랜드')
})

$('#search').on('input', () => {
    search = $('#search').val()

    $('.con').html('')
    list.forEach((e, i) => {
        if (e.title.includes(search) || e.brand.includes(search)) {
            addProduct(i)
        }
    });
})

$('.con').on('click', '.btn', (e, i) => {
    let index = $(e.target).parents().data('index')
    cart[index].qty++
    alert(`장바구니에 ${cart[index].product}이(가) ${cart[index].qty}개 있습니다`)

})

$('.reset').on('click', () => {
    if (confirm('장바구니를 비울까')) {
        cart.forEach((item) => {
            item.qty = 0;
        });
    }
})

let pay = 0
$('.purchase').on('click', () => {

    
    cart.forEach((list) => {
        pay = pay + list.price * list.qty
    })
    if (pay == 0){
        alert('장바구니가 비었습니다.')
        return
    }
    $('#total-price').text(`총 가격: ${pay}원`)
    $('.modal').removeClass('hide-none')
})

$('.close').on('click', () => {
    $('.modal').addClass('hide-none')
    $('#user-name').val('')
    $('#user-number').val('')
    pay = 0
})

$('#purchase-form').on('submit', (e) => {
    let phone = $('#user-number').val()
    if ((/^010-\d{4}-\d{4}$/.test(phone) || /^010\d{8}$/.test(phone))){
        alert('성공')
        e.preventDefault()
        $('.canvas').removeClass('hide-none')
    }
    else{
        alert('똑바로 적어라')
        $('#user-number').val('')
        e.preventDefault()
    }
})

let canvas = $('#canvas')[0];
let c = canvas.getContext('2d');


$('.submit').on('click', () => {
    $(document).ready(() => {
        
        document.fonts.load('20px "site"').then(() => {
            c.font = '20px "site"'
            // c.fillText('영수증', 350, 60)
            let nth = 0
            cart.forEach((item, i,) => {
                if (item.qty > 0){
                    c.fillText(`${item.product}`, 0, 120 * nth + 30 + i * 20)
                    c.fillText(`가격: ${item.price}원`, 0, 120 * nth + 60 + i * 20)
                    c.fillText(`수량: ${item.qty}ea`, 0, 120 * nth + 90 + i * 20)
                    c.fillText(`합계: ${item.price * item.qty}원`, 0, 120 * nth + 120 + i * 20)

                    nth++
                }
                
            });
            c.fillText(`총 합계: ${pay}원`, 0, 120 * nth + 120)
            
        })
    })
})

$('.canvas-close').on('click', () => {
    $('.canvas').addClass('hide-none')
    c.clearRect(0, 0, canvas.width, canvas.height);
})