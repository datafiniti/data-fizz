import React from 'react';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: '',
            status: '',
            number: '',
            price: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.add = this.add.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    add(e) {
        e.preventDefault();
        // this.props.addProduct(this.state);
    }

    render() {
        const { loading } = this.props;

        if (loading) {
            return (
                <div>
                    <p>Loading</p>
                </div>
            );
        }

        return (
            <div className='add-product-container'>
                <header className='add-product-header modal-form-header'>
                    <h2>Add A Product</h2>
                </header>

                <div className='add-product-body form-container modal-form-container'>
                    <div className='form-wrapper'>
                        <input
                            type='text'
                            name='name'
                            id='product-name'
                            className='form-input'
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor='product-name'>Name</label>
                    </div>

                    <div className='form-wrapper'>
                        <input
                            type='text'
                            name='category'
                            id='product-category'
                            className='form-input'
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor='product-category'>Category</label>
                    </div>

                    <div className='form-wrapper'>
                        <input
                            type='number'
                            name='number'
                            id='product-number'
                            className='form-input'
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor='product-number'>Number</label>
                    </div>

                    <div className='form-wrapper'>
                        <input
                            type='number'
                            name='price'
                            id='product-price'
                            className='form-input'
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor='product-price'>Price</label>
                    </div>

                    <div className='form-submit'>
                        <button type='button' onClick={this.add}>
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Add;