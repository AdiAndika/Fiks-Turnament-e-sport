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
} from "antd";

const { Content } = Layout;
const { Title } = Typography;

export default function ForumDiscussions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      id: 1,
      title: "Tournament Strategies",
      imageLink: "https://example.com/image1.jpg",
      pathLink: "https://example.com/forum1",
    },
    {
      key: 2,
      id: 2,
      title: "New Player Introduction",
      imageLink: "https://example.com/image2.jpg",
      pathLink: "https://example.com/forum2",
    },
  ]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image Link",
      dataIndex: "imageLink",
      key: "imageLink",
    },
    {
      title: "Path Link",
      dataIndex: "pathLink",
      key: "pathLink",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: "Are you sure you want to delete this forum?",
      onOk: () => {
        setDataSource(dataSource.filter((item) => item.key !== key));
        message.success("Forum deleted successfully");
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
      // Edit existing forum
      setDataSource(
        dataSource.map((item) => (item.key === values.key ? { ...values } : item))
      );
      message.success("Forum updated successfully");
    } else {
      // Add new forum
      const newForum = {
        ...values,
        key: dataSource.length + 1,
        id: dataSource.length + 1,
      };
      setDataSource([...dataSource, newForum]);
      message.success("Forum added successfully");
    }
    setIsModalOpen(false);
  };

  return (
    <Layout style={{ background: "transparent" }}>
      <Content style={{ padding: "20px" }}>
        <Title level={2} style={{ marginBottom: "20px", color: "white" }}>
          Forum Discussions
        </Title>

        <Card
          title="Recent Threads"
          extra={
            <Button 
              type="primary" 
              onClick={handleAddNew}
              style={{ backgroundColor: 'black', color: 'white', borderColor: 'black' }}
            >
              Add Forum
            </Button>}
        >
          <Table dataSource={dataSource} columns={columns} rowKey="key" />
        </Card>

        <Modal
          title="Add / Edit Forum"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{ id: "", title: "", imageLink: "", pathLink: "" }}
          >
            <Form.Item name="key" hidden>
              <Input type="hidden" />
            </Form.Item>

            <Form.Item
              label="ID"
              name="id"
              rules={[{ required: true, message: "Please enter the ID" }]}
            >
              <Input placeholder="Enter the forum ID" />
            </Form.Item>

            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input placeholder="Enter the forum title" />
            </Form.Item>

            <Form.Item
              label="Image Link"
              name="imageLink"
              rules={[{ required: true, message: "Please enter the image link" }]}
            >
              <Input placeholder="Enter the image link" />
            </Form.Item>

            <Form.Item
              label="Path Link"
              name="pathLink"
              rules={[{ required: true, message: "Please enter the path link" }]}
            >
              <Input placeholder="Enter the path link" />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                style={{ backgroundColor: 'black', color: 'white', borderColor: 'black' }}
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
