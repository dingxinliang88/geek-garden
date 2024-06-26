import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import "./index.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Option } from "antd/es/mentions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import {
  getArticleById,
  getChannels,
  publishArticle,
  updateArticle,
} from "../../apis/article";
import { PlusOutlined } from "@ant-design/icons";

const Publish = () => {
  const UPLOAD_URL = "http://geek.itheima.net/v1_0/upload";
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [imageType, setImageType] = useState(0);
  const cacheImageList = useRef([]);

  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  const [form] = Form.useForm();

  /**
   * 回显数据
   */
  useEffect(() => {
    // 1. 通过id获取数据
    async function getArticleDetail() {
      const res = await getArticleById(articleId);
      const data = res.data;
      const { cover } = data;
      form.setFieldsValue({ ...data, type: cover.type });
      setImageType(cover.type);
      setImageList(
        cover.images.map((url) => {
          return { url };
        })
      );
    }
    // 只有有id的时候才能调用此函数回填
    if (articleId) {
      getArticleDetail();
    }
  }, [articleId, form]);

  useEffect(() => {
    async function getChannelsData() {
      const res = await getChannels();
      setChannels(res.channels);
    }
    getChannelsData();
  }, []);

  const onFinish = async (formValue) => {
    const formatUrl = (list) => {
      return list.map((item) => {
        if (item.response) {
          return item.response.data.url;
        } else {
          return item.url;
        }
      });
    };
    if (imageType !== imageList.length) return message.error("图片不合法");
    const { channel_id, content, title } = formValue;
    const params = {
      channel_id,
      content,
      title,
      type: imageType,
      cover: {
        type: imageType,
        images: formatUrl(imageList),
      },
    };
    if (articleId) {
      // 编辑文章
      await updateArticle(articleId, params);
    } else {
      // 新增文章
      await publishArticle(params);
    }
    message.success(`${articleId ? "编辑" : "发布"}文章成功`);
    navigate("/");
  };

  const onUploadChange = (info) => {
    setImageList(info.fileList);
    cacheImageList.current = info.fileList;
  };

  const onImageTypeChange = (e) => {
    const type = e.target.value;
    setImageType(type);
    if (type === 1) {
      // 单图，截取第一张展示
      const imageList = cacheImageList.current[0]
        ? [cacheImageList.current[0]]
        : [];
      setImageList(imageList);
    } else if (type === 3) {
      setImageList(cacheImageList.current);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Image must smaller than 1MB!");
    }
    return isJpgOrPng && isLt1M;
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              {
                title: <Link to={"/"}>首页</Link>,
              },
              {
                title: `${articleId ? "编辑" : "发布"}文章`,
              },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "请输入标题",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="请输入文章标题"
              style={{ width: 400 }}
            />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onImageTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action={UPLOAD_URL}
                onChange={onUploadChange}
                maxCount={imageType}
                multiple={imageType > 1}
                fileList={imageList}
                beforeUpload={beforeUpload}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? "更新文章" : "发布文章"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Publish;
