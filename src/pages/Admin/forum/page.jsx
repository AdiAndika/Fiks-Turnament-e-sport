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
  Upload,
  message,
} from "antd";
import {
  UploadOutlined
} from "@ant-design/icons";
import {
  getDataPrivate,
  sendDataPrivate,
  editDataPrivatePut,
  deleteDataPrivate
} from "@/utils/api";

const { Content } = Layout;
const { Title } = Typography;

export default function ForumDiscussions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [editingKey, setEditingKey] = useState(null);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getDataPrivate("/api/v1/forums/admin/read");
      if (res.message === "OK") {
        setDataSource(res.datas);
      } else {
        message.error("Failed to fetch data");
      }
    } catch (err) {
      message.error("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add or Edit Forum
  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("forum_url", values.forum_url);
    if (fileList.length > 0) {
      formData.append("forum_image_path", fileList[0].originFileObj);
    }

    try {
      let res;
      if (editingKey) {
        res = await editDataPrivatePut(`/api/v1/forums/admin/update/${editingKey}`, formData);
      } else {
        res = await sendDataPrivate("/api/v1/forums/admin/create", formData);
      }

      if (res.message === "Inserted" || res.message === "updated") {
        message.success("Forum saved successfully");
        fetchData();
        setIsModalOpen(false);
        setFileList([]);
      } else {
        message.error("Failed to save forum");
      }
    } catch (err) {
      message.error("An error occurred while saving data");
    }
  };

  // Delete Forum
  const handleDelete = async (forumId) => {
    try {
      await deleteDataPrivate(`/api/v1/forums/admin/delete/${forumId}`);
      message.success("Forum deleted successfully");
      fetchData();
    } catch (err) {
      message.error("An error occurred while deleting the forum");
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      title: record.title,
      forum_url: record.forum_url,
    });
    setFileList([]);
    setEditingKey(record.forum_id);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    form.resetFields();
    setEditingKey(null);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "forum_id",
      key: "forum_id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "forum_image_path",
      key: "forum_image_path",
      render: (text) => (
        text ? <img src={`http://127.0.0.1:5000/static/${text}`} alt="forum" width={50} /> : "No Image"
      ),
    },
    {
      title: "Link",
      dataIndex: "forum_url",
      key: "forum_url",
      render: (text) => {
        const validUrl = text.startsWith("http://") || text.startsWith("https://") 
          ? text 
          : `http://${text}`;
        
        return (
          <a href={validUrl} target="_blank" rel="noopener noreferrer">
            Visit
          </a>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.forum_id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Layout style={{ background: "transparent" }}>
      <Content style={{ padding: "20px" }}>
        <Title level={2} style={{ marginBottom: "20px" }}>
          Forum Discussions
        </Title>

        <Card
          title="Recent Threads"
          extra={
            <Button type="primary" onClick={handleAddNew}>
              Add Forum
            </Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="forum_id"
            loading={loading}
          />
        </Card>

        <Modal
          title={editingKey ? "Edit Forum" : "Add Forum"}
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the forum title" }]}
            >
              <Input placeholder="Enter the forum title" />
            </Form.Item>

            <Form.Item
              label="Forum URL"
              name="forum_url"
              rules={[{ required: true, message: "Please enter the forum URL" }]}
            >
              <Input placeholder="Enter the forum URL" />
            </Form.Item>

            <Form.Item label="Forum Image">
              <Upload
                beforeUpload={() => false}
                fileList={fileList}
                onChange={(info) => setFileList(info.fileList)}
                listType="picture"
                accept=".jpg,.jpeg,.png"
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}