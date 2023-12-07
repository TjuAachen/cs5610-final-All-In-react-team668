import IndexDashboard from "../../components/IndexDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import RecommendUsers from "./ReommendedUsers";
import RecoomendWatchlists from "./ReommendedWatchlists";
import { findCurrentUserThunk } from "../../services/users/users-thunks";
import Title from "../../components/Title";

function Home() {
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(findCurrentUserThunk());
    }, []);


    return (
        <>
            <Title />
            <IndexDashboard />
            <RecoomendWatchlists />
            {currentUser && (currentUser.isVip || currentUser.isAdmin) && (<RecommendUsers />)}
        </>
    )
}

export default Home;