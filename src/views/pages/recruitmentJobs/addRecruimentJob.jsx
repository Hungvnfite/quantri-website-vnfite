import { Form, Input, Button, Select, Row, Col } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';

import MainCard from '../../../ui-component/cards/MainCard';
// import dispatchToast from '~/handlers/toast';
// import CustomTooltip from '../../../ui-component/atoms/CustomTooltip';
// import { useAuthenticationStore } from '../../../hooks/authentication';
import './styles/styles-addnews.css';

import {
  ClassicEditor,
  Image,
  ImageResize,
  FileRepository,
  ImageUpload,
  Essentials,
  Bold,
  Italic,
  Font,
  Paragraph,
  ImageStyle,
  ImageToolbar,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageCaption,
  LinkImage,
  ImageInsert,
  Heading,
  Alignment,
  Undo,
  Link,
  AutoLink,
  List,
  ListProperties,
  Indent,
  IndentBlock
} from 'ckeditor5';
import { useLocation, useNavigate } from 'react-router';
import useRecruitmentJobStore from '../../../hooks/website/recruimentJob';
import { useEffect } from 'react';

const AddRecruitmentJob = ({ update = false }) => {
  const [form] = Form.useForm();
  const { createRecruitmentJob, updateDetailRecruitmentJob, getDetailRecruitmentJob } = useRecruitmentJobStore();
  const navigate = useNavigate();
  const location = useLocation();
  const jobUpdate = update == true ? location.state : null;
  const [detailJob, setDetailJob] = useState();
  const state = location.state;

  useEffect(() => {
    if (update == true && state) {
      const fetchData = async () => {
        try {
          const response = await getDetailRecruitmentJob(state);
          if (response) {
            form.setFieldsValue(response);
            setDetailJob(response.description);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // const getPlainTextLength = (html) => {
  //   const doc = new DOMParser().parseFromString(html, 'text/html');
  //   return doc;
  // };

  const handleSubmit = async (values) => {
    console.log('PAYLOAD ', values);
    const payload = {
      name: values.name,
      workingForm: values.workingForm,
      position: values.position,
      salary: values.salary,
      workModel: values.workModel,
      degree: values.degree,
      experience: values.experience,
      locations: values.locations,
      description: values.description,
      industryType: values.industryType
    };

    if (update == true) {
      payload.hiringJobId = jobUpdate;
    }
    console.log('PAYLOAD', payload);

    let res = null;
    if (update) {
      res = await updateDetailRecruitmentJob(payload);
    } else {
      res = await createRecruitmentJob(payload);
    }

    if (res.result.isOK == true) {
      navigate('/danh-sach-tuyen-dung');
    }
  };

  return (
    <MainCard title={update ? 'Chỉnh sửa công việc' : 'Thêm công việc'} canGoBack={true}>
      <div className="p-5">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Tên công việc" rules={[{ required: true, message: 'Vui lòng nhập tên công việc' }]}>
                <Input placeholder="Tên công việc" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="industryType" label="Bộ phận" rules={[{ required: true }]}>
                <Select
                  // mode="multiple"
                  options={[
                    { label: 'IT', value: 1 },
                    { label: 'Marketing', value: 2 },
                    { label: 'Nhân sự', value: 3 },
                    { label: 'Kinh doanh', value: 4 }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="position" label="Cấp bậc" rules={[{ required: true }]}>
                <Select
                  options={[
                    { label: 'Thực tập sinh', value: 'intern' },
                    { label: 'Nhân viên', value: 'nhanvien' },
                    { label: 'Quản lý', value: 'quanlyvien' },
                    { label: 'Cộng tác viên', value: 'congtacvien' }
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="workingForm" label="Hình thức làm việc" rules={[{ required: true }]}>
                <Select
                  options={[
                    { label: 'Full-time', value: 'fulltime' },
                    { label: 'Part-time', value: 'parttime' }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="workModel" label="Mô hình làm việc" rules={[{ required: true }]}>
                <Select
                  options={[
                    { label: 'Tại văn phòng', value: 'onsite' },
                    { label: 'Linh hoạt', value: 'hybrid' },
                    { label: 'Từ xa', value: 'remote' }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="degree" label="Bằng cấp" rules={[{ required: true }]}>
                <Input placeholder="Bằng đại học" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="experience" label="Kinh nghiệm" rules={[{ required: true }]}>
                <Input placeholder="2 năm" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="salary" label="Mức lương" rules={[{ required: true }]}>
                <Input placeholder="20,000,000 - 35,000,000 VND" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="locations" label="Địa điểm" rules={[{ required: true }]}>
                <Select
                  mode="multiple"
                  options={[
                    { label: 'Hà Nội', value: '65ebe5b0-3ba4-4a39-987c-da4aae70dc76' },
                    { label: 'Hồ Chí Minh', value: '4f0f6956-27dd-4076-9e6c-fbca2514a81e' },
                    { label: 'Đà Nẵng', value: '1eafc872-465b-43f5-a938-c05c5bfc01ab' }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}></Row>

          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Nội dung không được để trống'
              }
              //   {
              //     validator: (_, value) => {
              //       const length = getPlainTextLength(value);
              //       if (length < 20) {
              //         return Promise.reject('Nội dung không được dưới 20 ký tự');
              //       }
              //       return Promise.resolve();
              //     }
              //   }
            ]}
            label="Nội dung bài viết"
            layout="vertical"
            // initialValue={}
          >
            <CKEditor
              config={{
                //  extraPlugins: [uploadPlugin],
                plugins: [
                  ClassicEditor,
                  Essentials,
                  Image,
                  ImageResize,
                  FileRepository,
                  ImageUpload,
                  Bold,
                  Italic,
                  Font,
                  Paragraph,
                  ImageStyle,
                  ImageToolbar,
                  ImageResizeEditing,
                  ImageResizeHandles,
                  ImageCaption,
                  LinkImage,
                  ImageInsert,
                  Heading,
                  Undo,
                  Alignment,
                  Link,
                  AutoLink,
                  List,
                  ListProperties,
                  Indent,
                  IndentBlock
                ],
                toolbar: {
                  items: [
                    'undo',
                    'redo',
                    '|',
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    '|',
                    'fontSize',
                    'fontFamily',
                    'fontColor',
                    '|',
                    'alignment',
                    'bulletedList', // Thêm icon danh sách bullet
                    'numberedList', // Thêm icon danh sách Số
                    'outdent', // Nút giảm thụt lề
                    'indent', // Nút
                    '|',
                    'fontBackgroundColor',
                    'link'
                    //   'toggleImageCaption',
                    //   'imageTextAlternative',
                    //   'insertImage'
                  ]
                },
                fontSize: {
                  options: [10, 12, 13, 'default', 16, 18, 20, 22, 24, 26]
                },
                // list: {
                //   properties: {
                //     styles: true,
                //     startIndex: true,
                //     reversed: true
                //   }
                // },

                insert: {
                  integrations: ['upload', 'assetManager', 'url'],
                  type: 'auto'
                },
                contentCss: ['./styles/styles-addnews.css'],
                htmlSupport: {
                  allow: [
                    {
                      name: 'p',
                      attributes: ['style']
                    }
                  ]
                }
              }}
              editor={ClassicEditor}
              data={detailJob}
              onChange={(event, editor) => {
                const processedData = editor.getData();
                form.setFieldsValue({ description: processedData });
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {update ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainCard>
  );
};

export default AddRecruitmentJob;
