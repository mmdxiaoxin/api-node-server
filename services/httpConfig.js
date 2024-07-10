const models = require('../models');
const {filterOutKeys} = require('../utils');
const ApiCategory = models.api_category;
const ApiConfig = models.api_config;
const ApiRequest = models.api_request;
const ApiResponse = models.api_response;
const ApiHeader = models.api_header;
const RequestBodyForm = models.request_body_form;
const RequestBodyFormX = models.request_body_form_x;
const RequestParam = models.request_param;
const AchsUser = models.achs_user;

/**
 * 构建接口配置列表树
 * @param projectId
 * @returns {Promise<Object>}
 */
async function buildConfigsTree(projectId) {
    // 查询指定项目的目录
    const categoryData = (await ApiCategory.findAll({where: {project_id: projectId}}))
        .map(cat => filterOutKeys(cat.dataValues, ["project_id"]));

    const totalData = [];

    // 查询每个目录下的接口并合并
    for (const category of categoryData) {
        const configs = (await ApiConfig.findAll({where: {category_id: category.id}})).map(config => config.dataValues);
        totalData.push({...category, configs});
    }

    // 定义递归函数来构建树形结构
    function buildTree(items) {
        let treeObj = null;
        const itemMap = new Map();

        items.forEach(item => {
            itemMap.set(item.id, {...item, children: []});
        });

        items.forEach(item => {
            if (item.parent_id === null) {
                const prevObj = {...itemMap.get(item.id), type: "project"};
                treeObj = filterOutKeys(prevObj, ["parent_id"]);
            } else {
                const parent = itemMap.get(item.parent_id);
                if (parent) {
                    const prevObj = {...itemMap.get(item.id), type: "dir"};
                    parent.children.push(filterOutKeys(prevObj, ["parent_id"]));
                }
            }
        });

        return treeObj;
    }

    return buildTree(totalData);
}

async function getCategoryById(categoryId) {
    try {
        const category = await ApiCategory.findByPk(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }

        const apis = await ApiConfig.findAll({
            where: {category_id: categoryId}
        });

        const result = {
            directoryName: category.category_name, children: await Promise.all(apis.map(async api => {
                // 查询 ApiRequest 表获取方法信息
                const request = await ApiRequest.findOne({
                    where: {api_id: api.id}
                });
                return {
                    id: api.id.toString(), name: api.api_name, method: request ? request.method : 'Unknown'
                };
            }))
        };

        return result;
    } catch (error) {
        console.error('Error fetching category by id:', error);
        throw error;
    }
}

async function getApiConfigDetails(apiConfigId) {
    try {
        // 查询 ApiConfig 的基本信息
        const apiConfig = await ApiConfig.findByPk(apiConfigId);

        if (!apiConfig) {
            throw new Error('ApiConfig not found');
        }

        // 查询 ApiRequest 的详细信息
        const apiRequest = await ApiRequest.findOne({where: {api_id: apiConfigId}});
        const queryParams = await RequestParam.findAll({where: {request_id: apiRequest.id}});
        const queryHeaders = await ApiHeader.findAll({where: {request_id: apiRequest.id}});
        const queryBodyForm = await RequestBodyForm.findAll({where: {request_id: apiRequest.id}});
        const queryBodyFormX = await RequestBodyFormX.findAll({where: {request_id: apiRequest.id}});
        // const apiResponse = await ApiResponse.findOne({where: {api_id: apiConfigId}});

        // 构建返回对象
        const result = {
            name: apiConfig.api_name,
            requestMethod: apiRequest.method,
            apiUrl: apiRequest.api_url,
            authType: apiRequest.api_auth,
            queryParams: queryParams.map(param => ({
                key: param.param_name, value: param.param_value, description: 'Query Parameter'
            })),
            queryHeaders: queryHeaders.map(header => ({
                key: header.header_name, value: header.header_value, description: 'Query Header'
            })),
            queryBodyForm: queryBodyForm.map(form => ({
                key: form.field_name, value: form.field_value, description: 'Query Body Form'
            })),
            queryBodyFormX: queryBodyFormX.map(formX => ({
                key: formX.field_name, value: formX.field_value, description: 'Query Body FormX'
            })),
            queryJsonBody: apiRequest.body_json ? JSON.stringify(apiRequest.body_json) : "",
            queryXmlBody: apiRequest.body_xml,
            queryRawBody: apiRequest.body_raw,
        };

        return result;
    } catch (error) {
        console.error('Error fetching ApiConfig details:', error);
        throw error;
    }
}

module.exports = {
    buildTree: buildConfigsTree, getCategoryById, getApiConfigDetails
};
