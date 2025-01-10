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
  DatePicker,
  message,
  Spin,
  Upload,
} from "antd";
import { EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { getDataPrivate, editDataPrivatePut, deleteDataPrivate, sendDataPrivate } from "@/utils/api";

const { Content } = Layout;
const { Title } = Typography;

export default function ManageTournaments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { title: "ID", dataIndex: "tournament_id", key: "tournament_id" },
    { title: "Tournament Name", dataIndex: "tournament_name", key: "tournament_name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Team Kouta", dataIndex: "team_kouta", key: "team_kouta" },
    { title: "Team Member Count", dataIndex: "number_of_member_team", key: "number_of_member_team" },
    { title: "Start Date", dataIndex: "date_start", key: "date_start" },
    { title: "End Date", dataIndex: "date_end", key: "date_end" },
    { title: "Start Time", dataIndex: "time_start", key: "time_start" },
    { title: "End Time", dataIndex: "time_end", key: "time_end" },
    { title: "Banner", dataIndex: "tournament_banner_path", key: "tournament_banner_path", render: (text) => text ? <img src={`http://127.0.0.1:5000/static/${text}`} alt="Banner" style={{ width: "100px" }} /> : "-" },
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
            onClick={() => handleDelete(record.tournament_id)}
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
      const response = await getDataPrivate("/api/v1/tournaments/admin/read");
      if (response?.datas) {
        setTournaments(response.datas);
        message.success("Tournaments fetched successfully!");
      } else {
        message.error("Failed to fetch tournaments.");
      }
    } catch (error) {
      message.error("Error fetching tournaments.");
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      ...record,
      date_start: record.date_start ? moment(record.date_start) : null,
      date_end: record.date_end ? moment(record.date_end) : null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this tournament?",
      onOk: async () => {
        try {
          const response = await deleteDataPrivate(`/api/v1/tournaments/admin/delete/${id}`);
          if (response?.status === 204 || (response?.status >= 200 && response?.status <= 299)) {
            setTournaments(tournaments.filter((item) => item.tournament_id !== id));
            message.success("Tournament deleted successfully!");
          } else {
            message.error("Failed to delete tournament.");
          }
        } catch (error) {
          message.error("Error deleting tournament.");
          console.error("Delete Error:", error);
        }
      },
      okButtonProps: { style: { backgroundColor: "black", color: "white", borderColor: "black" } },
    });
  };

  const handleAddNew = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("tournament_name", values.tournament_name);
      formData.append("location", values.location);
      formData.append("description", values.description);
      formData.append("team_kouta", values.team_kouta);
      formData.append("number_of_member_team", values.number_of_member_team);
      formData.append("date_start", values.date_start.format("YYYY-MM-DD"));
      formData.append("date_end", values.date_end.format("YYYY-MM-DD"));
      formData.append("time_start", values.time_start);
      formData.append("time_end", values.time_end);
      if (values.tournament_banner_path) {
        formData.append("tournament_banner_path", values.tournament_banner_path[0].originFileObj);
      }

      if (values.tournament_id) {
        // Update tournament
        const response = await editDataPrivatePut(`/api/v1/tournaments/${values.tournament_id}`, formData);
        if (response?.status === 204 || (response?.status >= 200 && response?.status <= 299)) {
          message.success("Tournament updated successfully!");
          fetchData();
        } else {
          message.error("Failed to update tournament.");
        }
      } else {
        // Add new tournament
        const response = await sendDataPrivate(`/api/v1/tournaments/admin/create`, formData);
        if (response?.status === 201 || (response?.status >= 200 && response?.status <= 299)) {
          message.success("Tournament added successfully!");
          fetchData();
        } else {
          message.error("Failed to add tournament.");
        }
      }
    } catch (error) {
      message.error("An error occurred while submitting tournament data.");
      console.error("Submit Error:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <Layout style={{ background: "transparent" }}>
      <Content style={{ padding: "20px" }}>
        <Title level={2} style={{ marginBottom: "20px", color: "white" }}>
          Manage Tournaments
        </Title>

        <Card
          title="Tournament List"
          extra={
            <Button
              type="primary"
              onClick={handleAddNew}
              style={{ backgroundColor: "black", color: "white", borderColor: "black" }}
            >
              Add Tournament
            </Button>
          }
        >
          {isLoading ? (
            <Spin tip="Loading tournaments..." />
          ) : (
            <Table
              dataSource={tournaments}
              columns={columns}
              rowKey="tournament_id"
              pagination={{ pageSize: 5, showSizeChanger: false }}
            />
          )}
        </Card>

        <Modal
          title="Add / Edit Tournament"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFinish} encType="multipart/form-data">
            <Form.Item name="tournament_id" hidden>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item label="Tournament Name" name="tournament_name" rules={[{ required: true, message: "Please enter the tournament name" }]}> 
              <Input placeholder="Enter tournament name" />
            </Form.Item>
            <Form.Item label="Location" name="location" rules={[{ required: true, message: "Please enter the location" }]}> 
              <Input placeholder="Enter location" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Enter description" rows={3} />
            </Form.Item>
            <Form.Item label="Team Kouta" name="team_kouta" rules={[{ required: true, message: "Please enter the team kouta" }]}> 
              <Input placeholder="Enter team kouta" type="number" />
            </Form.Item>
            <Form.Item label="Team Member Count" name="number_of_member_team" rules={[{ required: true, message: "Please enter the number of team members" }]}> 
              <Input placeholder="Enter team member count" type="number" />
            </Form.Item>
            <Form.Item label="Start Date" name="date_start" rules={[{ required: true, message: "Please select start date" }]}> 
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="End Date" name="date_end" rules={[{ required: true, message: "Please select end date" }]}> 
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Start Time" name="time_start">
              <Input placeholder="Enter start time (e.g., 10:00)" />
            </Form.Item>
            <Form.Item label="End Time" name="time_end">
              <Input placeholder="Enter end time (e.g., 5:00)" />
            </Form.Item>
            <Form.Item label="Tournament Banner" name="tournament_banner_path" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList || []}>
              <Upload maxCount={1} beforeUpload={() => false} listType="picture">
                <Button icon={<UploadOutlined />}>Upload Banner</Button>
              </Upload>
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
