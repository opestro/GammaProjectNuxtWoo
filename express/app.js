const express = require('express')
const app = express()
const port = 3055
const axios = require('axios')
var cors = require('cors')
require('dotenv').config()
const corsOptions = {
    origin: '*', // Replace with your allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions))
const apiKey = process.env.WP_AUTH_TEST


app.get('/checkout', async (req, res) => {
    const bodyInfo = JSON.parse(req?.query.data) || null
    console.log(bodyInfo.line_items[0])

    if (bodyInfo) {
        const checkout = {
            method: 'POST',
            url: 'https://wp.gamaoutillage.net/wp-json/wc/v3/orders',
            headers: {
                Authorization: apiKey
            },
            params: {
                payment_method: bodyInfo.payment_method,
                payment_method_title: 'Paiement à la livraison',
                billing: bodyInfo.billing,
                shipping: bodyInfo.shipping,
                set_paid: false,
                line_items: bodyInfo.line_items,
                shipping_lines: bodyInfo.shipping_lines
            },
        }
        await axios.request(checkout).then((data) => {
            const dataJ = data.data
            res.send(dataJ)
        })
    } else {
        res.send('fill all data')
    }

    // res.send(dataJ)
}
)

app.get('/products', async (req, res) => {

    const page = req?.query || 1
    const products = {
        method: 'GET',
        url: 'https://wp.gamaoutillage.net/wp-json/wc/v3/products',
        params: page,
        headers: {
            Authorization: apiKey
        }
    }
    await axios.request(products).then((data) => {
        const dataJ = data.data
        res.send(dataJ)
    })
})


app.get('/product', async (req, res) => {

    const id = req?.query.id || 1
    const products = {
        method: 'GET',
        url: 'https://wp.gamaoutillage.net/wp-json/wc/v3/product/${id}',

        headers: {
            Authorization: apiKey
        }
    }
    await axios.request(products).then((data) => {
        const dataJ = data.data
        res.send(dataJ)
    })
})



app.get('/products/search', async (req, res) => {

    const page = req?.query || 1
    let products = {
        method: 'GET',
        url: 'https://wp.gamaoutillage.net/wp-json/wc/v3/products',
        params: page,
        headers: {
            Authorization: apiKey
        }
    }
    let reorderedData = []
    await axios.request(products).then((data) => {
        let productsBySearch = data.data
        const searchTerms = page.search.toLowerCase().split(' ').filter(term => term.trim() !== '');
        console.log('1')
        let filteredProducts = productsBySearch.filter(product => {
            const productName = product.name.toLowerCase();
            // Check if all search terms are included in the product name
            return productName.toLowerCase().includes(searchTerms);
        });
        console.log('2')
        const remainingData = productsBySearch.filter(product => !product.name.toLowerCase().includes(searchTerms));
        console.log('3')
        reorderedData = filteredProducts.concat(remainingData);
        console.log('4')
        if (reorderedData.length <= 0) {
            //  console.log('reorderedData')
            return reorderedData
        } else {
            // console.log(reorderedData)
            res.send(reorderedData)
        }
    })
    // console.log(reorderedData)
    if (reorderedData.length <= 0) {
        //   console.log('im in')
        const productBySku = {
            method: 'GET',
            url: 'https://wp.gamaoutillage.net/wp-json/wc/v3/products',
            params: { 'per_page': 50, 'page': 1, 'sku': page.search },
            headers: {
                Authorization: apiKey
            }
        }
        await axios.request(productBySku).then((data) => {
            // console.log(data.data)
            reorderedData = data.data
            res.send(reorderedData)
          //  return reorderedData
        })
    }
})

app.get('/orders', async (req, res) => {

    const page = req?.query || 1
    const products = {
        method: 'GET',
        url: 'https://wp.gamaoutillage.net/wp-json/wc/v3/orders',
        params: page,
        headers: {
            Authorization: apiKey
        }
    }
    await axios.request(products).then((data) => {
        const dataJ = data.data
        res.send(dataJ)
    })
}
)
app.get('/orders/order', async (req, res) => {

    const id = req?.query.id
    const products = {
        method: 'GET',
        url: 'https://wp.gamaoutillage.net/wp-json/wc/v3/orders/' + Number(id),
        headers: {
            Authorization: apiKey
        }
    }
    console.log(id)
    console.log(products)
    await axios.request(products).then((data) => {
        const dataJ = data.data
        // console.log(dataJ)
        res.send(dataJ)
    })
}
)

app.get('/categories', async (req, res) => {
    const paramsObject = req?.query || 1
    console.log(paramsObject)
    const products = {
        method: 'GET',
        url: 'https://wp.gamaoutillage.net/wp-json/wc/v3/products/categories',
        params: paramsObject,
        headers: {
            Authorization: apiKey
        }
    }
    await axios.request(products).then((data) => {
        const dataJ = data.data
        res.send(dataJ)
    })
}
)

app.put('/products/update/', async (req, res) => {
    const paramsObject = await req.query
    const linkId = 'https://wp.gamaoutillage.net/wp-json/wc/v3/products/' + paramsObject.id
    const productDetail = JSON.parse(paramsObject.data)
    console.log(productDetail)
    const product = {
        method: 'PUT',
        url: linkId,
        data: {
            name: productDetail.name,
            categories: productDetail.categories,
            stock_status: productDetail.stock_status,
            regular_price: String(productDetail.regular_price),
            stock_quantity: String(productDetail.stock_quantity)
        },
        headers: {
            Authorization: apiKey
        }
    }
    await axios.request(product).then((data) => {
        const dataJ = data.data
        res.send(dataJ)
    }).catch((e) => {
        console.log(e)
    })

}
)



app.get('/', (req, res) => {
    res.send('you need api key to access')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})