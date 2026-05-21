  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import DashboardLayout from "../Layouts/DashboardLayout";

  import ManagerSection from "../components/dashboard/ManagerSection";
  import ContentSection from "../components/dashboard/ContentSection";
  import CreativeSection from "../components/dashboard/CreativeSection";
  import MarketingSection from "../components/dashboard/MarketingSection";


  function DashboardPage() {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("access");
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
      if (!token || !user) {
        navigate("/login");
      }
    }, [token, user, navigate]);

    if (!token || !user) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500 font-medium">Redirecting to login...</p>
        </div>
      );
    }


    const renderDashboardSection = () => {

      if (user.role === "manager") {

        return <ManagerSection />;
      }


      if (
        user.role === "content_head" ||
        user.role === "script_writer" ||
        user.role === "copy_writer"
      ) {

        return <ContentSection />;
      }


      if (
        user.role === "creator" ||
        user.role === "video_editor" ||
        user.role === "designer"
      ) {

        return <CreativeSection />;
      }


      if (
        user.role === "social_media_executive" ||
        user.role === "performance_marketer"
      ) {

        return <MarketingSection />;
      }


      return (
        <div>
          No dashboard available
        </div>
      );
    };


    return (

      <DashboardLayout user={user}>

        {renderDashboardSection()}

      </DashboardLayout>
    );
  }

  export default DashboardPage;