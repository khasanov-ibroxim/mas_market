import React, { useEffect, useState } from 'react';
import { Table, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { $API } from '../../../utils/http.jsx';
import {ADMIN_CHANGE_PRODUCT, ADMIN_CHANGE_PRODUCT_EDIT, ADMIN_DASHBOARD} from '../../../utils/const/consts.jsx';

const ChangeProduct = () => {
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const getDataSource = async (page = 1) => {
        try {
            const res = await $API.get('/api/product-menu/', {
                params: {
                    page: parseInt(page),
                },
            });
            setDataSource(res.data.results);
            setPagination(prev => ({
                ...prev,
                total: res.data.count,
                current: page,
            }));
        } catch (error) {
            console.log(error);
        }
    };
    console.log(dataSource)
    const handleTableChange = (page) => {
        getDataSource(page);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            onOk: async () => {
                try {
                    await $API.delete(`/api/product-menu/${id}/`);
                    message.success('Product deleted successfully');
                    getDataSource(pagination.current); // Refresh data
                } catch (error) {
                    message.error('Failed to delete product');
                    console.log(error);
                }
            },
            okText: 'Yes',
            cancelText: 'No',
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Link to={ADMIN_DASHBOARD+ADMIN_CHANGE_PRODUCT_EDIT.replace(":editID", record.id)}>Edit</Link>

                    <button onClick={() => handleDelete(record.id)}>Delete</button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        getDataSource(); // Fetch initial data on mount
    }, []);

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey="id"
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    onChange: handleTableChange,
                }}
            />
        </div>
    );
};

export default ChangeProduct;
