import "./index.css";
import UsersList from "../../components/UsersList";
import MessagesFeed from "../../components/MessagesFeed";

function Messaging() {
  return (
    <div id="pages-messaging">
      <UsersList />
      <MessagesFeed />
    </div>
  );
}

export default Messaging;
