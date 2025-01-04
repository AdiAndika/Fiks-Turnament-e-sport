import React, { useState } from "react";
import {
  Layout,
  Typography,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Statistic,
  Row,
  Col,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

export default function ManageUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      id: 1,
      username: "user1",
      email: "user1@example.com",
    },
    {
      key: 2,
      id: 2,
      username: "user2",
      email: "user2@example.com",
    },
  ]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue({
      key: record.key,
      id: record.id,
      username: record.username,
      email: record.email,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      onOk: () => {
        setDataSource(dataSource.filter((item) => item.key !== key));
        message.success("User deleted successfully");
      },
      okButtonProps: {
        style: { backgroundColor: "black", color: "white", borderColor: "black" },
      },
    });
  };

  const handleAddNew = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleFinish = (values) => {
    if (values.key) {
      // Edit existing user
      setDataSource(
        dataSource.map((item) =>
          item.key === values.key ? { ...values } : item
        )
      );
      message.success("User updated successfully");
    } else {
      // Add new user
      const newUser = {
        ...values,
        key: dataSource.length + 1,
        id: dataSource.length + 1,
      };
      setDataSource([...dataSource, newUser]);
      message.success("User added successfully");
    }
    setIsModalOpen(false);
  };

  return (
    <Layout style={{ background: "transparent" }}>
      <Content style={{ padding: "20px" }}>
        <Title level={2} style={{ marginBottom: "20px", color: "white" }}>
          Manage Users
        </Title>

        <Card
          title="User List"
          extra={
            <Button
              type="primary"
              onClick={handleAddNew}
              style={{
                backgroundColor: "black",
                color: "white",
                borderColor: "black",
              }}
            >
              Add User
            </Button>
          }
        >
          <Table dataSource={dataSource} columns={columns} rowKey="key" />
        </Card>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={8}>
            <Card title="User Statistics">
              <Statistic title="Total Users" value={1234} />
              <Statistic title="Active Users (30 days)" value={789} />
              <Statistic title="New Users (30 days)" value={56} />
            </Card>
          </Col>
        </Row>

        <Modal
          title="Add / Edit User"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              id: "",
              username: "",
              email: "",
            }}
          >
            <Form.Item name="key" hidden>
              <Input type="hidden" />
            </Form.Item>

            <Form.Item
              label="ID"
              name="id"
              rules={[{ required: true, message: "Please enter the user ID" }]}
            >
              <Input placeholder="Enter user ID" />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter the username" }]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter the email" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "black",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}
