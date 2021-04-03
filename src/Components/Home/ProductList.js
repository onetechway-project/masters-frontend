import React, { Component } from "react";
import { Table, Button } from 'antd';
import axios from 'axios';
import AddProducts from './AddProducts'

const columns = [
    {
        title: 'Products',
        dataIndex: 'product_name',
        sorter: (a, b) => a.product_name.length - b.product_name.length,
    },
    {
        title: 'Sub Category',
        dataIndex: 'sub_category_name',
        sorter: (a, b) => a.sub_category_name.length - b.sub_category_name.length,
    },
    {
        title: 'Category',
        dataIndex: 'category_name',
         sorter: (a, b) => a.category_name.length - b.category_name.length,
        
    },
];

class ProductList extends Component {

    state = {
        products: [],
        category: [],
        sub_category: [],
        showAdd: false,
    }


    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    componentDidMount() {
        axios.get("/api/products/")
            .then(res => {
                this.setState({ products: res.data });
            })
        axios.get("/api/sub-category/")
            .then(res => {
                this.setState({ sub_category: res.data });
            })
        axios.get("/api/category/")
            .then(res => {
                this.setState({ category: res.data });
            })
    }
    toggleAdd = () => {
        const { showAdd } = this.state;
        this.setState({
            showAdd: !showAdd
        });
    }

    render() {

        const { products, showAdd, category, sub_category } = this.state;

        return (
            <>
                {
                    showAdd &&
                    <AddProducts toggleAdd={this.toggleAdd} category={category} sub_category={sub_category} />
                }
                <Button onClick={this.toggleAdd} >Add Product</Button>


                <Table columns={columns} dataSource={products} onChange={this.onChange} />

            </>
        )
    }
}


export default ProductList;