import { useEffect } from 'react';
import { initVercelAnalytics } from './utils/vercelAnalytics';

function App() {
    useEffect(() => {
        initVercelAnalytics(); // Initialize Vercel Analytics on mount
    }, []);

    return (
        <div className="App">
            {/* Other components and code */}
        </div>
    );
}

export default App;