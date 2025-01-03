import {
  Row,
  Col,
  Typography,
  Card,
  Divider,
  List,
  Skeleton,
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getData } from "../../utils/api";
import "./Match-replay.css";

const { Title, Text } = Typography;

const Playlist = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const genres = [
    { id: 1, name: "Music" },
    { id: 2, name: "Song" },
    { id: 3, name: "Education" },
    { id: 4, name: "Others" },
    { id: 5, name: "Movie" },
  ];

  useEffect(() => {
    getDataPlaylist();
  }, []);

  const getDataPlaylist = () => {
    setIsLoading(true);
    getData("/api/playlist/17")
      .then((resp) => {
        setIsLoading(false);
        if (resp?.datas && Array.isArray(resp.datas)) {
          setData(resp.datas);
        } else {
          console.error("Invalid data format received from server.");
        }
      })
      .catch((err) => {
        console.error("Unable to fetch data from server.");
        setIsLoading(false);
      });
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const dataPlaylistFiltered = Array.isArray(data)
    ? data.filter((item) => {
        return (
          item?.play_name.toLowerCase().includes(searchText) ||
          item?.play_description.toLowerCase().includes(searchText)
        );
      })
    : [];

  const extractYouTubeID = (url) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="playlist-container">
      <Row gutter={[24, 0]} justify="center">
        <Col xs={22} className="playlist-col">
          <Card bordered={false} className="playlist-card">
            <Title className="playlist-title">Playlist</Title>
            <Text className="playlist-subtitle">List of playlists</Text>
            <Divider className="playlist-divider" />

            <Input
              placeholder="Search here.."
              prefix={<SearchOutlined />}
              className="playlist-search"
              allowClear
              size="large"
              onChange={(e) => handleSearch(e.target.value)}
            />

            {isLoading ? (
              <Skeleton active />
            ) : dataPlaylistFiltered.length > 0 ? (
              <List
                grid={{
                  gutter: 12,
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 3,
                }}
                dataSource={dataPlaylistFiltered}
                renderItem={(item) => (
                  <List.Item key={item.id_play}>
                    <Card
                      className="playlist-card"
                      cover={
                        item.play_url.includes("youtube") ? (
                          <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${extractYouTubeID(
                              item.play_url
                            )}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <video
                            controls
                            width="100%"
                            poster={item.play_thumbnail || "default-thumbnail.jpg"}
                          >
                            <source src={item.play_url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )
                      }
                    >
                      <Card.Meta
                        title={item.play_name}
                        description={<Text>{item.play_description}</Text>}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            ) : (
              <Text>No Data</Text>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Playlist;