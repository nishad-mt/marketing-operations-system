import DashboardLayout from "../layouts/DashboardLayout";

import ManagerSection from "../components/dashboard/ManagerSection";
import ContentSection from "../components/dashboard/ContentSection";
import CreativeSection from "../components/dashboard/CreativeSection";
import MarketingSection from "../components/dashboard/MarketingSection";


function DashboardPage() {

  const user = {

    name: "Nishad",

    role: "content_head",

    profile_picture:
      "https://i.pravatar.cc/150?img=12",
  };


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