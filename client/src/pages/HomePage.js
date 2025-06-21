import React, { useState, useEffect } from "react";
import { Table, Form, Input, Select, Modal, message, DatePicker } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import Spinner from "../components/Spinner";
import Layout from "../components/layout/Layout";
import axios from "axios";
import moment from "moment";
import Analytics from "../components/Analytics";
import "../styles/HomePage.css";

const { RangePicker } = DatePicker;
const { Option } = Select;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alltask, setAllTask] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelecteddate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  const getAllTask = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/tasks/get-task", {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setLoading(false);
      setAllTask(res.data);
    } catch (error) {
      setLoading(false);
      message.error("Fetch issue");
    }
  };

  useEffect(() => {
    getAllTask();
    // eslint-disable-next-line
  }, [frequency, selectedDate, type]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/tasks/delete-task", { taskId: record._id });
      getAllTask();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const payload = { ...values, userid: user._id };
      if (editable) {
        await axios.post("/tasks/edit-task", {
          payload,
          taskId: editable._id,
        });
        message.success("Task updated successfully");
      } else {
        await axios.post("/tasks/add-task", payload);
        message.success("Task added");
      }
      setShowModal(false);
      setEditable(null);
      getAllTask();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Hours",
      dataIndex: "hours",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
            className="action-icon"
          />
          <DeleteOutlined
            className="action-icon mx-2"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {loading && <Spinner />}

      <div className="homepage-container p-4 rounded shadow-sm mt-3">
        <div className="filters-section row g-4 align-items-end mb-4">
          <div className="col-md-3">
            <h6 className="fw-semibold text-muted">📅 Select Frequency</h6>
            <Select value={frequency} onChange={setFrequency} className="w-100">
              <Option value="7">Last 1 Week</Option>
              <Option value="30">Last 1 Month</Option>
              <Option value="365">Last 1 Year</Option>
              <Option value="custom">Custom</Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={setSelecteddate}
                className="mt-2 w-100"
              />
            )}
          </div>

          <div className="col-md-3">
            <h6 className="fw-semibold text-muted">📌 Select Type</h6>
            <Select value={type} onChange={setType} className="w-100">
              <Option value="all">All</Option>
              <Option value="Academic">Academic</Option>
              <Option value="Personal">Personal</Option>
              <Option value="Club">Club</Option>
              <Option value="Other">Other</Option>
            </Select>
          </div>

          <div className="col-md-2 d-flex justify-content-center icons-view">
            <UnorderedListOutlined
              onClick={() => setViewData("table")}
              className={`fs-4 cursor-pointer ${
                viewData === "table" ? "active-icon text-primary" : "text-muted"
              }`}
            />
            <AreaChartOutlined
              onClick={() => setViewData("analytics")}
              className={`fs-4 ms-3 cursor-pointer ${
                viewData === "analytics"
                  ? "active-icon text-primary"
                  : "text-muted"
              }`}
            />
          </div>

          <div className="col-md-4 d-flex justify-content-end">
            <button
              className="btn btn-primary fw-semibold px-4 py-2"
              onClick={() => setShowModal(true)}
            >
              ➕ Add Task
            </button>
          </div>
        </div>

        <div className="content">
          {viewData === "table" ? (
            <Table
              columns={columns}
              dataSource={alltask}
              rowKey="_id"
              className="rounded shadow-sm"
            />
          ) : (
            <Analytics alltask={alltask} />
          )}
        </div>
      </div>

      <Modal
        title={editable ? "Edit Task ✏️" : "Add Task 📝"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditable(null);
        }}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            ...editable,
            date: editable ? moment(editable.date) : null,
          }}
        >
          <Form.Item label="Title" name="title" required>
            <Input placeholder="Enter Task Title" />
          </Form.Item>

          <Form.Item label="Type" name="type" required>
            <Select placeholder="Select Type">
              <Option value="Academic">Academic</Option>
              <Option value="Personal">Personal</Option>
              <Option value="Club">Club</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Hours" name="hours" required>
            <Input
              type="number"
              min={0.5}
              step={0.5}
              placeholder="Time Spent (in hours)"
            />
          </Form.Item>

          <Form.Item label="Date" name="date" required>
            <DatePicker className="w-100" />
          </Form.Item>

          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary px-4" type="submit">
              {editable ? "Update Task" : "Add Task"}
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
