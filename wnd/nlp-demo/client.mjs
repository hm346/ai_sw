
import { OpenAI } from "openai";
import dotenv from 'dotenv';
dotenv.config();

const client =new OpenAI({
apiKey:process.env.DEEPSEEK_API_KEY,
baseURL:process.env.DEEPSEEK_API_BASE_URL,

});



// llm cient 对象
//const client =1;
// export  const a=2;//直接导出
// export  const b=2;
export default client;// 默认导出























