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
  DatePicker,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment"; // Pastikan untuk mengimpor moment untuk mengelola tanggal

const { Content } = Layout;
const { Title } = Typography;

export default function ManageTournaments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      id: 1,
      name: "Summer Championship",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
    },
    {
      key: 2,
      id: 2,
      name: "Fall Invitational",
      startDate: "2023-09-15",
      endDate: "2023-09-30",
    },
  ]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
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
      name: record.name,
      startDate: record.startDate ? moment(record.startDate) : null,
      endDate: record.endDate ? moment(record.endDate) : null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: "Are you sure you want to delete this tournament?",
      onOk: () => {
        setDataSource(dataSource.filter((item) => item.key !== key));
        message.success("Tournament deleted successfully");
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
      // Edit existing tournament
      setDataSource(
        dataSource.map((item) =>
          item.key === values.key ? { ...values, startDate: values.startDate.format('YYYY-MM-DD'), endDate: values.endDate.format('YYYY-MM-DD') } : item
        )
      );
      message.success("Tournament updated successfully");
    } else {
      // Add new tournament
      const newTournament = {
        ...values,
        key: dataSource.length + 1,
        id: dataSource.length + 1,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
      };
      setDataSource([...dataSource, newTournament]);
      message.success("Tournament added successfully");
    }
    setIsModalOpen(false);
  };

  return (
    <Layout style={{ background: "transparent" }}>
      <Content style={{ padding: "20px" }}>
        <Title level={2} style={{ marginBottom: "20px", color: "white" }}>
          Manage Tournaments
        </Title>

        <Card
          title="Active Tournaments"
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
              Add Tournament
            </Button>
          }
        >
          <Table dataSource={dataSource} columns={columns} rowKey="key" />
        </Card>

        <Modal
          title="Add / Edit Tournament"
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
              name: "",
              startDate: null,
              endDate: null,
            }}
          >
            <Form.Item name="key" hidden>
              <Input type="hidden" />
            </Form.Item>

            <Form.Item
              label="ID"
              name="id"
              rules={[{ required: true, message: "Please enter the tournament ID" }]}
            >
              <Input placeholder="Enter tournament ID" />
            </Form.Item>

            <Form.Item
              label="Tournament Name"
              name="name"
              rules={[{ required: true, message: "Please enter tournament name" }]}
            >
              <Input placeholder="Enter tournament name" />
            </Form.Item>

            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: "Please select end date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
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
