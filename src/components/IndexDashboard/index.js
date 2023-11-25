import 'bootstrap/dist/css/bootstrap.min.css';
import IndexCell from './indexCell';
import './index.css';
function IndexDashboard() {
    const symbols = ['IXIC', "DJI", "GSPC"];

    return (
        <div className="row indexDashboard_container">
            {symbols.map((symbol) => <IndexCell key={symbol} symbol={symbol} />)}
        </div>
    );
}

export default IndexDashboard;
