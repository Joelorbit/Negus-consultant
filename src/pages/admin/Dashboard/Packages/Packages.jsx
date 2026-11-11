import CreatePackages from "./new/CreatePackages";

import { useDeletePackage, usePackages } from "../../../../hooks/usePackages";
import PackagesTable from "./components/PackagesTable";
import NoData from "../../../../components/NoData";

const Packages = () => {
  const { data, isLoading, isError } = usePackages();
  const { mutate: deletePackage } = useDeletePackage();

  const onDelete = (id) => {
    if (confirm("Are you sure you want to delete this package?")) {
      deletePackage(id, {
        onSuccess: () => alert("Package deleted successfully"),
      });
    }
  };
  if (isLoading) return <div>Loading packages...</div>;
  if (isError) return <div>Failed to load packages.</div>;
  return (
    <div>
      <CreatePackages />
      {data.data.length > 0 ? (
        <PackagesTable packages={data.data} onDelete={onDelete} />
      ) : (
        <NoData dataName={"Packages"} />
      )}
    </div>
  );
};

export default Packages;
