import { Button, Table } from "antd";
import React from "react";
import { dateFormat } from "../../../utils/constants";
import MemberForm from "./MemberForm";

function Memebers({ members, project, reloadData, isUserAdminOrOwner }) {
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [showMemberForm, setShowMemberForm] = React.useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      render: (roles) => roles.join(", ").toUpperCase(),
    },
    {
      title: "Added On",
      dataIndex: "addedOn",
      render: (createdAt) => dateFormat(createdAt),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-3">
          <Button>Delete</Button>
          <Button
            type="primary"
            onClick={() => {
              setSelectedMember(record);
              setShowMemberForm(true);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  // if user is project owner or admin then only show the action column
  if (!isUserAdminOrOwner) {
    columns.pop();
  }
  return (
    <div className="flex flex-col gap-5">
      {isUserAdminOrOwner && (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setSelectedMember(null);
              setShowMemberForm(true);
            }}
          >
            Add Member
          </Button>
        </div>
      )}
      <Table
        columns={columns}
        dataSource={members.map((memberObj) => ({
          ...memberObj,
          name: memberObj.member.name,
          email: memberObj.member.email,
        }))}
      />

      {showMemberForm && (
        <MemberForm
          show={showMemberForm}
          setShow={setShowMemberForm}
          project={project}
          member={selectedMember}
          reloadData={reloadData}
        />
      )}
    </div>
  );
}

export default Memebers;
