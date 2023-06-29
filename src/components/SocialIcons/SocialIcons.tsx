import Styles from "./SocialIcons.module.css";
import { BsFacebook, BsInstagram } from "react-icons/bs";

function SocialIcons() {
    return (
        <div>
            <a
                className={Styles.Icon}
                href="https://www.facebook.com/ahnafwafiq66"
            >
                <BsFacebook size="24px"></BsFacebook>
            </a>
            <a
                className={Styles.Icon}
                href="https://www.instagram.com/ahnafwafiq"
            >
                <BsInstagram size="24px"></BsInstagram>
            </a>
        </div>
    );
}

export default SocialIcons;
