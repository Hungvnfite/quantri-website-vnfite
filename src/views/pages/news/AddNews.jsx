import React, { useState } from 'react';
import { Form, Input, Button, Radio, Upload } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import MainCard from '../../../ui-component/cards/MainCard';
import useNewsStore from '../../../hooks/news';
import dispatchToast from '~/handlers/toast';
import CustomTooltip from '../../../ui-component/atoms/CustomTooltip';
import { useAuthenticationStore } from '../../../hooks/authentication';
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

const AddNews = ({ update = false }) => {
  const [form] = Form.useForm();
  const { createNews, uploadNewsImage, updateNews } = useNewsStore();
  const [checkUpload, setCheckUpload] = useState(true);
  const { allowToMake } = useAuthenticationStore();
  const navigate = useNavigate();
  const location = useLocation();
  const newsUpdate = update ? location.state : null;
  const [type, setType] = useState(update ? newsUpdate?.type : '2');
  const [contentNews, setContentNews] = useState(update ? newsUpdate?.content : '');
  // console.log(newsUpdate);

  const transformFileList = (url) => {
    if (!url) return [];
    const fileName = url.split('/').pop();
    const fileExtension = fileName.split('.').pop().toLowerCase();

    let mimeType = '';
    if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
      mimeType = 'image/jpeg';
    } else if (fileExtension === 'png') {
      mimeType = 'image/png';
    }

    return [
      {
        uid: '-1',
        name: url.split('/').pop(),
        type: mimeType,
        status: 'done',
        url: url
      }
    ];
  };

  // const urlToFile = async (url, filename = 'image.jpg') => {
  //   const response = await fetch(url); // Tải dữ liệu từ URL
  //   const data = await response.blob(); // Chuyển dữ liệu thành Blob
  //   return new File([data], filename, { type: data.type }); // Tạo File từ Blob
  // };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    const { mainTitle, subTitle, type, fileImg, subImg } = values;

    if (checkUpload) {
      if (fileImg && fileImg[0]?.originFileObj) {
        formData.append('fileImg', fileImg[0].originFileObj);
        console.log('main')
      } else {
        formData.append('fileImg', null); // Nếu không thay đổi, truyền null để bên back k đổi ảnh
      }

      if (subImg && subImg[0]?.originFileObj) {
        formData.append('subFileImg', subImg[0].originFileObj);
        console.log('sub')
      } else {
        formData.append('subFileImg', null); // Nếu không thay đổi, truyền null để bên back k đổi ảnh
      }

      formData.append(
        'newsRequest',
        JSON.stringify({
          mainTitle: mainTitle,
          subTitle: subTitle,
          content: contentNews
            .replaceAll(`<figure class="image"><img></figure>`, '')
            .replaceAll(`img`, `img style="margin:auto; max-height:500px; width:auto;" `),
          type: type
        })
      );

      if (update) {
        formData.append('newsId', newsUpdate.id);
        setCheckUpload(await updateNews(formData));
      } else {
        setCheckUpload(await createNews(formData));
      }

      if (checkUpload) navigate('/quan-ly-bai-viet-tin-tuc');
    } else {
      // console.error('Error uploading content');
      dispatchToast('error', 'Lỗi khi tải nội dung lên');
    }
  };

  const getPlainTextLength = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent.length;
  };

  function MyUploadAdapter(loader) {
    return {
      upload: async () => {
        const file = await loader.file;
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
          dispatchToast('warning', 'Chỉ cho phép định dạng ảnh png, jpeg, jpg. Ảnh sẽ bị xóa.');
          return;
        }

        const formData = new FormData();
        formData.append('fileImg', file);
        try {
          const response = await uploadNewsImage(formData);
          if (response || response.RESULT_KEY.isOK) {
            return { default: response.DATA_KEY };
          } else {
            setCheckUpload(false);
          }
        } catch (error) {
          setCheckUpload(false);
          return { default: '' };
        }
      },

      abort: () => {}
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  return (
    <MainCard title={update ? 'Chỉnh sửa bài viết tin tức' : 'Thêm bài viết tin tức'} canGoBack={true}>
      <div className="p-5" style={{ height: 900, overflow: 'auto', borderRadius: '12px' }}>
        <div style={{ background: '#fff', padding: '' }}>
          <Form name="addNews" form={form} autoComplete="off" layout="vertical" onFinish={handleSubmit} validateTrigger="onChange">
            <Form.Item
              name="mainTitle"
              label="Tiêu đề bài viết"
              rules={[{ required: true, message: 'Tiêu đề bài viết không được để trống' }]}
              style={{ display: 'block', width: '100%' }}
              initialValue={newsUpdate?.mainTitle}
            >
              <Input placeholder="Tiêu đề bài viết" />
            </Form.Item>
            <Form.Item name="subTitle" label="Tiêu đề phụ" style={{ display: 'block', width: '100%' }} initialValue={newsUpdate?.subTitle}>
              <Input placeholder="Tiêu đề phụ" />
            </Form.Item>
            <Form.Item name="type" initialValue={newsUpdate?.type} label="Loại bài viết" required>
              <Radio.Group onChange={(e) => setType(e.target.value)} value={type} disabled={update}>
                <Radio.Button value="0">Tin tức (Web)</Radio.Button>
                <Radio.Button value="1">App</Radio.Button>
                <Radio.Button value="2">Kiến thức (Web)</Radio.Button>
                <Radio.Button value="3">Khuyến mãi (Web)</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="fileImg"
              label={'Chọn ảnh sản phẩm (tỉ lệ ' + (type == '1' ? '3:4)' : '1:1)')}
              valuePropName="fileList"
              initialValue={transformFileList(newsUpdate?.urlImage)}
              rules={[
                {
                  validator: async (_, value) => {
                    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                    if (!value || value.length == 0) {
                      return Promise.reject('Vui lòng chọn ảnh bài viết');
                    }
                    // console.log(value)
                    if (!validImageTypes.includes(value[0]?.type)) {
                      return Promise.reject('Vui lòng chọn định dạng ảnh png, jpeg, jpg');
                    }
                    if (/\s/.test(value[0]?.name)) {
                      return Promise.reject('Tên ảnh không được chứa khoảng trắng');
                    }
                    if (!/^[a-zA-Z0-9_.-]+$/.test(value[0]?.name)) {
                      return Promise.reject(new Error('Tên ảnh không được chứa dấu và ký tự đặc biệt'));
                    }
                    return Promise.resolve();
                  },
                  required: true
                }
              ]}
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false} // Để tránh tải lên ngay lập tức
                defaultFileList={transformFileList(newsUpdate?.urlImage)}
                style={{ width: '100%', height: '100%' }}
                accept="image/png, image/jpeg, image/jpg"
              >
                <Button>Chọn ảnh</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="subImg"
              label={'Chọn ảnh phụ (tỉ lệ ' + (type == '1' ? '2:5)' : '3:4)')}
              initialValue={transformFileList(newsUpdate?.subImage)}
              valuePropName="fileList"
              rules={[
                {
                  validator: async (_, value) => {
                    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                    // console.log(value)
                    if (!value || value.length == 0) {
                      return Promise.reject('Vui lòng chọn ảnh phụ bài viết');
                    }
                    if (!validImageTypes.includes(value[0]?.type)) {
                      return Promise.reject('Vui lòng chọn định dạng ảnh png, jpeg, jpg');
                    }
                    if (/\s/.test(value[0]?.name)) {
                      return Promise.reject('Tên ảnh phụ không được chứa khoảng trắng');
                    }
                    if (!/^[a-zA-Z0-9_.-]+$/.test(value[0]?.name)) {
                      return Promise.reject(new Error('Tên ảnh phụ không được chứa dấu và ký tự đặc biệt'));
                    }

                    // const file = value[0]?.originFileObj;
                    // const imageDimensions = await processImageFile(file);
                    // if (imageDimensions.width <= imageDimensions.height) {
                    //   return Promise.reject('Chiều rộng ảnh phải lớn hơn chiều cao');
                    // }

                    // console.log(imageDimensions);

                    return Promise.resolve();
                  },
                  required: true
                }
              ]}
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false} // Để tránh tải lên ngay lập tức
                defaultFileList={transformFileList(newsUpdate?.subImage)}
                style={{ width: '100%', height: '100%' }}
                accept="image/png, image/jpeg, image/jpg"
              >
                <Button>Chọn ảnh</Button>
              </Upload>
            </Form.Item>

            <div className="App">
              <div>
                <Form.Item
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: 'Nội dung không được để trống'
                    },
                    {
                      validator: (_, value) => {
                        const length = getPlainTextLength(value);
                        if (length < 20) {
                          return Promise.reject('Nội dung không được dưới 20 ký tự');
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                  label="Nội dung bài viết"
                  layout="vertical"
                  initialValue={newsUpdate?.content}
                >
                  <CKEditor
                    config={{
                      extraPlugins: [uploadPlugin],
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
                          'link',
                          'toggleImageCaption',
                          'imageTextAlternative',
                          'insertImage'
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
                      image: {
                        resizeOptions: [
                          {
                            name: 'resizeImage:original',
                            value: null,
                            label: 'Original'
                          },
                          {
                            name: 'resizeImage:custom',
                            label: 'Custom',
                            value: 'custom'
                          },
                          {
                            name: 'resizeImage:50',
                            value: '50',
                            label: '50%'
                          },
                          {
                            name: 'resizeImage:60',
                            value: '60',
                            label: '60%'
                          },
                          {
                            name: 'resizeImage:70',
                            value: '70',
                            label: '70%'
                          },
                          {
                            name: 'resizeImage:80',
                            value: '80',
                            label: '80%'
                          },
                          {
                            name: 'resizeImage:90',
                            value: '90',
                            label: '90%'
                          }
                        ],
                        toolbar: [
                          'imageStyle:alignLeft',
                          'imageStyle:block',
                          'imageStyle:side',
                          'imageStyle:alignBlockLeft',
                          'imageStyle:alignBlockRight',
                          '|',
                          'toggleImageCaption',
                          'imageTextAlternative',
                          '|',
                          'linkImage',
                          'resizeImage'
                        ],
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
                      }
                    }}
                    editor={ClassicEditor}
                    data={newsUpdate?.content}
                    onChange={(event, editor) => {
                      const processedData = editor.getData();
                      setContentNews(processedData);
                      form.setFieldsValue({ content: processedData });
                    }}
                  />
                </Form.Item>
              </div>
              <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'center', height: '20px' }}>
                <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                  <CustomTooltip open={!allowToMake}>
                    <Button
                      disabled={!allowToMake}
                      type="primary"
                      htmlType="submit"
                      size="middle"
                      style={{ color: '#fff', margin: 'auto' }}
                    >
                      {update ? 'Chỉnh sửa bài viết' : 'Thêm bài viết'}
                    </Button>
                  </CustomTooltip>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </MainCard>
  );
};

export default AddNews;
