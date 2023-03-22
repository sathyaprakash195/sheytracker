import { Form, message, Modal, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import {
  AddMemberToProject,
  UpdateMemeberRoles,
} from "../../../apicalls/projects";
import { SetLoader } from "../../../redux/loadersSlice";
import { formFieldRule } from "../../../utils/constants";

function MemberForm({ show, setShow, member, project, reloadData }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const payload = {
        ...values,
        projectId: project._id,
      };
      let response;
      if (member) {
        response = await UpdateMemeberRoles({
          ...payload,
          memberId: member._id,
        });
      } else {
        response = await AddMemberToProject(payload);
      }

      dispatch(SetLoader(false));
      if (response.success) {
        reloadData();
        message.success(response.message);
        setShow(false);
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
      title="ADD MEMBER"
      open={show}
      onCancel={() => {
        setShow(false);
      }}
      centered
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          name: member?.name,
          email: member?.email,
          roles: member?.roles,
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              validator: async (rule, value) => {
                if (project.members.find((member) => member.member.email === value) && !member)
                  throw new Error("Member already exists");
              },
            },
            {
              required: true,
              message: "Required",
            }
          ]}
        >
          <input type="email" />
        </Form.Item>

        <Form.Item label="Role" name="roles" rules={formFieldRule}>
          <Select mode="multiple" value={member?.roles}>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="developer">Developer</Select.Option>
            <Select.Option value="tester">Tester</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MemberForm;
