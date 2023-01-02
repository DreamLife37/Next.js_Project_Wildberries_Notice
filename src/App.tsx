import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

function App() {

    // useEffect(() => {
    //     setInterval(() => {
    //         items.forEach((item) => {
    //             getPriceItem(item)
    //         })
    //
    //         console.log('Проверка цен выполнена')
    //     }, 140000)
    // })

    const testPrice = () => {
        items.forEach((item, index) => {
            getPriceItem(item, index)
        })
    }


    type item = {
        id: number
        name: string,
        priceOld: string,
        priceNew: string
    }

    const [inputId, setInputId] = useState('')
    const [items, setItems] = useState<Array<item>>([
        {
            id: 137524348,
            name: "13\" Pentium 4ядра 4ГБ eMMC 128ГБ Windows10 Pro",
            priceNew: "",
            priceOld: "15790"
        },
        {
            id: 110358620,
            name: "Ноутбук Ryzen 5 5500U 8Gb SSD256Gb 15.6\" TN FHD noOS black",
            priceNew: "50000",
            priceOld: "68990",
        }
    ])


    const getInfoItem = () => {
        axios.get(`https://card.wb.ru/cards/detail?locale=ru&nm=${inputId}`)
            .then(function (response) {
                console.log(items)
                console.log(response.data.data.products[0])
                const findItem = items.find((item) => {
                    return item.id === response.data.data.products[0].id
                })
                if (!findItem) {
                    let items1 = []
                    items1 = [...items, {
                        id: response.data.data.products[0].id,
                        name: response.data.data.products[0].name,
                        priceOld: String(response.data.data.products[0].salePriceU).slice(0, -2),
                        priceNew: ''
                    }]
                    console.log(items1)
                    setItems(items1)
                } else {
                    console.log('Такой товар уже добавлен')
                }


                console.log(findItem)
                console.log(response.data.data.products[0].salePriceU)


            })
            .catch(function (error) {
                // обработка ошибки
                console.log(error);
            })
            .then(function () {
                // выполняется всегда
            });
    }
    const getPriceItem = (item: item, index: number) => {
        axios.get(`https://card.wb.ru/cards/detail?locale=ru&nm=${item.id}`)
            .then(function (response) {
                console.log(response.data.data.products)
                const currentObject = items.find((i) => {
                    return i.id === item.id
                })
                if (!item.priceNew) {
                    if (item.priceOld === String(response.data.data.products[0].salePriceU).slice(0, -2)) {
                        console.log('Цена не изменилась')
                    } else {
                        console.log('Цена изменилась')
                        if (currentObject) {
                            currentObject.priceNew = String(response.data.data.products[0].salePriceU).slice(0, -2);
                            setItems([...items])
                        }
                    }
                } else {
                    if (item.priceNew === String(response.data.data.products[0].salePriceU).slice(0, -2)) {
                        console.log('Цена не изменилась')
                    } else {
                        console.log('Цена изменилась')
                        if (currentObject) {
                            currentObject.priceOld = item.priceNew;
                            currentObject.priceNew = String(response.data.data.products[0].salePriceU).slice(0, -2);
                            setItems([...items])
                        }
                    }
                }
            })

            .catch(function (error) {
                // обработка ошибки
                console.log(error);
            })
            .then(function () {
                // выполняется всегда
            });
    }

    return (
        <div className="App">
            <header className="App-header">
                <input onChange={event => setInputId(event.currentTarget.value)}/>
                <button onClick={getInfoItem}>Добавить</button>
                <div>Список отслеживаемых</div>
                <div>{items.map((item, index) => {
                    return <div key={index}>
                        <span style={{padding: '10px'}}>{index + 1}</span>
                        <span style={{padding: '10px'}}>{item.id}</span>
                        <span style={{padding: '10px'}}>{item.name}</span>
                        <span style={{padding: '10px'}}>{item.priceOld}</span>
                        <span style={{padding: '10px'}}>{item.priceNew}</span>
                    </div>
                })}</div>

                <button onClick={testPrice}>Проверить цены</button>
            </header>
        </div>
    );
}

export default App;
