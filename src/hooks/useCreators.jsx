import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useCreators() {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getCreators({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getCreators({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/creators`, { signal })
        // return axiosInstance.get(`creators`, { signal })
            .then(response => setCreators(response.data))
            .catch((error) => {console.log(error)});
    }

    return { creators, getCreators }
}
