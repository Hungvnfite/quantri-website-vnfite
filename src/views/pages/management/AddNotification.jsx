import React, { useState } from 'react';
import { Form, Input, Button, Flex, Radio } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  AutoLink
} from 'ckeditor5';
import { useNotificationStore } from '../../../hooks/notification';

const Notification = () => {
  const [title, setTitle] = useState('');
  const [typeNotification, setTypeNotification] = useState('');
  const [contentNotification, setContentNotification] = useState('');
  const { dispatchAddNofitication } = useNotificationStore();
  const handleClickAddNotification = () => {
    dispatchAddNofitication({
      type: typeNotification,
      title: title,
      content1: contentNotification,
      content2: ''
    });
  };
  const handleChangeTitle = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };
  const onChangeTypeNotification = (e) => {
    console.log(e.target.value);
    setTypeNotification(e.target.value);
  };
  console.log(contentNotification);
  return (
    <div className="p-5" style={{ height: 670, overflow: 'auto' }}>
      <div style={{ background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EBEDEF' }}>
          <div>
            <p style={{ height: '50px', display: 'flex', alignItems: 'center', paddingLeft: '15px' }}>Thêm thông báo</p>
          </div>
        </div>
        <Form.Item name="notification" label="Tiêu đề bài viết" rules={[{ required: false }]} style={{ display: 'block', width: '100%' }}>
          <Input placeholder="Tiêu đề bài viết" onChange={handleChangeTitle} />
        </Form.Item>
        <div className="App">
          <Flex vertical gap="middle">
            <Radio.Group onChange={onChangeTypeNotification} defaultValue="a">
              <Radio.Button value="0">Hệ thống</Radio.Button>
              <Radio.Button value="2">Tin tức</Radio.Button>
            </Radio.Group>
          </Flex>
          <h3 style={{ marginTop: '30px' }}>Nội dung bài viết</h3>
          <div style={{ width: '100%', height: '200px', marginTop: '10px' }}>
            <CKEditor
              config={{
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
                  AutoLink
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
                    'alignment',
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
              data=""
              onChange={(event, editor) => {
                const data = editor.getData();
                const processedData = data.replace(/<p>/g, '').replace(/<\/p>/g, '');
                console.log({ event, editor, data: processedData });
                setContentNotification(processedData);
              }}
            />
          </div>
          <div style={{ display: 'flex', marginTop: '150px' }}>
            <Button onClick={handleClickAddNotification} style={{ marginTop: '100px', background: 'red', color: '#fff', margin: 'auto' }}>
              Thêm thông báo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
