import React from "react";
import { useGetApplications } from "../../../../hooks/useApplication";
import ApplicationPackagesTable from "./Components/ApplicationPackagesTable";

const Applications = () => {
  const { data: applications, isLoading, isError } = useGetApplications();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading applications</div>;

  return (
    <div>
      {applications && applications.length > 0 ? (
        <ApplicationPackagesTable packages={applications} />
      ) : (
        <p>No applications found</p>
      )}
    </div>
  );
};

export default Applications;
