const nameInput = document.getElementById('title')
const originPriceInput = document.getElementById('origin_price')
const priceInput = document.getElementById('price')
const productTable = document.querySelector('#productTable table tbody')
const productNum = document.getElementById('productCount')
const btnAddProduct = document.getElementById('addProduct')
const btnRemoveAll = document.getElementById('clearAll')

// 定義資料
let productData = []

// 渲染資料
function render (params) {
  let template = ''
  productData.forEach((item, key) => {
    template += `
    <tr>
        <td>${item.name}</td>
        <td>${item.originPrice}</td>
        <td>${item.price}</td>
        <td>
            <div class="form-check form-switch d-flex align-items-center">
                <input class="form-check-input active" type="checkbox" id="switchCheck" ${
                  item.isEnabled ? 'checked' : ''
                } data-id="${key}">
                <label class="form-check-label" for="switchCheck"> ${
                  item.isEnabled ? '啟用' : '未啟用'
                }</label>
            </div>
        </td>
        <td><button type="button" id="removeProduct" class="btn remove" data-id="${key}">刪除</button></td>
    </tr>`
  })
  productTable.innerHTML = template
  productNum.textContent = productData.length
  console.log(productData)

  // 監聽，active button，remove button才能正常運作
  const btnActiveProduct = document.querySelectorAll('.active')
  btnActiveProduct.forEach((btn) =>
    btn.addEventListener('click', activateProduct)
  )
  const btnRemoveProduct = document.querySelectorAll('.remove')
  btnRemoveProduct.forEach((btn) =>
    btn.addEventListener('click', removeProduct)
  )
}

function validateForm (name, originPrice, price) {
  if (name === '' || originPrice === '' || price === '') {
    alert('資料不能留空')
    return false
  } else {
    return true
  }
}

// 新增資料
btnAddProduct.addEventListener('click', addProduct)
function addProduct () {
  const name = nameInput.value.trim()
  const originPrice = parseInt(originPriceInput.value)
  const price = parseInt(priceInput.value)
  const newData = {
    id: Math.floor(Date.now()),
    name,
    originPrice,
    price,
    isEnabled: false
  }
  if (validateForm(name, originPrice, price)) {
    nameInput.value = ''
    originPriceInput.value = ''
    priceInput.value = ''
    productData.push(newData)
    render()
  }
}

// 啟用資料
function activateProduct (evt) {
  const key = evt.target.dataset.id
  productData[key].isEnabled = !productData[key].isEnabled
  render()
}

// 刪除資料
function removeProduct (evt) {
  const key = evt.target.dataset.id
  productData.splice(key, 1)
  render()
}

btnRemoveAll.addEventListener('click', removeAll)
function removeAll () {
  productData = []
  render()
}
