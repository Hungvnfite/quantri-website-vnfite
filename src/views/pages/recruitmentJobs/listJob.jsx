import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Popconfirm, Switch } from 'antd';
import MainCard from '../../../ui-component/cards/MainCard';
import { useAuthenticationStore } from '../../../hooks/authentication';
import CustomTooltip from '../../../ui-component/atoms/CustomTooltip';
import useRecruitmentJobStore from '../../../hooks/website/recruimentJob';
import { useNavigate } from 'react-router-dom';
const RecruitmentJobList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const { allowToCheck, allowToMake } = useAuthenticationStore();
  const { getRecruitmentJobList, updateHiringJobStatus } = useRecruitmentJobStore();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getRecruitmentJobList({ pageSize: 10, pageNumber: 0 });
      setLoading(false);
      if (response) {
        setList(response.hiringJobs);
      } else {
        setList([]);
      }
    } catch (error) {
      setLoading(false);
      setList([]);
    }
  }, [getRecruitmentJobList]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: 'STT',
      width: 50,
      align: 'center',
      render: (_, __, index) => {
        return index + 1;
      }
    },
    {
      title: 'Tên bài tuyển dụng',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      align: 'center'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: (status, record) => (
        <CustomTooltip open={!allowToCheck}>
          <Popconfirm
            title="Xác nhận thay đổi"
            description="Bạn có chắc chắn muốn thay đổi trạng thái?"
            onConfirm={() => {
              updateHiringJobStatus({ hiringJobId: record.hiringJobId, status: record.status == 0 ? 1 : 0 });
              setList((pre) => {
                return pre.map((item) => {
                  if (item.hiringJobId === record.hiringJobId) {
                    return { ...item, status: record.status == 0 ? 1 : 0 };
                  }
                  return item;
                });
              });
            }}
            onCancel={() => {
              console.log('cancel');
            }}
          >
            <Switch value={record.status == 0 ? true : false} checkedChildren="Đang tuyển" unCheckedChildren="Tắt" />
          </Popconfirm>
        </CustomTooltip>
      )
    },
    {
      title: 'Thông tin CV',
      dataIndex: 'hiringJobId',
      key: 'hiringJobId',
      width: 100,
      align: 'center',
      render: (id, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                navigate(`/danh-sach-ung-tuyen/`, { state: id });
              }}
            >
              Xem<span>({record.numOfUnseenCv})</span>
            </Button>
          </>
        );
      }
    },
    {
      title: 'Tuỳ chọn',
      // fixed: 'right',
      align: 'center',
      width: 100,
      render: (record) => (
        <>
          <CustomTooltip open={!allowToCheck}>
            <Button
              disabled={!allowToCheck}
              style={{ marginRight: '10px' }}
              onClick={() => {
                navigate(`/chi-tiet-tuyen-dung`, { state: record.hiringJobId });
              }}
            >
              Sửa
            </Button>
          </CustomTooltip>
          <CustomTooltip open={!allowToCheck}>
            <Button disabled={!allowToCheck} danger onClick={() => console.log(record.id)}>
              Xóa
            </Button>
          </CustomTooltip>
        </>
      )
    }
  ];

  return (
    <MainCard title="Danh sách nghề nghiệp">
      <div style={{ background: '#fff', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
          <CustomTooltip open={!allowToMake}>
            <Button disabled={!allowToMake} type="primary" onClick={() => navigate('/them-tuyen-dung')}>
              Thêm bài tuyển dụng
            </Button>
          </CustomTooltip>
        </div>
        <Table
          columns={columns}
          dataSource={list}
          loading={loading}
          // pagination={{
          //   current: pageNumber,
          //   pageSize: 10,
          //   total: totalRecord + 1,
          //   showSizeChanger: false,
          //   onChange: (page) => {
          //     setPageNumber(page);
          //     fetchData(page - 1);
          //   },
          //   size: 'default'
          // }}
          // onChange={(pagination) => {
          //   setPageNumber(pagination.current);
          // }}
          bordered
          size="small"
          rowKey={'id'}
        />
      </div>
    </MainCard>
  );
};

export default RecruitmentJobList;
