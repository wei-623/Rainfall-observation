// api/weather.js
export default async function handler(req, res) {
    // 1. 從 Vercel 環境變數中安全讀取金鑰 (F12 完全看不見)
    const API_KEY = process.env.CWA_API_KEY; 
    
    // 2. 設定氣象署 API 目標網址
    const targetUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=${API_KEY}`;

    try {
        // 3. 在伺服器端發起請求
        const response = await fetch(targetUrl);
        
        if (!response.ok) {
            throw new Error(`氣象署 API 回傳錯誤: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 4. 設定 CORS 與 JSON 標頭，讓您的前端網頁可以讀取數據
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        
        // 5. 將過濾後的純數據回傳給前端
        return res.status(200).json(data);
        
    } catch (error) {
        console.error('後端代理運作失敗:', error);
        return res.status(500).json({ error: '後端無法獲取氣象數據，請檢查 Vercel 環境變數設定。' });
    }
}
