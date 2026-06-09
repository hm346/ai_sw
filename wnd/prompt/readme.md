# 吴恩达AI应用中的prompt

##  prompt Priciples
- 使用清晰且准确的prompt 
- llm响应约束返回结构json
- 五个构建块

## get_response函数
- 参数默认值是函数的代码优化的重要语法特性
-好复用、灵活简便
- llm api
    - completions 完成
    prompt
    - chat.completions
    messages：[
        {"role":"system",}
        {"role":"user",content:prompt},
        {"role":"assistant",content:''}
        role":"user",content:""}



    ]


    ## 吴恩达 prompt 规则
    - 准确且具体的表达
        清晰 让大模型理解我们的目的，不偏离主题或少犯错误
        具体 提供上下文
        - 总结的案例里使用清晰的格式区间，告诉llm我们待处理的文本在哪里？
        {text}{}是字符串模板中的占位符