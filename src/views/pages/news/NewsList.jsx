import React, { useState, useEffect, useCallback } from 'react';
import { Table, Image, Button, Popconfirm } from 'antd';
import moment from 'moment';
import MainCard from '../../../ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import useNewsStore from '../../../hooks/news';
import { useAuthenticationStore } from '../../../hooks/authentication';
import CustomTooltip from '../../../ui-component/atoms/CustomTooltip';

const NewsList = () => {
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalRecord, setTotalRecord] = useState(10);
  const [list, setList] = useState([]);
  const { allowToMake, allowToCheck } = useAuthenticationStore();

  const { getListNews, deleteNews } = useNewsStore();

  const fetchData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await getListNews(page);
        setLoading(false);
        if (response.totalRecord && response.data) {
          setTotalRecord(response.totalRecord);
          setList(response.data);
        } else {
          setList([]);
        }
      } catch (error) {
        setLoading(false);
        setList([]);
      }
    },
    [getListNews]
  );
  useEffect(() => {
    fetchData(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    await deleteNews(id);
    setLoading(true);
    fetchData(pageNumber);
    setLoading(false);
  };

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm');
  };
  const navigate = useNavigate();
  const handleClickAddNews = () => {
    navigate('/them-bai-viet-tin-tuc');
  };

  const columns = [
    {
      title: 'STT',
      width: 50,
      // fixed: 'left',
      align: 'center',
      fixed: 'left',
      render: (_, __, index) => {
        return index + 1;
      }
    },
    {
      title: 'Tiêu để',
      dataIndex: 'mainTitle',
      key: 'mainTitle',
      width: 150,
      align: 'center'
    },
    {
      title: 'Tiêu đề phụ',
      dataIndex: 'subTitle',
      key: 'subTitle',
      width: 150,
      align: 'center'
    },
    {
      title: 'Danh mục',
      dataIndex: 'type',
      key: 'type',
      width: 70,
      align: 'center',
      render: (type) => {
        switch (Number(type)) {
          case 0:
            return 'Tin tức (Web)';
          case 1:
            return 'App';
          case 2:
            return 'Kiến thức (Web)';
          case 3:
            return 'Khuyến mãi (Web)';
          default:
            return 'Không xác định';
        }
      }
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'urlImage',
      key: 'urlImage',
      align: 'center',
      width: 200,
      render: (urlImage) => {
        return (
          <Image
            alt="Hình ảnh"
            src={`${urlImage.replace('/var/www/html', '')}`}
            loading="lazy"
            style={{ maxHeight: '100px', maxWidth: '180px' }}
          />
        );
      }
    },
    {
      title: 'Hình ảnh phụ',
      dataIndex: 'subImage',
      key: 'subImage',
      align: 'center',
      width: 150,
      render: (subImage) =>
        subImage ? (
          <Image
            alt="Hình ảnh"
            src={`${subImage.replace('/var/www/html', '')}`}
            loading="lazy"
            style={{ maxHeight: '80px', maxWidth: '140px' }}
          />
        ) : (
          'Không có'
        )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => formatDate(text),
      width: 100,
      align: 'center'
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      // render: (text) => formatDate(text) ,
      width: 700,
      align: 'center',
      // render: (content) => {
      //   return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
      // }
      render: (content) => <ContentWithReadMore content={content} />
    },
    {
      title: 'Tuỳ chọn',
      fixed: 'right',
      align: 'center',
      width: 150,
      render: (record) => (
        <>
          <CustomTooltip open={!allowToCheck}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button onClick={() => navigate('/sua-bai-viet-tin-tuc', { state: record })} style={{ margin: '0 10px' }}>
                Sửa
              </Button>

              <Popconfirm
                title="Xác nhận xóa"
                description="Bạn có chắc chắn muốn xóa?"
                onConfirm={() => {
                  handleDelete(record.id);
                }}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button disabled={!allowToCheck} danger>
                  Xóa
                </Button>
              </Popconfirm>
            </div>
          </CustomTooltip>
        </>
      )
    }
  ];

  return (
    <MainCard title="Danh sách bài viết tin tức">
      <div style={{ background: '#fff', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <CustomTooltip open={!allowToMake}>
            <Button disabled={!allowToMake} onClick={handleClickAddNews} type="primary">
              Thêm bài viết tin tức
            </Button>
          </CustomTooltip>
        </div>
        <Table
          columns={columns}
          dataSource={list}
          loading={loading}
          scroll={{ x: 1200, y: 550 }}
          pagination={{
            current: pageNumber + 1,
            pageSize: 10,
            total: totalRecord,
            showSizeChanger: false,
            onChange: (page) => {
              fetchData(page - 1);
              setPageNumber(page - 1);
            },
            size: 'default'
          }}
          // onChange={(pagination) => {
          //   setPageNumber(pagination.current - 1);
          // }}
          bordered
          size="small"
          rowKey={'id'}
        />
      </div>
    </MainCard>
  );
};

const ContentWithReadMore = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const maxContentLength = 400;

  const modifiedContent = content.replace(/<img\b[^>]*>/gi, (imgTag) => {
    if (imgTag.includes('style=')) {
      return imgTag.replace(/style=["']([^"']*)["']/i, `style="$1;max-width:700px;max-height:200px;"`);
    } else {
      return imgTag.replace(/<img/gi, `<img style="max-width:700px;max-height:200px;"`);
    }
  });

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? modifiedContent
            : modifiedContent.substring(0, maxContentLength) + (content.length > maxContentLength ? '...' : '')
        }}
      ></div>
      {content.length > maxContentLength && (
        <Button type="link" onClick={toggleExpand}>
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </Button>
      )}
    </div>
  );
};

export default NewsList;
