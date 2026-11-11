import { useAllCoursesAdmin, useDeleteCourse } from "../../../../hooks/useCourses";
import NoData from "../../../../components/NoData";
import CoursesTable from "./Components/CoursesTable";
import CreateCourse from "./new/CreateCourse";
import { toast } from "sonner";

const Courses = () => {
  const { data: allCourses, isLoading, isError, error } = useAllCoursesAdmin();
  const { mutate: deleteCourse } = useDeleteCourse();

  const onDelete = (id) => {
    toast("Are you sure you want to delete this course?", {
      action: {
        label: "Yes, delete",
        onClick: () => {
          deleteCourse(id, {
            onSuccess: () => toast.success("Course deleted successfully"),
            onError: () => toast.error("Failed to delete course"),
          });
        },
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    return <p role="alert">{error?.response?.data?.message || "Could not load courses."}</p>;
  }
  return (
    <div>
      <CreateCourse />
      <div>
        {allCourses?.length > 0 ? (
          <CoursesTable courses={allCourses} onDelete={onDelete} />
        ) : (
          <NoData dataName={"Courses"} />
        )}
      </div>
    </div>
  );
};

export default Courses;
