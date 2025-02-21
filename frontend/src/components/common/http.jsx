export const apiUrl = 'http://localhost:8000/api/';

export const adminToken = () => {
    const data = localStorage.getItem('adminInfo')
    const adminData = JSON.parse(data);
    return adminData.token;
}