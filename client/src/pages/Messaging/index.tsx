import "./index.css";
import UsersList from "../../components/UsersList";
import MessagesFeed from "../../components/MessagesFeed";
import { useUsersApi } from "../../hooks/useUserAPI";

export default function Messaging() {
  const { archiveUser, ...hookProps } = useUsersApi();

  return (
    <div id="pages-messaging">
      <UsersList {...hookProps} />
      <MessagesFeed overrideArchiveUser={archiveUser} />
    </div>
  );
}
