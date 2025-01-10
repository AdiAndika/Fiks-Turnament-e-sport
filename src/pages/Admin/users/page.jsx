import React, { useState, useEffect } from "react";
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
  Spin,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getDataPrivate, editDataPrivatePut, deleteDataPrivate, sendDataPrivate } from "@/utils/api";

const { Content } = Layout;
const { Title } = Typography;

export default function ManageUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataUsers, setDataUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { title: "ID", dataIndex: "user_id", key: "user_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Image URL", dataIndex: "image_url", key: "image_url" },
    { title: "Role", dataIndex: "position", key: "position" },
    { title: "Registered Time", dataIndex: "created_at", key: "created_at" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.user_id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getDataPrivate("/api/v1/users/admin/read");
      if (response?.datas) {
        setDataUsers(response.datas);
        message.success("Users fetched successfully!");
      } else {
        message.error("Failed to fetch users.");
      }
    } catch (error) {
      message.error("Error fetching users.");
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      onOk: async () => {
        try {
          const response = await deleteDataPrivate(`/api/v1/users/admin/delete/${userId}`);
          if (response?.status === 204 || (response?.status >= 200 && response?.status <= 299)) {
            setDataUsers(dataUsers.filter((item) => item.user_id !== userId));
            message.success("User deleted successfully!");
          } else {
            message.error("Failed to delete user.");
          }
        } catch (error) {
          message.error("Error deleting user.");
          console.error("Delete Error:", error);
        }
      },
      okButtonProps: {
        style: { backgroundColor: "black", color: "white", borderColor: "black" },
      },
    });
  };

  const handleAddNew = () => {
    form.resetFields();
    form.setFieldsValue({ user_id: null, image_url: null, password: "" }); // Clear specific fields
    setIsModalOpen(true);
  };

  const handleFinish = async (values) => {
    try {
      const requestData = { ...values };
  
      if (values.user_id) {
        // Remove password for edits
        delete requestData.password;
        const response = await editDataPrivatePut(`/api/v1/users/admin/update/${values.user_id}`, requestData);
        if (response?.status === 204 || (response?.status >= 200 && response?.status <= 299)) {
          message.success("User updated successfully!");
          fetchData();
        } else {
          message.error("Failed to update user.");
        }
      } else {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("username", values.username);
        formData.append("password", values.password); // Add password for new users
        formData.append("position", values.position);
        formData.append(
          "image_url",
          values.image_url
        );
    
        const response = await sendDataPrivate(`/api/v1/users/admin/create`, formData);
    
        if (response?.message) {
          message.success("User added successfully!");
          fetchData();
        } else {
          message.error("Failed to add user.");
        }
      }
    } catch (error) {
      message.error("An error occurred while submitting user data.");
      console.error("Submit Error:", error);
    } finally {
      setIsModalOpen(false);
    }
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
              style={{ backgroundColor: "black", color: "white", borderColor: "black" }}
            >
              Add User
            </Button>
          }
        >
          {isLoading ? (
            <Spin tip="Loading users..." />
          ) : (
            <Table
              dataSource={dataUsers}
              columns={columns}
              rowKey="user_id"
              pagination={{ pageSize: 5, showSizeChanger: false }}
            />
          )}
        </Card>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={8}>
            <Card title="User Statistics">
              <Statistic title="Total Users" value={dataUsers.length} />
            </Card>
          </Col>
        </Row>

        <Modal
          title="Add / Edit User"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item label="ID" name="user_id" hidden={!form.getFieldValue("user_id")}>
              <Input placeholder="Enter user ID" />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter the name" }]}>
              <Input placeholder="Enter name" />
            </Form.Item>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter the username" }]}>
              <Input placeholder="Enter username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: !form.getFieldValue("user_id"), message: "Please enter the password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
              hidden={!!form.getFieldValue("user_id")}
            >
                <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item label="Image URL" name="image_url" hidden={!form.getFieldValue("user_id")}>
              <Input placeholder="Enter image URL" />
            </Form.Item>
            <Form.Item label="Role" name="position" rules={[{ required: true, message: "Please enter the role" }]}>
              <Input placeholder="Enter role" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: "black", color: "white", borderColor: "black" }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}
