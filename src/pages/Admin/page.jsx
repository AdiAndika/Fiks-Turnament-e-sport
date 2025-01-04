import React, { useState } from "react";
import { Layout, Row, Col, Card, Typography, Button } from "antd";

const { Title } = Typography;
const { Content } = Layout;

export default function AdminDashboard() {
  // Simulasi data dari halaman lainnya yang telah diedit
  const [users, setUsers] = useState([
    { id: 1, username: "user1", email: "user1@example.com" },
    { id: 2, username: "user2", email: "user2@example.com" },
  ]);
  const [tournaments, setTournaments] = useState([
    { id: 1, name: "Summer Championship", startDate: "2023-06-01", endDate: "2023-06-30" },
    { id: 2, name: "Fall Invitational", startDate: "2023-09-15", endDate: "2023-09-30" },
  ]);
  const [forums, setForums] = useState([
    { id: 1, title: "Tournament Rules Discussion", posts: 10 },
    { id: 2, title: "General Gaming Discussion", posts: 25 },
  ]);
  const [replays, setReplays] = useState([
    { id: 1, tournament: "Summer Championship", videoUrl: "https://example.com/replay1" },
    { id: 2, tournament: "Fall Invitational", videoUrl: "https://example.com/replay2" },
  ]);

  return (
    <Layout style={{ background: "transparent", minHeight: "100vh" }}>
      <Content style={{ padding: "20px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "40px", color: "white" }}>
          Welcome, Admin!
        </Title>

        <Row gutter={16} justify="center">
          {/* Manage Users Card */}
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Manage Users"
              bordered={false}
              extra={<Button type="link" style={{ color: "black" }}>View All</Button>}
              style={{ marginBottom: "20px", background: "white" }}
            >
              {users.length === 0 ? (
                <p>No users available</p>
              ) : (
                <ul>
                  {users.map((user) => (
                    <li key={user.id}>{user.username} ({user.email})</li>
                  ))}
                </ul>
              )}
            </Card>
          </Col>

          {/* Manage Tournaments Card */}
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Manage Tournaments"
              bordered={false}
              extra={<Button type="link" style={{ color: "black" }}>View All</Button>}
              style={{ marginBottom: "20px", background: "white" }}
            >
              {tournaments.length === 0 ? (
                <p>No tournaments available</p>
              ) : (
                <ul>
                  {tournaments.map((tournament) => (
                    <li key={tournament.id}>{tournament.name} ({tournament.startDate} - {tournament.endDate})</li>
                  ))}
                </ul>
              )}
            </Card>
          </Col>

          {/* Manage Forum Card */}
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Manage Forum"
              bordered={false}
              extra={<Button type="link" style={{ color: "black" }}>View All</Button>}
              style={{ marginBottom: "20px", background: "white" }}
            >
              {forums.length === 0 ? (
                <p>No forum discussions available</p>
              ) : (
                <ul>
                  {forums.map((forum) => (
                    <li key={forum.id}>{forum.title} ({forum.posts} posts)</li>
                  ))}
                </ul>
              )}
            </Card>
          </Col>

          {/* Manage Replay Card */}
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Manage Replay"
              bordered={false}
              extra={<Button type="link" style={{ color: "black" }}>View All</Button>}
              style={{ marginBottom: "20px", background: "white" }}
            >
              {replays.length === 0 ? (
                <p>No replays available</p>
              ) : (
                <ul>
                  {replays.map((replay) => (
                    <li key={replay.id}>
                      {replay.tournament} -{" "}
                      <a href={replay.videoUrl} target="_blank" rel="noopener noreferrer">
                        Watch Replay
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
