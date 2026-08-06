import React from "react";
import { CommunityForum } from "../../components/CommunityForum";
import { useUserStore } from "../../store/useUserStore";
const CommunityPage: React.FC = () => {
  const { role, name } = useUserStore((s) => s.userProfile);
  return <CommunityForum userRole={role} userName={name} />;
};
export default CommunityPage;
