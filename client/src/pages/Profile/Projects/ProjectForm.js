import { Form, Input, message, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { AddNewProject, UpdateProject } from "../../../apicalls/projects";
import { SetLoader } from "../../../redux/loadersSlice";
const { TextArea } = Input;
const rules = [
  {
    required: true,
    message: "Required",
  },
];
function ProjectForm({ show, setShow, project, reloadProjects = () => {} }) {
  const [formRef] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response;
      if (project) {
        values._id = project._id;
        response = await UpdateProject(values);
      } else {
        response = await AddNewProject(values);
      }
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setShow(false);
        reloadProjects();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={project ? "EDIT PROJECT" : "ADD PROJECT"}
      open={show}
      onCancel={() => {
        setShow(false);
        reloadProjects();
      }}
      centered
      okText="Save"
      cancelText="Cancel"
      width={800}
      onOk={() => {
        formRef.submit();
      }}
    >
      <Form
        layout="vertical"
        name="projectForm"
        className="mt-5"
        form={formRef}
        onFinish={onFinish}
        initialValues={project}
      >
        <div className="grid grid-cols-3">
          <Form.Item
            label="Project Name"
            name="name"
            className="col-span-3"
            rules={rules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project Description"
            name="description"
            className="col-span-3"
            rules={rules}
          >
            <TextArea rows={4} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default ProjectForm;
