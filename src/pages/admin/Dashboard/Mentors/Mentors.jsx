import React from "react";
import CreateMentor from "./new/CreateMentor";
import { useDeleteMentor, useMentor } from "../../../../hooks/useMentor";
import MentorsTable from "./Components/MentorsTable";
import { toast } from "sonner";
import NoData from "../../../../components/NoData";

const Mentors = () => {
  const { data } = useMentor();
  const { mutate: deleteMentor } = useDeleteMentor();

  const onDelete = (id) => {
    toast("Are you sure you want to delete this mentor?", {
      action: {
        label: "Yes, delete",
        onClick: () => {
          deleteMentor(id, {
            onSuccess: () => toast.success("Mentor deleted successfully"),
            onError: () => toast.error("Failed to delete mentor"),
          });
        },
      },
      cancel: {
        label: "Cancel",
      },
    });
  };
  return (
    <div>
      <CreateMentor />
      {data?.data ? (
        <MentorsTable mentors={data?.data} onDelete={onDelete} />
      ) : (
        <NoData dataName={"Mentor"} />
      )}
    </div>
  );
};

export default Mentors;
