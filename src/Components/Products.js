import React, {Component} from 'react';
import axios from 'axios';

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount(){
        axios.get('/api/products')
        .then(res => this.setState({products: res.data}))
        .catch(err => console.log(err));
    }

    render(){
        const mappedProducts = this.state.products.map((product, i) => (
            <div key={i} className='product-container'>
                <img src={product.image} alt={product.name} className='product-image'/>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button>Add to Cart</button>
            </div>
        ))
        return (
            <div className='products'>
                {mappedProducts}
            </div>
        )
    }
}

export default Products;