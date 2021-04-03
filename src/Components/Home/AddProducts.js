import React from 'react';
import "antd/dist/antd.css";
import axios from 'axios';
import { Button, Form, Row, Col, Input, Modal, message, Select } from 'antd';
const Option = Select.Option;
class AddProduct extends React.Component {
    state = {
        visible: true,
        fileList: [],
        loading: false,
        title_list: [],
        all_values: {},
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loading !== this.state.loading) {
            this.setState({
                loading: nextProps.loading
            })
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        axios({
            method: 'post',
            url: 'api/products/',
            data: this.state.all_values
        });
        message.success("Product add successfully");
        this.setState({
            loading: false,
        });
        axios.get("/api/products/")
            .then(res => {
                this.setState({ products: res.data });
            })
        this.props.toggleAdd()
    }


    setValue = (name, val, e) => {
        let values = this.state.all_values;
        values[name] = val
        this.setState({
            all_values: values
        })
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }
    inputChange = (event) => {
        let td_stage = this.state.all_values;
        td_stage['product_name'] = event.target.value.trim();
        this.setState({
            filter_text: td_stage,
        })
    }

    render() {
        const { category, sub_category } = this.props;
        const { loading, all_values } = this.state;


        let category_option = [];
        if (category && category.length) {
            category_option = category.map(data => <Option style={{ whiteSpace: "initial", wordWrap: "break-word" }}
                key={data.id} value={data.id}><div>{data.category_name}</div></Option>);
        }
        let sub_category_option = [];
        if (sub_category && sub_category.length) {
            sub_category_option = sub_category.map(data => <Option style={{ whiteSpace: "initial", wordWrap: "break-word" }}
                key={data.id} value={data.id}><div>{data.sub_category_name}</div></Option>);
        }

        return (
            <Modal
                title="Add Products"
                centered
                width={600}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.props.toggleAdd}>Cancel</Button>,
                    <Button loading={loading} key="submit" type="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>,
                ]}
            >
                <Form className="add-document">
                    <Row gutter={24}>
                        <Col lg={24}>
                            <Form.Item label="Product Name" name='product_name' rules={[{ required: true }]}>

                                <Input placeholder="Product Name" type='text' onChange={this.inputChange} />

                            </Form.Item>
                        </Col>
                        <Col lg={24}>
                            <Form.Item label="Category" name='category' rules={[{ required: true }]}>

                                <Select

                                    filterOption={false}
                                    onChange={(e, val) =>
                                        this.setValue('category', e, val)}
                                    allowClear={true} showSearch placeholder="Category"

                                >
                                    {category_option}
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col lg={24}>
                            <Form.Item label="Sub Category" name='sub_category' rules={[{ required: true }]}>

                                <Select

                                    filterOption={false}
                                    onChange={(e, val) =>
                                        this.setValue('sub_category', e, val)}
                                    allowClear={true} showSearch placeholder="Sub Category"

                                >
                                    {sub_category_option}
                                </Select>

                            </Form.Item>
                        </Col>



                    </Row>
                </Form>
            </Modal>
        );
    }
}


export default AddProduct;