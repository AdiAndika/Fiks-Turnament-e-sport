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
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

export default function ReplayManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      id: 1,
      title: "Final: Player1 vs Player2",
      videoUrl: "https://example.com/video1",
      thumbnailUrl: "https://example.com/thumbnail1",
    },
    {
      key: 2,
      id: 2,
      title: "Semi-Final: Player3 vs Player4",
      videoUrl: "https://example.com/video2",
      thumbnailUrl: "https://example.com/thumbnail2",
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
      title: "Video URL",
      dataIndex: "videoUrl",
      key: "videoUrl",
    },
    {
      title: "Thumbnail URL",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
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
      title: "Are you sure you want to delete this replay?",
      onOk: () => {
        setDataSource(dataSource.filter((item) => item.key !== key));
        message.success("Replay deleted successfully");
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
      setDataSource(
        dataSource.map((item) => (item.key === values.key ? { ...values } : item))
      );
      message.success("Replay updated successfully");
    } else {
      const newReplay = {
        ...values,
        key: dataSource.length + 1,
        id: dataSource.length + 1,
      };
      setDataSource([...dataSource, newReplay]);
      message.success("Replay added successfully");
    }
    setIsModalOpen(false);
  };

  return (
    <Layout style={{ background: "transparent" }}>
      <Content style={{ padding: "20px" }}>
        <Title level={2} style={{ marginBottom: "20px", color: "white" }}>
          Replay Management
        </Title>

        <Card
          title="Recent Replays"
          extra={
            <Button
              type="primary"
              onClick={handleAddNew}
              style={{ backgroundColor: "black", color: "white", borderColor: "black" }}
            >
              Add Replay
            </Button>
          }
        >
          <Table dataSource={dataSource} columns={columns} rowKey="key" />
        </Card>

        <Modal
          title="Add / Edit Replay"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{ id: "", title: "", videoUrl: "", thumbnailUrl: "" }}
          >
            <Form.Item name="key" hidden>
              <Input type="hidden" />
            </Form.Item>

            <Form.Item
              label="ID"
              name="id"
              rules={[{ required: true, message: "Please enter the ID" }]}
            >
              <Input placeholder="Enter the replay ID" />
            </Form.Item>

            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input placeholder="Enter the replay title" />
            </Form.Item>

            <Form.Item
              label="Video URL"
              name="videoUrl"
              rules={[{ required: true, message: "Please enter the video URL" }]}
            >
              <Input placeholder="Enter the video URL" />
            </Form.Item>

            <Form.Item
              label="Thumbnail URL"
              name="thumbnailUrl"
              rules={[{ required: true, message: "Please enter the thumbnail URL" }]}
            >
              <Input placeholder="Enter the thumbnail URL" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "black", color: "white", borderColor: "black" }}
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
