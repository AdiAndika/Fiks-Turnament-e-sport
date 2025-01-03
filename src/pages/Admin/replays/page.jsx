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
    <>
      <header className="custom-admin-header">
        <h1 className="custom-dashboard-title">Replay Management</h1>
      </header>

      <section className="custom-dashboard-section">
        <div className="custom-dashboard-card">
          <h3 className="custom-card-title">Recent Replays</h3>
          <p className="custom-card-description">
            View and manage recently uploaded replays.
          </p>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Match</th>
                <th>Tournament</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Final: Player1 vs Player2</td>
                <td>Summer Championship</td>
                <td>2023-06-30</td>
                <td>
                  <button className="custom-button">View</button>
                  <button className="custom-button custom-button-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Semi-Final: Player3 vs Player4</td>
                <td>Summer Championship</td>
                <td>2023-06-29</td>
                <td>
                  <button className="custom-button">View</button>
                  <button className="custom-button custom-button-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="custom-dashboard-card">
          <h3 className="custom-card-title">Upload Replay</h3>
          <p className="custom-card-description">
            Upload and categorize new tournament replays.
          </p>
          <form className="custom-form">
            <div className="custom-form-group">
              <label htmlFor="replayFile">Replay File</label>
              <input type="file" id="replayFile" name="replayFile" className="custom-input" accept=".rep,.zip" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="matchName">Match Name</label>
              <input type="text" id="matchName" name="matchName" className="custom-input" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="tournament">Tournament</label>
              <select id="tournament" name="tournament" className="custom-input">
                <option value="">Select Tournament</option>
                <option value="1">Summer Championship</option>
                <option value="2">Fall Invitational</option>
              </select>
            </div>
            <button type="submit" className="custom-button">Upload Replay</button>
          </form>
        </div>
      </section>
    </>
  );
}
