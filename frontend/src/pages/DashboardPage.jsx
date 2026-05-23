  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import DashboardLayout from "../Layouts/DashboardLayout";
  import { useAuth } from "../context/AuthContext";

  import ManagerSection from "../components/dashboard/ManagerSection";
  import ContentSection from "../components/dashboard/ContentSection";
  import CreativeSection from "../components/dashboard/CreativeSection";
  import MarketingSection from "../components/dashboard/MarketingSection";


  function DashboardPage() {
    const navigate = useNavigate();
    const { user, loading } = useAuth() || {};

    useEffect(() => {
      if (!loading && !user) {
        navigate("/login");
      }
    }, [user, loading, navigate]);

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      );
    }

    if (!user) {
      return null;
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