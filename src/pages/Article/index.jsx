import {
  Breadcrumb,
  Card,
  Form,
  Radio,
  Select,
  DatePicker,
  Button,
  Tag,
  Space,
  Table,
  Popconfirm,
} from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import locale from "antd/es/date-picker/locale/zh_CN";
import img404 from "@/assets/error.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { delArticle, getArticle, getChannels } from "../../apis/article";
import { DATE_FORMAT } from "@/constants";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="是否确认删除该文章?"
              onConfirm={() => onDelArticle(data)}
              okText="是"
              cancelText="否"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    begin_pubdate: null,
    end_pubdate: null,
    status: null,
    channel_id: null,
  });

  const fetchArticleList = async (reqData = {}) => {
    const res = await getArticle(reqData);
    const { results, total_count } = res.data;
    setArticleList(results);
    setCount(total_count);
  };

  const onFinish = async (formValue) => {
    const { channel_id, date, status } = formValue;
    const reqData = {
      status,
      channel_id,
      begin_date: date[0].format(DATE_FORMAT),
      end_date: date[1].format(DATE_FORMAT),
    };
    fetchArticleList(reqData);
  };

  const onPageChange = (page) => {
    setParams({
      ...params,
      page,
    });
  };

  const onDelArticle = async (data) => {
    await delArticle(data.id);
    setParams({
      page: 1,
      per_page: 10,
    });
  };

  useEffect(() => {
    async function getChannelsData() {
      const res = await getChannels();
      setChannels(res.channels);
    }
    getChannelsData();
  }, []);

  useEffect(() => {
    fetchArticleList();
  }, [params]);

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              {
                title: <Link to={"/"}>首页</Link>,
              },
              {
                title: "文章列表",
              },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[
              {
                required: true,
                message: "请选择频道",
              },
            ]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 150 }}>
              {channels.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="日期"
            name="date"
            rules={[
              {
                required: true,
                message: "请选择日期",
              },
            ]}
          >
            <RangePicker locale={locale} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 ${count} 条结果`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleList}
          pagination={{
            current: params.page,
            pageSize: params.per_page,
            onChange: onPageChange,
            total: count,
          }}
        />
      </Card>
    </div>
  );
};
export default Article;
