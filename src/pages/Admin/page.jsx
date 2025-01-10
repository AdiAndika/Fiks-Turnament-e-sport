"use client"

import React, { useState, useEffect } from "react"
import { Layout, Row, Col, Card, Typography, Button } from "antd"
import { getDataPrivate } from "@/utils/api"

const { Title } = Typography
const { Content } = Layout

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [tournaments, setTournaments] = useState([])
  const [forums, setForums] = useState([
    { id: 1, title: "Tournament Rules Discussion", posts: 10 },
    { id: 2, title: "General Gaming Discussion", posts: 25 },
  ])
  const [replays, setReplays] = useState([
    { id: 1, tournament: "Summer Championship", videoUrl: "https://example.com/replay1" },
    { id: 2, tournament: "Fall Invitational", videoUrl: "https://example.com/replay2" },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    getUsers()
    getTournaments()
  }, [])

  const getUsers = () => {
    setIsLoading(true)
    getDataPrivate("/api/v1/users/read")
      .then((resp) => {
        setIsLoading(false)
        if (resp?.datas) {
          setUsers(resp?.datas)
          console.log("users:", resp?.datas)
        } else {
          setErrMsg("Can't fetch data")
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setErrMsg("Data fetch failed")
        console.log(err)
      })
  }

  const getTournaments = () => {
    setIsLoading(true)
    getDataPrivate("/api/v1/tournaments/read")
      .then((resp) => {
        setIsLoading(false)
        if (resp?.datas) {
          setTournaments(resp?.datas)
          console.log("tournaments:", resp?.datas)
        } else {
          setErrMsg("Can't fetch data")
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setErrMsg("Data fetch failed")
        console.log(err)
      })
  }

  return (
    <Layout style={{ background: "transparent", minHeight: "100vh" }}>
      <Content style={{ padding: "20px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "40px", color: "white" }}>
          Welcome, Admin!
        </Title>

        <Row gutter={[0, 16]}>
          {/* Manage Users Card */}
          <Col xs={24} style={{ marginBottom: '16px' }}>
            <Card
              title="Manage Users"
              bordered={false}
              extra={<Button type="link">View All</Button>}
              style={{ width: '100%' }}
            >
              {users.length === 0 ? (
                <p>No users available</p>
              ) : (
                <ul style={{ padding: 0, listStyle: "none" }}>
                  {users.map((user) => (
                    <li key={user.id} style={{ marginBottom: "8px", padding: "8px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
                      {user.username}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </Col>

          {/* Manage Tournaments Card */}
          <Col xs={24} style={{ marginBottom: '16px' }}>
            <Card
              title="Manage Tournaments"
              bordered={false}
              extra={<Button type="link">View All</Button>}
              style={{ width: '100%' }}
            >
              {tournaments.length === 0 ? (
                <p>No tournaments available</p>
              ) : (
                <ul style={{ padding: 0, listStyle: "none" }}>
                  {tournaments.map((tournament) => (
                    <li key={tournament.tournament_id} style={{ marginBottom: "8px", padding: "8px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
                      {tournament.tournament_name} ({tournament.date_start} - {tournament.date_end})
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </Col>

          {/* Manage Forum Card */}
          <Col xs={24} style={{ marginBottom: '16px' }}>
            <Card
              title="Manage Forum"
              bordered={false}
              extra={<Button type="link">View All</Button>}
              style={{ width: '100%' }}
            >
              {forums.length === 0 ? (
                <p>No forum discussions available</p>
              ) : (
                <ul style={{ padding: 0, listStyle: "none" }}>
                  {forums.map((forum) => (
                    <li key={forum.id} style={{ marginBottom: "8px", padding: "8px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
                      {forum.title} ({forum.posts} posts)
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </Col>

          {/* Manage Replay Card */}
          <Col xs={24} style={{ marginBottom: '16px' }}>
            <Card
              title="Manage Replay"
              bordered={false}
              extra={<Button type="link">View All</Button>}
              style={{ width: '100%' }}
            >
              {replays.length === 0 ? (
                <p>No replays available</p>
              ) : (
                <ul style={{ padding: 0, listStyle: "none" }}>
                  {replays.map((replay) => (
                    <li key={replay.id} style={{ marginBottom: "8px", padding: "8px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
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
  )
}

