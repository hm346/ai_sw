//console.log("Hello via Bun!");

// http 请求llm接口
//bun 代替npm做包管理器
import axios from'axios';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DEEPSEEK_BASE_URL)
async function chat() {
    //llm  可能会出错。异常
    // timeout network
    try{
        // GET 请求有上限
        // apikey GET 不安全 明文
        // 图片上传 post 请求体
        // 请求行 url ，method，http version
        // 请求头 Authorization apikey
        //请求体 body
        //fetch http 请求api
        // axios http 请求的框架，封装了fetch，企业级别
        const res=await axios.post(`${process.env.DEEPSEEK_BASE_URL}/chat/completions`,

            {
                model: 'deepseek-v4-flash',
                messages: [
                    {
                        role: 'user',
                        content: '你好，介绍一下Bun'
                    }
                ]
            },
            {
                headers:{
                    'Content-Type':"application/json",
                    Authorization:`Bearer ${process.env.DEEPSEEK_API_KEY}`
                }

            }

        )
        // axios 默认在响应前面带上data
        console.log(res.data.choices[0].message.content);
    }catch(err:any){
        console.log(err.message);

    }
}

chat();






