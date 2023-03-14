import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';

export default function UserProfile() {
  const user_name = useSelector(
    (state: RootState) => state.ChatReducer.user_name
  );
  const navigate = useNavigate();
  const handleNavigation = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/${event.currentTarget.value}`);
  };

  return (
    <div className="profile_container">
      <div className="profile_top_half">
        <div className="profile_details">
          <div>
            <img
              className="user_image"
              alt="user_image"
              src={require('../pics/josh.jpg')}
            ></img>
          </div>
          <div>{user_name}</div>
        </div>
        <div className="welcome_message"> Welcome back {user_name}</div>
        <div className="menu center">
          <button
            className="menuItem"
            value={'ai-chat'}
            onClick={handleNavigation}
          >
            AI Chat
          </button>
          <button
            className="menuItem"
            value={'translation'}
            onClick={handleNavigation}
          >
            Translate Text
          </button>
          <button
            className="menuItem"
            value={'settings'}
            onClick={handleNavigation}
          >
            Settings
          </button>
        </div>
      </div>
      <div className="profile_bottom_half">
        <div className="logout">
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
      </div>
    </div>
  );
}
