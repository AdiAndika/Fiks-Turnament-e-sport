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
  notification,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { getData, sendData, deleteData } from "@/utils/api-playlist";  // Pastikan path ini benar
const { Content } = Layout;
const { Title } = Typography;

export default function ReplayManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  // Fetch replays data
  useEffect(() => {
    fetchReplays();
  }, []);

  const fetchReplays = () => {
    setIsLoading(true);
    getData("/api/playlist/17")  // Sesuaikan endpoint dengan API Anda
      .then((resp) => {
        setIsLoading(false);
        if (resp?.datas && Array.isArray(resp.datas)) {
          setDataSource(resp.datas);
        } else {
          showAlert("error", "Data Error", "Invalid data format received from server.");
        }
      })
      .catch((err) => {
        showAlert("error", "Fetch Error", "Unable to fetch data from server.");
        setIsLoading(false);
      });
  };

  const showAlert = (status, title, description) => {
    api[status]({
      message: title,
      description: description,
    });
  };

  // Handle edit functionality
  const handleEdit = (record) => {
    setIsEdit(true);
    setIdSelected(record.id);
    form.setFieldsValue({
      id: record.id,
      title: record.title,
      videoUrl: record.videoUrl,
      thumbnailUrl: record.thumbnailUrl,
    });
    setIsModalOpen(true);
  };

  // Handle delete functionality
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this replay?",
      onOk: () => {
        deleteData(`/api/playlist/17/${id}`, "DELETE")
          .then(() => {
            showAlert("success", "Deleted", "Replay deleted successfully");
            fetchReplays();  // Refresh data after deletion
          })
          .catch((err) => {
            showAlert("error", "Failed to delete replay", err.toString());
          });
      },
    });
  };

  // Handle adding new replay
  const handleAddNew = () => {
    form.resetFields();
    setIsEdit(false);
    setIsModalOpen(true);
  };

  // Handle form submission (Create/Update)
  const handleFinish = (values) => {
    let requestUrl = isEdit ? `/api/playlist/17/${idSelected}/update` : "/api/playlist/17";  // Adjust URL for update or create
    const requestMethod = isEdit ? "PUT" : "POST";  // Use PUT for update

    sendData(requestUrl, values, requestMethod)
      .then((resp) => {
        if (resp?.datas) {
          showAlert("success", "Success", "Replay saved successfully");
          fetchReplays();  // Refresh data after save
          setIsModalOpen(false);
        } else {
          showAlert("error", "Failed to save replay", "Could not save replay data");
        }
      })
      .catch((err) => {
        showAlert("error", "Failed to save replay", err.toString());
      });
  };

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
          <Button type="link" onClick={() => handleEdit(record)}>
            <EditOutlined /> Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            <DeleteOutlined /> Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout style={{ background: "transparent" }}>
      <Content style={{ padding: "20px" }}>
        {contextHolder}
        <Title level={2} style={{ marginBottom: "20px", color: "white" }}>
          Replay Management
        </Title>

        <Card
          title="Recent Replays"
          extra={
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={handleAddNew}
              style={{ backgroundColor: "black", color: "white", borderColor: "black" }}
            >
              Add Replay
            </Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            loading={isLoading}
            pagination={false}
          />
        </Card>

        <Modal
          title={isEdit ? "Edit Replay" : "Add Replay"}
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
              title: "",
              videoUrl: "",
              thumbnailUrl: "",
            }}
          >
            <Form.Item name="id" hidden>
              <Input />
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
