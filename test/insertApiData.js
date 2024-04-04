const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const ApiConfig = require('../models/api_config');
const ApiRequest = require('../models/api_request');
const RequestParam = require('../models/request_param');
const RequestBodyForm = require('../models/request_body_form');
const RequestBodyFormX = require('../models/request_body_form_x');

// 读取本地 JSON 文件
const filePath = path.join(__dirname, '../static/localHttp.json');
fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);

        // 开始事务
        await sequelize.transaction(async (transaction) => {
            // 遍历所有配置项
            for (const key in jsonData.config) {
                if (jsonData.config.hasOwnProperty(key)) {
                    const configData = jsonData.config[key];

                    // 插入 ApiConfig
                    const apiConfig = await ApiConfig.create({
                        api_name: configData.name,
                        creator_id: 1, // 设置为合适的创建者ID
                        category_id: 1, // 设置为合适的类别ID
                        create_time: new Date(configData.createTime)
                    }, { transaction });

                    // 插入 ApiRequest
                    const apiRequest = await ApiRequest.create({
                        api_id: apiConfig.id,
                        method: configData.requestMethod,
                        api_url: configData.apiUrl,
                        base_url: '',
                        api_auth: configData.authType,
                        body_json: configData.queryJsonBody ? JSON.parse(configData.queryJsonBody) : null,
                        body_xml: configData.queryXmlBody,
                        body_raw: configData.queryRawBody
                    }, { transaction });

                    // 插入请求参数
                    for (const param of configData.queryParams) {
                        await RequestParam.create({
                            request_id: apiRequest.id,
                            param_name: param.key,
                            param_value: param.value
                        }, { transaction });
                    }

                    // 插入请求表单参数
                    for (const form of configData.queryBodyForm) {
                        await RequestBodyForm.create({
                            request_id: apiRequest.id,
                            field_name: form.key,
                            field_value: form.value,
                            field_type: 'form'
                        }, { transaction });
                    }

                    // 插入请求表单X参数
                    for (const formX of configData.queryBodyFormX) {
                        await RequestBodyFormX.create({
                            request_id: apiRequest.id,
                            field_name: formX.key,
                            field_value: formX.value,
                            field_type: 'formX'
                        }, { transaction });
                    }
                }
            }
        });

        console.log('Data insertion completed.');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
});
