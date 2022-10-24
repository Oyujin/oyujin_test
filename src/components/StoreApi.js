import React, { useState, useEffect } from 'react'

const StoreApi = () => {
    const [searchValue, setSearchValue] = useState("")
    // const [searchButtonClicked, setSearchButtonClicked] = useState(true)
    const [product, setProduct] = useState([])
    const [filteredProds, setFilteredProds] = useState([])

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value)
        //console.log(searchValue, 'sjgdhajsgd')
    }
    //clear button to clear the input
    const handleClear = () => {
        setSearchValue("")
    }

    useEffect(() => {

        fetch("https://fakestoreapi.com/products", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((productsArray) => {
                const arrays = productsArray.map((prod) => {
                    return [prod.id, prod.title, prod.price, prod.description, prod.category, prod.image, prod.rating.rate, prod.rating.count]
                })
                setProduct(arrays)
            })
    })



    const handleSearchButton = () => {
        console.log(product)
        const prods = product.filter((elements) => {
            return (elements[1]).includes(searchValue)
        })
        // console.log(prods)
        setFilteredProds(prods)
    }

    return (
        <div>
            <input type="text" value={searchValue} onChange={handleSearchValueChange} />
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleSearchButton}>Search</button>
            <div>
                {filteredProds.map((prod) => {
                    return <div className='contents' border='10px' >
                        <img src={prod[5]} alt='im' height={150} float={'left'}></img>
                        <p>ID: {prod[0]}</p>
                        <p>TITLE: {prod[1]}</p>
                        <p>PRICE: {prod[2]}</p>
                        <p>CATEGORY: {prod[3]}</p>
                        <p>DESCRIPTION: {prod[4]}</p>
                        <p>RATE: {prod[6]}</p>
                        <p>COUNT: {prod[7]}</p>
                    </div>

                })}
            </div>
            {/* <h1>You searched for = {searchValue}</h1> */}
        </div>
    )

}


export default StoreApi