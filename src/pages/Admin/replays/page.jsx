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
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { getData, sendData, deleteData } from "@/utils/api-playlist";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export default function ReplayManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const genres = [
    { id: 1, name: "Music" },
    { id: 2, name: "Song" },
    { id: 3, name: "Education" },
    { id: 4, name: "Others" },
    { id: 5, name: "Movie" },
  ];

  useEffect(() => {
    fetchReplays();
  }, []);

  const fetchReplays = () => {
    setIsLoading(true);
    getData("/api/playlist/17")
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

  const handleEdit = (record) => {
    setIsEdit(true);
    setIdSelected(record.id_play);
    form.setFieldsValue({
      play_name: record.play_name,
      play_description: record.play_description,
      play_url: record.play_url,
      play_thumbnail: record.play_thumbnail,
      play_genre: record.play_genre,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this replay?",
      onOk: () => {
        deleteData(`/api/playlist/${id}`, "DELETE")
          .then(() => {
            showAlert("success", "Deleted", "Replay deleted successfully");
            fetchReplays();
          })
          .catch((err) => {
            showAlert("error", "Failed to delete replay", err.toString());
          });
      },
      okButtonProps: {
        style: { backgroundColor: "black", borderColor: "black" }
      },
      cancelButtonProps: {
        style: { borderColor: "black", color: "black" }
      }
    });
  };

  const handleAddNew = () => {
    form.resetFields();
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleFinish = (values) => {
    let requestUrl = isEdit ? `/api/playlist/update/${idSelected}` : "/api/playlist/17";
    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    const method = "POST"; // Use "POST" for both add and update

    sendData(requestUrl, formData, method)
      .then((resp) => {
        if (resp?.datas) {
          showAlert("success", "Success", "Replay saved successfully");
          fetchReplays();
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
      dataIndex: "id_play",
      key: "id_play",
    },
    {
      title: "Title",
      dataIndex: "play_name",
      key: "play_name",
    },
    {
      title: "Description",
      dataIndex: "play_description",
      key: "play_description",
    },
    {
      title: "Video URL",
      dataIndex: "play_url",
      key: "play_url",
    },
    {
      title: "Thumbnail URL",
      dataIndex: "play_thumbnail",
      key: "play_thumbnail",
    },
    {
      title: "Genre",
      dataIndex: "play_genre",
      key: "play_genre",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            <EditOutlined /> Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id_play)}>
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
            rowKey="id_play"
            loading={isLoading}
            pagination={false}
          />
        </Card>

        <Modal
          title={isEdit ? "Edit Replay" : "Add Replay"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              play_name: "",
              play_description: "",
              play_url: "",
              play_thumbnail: "",
              play_genre: "",
            }}
          >
            <Form.Item
              label="Title"
              name="play_name"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input placeholder="Enter the replay title" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="play_description"
              rules={[{ required: true, message: "Please enter the description" }]}
            >
              <Input.TextArea placeholder="Enter the replay description" />
            </Form.Item>

            <Form.Item
              label="Video URL"
              name="play_url"
              rules={[{ required: true, message: "Please enter the video URL" }]}
            >
              <Input placeholder="Enter the video URL" />
            </Form.Item>

            <Form.Item
              label="Thumbnail URL"
              name="play_thumbnail"
              rules={[{ required: true, message: "Please enter the thumbnail URL" }]}
            >
              <Input placeholder="Enter the thumbnail URL" />
            </Form.Item>

            <Form.Item
              label="Genre"
              name="play_genre"
              rules={[{ required: true, message: "Please select a genre" }]}
            >
              <Select placeholder="Select genre">
                {genres.map((genre) => (
                  <Option key={genre.id} value={genre.name}>{genre.name}</Option>
                ))}
              </Select>
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

