import React from "react";
import {
  Layout,
  Typography,
  Card,
  Table,
  Button,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export default function ReplayManagement() {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    message.success("Replay submitted successfully!");
    console.log("Form values:", values);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Match",
      dataIndex: "match",
      key: "match",
    },
    {
      title: "Tournament",
      dataIndex: "tournament",
      key: "tournament",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link">View</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const dataSource = [
    {
      id: 1,
      match: "Final: Player1 vs Player2",
      tournament: "Summer Championship",
      date: "2023-06-30",
    },
    {
      id: 2,
      match: "Semi-Final: Player3 vs Player4",
      tournament: "Summer Championship",
      date: "2023-06-29",
    },
  ];

  return (
    <Layout style={{ background: "transparent" }}>
      <Content style={{ padding: "20px", background: "transparent" }}>
        <Title level={2} style={{ marginBottom: "20px", color: "white"  }}>
          Replay Management
        </Title>

        <Card title="Recent Replays" style={{ marginBottom: "20px" }}>
          <Table dataSource={dataSource} columns={columns} rowKey="id" />
        </Card>

        <Card title="Upload Replay">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{ tournament: "" }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input placeholder="Enter the title" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter the description" }]}
            >
              <Input.TextArea placeholder="Enter the description" rows={4} />
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

            <Form.Item
              label="Replay File"
              name="replayFile"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload name="file" listType="text" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Tournament"
              name="tournament"
              rules={[{ required: true, message: "Please select a tournament" }]}
            >
              <Select placeholder="Select a tournament">
                <Option value="1">Summer Championship</Option>
                <Option value="2">Fall Invitational</Option>
              </Select>
            </Form.Item>

            <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: 'black', color: 'white', borderColor: 'black' }}
            >
              Upload Replay
            </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}
